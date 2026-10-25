export async function readJsonSnapshot<T>(relativePath: string): Promise<T | null> {
  if (!import.meta.env.SSR) {
    return null;
  }

  try {
    const [{ readFile }, { resolve }] = await Promise.all([
      import('node:fs/promises'),
      import('node:path'),
    ]);
    const fullPath = resolve(process.cwd(), relativePath);
    const raw = await readFile(fullPath, 'utf-8');

    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}
