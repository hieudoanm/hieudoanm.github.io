'use client';

import { ColorConverter } from '@/components/organisms/ColorConverter';
import { DEFAULT_BASE_COLOR } from '@/components/organisms/ColorsTool';
import { NextPage } from 'next';

const ColorConverterPage: NextPage = () => (
  <main className="bg-base-100 flex min-h-dvh flex-col items-center justify-center gap-6 px-4 py-12 sm:px-6">
    <div className="text-center">
      <h1 className="text-primary font-serif text-3xl font-bold tracking-tight">
        Color Converter
      </h1>
      <p className="text-base-content/60 mt-1 text-sm">
        Convert between HEX, RGB, HSL, HSV and CMYK
      </p>
    </div>
    <ColorConverter
      baseColor={DEFAULT_BASE_COLOR}
      onColorChange={() => undefined}
    />
  </main>
);

export default ColorConverterPage;
