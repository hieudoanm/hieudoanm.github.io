'use client';

import { TintShadeTone } from '@/components/organisms/TintShadeTone';
import { DEFAULT_BASE_COLOR } from '@/components/organisms/ColorsTool';
import { NextPage } from 'next';

const TintShadeTonePage: NextPage = () => (
  <main className="bg-base-100 flex min-h-dvh flex-col items-center justify-center gap-6 px-4 py-12 sm:px-6">
    <div className="text-center">
      <h1 className="text-primary font-serif text-3xl font-bold tracking-tight">
        Tint, Shade & Tone
      </h1>
      <p className="text-base-content/60 mt-1 text-sm">
        Lighten, darken or mute a color in steps
      </p>
    </div>
    <TintShadeTone baseColor={DEFAULT_BASE_COLOR} />
  </main>
);

export default TintShadeTonePage;
