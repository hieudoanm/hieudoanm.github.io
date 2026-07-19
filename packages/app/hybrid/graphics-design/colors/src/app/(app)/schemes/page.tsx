'use client';

import { ColorSchemes } from '@/components/organisms/ColorSchemes';
import { DEFAULT_BASE_COLOR } from '@/components/organisms/ColorsTool';
import { NextPage } from 'next';

const ColorSchemesPage: NextPage = () => (
  <main className="bg-base-100 flex min-h-dvh flex-col items-center justify-center gap-6 px-4 py-12 sm:px-6">
    <div className="text-center">
      <h1 className="text-primary font-serif text-3xl font-bold tracking-tight">
        Color Schemes
      </h1>
      <p className="text-base-content/60 mt-1 text-sm">
        Generate complementary, analogous and triadic sets
      </p>
    </div>
    <ColorSchemes baseColor={DEFAULT_BASE_COLOR} />
  </main>
);

export default ColorSchemesPage;
