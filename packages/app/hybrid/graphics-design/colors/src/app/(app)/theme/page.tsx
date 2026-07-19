'use client';

import { ColorsTool } from '@/components/organisms/ColorsTool';
import { NextPage } from 'next';

const ThemePage: NextPage = () => (
  <main className="bg-base-100 flex min-h-dvh flex-col items-center justify-center gap-6 px-4 py-12 sm:px-6">
    <div className="text-center">
      <h1 className="text-primary font-serif text-3xl font-bold tracking-tight">
        Theme Colors
      </h1>
      <p className="text-base-content/60 mt-1 text-sm">
        Browse the active theme palette roles
      </p>
    </div>
    <ColorsTool />
  </main>
);

export default ThemePage;
