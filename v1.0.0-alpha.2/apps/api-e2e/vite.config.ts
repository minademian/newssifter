/// <reference types='vitest' />
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/api-e2e',

  plugins: [nxViteTsPaths()],

  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    globalSetup: [resolve(__dirname, 'src/support/global-setup.ts')],
    setupFiles: [resolve(__dirname, 'src/support/test-setup.ts')],
    passWithNoTests: true,

    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/apps/api-e2e',
      provider: 'v8',
    },
  },
});
