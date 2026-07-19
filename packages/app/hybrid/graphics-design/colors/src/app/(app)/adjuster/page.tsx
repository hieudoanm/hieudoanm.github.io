'use client';

import { ColorAdjuster } from '@/components/organisms/ColorAdjuster';
import { DEFAULT_BASE_COLOR } from '@/components/organisms/ColorsTool';
import { NextPage } from 'next';

const ColorAdjusterPage: NextPage = () => (
  <main className="bg-base-100 flex min-h-dvh flex-col items-center justify-center gap-6 px-4 py-12 sm:px-6">
    <div className="text-center">
      <h1 className="text-primary font-serif text-3xl font-bold tracking-tight">
        Color Adjuster
      </h1>
      <p className="text-base-content/60 mt-1 text-sm">
        Tune hue, saturation and lightness of any color
      </p>
    </div>
    <ColorAdjuster baseColor={DEFAULT_BASE_COLOR} />
  </main>
);

export default ColorAdjusterPage;
