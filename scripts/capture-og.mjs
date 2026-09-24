import { spawnSync } from 'child_process';
import { resolve } from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const templatePath = resolve('scripts', 'og-template.html');
const outputPath = resolve('public', 'og-image.png');
const targetUrl = `file:///${templatePath.replace(/\\/g, '/')}`;

console.log('Capturing OG image with Chrome...');
const result = spawnSync(chromePath, [
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  '--hide-scrollbars',
  '--window-size=1200,630',
  '--virtual-time-budget=4000',
  '--run-all-compositor-stages-before-draw',
  `--screenshot=${outputPath}`,
  targetUrl,
], { stdio: 'inherit' });

console.log('Result status:', result.status);

