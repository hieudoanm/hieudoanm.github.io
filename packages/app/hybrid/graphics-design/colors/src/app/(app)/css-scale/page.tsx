'use client';

import { CssScaleExporter } from '@/components/organisms/CssScaleExporter';
import { DEFAULT_BASE_COLOR } from '@/components/organisms/ColorsTool';
import { NextPage } from 'next';

const CssScalePage: NextPage = () => (
  <main className="bg-base-100 flex min-h-dvh flex-col items-center justify-center gap-6 px-4 py-12 sm:px-6">
    <div className="text-center">
      <h1 className="text-primary font-serif text-3xl font-bold tracking-tight">
        CSS Scale Exporter
      </h1>
      <p className="text-base-content/60 mt-1 text-sm">
        Export a color scale as CSS custom properties
      </p>
    </div>
    <CssScaleExporter baseColor={DEFAULT_BASE_COLOR} />
  </main>
);

export default CssScalePage;
