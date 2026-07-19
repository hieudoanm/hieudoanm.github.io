'use client';

import { RandomColor } from '@/components/organisms/RandomColor';
import { NextPage } from 'next';

const RandomPage: NextPage = () => (
  <main className="bg-base-100 flex min-h-dvh flex-col items-center justify-center gap-6 px-4 py-12 sm:px-6">
    <div className="text-center">
      <h1 className="text-primary font-serif text-3xl font-bold tracking-tight">
        Random Color
      </h1>
      <p className="text-base-content/60 mt-1 text-sm">
        Generate and lock a random color
      </p>
    </div>
    <RandomColor />
  </main>
);

export default RandomPage;
