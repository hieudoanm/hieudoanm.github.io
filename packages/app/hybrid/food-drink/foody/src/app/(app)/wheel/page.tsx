'use client';

import { CuisineWheel } from '@/components/organisms/wheel';
import { NextPage } from 'next';

const WheelPage: NextPage = () => (
  <main className="bg-base-100 flex min-h-dvh flex-col items-center justify-center gap-6 px-4 py-12 sm:px-6">
    <div className="text-center">
      <h1 className="text-primary font-serif text-3xl font-bold tracking-tight">
        Wheel of Cuisine
      </h1>
      <p className="text-base-content/60 mt-1 text-sm">
        Spin the wheel to let fate pick a country to eat from
      </p>
    </div>
    <CuisineWheel />
  </main>
);

export default WheelPage;
