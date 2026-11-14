#!/usr/bin/env bash
# Production (Fedora droplet): build and deploy Newssifter as a versioned release.
# Builds the api and chatbot apps, packs them into one tarball, uploads it, unpacks it into
# /var/www/newssifter/releases/<version>, repoints /var/www/newssifter/current and restarts
# newssifter-api. If the health check fails it points "current" back at the previous release.
# Default is dry-run (builds and packs locally, reads from the server, changes nothing there).
# --apply requires typing PRODUCTION. Does not do first-time server setup: see deploy/README.md.
#
# Usage:
#   ./deploy/deploy.sh --version 1.0.0-alpha.1            # dry-run
#   ./deploy/deploy.sh --version 1.0.0-alpha.1 --apply
#
set -euo pipefail

# --- Fill these in -----------------------------------------------------------------------------
SSH_TARGET="${DEPLOY_SSH_TARGET:-CHANGEME@apps.alpha.ursinenterprises.com}"
SSH_KEY="${DEPLOY_SSH_KEY:-CHANGEME}"
# Set to "sudo" if SSH_TARGET is not root.
REMOTE_SUDO="${DEPLOY_REMOTE_SUDO:-}"
# -----------------------------------------------------------------------------------------------

KEEP_RELEASES=5
REMOTE_BASE="/var/www/newssifter"
REMOTE_RELEASES="${REMOTE_BASE}/releases"
REMOTE_CURRENT="${REMOTE_BASE}/current"
HEALTH_URL="http://127.0.0.1:3000/api"

APPLY=false
VERSION=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --apply)
      APPLY=true
      shift
      ;;
    --version)
      [[ $# -ge 2 ]] || { echo "ERROR: --version requires a value (e.g. 1.0.0-alpha.1)" >&2; exit 1; }
      VERSION="$2"
      shift 2
      ;;
    -h|--help)
      sed -n '2,12p' "$0"
      exit 0
      ;;
    *)
      echo "Unknown option: $1" >&2
      exit 1
      ;;
  esac
done

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE_DIR="$(cd "${SCRIPT_DIR}/../current" && pwd)"
RELEASE_DIR="${WORKSPACE_DIR}/dist/release"

SSH_OPTS=(-i "${SSH_KEY}" -o IdentitiesOnly=yes -o BatchMode=yes -o ConnectTimeout=15 -o ConnectionAttempts=3)

die() {
  echo "ERROR: $*" >&2
  exit 1
}

info() {
  echo "$*"
}

placeholders_set() {
  [[ "${SSH_TARGET}" == *CHANGEME* || "${SSH_KEY}" == *CHANGEME* ]]
}

ssh_cmd() {
  ssh "${SSH_OPTS[@]}" "${SSH_TARGET}" "$@"
}

scp_cmd() {
  scp "${SSH_OPTS[@]}" "$@"
}

confirm_production() {
  [[ -t 0 ]] || die "Apply requires an interactive TTY so you can type PRODUCTION (stdin is not a terminal)"
  info ""
  info "ABOUT TO MUTATE PRODUCTION (${SSH_TARGET})"
  info "  release : ${VERSION}"
  info "  server  : ${REMOTE_CURRENT} -> ${REMOTE_RELEASES}/${VERSION}, then restart newssifter-api"
  info ""
  info "Type PRODUCTION to continue:"
  local answer
  read -r answer
  [[ "${answer}" == "PRODUCTION" ]] || die "Aborted (confirmation mismatch, got '${answer}')"
}

validate_version() {
  [[ -n "${VERSION}" ]] || die "--version is required (e.g. --version 1.0.0-alpha.1)"
  [[ "${VERSION}" =~ ^[0-9]+\.[0-9]+\.[0-9]+(-[0-9A-Za-z.]+)?$ ]] \
    || die "Version '${VERSION}' must look like X.Y.Z or X.Y.Z-label"
}

build_and_pack() {
  info "==> Building api and chatbot (production)"
  (cd "${WORKSPACE_DIR}" && npx nx build api --configuration=production)
  (cd "${WORKSPACE_DIR}" && npx nx build chatbot --configuration=production --emptyOutDir)

  [[ -f "${WORKSPACE_DIR}/dist/apps/api/main.js" ]] || die "dist/apps/api/main.js is missing after build"
  [[ -f "${WORKSPACE_DIR}/dist/apps/chatbot/index.html" ]] || die "dist/apps/chatbot/index.html is missing after build"

  mkdir -p "${RELEASE_DIR}"
  TARBALL="${RELEASE_DIR}/newssifter-${VERSION}.tar.gz"
  info "==> Packing ${TARBALL}"
  # COPYFILE_DISABLE stops macOS tar from adding ._ metadata files.
  COPYFILE_DISABLE=1 tar -czf "${TARBALL}" --exclude='.DS_Store' -C "${WORKSPACE_DIR}/dist/apps" api chatbot

  local listing
  listing="$(tar -tzf "${TARBALL}")"
  grep -qx 'api/main.js' <<<"${listing}" || die "Tarball has no api/main.js"
  grep -qx 'chatbot/index.html' <<<"${listing}" || die "Tarball has no chatbot/index.html"
  info "    $(du -h "${TARBALL}" | cut -f1) packed"
}

# Read-only look at the server. Fails before anything is changed if it is not ready.
preflight_remote() {
  info "==> Checking the server (read-only)"
  ssh_cmd "set -e
    ${REMOTE_SUDO} test -d '${REMOTE_RELEASES}' || { echo 'missing ${REMOTE_RELEASES}: run the one-time setup in deploy/README.md' >&2; exit 3; }
    ${REMOTE_SUDO} test ! -e '${REMOTE_RELEASES}/${VERSION}' || { echo 'release ${VERSION} already exists on the server' >&2; exit 4; }
    ${REMOTE_SUDO} systemctl cat newssifter-api >/dev/null || { echo 'newssifter-api.service is not installed' >&2; exit 5; }
    echo \"    current -> \$(${REMOTE_SUDO} readlink -f '${REMOTE_CURRENT}' || echo '(none yet)')\"" \
    || die "Server pre-flight failed; nothing was changed."
}

# Releases beyond the newest KEEP_RELEASES (never the live one). Prints one per line.
prune_candidates() {
  ssh_cmd "cd '${REMOTE_RELEASES}' && live=\$(${REMOTE_SUDO} basename \"\$(${REMOTE_SUDO} readlink -f '${REMOTE_CURRENT}' 2>/dev/null || true)\") && \
    ls -1t | tail -n +$((KEEP_RELEASES + 1)) | grep -vxF \"\${live}\" || true"
}

print_rollback() {
  info ""
  info "Manual rollback, if ever needed (PREVIOUS is a directory name under ${REMOTE_RELEASES}):"
  info "  ssh ${SSH_OPTS[*]} ${SSH_TARGET} \"${REMOTE_SUDO} ln -sfn ${REMOTE_RELEASES}/PREVIOUS ${REMOTE_CURRENT} && ${REMOTE_SUDO} systemctl restart newssifter-api\""
}

apply_remote() {
  local remote_tar="newssifter-${VERSION}.tar.gz"

  info "==> Uploading"
  scp_cmd "${TARBALL}" "${SSH_TARGET}:${remote_tar}" || die "Upload failed; nothing was changed on the server."

  info "==> Activating ${VERSION}"
  # Runs on the server. Prune candidates are recomputed there; only names without a slash are removed.
  if ! ssh_cmd "${REMOTE_SUDO} bash -s" -- "${VERSION}" "${remote_tar}" "${KEEP_RELEASES}" <<REMOTE
set -euo pipefail
version="\$1"; tarball="\$2"; keep="\$3"
releases='${REMOTE_RELEASES}'; current='${REMOTE_CURRENT}'; health='${HEALTH_URL}'
dest="\${releases}/\${version}"

previous="\$(readlink -f "\${current}" 2>/dev/null || true)"

mkdir "\${dest}"
tar -xzf "\${tarball}" -C "\${dest}"
chown -R root:root "\${dest}"
chmod -R u=rwX,go=rX "\${dest}"
command -v restorecon >/dev/null && restorecon -R "\${dest}" || true

ln -sfn "\${dest}" "\${current}.new"
mv -T "\${current}.new" "\${current}"
systemctl restart newssifter-api

ok=false
for _ in 1 2 3 4 5 6 7 8 9 10; do
  if curl -fsS -o /dev/null "\${health}"; then ok=true; break; fi
  sleep 1
done

if [ "\${ok}" != true ]; then
  echo "Health check failed at \${health}" >&2
  if [ -n "\${previous}" ] && [ -d "\${previous}" ]; then
    ln -sfn "\${previous}" "\${current}.new"
    mv -T "\${current}.new" "\${current}"
    systemctl restart newssifter-api
    echo "Rolled back to \${previous}" >&2
  else
    echo "No previous release to roll back to; the service is still failing." >&2
  fi
  exit 9
fi

rm -f "\${tarball}"

live="\$(basename "\$(readlink -f "\${current}")")"
cd "\${releases}"
ls -1t | tail -n +\$((keep + 1)) | grep -vxF "\${live}" | while read -r old; do
  case "\${old}" in */*|'') continue ;; esac
  echo "Pruning \${old}"
  rm -rf -- "\${releases}/\${old}"
done || true
echo "Live release: \${live}"
REMOTE
  then
    info "ERROR: remote activation failed (see messages above)." >&2
    print_rollback
    exit 1
  fi

  info "==> Done: ${VERSION} is live"
  print_rollback
}

validate_version
if [[ "${APPLY}" == true ]]; then
  placeholders_set && die "Set DEPLOY_SSH_TARGET and DEPLOY_SSH_KEY (or edit the top of this script) before --apply."
fi

build_and_pack

if placeholders_set; then
  info "==> SSH settings are still placeholders: skipping server checks."
  info "Dry run complete. Artifact: ${TARBALL}"
  exit 0
fi

preflight_remote

if [[ "${APPLY}" != true ]]; then
  info "==> Releases that would be pruned (keeping the newest ${KEEP_RELEASES} and the live one):"
  PRUNE="$(prune_candidates)" || die "Could not list releases on the server."
  if [[ -n "${PRUNE}" ]]; then
    sed 's/^/    /' <<<"${PRUNE}"
  else
    info "    none"
  fi
  info ""
  info "Dry run complete. Would upload ${TARBALL}, unpack to ${REMOTE_RELEASES}/${VERSION}, repoint ${REMOTE_CURRENT}, restart newssifter-api."
  info "Re-run with --apply to deploy."
  exit 0
fi

confirm_production
apply_remote
