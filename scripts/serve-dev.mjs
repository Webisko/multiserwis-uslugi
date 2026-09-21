import { dev } from 'astro';

const port = Number(process.env.PORT) || 4321;
const host = process.env.HOST || '127.0.0.1';

await dev({
  root: process.cwd(),
  server: {
    host,
    port,
  },
});

console.log(`[serve-dev] Astro dev server is running at http://${host}:${port}`);
