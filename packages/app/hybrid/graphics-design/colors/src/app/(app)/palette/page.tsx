'use client';

import { PaletteGenerator } from '@/components/organisms/PaletteGenerator';
import { NextPage } from 'next';

const PalettePage: NextPage = () => (
  <main className="bg-base-100 flex min-h-dvh flex-col items-center justify-center gap-6 px-4 py-12 sm:px-6">
    <div className="text-center">
      <h1 className="text-primary font-serif text-3xl font-bold tracking-tight">
        Palette Generator
      </h1>
      <p className="text-base-content/60 mt-1 text-sm">
        Roll a random harmonious color palette
      </p>
    </div>
    <PaletteGenerator />
  </main>
);

export default PalettePage;
