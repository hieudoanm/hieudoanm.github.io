import { FC } from 'react';

export const AuthLoadingTemplate: FC = () => (
  <div className="flex min-h-dvh flex-col">
    <header className="border-base-300 bg-base-100 sticky top-0 z-10 border-b px-6 py-4">
      <div className="bg-base-300 h-5 w-20 animate-pulse rounded" />
    </header>
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-6 p-6">
      <div className="bg-base-300 h-8 w-48 animate-pulse rounded" />
      <div className="border-base-content/10 bg-base-200 w-full rounded-2xl border p-6">
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="bg-base-300 h-3 w-16 animate-pulse rounded" />
              <div className="bg-base-300 h-10 w-full animate-pulse rounded" />
            </div>
          ))}
          <div className="bg-primary/30 mt-2 h-10 w-full animate-pulse rounded-lg" />
        </div>
      </div>
    </main>
  </div>
);

AuthLoadingTemplate.displayName = 'AuthLoadingTemplate';
