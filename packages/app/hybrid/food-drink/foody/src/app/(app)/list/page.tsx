'use client';

import { CuisineList } from '@/components/organisms/list';
import { NextPage } from 'next';

const ListPage: NextPage = () => (
  <main className="bg-base-100 flex min-h-dvh flex-col items-center justify-center gap-6 px-4 py-12 sm:px-6">
    <div className="text-center">
      <h1 className="text-primary font-serif text-3xl font-bold tracking-tight">
        Cuisine List
      </h1>
      <p className="text-base-content/60 mt-1 text-sm">
        Browse and search dishes across the worlds cuisines
      </p>
    </div>
    <CuisineList />
  </main>
);

export default ListPage;
