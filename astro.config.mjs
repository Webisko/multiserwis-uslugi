import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://webisko.github.io',
  base: '/multiserwis-uslugi',
  integrations: [react(), tailwind()],
  server: {
    port: 3000,
    host: '0.0.0.0'
  }
});
