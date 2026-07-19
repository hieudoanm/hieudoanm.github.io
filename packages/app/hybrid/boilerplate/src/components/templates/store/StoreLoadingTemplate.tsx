import { FC } from 'react';

export const StoreLoadingTemplate: FC = () => (
  <div className="flex min-h-dvh flex-col pb-20">
    <header className="border-base-300 bg-base-100 sticky top-0 z-10 border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="bg-base-300 h-5 w-32 animate-pulse rounded" />
        <div className="bg-base-300 h-5 w-5 animate-pulse rounded" />
      </div>
    </header>
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-6">
      <div className="bg-base-300 mb-4 h-10 w-full animate-pulse rounded-xl" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="border-base-content/10 bg-base-200 rounded-xl border p-4">
            <div className="bg-base-300 mb-3 h-32 w-full animate-pulse rounded-lg" />
            <div className="bg-base-300 mb-2 h-4 w-3/4 animate-pulse rounded" />
            <div className="bg-base-300 mb-4 h-3 w-1/2 animate-pulse rounded" />
            <div className="bg-base-300 h-8 w-full animate-pulse rounded-lg" />
          </div>
        ))}
      </div>
    </main>
  </div>
);

StoreLoadingTemplate.displayName = 'StoreLoadingTemplate';
