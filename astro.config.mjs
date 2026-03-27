// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ringonico.github.io',
  base: '/portfolio-site',
  output: 'static',
  build: {
    assets: '_assets',
  },
});
