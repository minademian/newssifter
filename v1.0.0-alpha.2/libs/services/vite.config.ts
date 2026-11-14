import { defineConfig } from 'vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/libs/services',

  plugins: [nxViteTsPaths()],

  build: {
    outDir: '../../dist/libs/services',
    emptyOutDir: true,
    ssr: 'index.ts',
    target: 'node18',
    rollupOptions: {
      output: {
        format: 'cjs',
        entryFileNames: 'main.js',
      },
    },
  },
});
