'use client';

import { FoodSchedule } from '@/components/organisms/schedule';
import { NextPage } from 'next';

const SchedulePage: NextPage = () => (
  <main className="bg-base-100 flex min-h-dvh flex-col items-center justify-center gap-6 px-4 py-12 sm:px-6">
    <div className="text-center">
      <h1 className="text-primary font-serif text-3xl font-bold tracking-tight">
        Sheldon&apos;s Food Schedule
      </h1>
      <p className="text-base-content/60 mt-1 text-sm">
        A week of meals, dictate by a rigorous schedule
      </p>
    </div>
    <FoodSchedule />
  </main>
);

export default SchedulePage;
