'use client';

import { ColorMixer } from '@/components/organisms/ColorMixer';
import { DEFAULT_BASE_COLOR } from '@/components/organisms/ColorsTool';
import { NextPage } from 'next';

const ColorMixerPage: NextPage = () => (
  <main className="bg-base-100 flex min-h-dvh flex-col items-center justify-center gap-6 px-4 py-12 sm:px-6">
    <div className="text-center">
      <h1 className="text-primary font-serif text-3xl font-bold tracking-tight">
        Color Mixer
      </h1>
      <p className="text-base-content/60 mt-1 text-sm">
        Blend two colors by weight
      </p>
    </div>
    <ColorMixer baseColor={DEFAULT_BASE_COLOR} />
  </main>
);

export default ColorMixerPage;
