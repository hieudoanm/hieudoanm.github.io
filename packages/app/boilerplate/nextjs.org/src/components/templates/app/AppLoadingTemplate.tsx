import { FC } from 'react';

export const AppLoadingTemplate: FC = () => (
  <div className="flex min-h-dvh flex-col pb-20">
    <header className="border-base-300 bg-base-100 sticky top-0 z-10 border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="bg-base-300 h-5 w-24 animate-pulse rounded" />
          <div className="bg-base-300 h-3 w-40 animate-pulse rounded" />
        </div>
      </div>
    </header>
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 p-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex flex-col gap-4">
          <div className="bg-base-300 h-4 w-20 animate-pulse rounded" />
          <div className="border-base-content/10 bg-base-200 rounded-2xl border p-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="bg-base-300 h-4 w-32 animate-pulse rounded" />
                <div className="bg-base-300 h-8 w-40 animate-pulse rounded" />
              </div>
              <div className="flex items-center justify-between">
                <div className="bg-base-300 h-4 w-24 animate-pulse rounded" />
                <div className="bg-base-300 h-8 w-40 animate-pulse rounded" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </main>
  </div>
);

AppLoadingTemplate.displayName = 'AppLoadingTemplate';
