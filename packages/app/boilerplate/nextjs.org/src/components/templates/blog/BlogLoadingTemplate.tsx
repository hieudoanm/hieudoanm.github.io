import { FC } from 'react';

export const BlogLoadingTemplate: FC = () => (
  <div className="flex min-h-dvh flex-col">
    <header className="border-base-300 bg-base-100 sticky top-0 z-10 border-b px-6 py-4">
      <div className="flex flex-col gap-2">
        <div className="bg-base-300 h-5 w-20 animate-pulse rounded" />
        <div className="bg-base-300 h-3 w-32 animate-pulse rounded" />
      </div>
    </header>
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 p-6">
      <div className="flex flex-wrap gap-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-base-300 h-8 w-20 animate-pulse rounded-lg"
          />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="border-base-content/10 bg-base-200 rounded-xl border p-6">
            <div className="flex flex-wrap gap-1.5">
              <div className="bg-base-300 h-4 w-12 animate-pulse rounded-full" />
              <div className="bg-base-300 h-4 w-16 animate-pulse rounded-full" />
            </div>
            <div className="bg-base-300 mt-3 h-5 w-3/4 animate-pulse rounded" />
            <div className="bg-base-300 mt-2 h-4 w-full animate-pulse rounded" />
            <div className="bg-base-300 mt-1 h-4 w-2/3 animate-pulse rounded" />
            <div className="mt-4 flex items-center gap-2">
              <div className="bg-base-300 h-3 w-3 animate-pulse rounded" />
              <div className="bg-base-300 h-3 w-24 animate-pulse rounded" />
            </div>
          </div>
        ))}
      </div>
    </main>
  </div>
);

BlogLoadingTemplate.displayName = 'BlogLoadingTemplate';
