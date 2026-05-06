import { existsSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

function tryResolveFromCommand(command, args) {
  const result = spawnSync(command, args, {
    encoding: 'utf-8',
    shell: false,
  });

  if (result.status !== 0) {
    return null;
  }

  const firstLine = result.stdout
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find(Boolean);

  return firstLine || null;
}

function tryResolveWingetPhp() {
  if (process.platform !== 'win32' || !process.env.LOCALAPPDATA) {
    return null;
  }

  const packagesDir = join(process.env.LOCALAPPDATA, 'Microsoft', 'WinGet', 'Packages');

  if (!existsSync(packagesDir)) {
    return null;
  }

  const candidates = readdirSync(packagesDir)
    .filter((entry) => entry.startsWith('PHP.PHP.'))
    .sort()
    .reverse();

  for (const candidate of candidates) {
    const phpPath = join(packagesDir, candidate, 'php.exe');

    if (existsSync(phpPath)) {
      return phpPath;
    }
  }

  return null;
}

function resolvePhpBinary() {
  const explicitPhp = process.env.PHP_BIN?.trim();

  if (explicitPhp) {
    return explicitPhp;
  }

  const commandResolved = process.platform === 'win32'
    ? tryResolveFromCommand('where.exe', ['php'])
    : tryResolveFromCommand('which', ['php']);

  if (commandResolved) {
    return commandResolved;
  }

  const wingetResolved = tryResolveWingetPhp();

  if (wingetResolved) {
    return wingetResolved;
  }

  return 'php';
}

const phpBinary = resolvePhpBinary();
const backendCwd = resolve(process.cwd(), 'backend');
const phpIni = resolve(process.cwd(), '.tools', 'php.ini');
const phpArgs = ['-c', phpIni, ...process.argv.slice(2)];

const result = spawnSync(phpBinary, phpArgs, {
  cwd: backendCwd,
  stdio: 'inherit',
  shell: false,
});

process.exit(result.status ?? 1);