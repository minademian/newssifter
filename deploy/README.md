# Deploying Newssifter on Fedora (systemd + nginx)

Production runs the distribution's own `nginx` and `nodejs`. These files configure them; `deploy.sh` ships releases.
Local development (Docker, Nx serve) does not use anything in this directory.

Target: a Fedora droplet at `apps.alpha.ursinenterprises.com`.

## How it fits together

```
browser --443--> nginx --/api--> 127.0.0.1:3000  newssifter-api.service (node main.js, user "newssifter")
                   |
                   +--/--> /var/www/newssifter/current/chatbot   (static SPA)

/var/www/newssifter/releases/<version>/{api,chatbot}     one directory per release
/var/www/newssifter/current -> releases/<version>        the symlink deploy.sh swaps
```

The API bundle contains its dependencies (the Vite build in `apps/api/vite.config.ts` of the version's source directory bundles
every dependency for the `production` configuration), so the server needs no `node_modules` and no `pnpm`. The alpha API uses no
Redis, no Google integration and writes nothing to disk. The bundle's `assets/` folder is served at `/assets`, so it ships next to `main.js`.

**No authentication.** `/admin/data` (the source table in the SPA) and `GET /api/sources` (the full source list) are served to
anyone who can reach the site. They are not protected by nginx or by the API; the only limit is the API's rate limiter. The
data is the same source list that `/api/lookup` exposes one record at a time. Add basic auth in nginx or an API check before
putting anything private behind these paths.

## What goes where

| Source in this repo | Destination on the server |
|---|---|
| `nginx/newssifter.conf` | `/etc/nginx/conf.d/newssifter.conf` |
| `systemd/newssifter-api.service` | `/etc/systemd/system/newssifter-api.service` |
| `sysusers.d/newssifter.conf` | `/etc/sysusers.d/newssifter.conf` |
| `tmpfiles.d/newssifter.conf` | `/etc/tmpfiles.d/newssifter.conf` |
| `deploy.sh` | runs on your machine, not on the server |

Application code is not copied by hand: `deploy.sh` puts it in `/var/www/newssifter/releases/`. The code is read-only for the
service user. Secrets, if there ever are any, go in `/etc/newssifter/api.env` (`root:newssifter`, `0640`); the unit treats the
file as optional.

## One-time server setup

Do this once, as root, before the first deploy.

1. **DNS.** Point an A record for `apps.alpha.ursinenterprises.com` at the droplet, and wait until it resolves. Certbot
   needs it. If the droplet sits behind a DigitalOcean Cloud Firewall, allow 22, 80 and 443 there too.

2. **Packages.**

   ```sh
   dnf install nginx nodejs certbot
   ```

3. **Copy the files** from the table, except `nginx/newssifter.conf` (step 5 explains why). For example, from your machine:

   ```sh
   scp deploy/systemd/newssifter-api.service root@apps.alpha.ursinenterprises.com:/etc/systemd/system/
   scp deploy/sysusers.d/newssifter.conf     root@apps.alpha.ursinenterprises.com:/etc/sysusers.d/
   scp deploy/tmpfiles.d/newssifter.conf     root@apps.alpha.ursinenterprises.com:/etc/tmpfiles.d/
   ```

4. **User, directories, unit.**

   ```sh
   systemd-sysusers                           # creates the newssifter user
   systemd-tmpfiles --create newssifter.conf  # /etc/newssifter, /var/www/newssifter/releases, /var/www/certbot
   systemctl daemon-reload
   systemctl enable newssifter-api            # not --now: there is no release to run yet
   ```

5. **Certificate.** `nginx/newssifter.conf` has a `listen 443 ssl` block that names certificate files, and nginx refuses to
   start while they are missing. So issue the certificate first, while nothing listens on port 80:

   ```sh
   systemctl stop nginx 2>/dev/null || true
   certbot certonly --standalone -d apps.alpha.ursinenterprises.com -m YOU@EXAMPLE --agree-tos
   ```

   Then install the nginx file and start nginx:

   ```sh
   scp deploy/nginx/newssifter.conf root@apps.alpha.ursinenterprises.com:/etc/nginx/conf.d/
   nginx -t && systemctl enable --now nginx
   ```

6. **Renewal.** A `--standalone` certificate renews by binding port 80, which nginx now holds. Switch it to the webroot that
   the port 80 block serves, and reload nginx after each renewal:

   ```sh
   certbot reconfigure --cert-name apps.alpha.ursinenterprises.com \
     --authenticator webroot --webroot-path /var/www/certbot
   printf '#!/bin/sh\nsystemctl reload nginx\n' > /etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh
   chmod +x /etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh
   systemctl enable --now certbot-renew.timer
   certbot renew --dry-run                    # must succeed before you rely on it
   ```

7. **Firewall.**

   ```sh
   firewall-cmd --permanent --add-service=http --add-service=https && firewall-cmd --reload
   ```

8. **SELinux** (Fedora enforces it). nginx must be allowed to connect to the Node service:

   ```sh
   setsebool -P httpd_can_network_connect on
   ```

   `/var/www/newssifter` gets `httpd_sys_content_t` from the default policy, and `deploy.sh` runs `restorecon` on each release.
   After the first deploy and a few requests, `ausearch -m avc -ts recent` should print nothing.

## Deploying

On your machine, from the repository root. Set the SSH login first (the script has `CHANGEME` placeholders):

```sh
export DEPLOY_SSH_TARGET=root@apps.alpha.ursinenterprises.com
export DEPLOY_SSH_KEY=~/.ssh/YOUR_KEY
# export DEPLOY_REMOTE_SUDO=sudo            # only if the login is not root
```

```sh
./deploy/deploy.sh            # dry run
./deploy/deploy.sh --apply    # asks you to type PRODUCTION
```

The version is read from `package.json` at the repo root; bump it first with `./scripts/bump-version.sh [major|minor|patch|prerelease]`. The script
builds from the repo root. The dry run builds both apps, packs `dist/release/newssifter-<version>.tar.gz`, checks the server read-only (setup
present, version not already released, current release) and lists the releases that would be pruned. `--apply` uploads, unpacks
into `releases/<version>`, swaps `current`, restarts `newssifter-api` and requests `http://127.0.0.1:3000/api` on the server. If that
fails ten times it points `current` back at the previous release and restarts. The newest 5 releases are kept; older ones are
deleted on `--apply`, never the live one. A version name cannot be reused.

The first deploy has no previous release, so a failed health check there leaves the service failing and nothing to roll back to.

Manual rollback: `ln -sfn /var/www/newssifter/releases/<previous> /var/www/newssifter/current && systemctl restart newssifter-api`.

## Check it

```sh
nginx -t
systemctl status newssifter-api nginx
journalctl -u newssifter-api -n 50
curl -I http://apps.alpha.ursinenterprises.com/       # 301 to https
curl -I https://apps.alpha.ursinenterprises.com/      # 200
curl -i https://apps.alpha.ursinenterprises.com/api   # 200, JSON
```

## What was checked, and what was not

Checked on the development machine: the production API bundle starts from a directory with no `node_modules` and answers
`/api` with 200; `deploy.sh` passes `bash -n`, refuses a missing or malformed `--version` and refuses `--apply` with the
placeholder SSH settings; its dry run builds both apps and packs a tarball containing `api/main.js` and `chatbot/index.html`.

**Not checked** (no Fedora host was available): `nginx -t` on the server block, `http2 on;` (needs nginx 1.25 or newer),
`systemd-analyze verify` on the unit and what the sandboxing options do to Node on a real host, `systemd-sysusers` and
`systemd-tmpfiles` on these files, the SELinux boolean, certbot issuance, `certbot reconfigure` (needs a recent certbot) and the
`certbot-renew.timer` unit name, and every step of `deploy.sh` that talks to the server: SSH pre-flight, upload, symlink swap,
restart, health check, rollback and pruning. `shellcheck` was not run (not installed). A throwaway `fedora` container can
cover the config checks; the deploy itself can only be proven on the droplet.
