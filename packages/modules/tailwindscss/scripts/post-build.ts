import { stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

type Tier = 'nano' | 'micro' | 'lite' | 'standard' | 'full';

const tiers: Tier[] = ['nano', 'micro', 'lite', 'standard', 'full'];

const filesByTier: Record<Tier, string[]> = {
  nano: [
    'tailwind.nano.css',
    'tailwind.nano.css.map',
    'tailwind.nano.min.css',
    'tailwind.nano.min.css.map',
  ],
  micro: [
    'tailwind.micro.css',
    'tailwind.micro.css.map',
    'tailwind.micro.min.css',
    'tailwind.micro.min.css.map',
  ],
  lite: [
    'tailwind.lite.css',
    'tailwind.lite.css.map',
    'tailwind.lite.min.css',
    'tailwind.lite.min.css.map',
  ],
  standard: [
    'tailwind.standard.css',
    'tailwind.standard.css.map',
    'tailwind.standard.min.css',
    'tailwind.standard.min.css.map',
  ],
  full: [
    'tailwind.css',
    'tailwind.css.map',
    'tailwind.min.css',
    'tailwind.min.css.map',
  ],
};

type TierMetadata = Record<string, { size: number; kb: number }>;
type Metadata = Record<Tier, TierMetadata>;

function toTwoDecimals(value: number): number {
  return Math.round(value * 100) / 100;
}

async function collectTier(tier: Tier): Promise<TierMetadata> {
  const metadata: TierMetadata = {};
  for (const file of filesByTier[tier]) {
    const { size } = await stat(join(process.cwd(), 'dist', tier, file));
    metadata[file] = { size, kb: toTwoDecimals(size / 1024) };
  }
  return metadata;
}

async function main() {
  const distDir = join(process.cwd(), 'dist');
  const metadata = {} as Metadata;

  for (const tier of tiers) {
    metadata[tier] = await collectTier(tier);
  }

  const outputPath = join(distDir, 'metadata.json');
  await writeFile(outputPath, `${JSON.stringify(metadata, null, 2)}\n`);
  console.log(JSON.stringify(metadata, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
