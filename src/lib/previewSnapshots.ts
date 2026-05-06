import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

export async function readJsonSnapshot<T>(relativePath: string): Promise<T | null> {
  try {
    const fullPath = resolve(process.cwd(), relativePath);
    const raw = await readFile(fullPath, 'utf-8');

    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}