import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const mode = process.argv[2] === 'production' ? 'production' : 'preview';
const env = { ...process.env };

if (!env.SITE_ENVIRONMENT) {
  env.SITE_ENVIRONMENT = mode;
}

if (!env.PUBLIC_SITE_URL) {
  env.PUBLIC_SITE_URL =
    mode === 'production' ? 'https://multiserwis.example.invalid' : 'https://webisko.github.io';
}

if (!env.PUBLIC_SITE_BASE_PATH) {
  env.PUBLIC_SITE_BASE_PATH = mode === 'production' ? '/' : '/multiserwis-uslugi';
}

const astroCli = resolve(process.cwd(), 'node_modules', 'astro', 'astro.js');
const result = spawnSync(process.execPath, [astroCli, 'build'], {
  stdio: 'inherit',
  env,
});

process.exit(result.status ?? 1);