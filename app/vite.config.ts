import { defineConfig } from 'vite';

const repoBase = '/bibel-korpus/';

export default defineConfig({
  base: repoBase,
  build: {
    outDir: '../docs',
    emptyOutDir: true,
  },
});

