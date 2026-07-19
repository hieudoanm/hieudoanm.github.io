'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { ColorConverter } from '@/games/arts/colors/converter';
import { DEFAULT_BASE_COLOR } from '@/games/arts/colors/shared/ColorsTool';

const ConverterPage: NextPage = () => (
  <main className="flex min-h-dvh flex-col items-center gap-8 p-8">
    <Link href="/colors/models" className="btn btn-ghost btn-sm self-start">
      ← Back to Color Models
    </Link>
    <h1 className="text-primary font-serif text-4xl font-bold tracking-tight">
      Color Converter
    </h1>
    <div className="w-full max-w-3xl">
      <ColorConverter
        baseColor={DEFAULT_BASE_COLOR}
        onColorChange={() => undefined}
      />
    </div>
  </main>
);

export default ConverterPage;
