import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

function normalizeSiteUrl(siteUrl) {
  return siteUrl.replace(/\/$/, '');
}

function normalizeBasePath(basePath) {
  const trimmed = basePath.trim();

  if (!trimmed || trimmed === '/') {
    return '/';
  }

  return `/${trimmed.replace(/^\/+|\/+$/g, '')}`;
}

const siteEnvironment = process.env.SITE_ENVIRONMENT?.trim() || 'preview';
const siteUrl = normalizeSiteUrl(
  process.env.PUBLIC_SITE_URL?.trim() ||
    (siteEnvironment === 'production' ? 'https://multiserwis.example.invalid' : 'https://webisko.github.io')
);
const basePath = normalizeBasePath(
  process.env.PUBLIC_SITE_BASE_PATH?.trim() ||
    (siteEnvironment === 'production' ? '/' : '/multiserwis-uslugi')
);

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  base: basePath,
  integrations: [react(), tailwind(), sitemap()],
  server: {
    port: 3000,
    host: '0.0.0.0'
  }
});
