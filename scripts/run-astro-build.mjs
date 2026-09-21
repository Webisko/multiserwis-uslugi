import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';

const target = process.argv[2] || 'preview';
const isStaging = target === 'staging';
const isProduction = target === 'production';
const mode = isStaging || isProduction ? 'production' : 'preview';
const env = { ...process.env };

if (!env.SITE_ENVIRONMENT) {
  env.SITE_ENVIRONMENT = mode;
}

if (!env.PUBLIC_SITE_URL) {
  if (isStaging) {
    env.PUBLIC_SITE_URL = 'https://multiserwis-uslugi.webisko.pl';
  } else if (isProduction) {
    env.PUBLIC_SITE_URL = 'https://multiserwis.example.invalid';
  } else {
    env.PUBLIC_SITE_URL = 'https://webisko.github.io';
  }
}

if (!env.PUBLIC_SITE_BASE_PATH) {
  env.PUBLIC_SITE_BASE_PATH = isStaging || isProduction ? '/' : '/multiserwis-uslugi';
}

const astroCliCandidates = [
  resolve(process.cwd(), 'node_modules', 'astro', 'bin', 'astro.mjs'),
  resolve(process.cwd(), 'node_modules', 'astro', 'astro.js'),
];
const astroCli = astroCliCandidates.find(existsSync) || astroCliCandidates[0];
const result = spawnSync(process.execPath, [astroCli, 'build'], {
  stdio: 'inherit',
  env,
});

process.exit(result.status ?? 1);