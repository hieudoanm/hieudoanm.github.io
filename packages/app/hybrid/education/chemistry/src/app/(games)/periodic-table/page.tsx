'use client';

import { PeriodicTable } from '@/components/organisms/PeriodicTable';
import { NextPage } from 'next';

const PeriodicTablePage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Periodic Table
    </h1>
    <PeriodicTable />
  </div>
);

export default PeriodicTablePage;
