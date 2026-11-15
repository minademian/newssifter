/// <reference types='vitest' />
import { cpSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig, Plugin } from 'vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

// Production bundles every dependency into main.js, so the server needs no node_modules.
// Development keeps them external (faster rebuilds). Nx sets the configuration name.
const isDevelopment =
  process.env.NX_TASK_TARGET_CONFIGURATION === 'development';

// main.ts serves src/assets from next to main.js, so the folder has to ship with the bundle.
const copyAssets = (): Plugin => {
  let outDir = '';
  return {
    name: 'copy-api-assets',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      cpSync(resolve(__dirname, 'src/assets'), resolve(outDir, 'assets'), {
        recursive: true,
      });
    },
  };
};

export default defineConfig(({ command }) => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/api',

  plugins: [nxViteTsPaths(), copyAssets()],

  ssr: {
    target: 'node',
    // Only when building: vitest reads this too, and bundling its own internals breaks it.
    noExternal: command === 'build' && !isDevelopment ? true : undefined,
  },

  build: {
    outDir: '../../dist/apps/api',
    emptyOutDir: true,
    ssr: 'src/main.ts',
    target: 'node18',
    sourcemap: isDevelopment,
    rollupOptions: {
      output: {
        format: 'cjs',
        entryFileNames: 'main.js',
      },
    },
  },

  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/apps/api',
      provider: 'v8',
    },
  },
}));
