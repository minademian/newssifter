#!/usr/bin/env bash
set -euo pipefail

# bump-version.sh - bumps the version in package.json and records it in .version-state.
cd "$(dirname "${BASH_SOURCE[0]}")/.."

PACKAGE_JSON="package.json"
VERSION_STATE_FILE=".version-state"

usage() { echo "Usage: $0 [major|minor|patch|prerelease] [--dry-run]"; exit 1; }
[[ $# -ge 1 ]] || usage
BUMP_TYPE="$1"; shift
DRY_RUN=false
while [[ $# -gt 0 ]]; do
  case "$1" in
    --dry-run) DRY_RUN=true ;;
    *) echo "Unknown option: $1"; exit 1 ;;
  esac
  shift
done
case "$BUMP_TYPE" in major|minor|patch|prerelease) ;; *) usage ;; esac

CURR_VERSION="$(node -p "require('./${PACKAGE_JSON}').version")"
RE='^([0-9]+)\.([0-9]+)\.([0-9]+)(-([0-9A-Za-z]+)\.([0-9]+))?$'
[[ "$CURR_VERSION" =~ $RE ]] || { echo "Version '$CURR_VERSION' must be X.Y.Z or X.Y.Z-label.N"; exit 1; }
MAJOR="${BASH_REMATCH[1]}"; MINOR="${BASH_REMATCH[2]}"; PATCH="${BASH_REMATCH[3]}"
PRE_LABEL="${BASH_REMATCH[5]}"; PRE_NUM="${BASH_REMATCH[6]}"

case "$BUMP_TYPE" in
  major) NEW_VERSION="$((MAJOR + 1)).0.0" ;;
  minor) NEW_VERSION="${MAJOR}.$((MINOR + 1)).0" ;;
  patch) NEW_VERSION="${MAJOR}.${MINOR}.$((PATCH + 1))" ;;
  prerelease)
    [[ -n "$PRE_LABEL" ]] || { echo "$CURR_VERSION is not a pre-release (needs e.g. 1.0.0-alpha.2)"; exit 1; }
    NEW_VERSION="${MAJOR}.${MINOR}.${PATCH}-${PRE_LABEL}.$((PRE_NUM + 1))" ;;
esac

echo "Bumping version: $CURR_VERSION -> $NEW_VERSION"
$DRY_RUN && echo "(dry run)"

if ! $DRY_RUN; then
  node -e '
    const fs = require("fs"); const [file, v] = process.argv.slice(1);
    fs.writeFileSync(file, fs.readFileSync(file, "utf8").replace(/("version"\s*:\s*")[^"]*(")/, `$1${v}$2`));
  ' "$PACKAGE_JSON" "$NEW_VERSION"

  PREV_LINE=""; PREV_HISTORY=""
  if [ -f "$VERSION_STATE_FILE" ]; then
    PREV_LINE=$(grep -v '^#' "$VERSION_STATE_FILE" | grep -v '^$' | head -1 || true)
    PREV_HISTORY=$(grep -A 100 "^# Previous versions" "$VERSION_STATE_FILE" | grep -v '^#' | grep -v '^$' | head -4 || true)
  fi
  {
    echo "# Version State - DO NOT EDIT MANUALLY"
    echo "# This file is managed by scripts/bump-version.sh"
    echo "# Format: <timestamp>|<version>"
    echo ""
    echo "# Current version"
    echo "$(date +%s)|${NEW_VERSION}"
    echo ""
    echo "# Previous versions (rollback history - last 5)"
    if [ -n "$PREV_LINE" ]; then echo "$PREV_LINE"; fi
    if [ -n "$PREV_HISTORY" ]; then echo "$PREV_HISTORY"; fi
  } > "$VERSION_STATE_FILE"
fi

echo "Done. Updated: $PACKAGE_JSON, $VERSION_STATE_FILE"
