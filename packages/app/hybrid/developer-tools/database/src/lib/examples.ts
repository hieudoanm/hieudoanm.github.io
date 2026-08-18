export interface ExampleDatabase {
  slug: string;
  title: string;
  description: string;
  tableCount: number;
  size: number;
}

interface ExamplesManifest {
  generatedAt: string;
  examples: ExampleDatabase[];
}

export const EXAMPLES_BASE = '/examples/sqlite';

export const listExamples = async (): Promise<ExampleDatabase[]> => {
  try {
    const res = await fetch(`${EXAMPLES_BASE}/index.json`);
    if (!res.ok) return [];
    const manifest: ExamplesManifest = await res.json();
    return manifest.examples ?? [];
  } catch {
    return [];
  }
};

export const fetchExampleBytes = async (slug: string): Promise<Uint8Array> => {
  const res = await fetch(`${EXAMPLES_BASE}/${slug}.sqlite`);
  if (!res.ok) throw new Error(`Failed to load example "${slug}"`);
  const buffer = await res.arrayBuffer();
  return new Uint8Array(buffer);
};
