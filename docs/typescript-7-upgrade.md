# TypeScript 7 upgrade: working notes

Started 2026-11-14. Source directory at the time of writing: `v1.0.0-alpha.2/`.

## Where we are

| Step | What | Status |
|---|---|---|
| 1 | Make the tsconfigs valid for TypeScript 7 (they also work on 5.2 today) | Done. The `ts-jest` question it raised was settled by moving to Vitest. See [Step 1 log](#step-1-log) and [Vitest migration](#vitest-migration) |
| 2 | Upgrade Nx, ts-jest and typescript-eslint to versions that support a newer TypeScript | Not started. `ts-jest` is gone (Vitest) and `ts-loader` is gone (Vite). Linting moved to Oxlint, so `typescript-eslint` only remains for one rule. The Nx upgrade is still needed, and is also the prerequisite for adding `@nx/oxlint` |
| 3 | Move to TypeScript 6 | Not started |
| 4 | Add TypeScript 7 and keep TypeScript 6 installed as the fallback for tools that need the programmatic API | Not started |

Current versions: `typescript ~5.2.2` (installed 5.2.2), `nx 17.2.8`, `@typescript-eslint/* 6.21`, `ts-node 10.9.1`, `vite ^5`, `vitest ~0.34`. npm lists `typescript@latest` as 7.0.2 (7.1 is in beta).

## Summary

The upgrade is mostly a tooling upgrade, not a code change. The source code is low-risk. The blockers are the tools around it, and the Nx version is the main one. Production at runtime is not affected. What breaks is the ability to build a release.

TypeScript 7.0 does not ship a stable programmatic (JavaScript) API. Tools that call `require('typescript')` for `createProgram` and similar fail on it. Microsoft provides a compatibility package that re-exports the 6.0 API, and Nx recommends running 7 side by side with 6 until a new API arrives, expected in 7.1.

## Dev blast radius

| Area | Effect | Evidence |
|---|---|---|
| Nx 17.2.8 | The main gate. | Nx's docs list 23.x as supporting `>= 5.8.0 < 7.1.0`. Nx 17's own range was not checked. |
| API build and dev server (`nx build api`, `pnpm be`) | No longer affected (was: breaks). | It used `@nx/webpack` with `ts-loader` and `fork-ts-checker`, which need the programmatic API. It now builds with Vite (esbuild) and type-checks with the `tsc` command line. See [Vite build migration](#vite-build-migration). |
| API tests | No longer affected (was: breaks). | They used `ts-jest 29.4.15`, which declares `typescript >=4.3 <7`. They now run on Vitest, which transpiles with esbuild and does not use the TypeScript API. |
| Lint | Mostly no longer affected (was: likely breaks). | `lint` now runs Oxlint, which does not use the TypeScript API. `lint-boundaries` still runs ESLint with `@typescript-eslint/parser`, so that one target stays in scope. `ts-node` and `@nx/js` also use the API. See [Oxlint migration](#oxlint-migration). |
| Chatbot | Mostly fine. | Vite and Vitest do not compile with `tsc`. `nx build chatbot` does run a type-check pass through the Nx plugin. |
| UI tests (Babel) | Unaffected. | They do not use the TypeScript compiler. |

Source code: no decorators, const enums, namespaces or `import =` anywhere in `apps/` and `libs/`, and nothing in the repo uses the TypeScript API directly.

## Prod and deploy blast radius

- Runtime: none. The droplet runs a bundled JS file with its dependencies inlined, plus static assets. TypeScript is not installed there. The API's `target: ES2017` stays valid.
- `deploy/deploy.sh` fails early and safely. Its first step is a local `nx build`, so a broken build stops it before anything reaches the server.
- CI (`.github/workflows/ci.yml`) runs `nx affected -t build` and hits the same build failure.
- Docker images: deploy no longer goes through Kubernetes. `apps/api/Dockerfile`, `apps/chatbot/Dockerfile`, `Dockerfile` and `docker-compose.yml` are still in the repo, and the two app Dockerfiles run `pnpm run build:api` and `pnpm run build:chatbot`, which do not exist in `package.json`. If those files are obsolete they can be removed; if not, they were already broken. How TypeScript 7's native binary installs on `node:20-alpine` was not checked.

## tsconfig findings

Measured with the current compiler (5.2.2), nothing installed:

- `tsconfig.base.json` has `moduleResolution: "node"`, which guides say TypeScript 7 removes. The app and lib configs (module `esnext`) pass with `bundler`: 0 errors for the api app, the ui lib and the chatbot app.
- Spec configs that set `module: commonjs` fail under `bundler` with TS5095. Setting `module` and `moduleResolution` to `nodenext` works for them.
- TypeScript 7 turns `strict` on by default. The api config has no `strict` today. `tsc --strict` on the api app gives 0 errors.
- `v1.0.0-alpha.2/tsconfig.json` (the ts-node config) sets `module: commonjs` with no `moduleResolution`, so it resolves with node10 implicitly. Not part of step 1. Needs its own look.

## Unverified

These were not confirmed against the official release notes:

- What TypeScript 7 does with `baseUrl`, `esModuleInterop: false` (set in `libs/ui` and `apps/chatbot`), `importHelpers` and the default `types` list.
- The exact list of removed options. The sources used were third-party guides. Check the official notes.
- Nx 17.2.8's supported TypeScript range.
- Which Nx version is the minimum that supports TypeScript 6, and what upgrading Nx from 17 to a current version involves.
- How TypeScript 7's platform binaries install in CI and in the Alpine Docker images.

## Notes for checking changes in this repo

- Nx caches builds and Vitest runs. `nx.json` has `sharedGlobals: []`, so a change to the root `tsconfig.base.json` may not invalidate the cache. Pass `--skip-nx-cache` when checking a tsconfig change.
- Nx exits with code 1 whenever its Nx Cloud warning appears, even if the target passed. Judge a run by the `Successfully ran target` line, not the exit code.
- `(node) [DEP0060] DeprecationWarning: The util._extend API is deprecated` printed when Nx runs a task is not from this repo's code. It comes from `strong-log-transformer@2.1.0`, which Nx 17.2.8's task runner uses to capture task output. That package is abandoned (2.1.0 is the latest and still calls `util._extend`), and Nx no longer depends on it by 20.x. It is harmless and goes away with the Nx upgrade in step 2. Decided 2026-11-14 to leave it until then.
- `@nx/vite:test` resolves a `globalSetup` path from the workspace root, so use an absolute path in `vite.config.ts`.
- The correct TypeScript project configs to check are `libs/ui/tsconfig.lib.json` and `apps/*/tsconfig.app.json`. `libs/tsconfig.lib.json` includes `src/**` relative to `libs/`, so it matches no files and passes vacuously.

## Step 1 log

Baseline before the change, with the cache off:

- `tsc --noEmit` error counts: all 0, except `apps/api/tsconfig.spec.json` = 1 (the existing broken import `./data_2.json` in `apps/api/src/__tests__/lookup.it.ts`).
- Tests: api 28, helpers 3, ui 27, chatbot 2, all passing.
- Builds: `api` production and development, `services` production, `chatbot` production, all OK.

Changes made (six files under `v1.0.0-alpha.2/`):

- `tsconfig.base.json`: `moduleResolution` `"node"` to `"bundler"`.
- The five spec configs that set `module: "commonjs"` now set `module: "nodenext"` and `moduleResolution: "nodenext"`: `apps/api/tsconfig.spec.json`, `apps/api-e2e/tsconfig.spec.json`, `libs/ui/tsconfig.spec.json`, `libs/tsconfig.spec.json`, `libs/helpers/tsconfig.spec.json`.

Result after the change, all with the cache off:

- `tsc --noEmit` error counts: identical to the baseline (all 0, api spec still 1 for the same `lookup.it.ts` import).
- Tests: api 28, helpers 3, ui 27, chatbot 2, all passing. Same numbers as before.
- Builds: `api` production and development, `services` production, `chatbot` production, all OK.
- Not run: `apps/api-e2e` (needs a running server and its global setup).

### What step 1 raised: a `ts-jest` warning with `nodenext`

On a cold jest cache, `ts-jest` printed `TS151002: Using hybrid module kind (Node16/18/Next) is only supported in "isolatedModules: true"` for the api and helpers specs. Tests passed; it was a warning, and `apps/api-e2e` would have printed it too. Rather than silence it or turn off type-checking, the specs were moved to Vitest (below). As part of that, the `nodenext` override was dropped from the api, helpers and api-e2e spec configs, which now inherit `module: esnext` and `moduleResolution: bundler` from the base config. The ui spec config and `libs/tsconfig.spec.json` keep `nodenext`.

## Vitest migration

Done 2026-11-14: `apps/api`, `libs/helpers` and `apps/api-e2e` moved from `ts-jest` (jest) to Vitest 0.34.6, the version already used by the chatbot.

- Each got a `vite.config.ts` with `globals: true`, `environment: 'node'` and the Nx tsconfig-paths plugin so the `@newssifter/*` aliases resolve. The `test` target (`e2e` for `api-e2e`) now uses `@nx/vite:test`.
- Their `tsconfig.spec.json` files use `vitest/globals` types instead of `jest`.
- `libs/helpers` gained a `tsconfig.json`, because the Nx Vite executor looks for one in the project root.
- The `api-e2e` support files were converted from `module.exports` to ES exports: the global setup returns the teardown function, and `test-setup.ts` runs on import.
- `ts-jest` was removed from `package.json`. `jest.preset.js` now sets `transform: {}` so the Nx jest preset does not demand `ts-jest`, which only `libs/ui` still reads (it uses Babel).
- `libs/ui` stays on jest with `babel-jest`. Moving it to Vitest is a possible later step.

Results, cache off: api 28 tests, helpers 3, ui 27, chatbot 2, all passing, the same counts as before the migration. `api`, `services` and `chatbot` builds still pass.

The e2e project is unchanged in outcome. It still fails: its one test expects `{ message: 'Hello API' }` from `GET /`, which the API answers with a 404. With no server it fails with `ECONNREFUSED`, as before. The `Tearing down...` message appears when Vitest is run directly in `apps/api-e2e` but not through `nx e2e`.

## Vite build migration

Done 2026-11-14: the `api` and `services` builds moved from `@nx/webpack` (`ts-loader`) to Vite, and `@nx/webpack` was removed from `package.json`. `ts-loader`, `fork-ts-checker-webpack-plugin` and webpack's Nx tooling left the lockfile with it. `ts-loader` was never a direct dependency; only `@nx/webpack` pulled it in.

- `apps/api/vite.config.ts` now holds the build as well as the tests. It is an SSR build of `src/main.ts` to a CommonJS `main.js`.
  - Production (the default) bundles every dependency into `main.js`, as `externalDependencies: "none"` did, so the server needs no `node_modules`.
  - Development leaves dependencies external and writes a sourcemap, as before. The config name comes from `NX_TASK_TARGET_CONFIGURATION`, which Nx sets.
  - A small plugin copies `src/assets` next to `main.js`, because `main.ts` serves `__dirname/assets` at `/assets`.
  - `ssr.noExternal` is only set for the `build` command. Set unconditionally it broke Vitest, which reads the same option.
- The `build` target uses `@nx/vite:build` with `skipTypeCheck: true`. Type checking moved to a separate `typecheck` target that runs `tsc --noEmit -p apps/api/tsconfig.app.json`, and `build` depends on it. That command-line `tsc` does not need the programmatic API, so it keeps working on TypeScript 7.
- `libs/services` got a small Vite build in the same shape, plus a `typecheck` target. It exists so Nx's `^build` ordering for the chatbot keeps working. Its output is almost empty, as the webpack one was, because `index.ts` re-exports a module that has only a default export.

Checked with the cache off:

- The production bundle was run from a folder with no `node_modules` above it, and compared route by route with the webpack bundle built beforehand: `/api`, `/api/ping`, four `/api/lookup` cases, `/api/sources`, `/assets/data_2.json`, a 404, and the security headers. All 11 responses and the headers are identical. The bundle's only remaining `require` targets are Node built-ins.
- The bundle is 1.2 MB against 1.3 MB for webpack. The development bundle is 73 KB, requires 8 packages from `node_modules`, and also behaves identically.
- Typechecks, the `api`, `services` and `chatbot` builds, and all four test projects pass, with the same test counts as before (api 28, helpers 3, ui 27, chatbot 2).
- The `nodemon` dev server rebuilt itself on the new build and kept working, with the chatbot's proxy still reaching it.

Not done: `deploy/deploy.sh` was not re-run end to end with the new build. It only needs `dist/apps/api/main.js` and `dist/apps/chatbot/index.html`, which both exist.

## Oxlint migration

Done 2026-11-14: linting moved from ESLint (`@nx/eslint:lint`) to Oxlint 1.93.0, installed as a dev dependency with an exact version. `@nx/oxlint` was **not** added: its first release is 23.2.0 and it depends on `@nx/js`, `@nx/devkit` and `@nx/eslint-plugin` at the same version, so it cannot be installed on Nx 17.2.8. Add it after the Nx upgrade. `@nx/js` is not a linter and cannot be removed: `@nx/oxlint`, `@nx/vite` and `@nx/react` all depend on it.

- `.oxlintrc.json` at the repo root: correctness rules plus the `typescript`, `react`, `jsx-a11y` and `import` plugins, set up to match what the old Nx presets enforced.
  - `prefer-const` and `react/rules-of-hooks` are on as errors; `react/exhaustive-deps` and `jsx-a11y/anchor-has-content` are warnings; `no-unused-vars` ignores rest siblings. These are the rules that were enforced before. `react/rules-of-hooks` is not in Oxlint's default set, so it had to be enabled explicitly.
  - Two Oxlint rules the old setup never had, `jsx-a11y/prefer-tag-over-role` and `jsx-a11y/control-has-associated-label`, are off. Turn them on if you want the stricter checks.
- Each of the five projects (`api`, `chatbot`, `ui`, `api-e2e`, `chatbot-e2e`) now has `lint` running `oxlint -c .oxlintrc.json {projectRoot}`.
- The old ESLint run moved to a `lint-boundaries` target in each project. ESLint now has exactly one active rule, `@nx/enforce-module-boundaries`, because Oxlint has no equivalent. The root `.eslintrc.json` sets `@typescript-eslint/parser` itself (the `@nx/typescript` preset used to), and the `@nx/react` preset was removed from the chatbot and ui configs. `apps/chatbot-e2e` still also extends `plugin:playwright/recommended`, since Oxlint has no Playwright plugin.

Checked with the cache off:

- Findings match the old ESLint run exactly. `api`: 6 errors (unused imports and variables, and a `prefer-const`, in `lookup.it.ts` and `lookup.spec.ts`). `ui`: 1 error (`StoryObj` unused) and 2 `anchor-has-content` warnings. The other three projects are clean. These findings existed before and were not fixed.
- `lint-boundaries` passes in all five projects. The rule was checked for real: a relative import across projects is reported as an error, and an alias import is not.
- `hooks`, `helpers`, `specifications` and `services` have no lint target. Oxlint was run on them directly and found nothing.

Things to decide or watch:

- `lint-boundaries` is not part of any script or of `.github/workflows/ci.yml`, so nothing runs it automatically. `nx affected -t lint` now runs Oxlint only. The rule is also nearly a no-op in practice, because the dependency constraint is `*` to `*`; it still catches relative cross-project imports and circular dependencies.
- ESLint packages no longer referenced by any config, and so candidates for removal: `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-jsx-a11y`, `eslint-plugin-import` and `eslint-config-prettier`. They were not removed. `eslint-plugin-playwright`, `eslint`, `@nx/eslint`, `@nx/eslint-plugin` and `@typescript-eslint/parser` are still used.
- Oxlint is a newer tool with a different rule set. It was matched to the old results on this codebase, but it is not rule-for-rule identical to typescript-eslint.

### Leftovers to delete by hand

These were not removed because agents are not allowed to run `rm` here:

- `v1.0.0-alpha.2/skaffold.yaml` (deploy no longer uses Kubernetes; its `.vscode/launch.json` entry is already removed)
- `v1.0.0-alpha.2/apps/api/jest.config.ts`
- `v1.0.0-alpha.2/libs/helpers/jest.config.ts`
- `v1.0.0-alpha.2/apps/api-e2e/jest.config.ts`
- `v1.0.0-alpha.2/jest.config.js` (an old root config with `preset: 'ts-jest'`; nothing references it)
- `v1.0.0-alpha.2/apps/api/webpack.config.js` and `v1.0.0-alpha.2/libs/services/webpack.config.js` (they `require('@nx/webpack')`, which is no longer installed; nothing uses them)
- `v1.0.0-alpha.2/dist/baseline/` (four build folders made while comparing the webpack and Vite bundles; `dist/` is gitignored)
- Six orphaned `ts-loader`, `fork-ts-checker` and `@nx/webpack` folders under `v1.0.0-alpha.2/node_modules/.pnpm/`. They are not in the lockfile and nothing links to them. `pnpm prune` did not remove them; a clean reinstall will.

## Sources

- Nx: [TypeScript 7 guide](https://nx.dev/docs/technologies/typescript/guides/typescript-7) and [knowledge base](https://nx.dev/docs/kb/typescript-7)
- Microsoft: [Announcing TypeScript 7.0](https://devblogs.microsoft.com/typescript/announcing-typescript-7.0/)
- Third-party guides (secondhand): [OpenReplay](https://blog.openreplay.com/upgrade-typescript-7/), [Syncfusion](https://www.syncfusion.com/blogs/post/typescript-7-upgrade-guide)
