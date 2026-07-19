'use client';

import { useRouter } from 'next/navigation';
import { FC, ReactNode } from 'react';

export const ToolPage: FC<{ title: string; children: ReactNode }> = ({
  title,
  children,
}) => {
  const router = useRouter();
  return (
    <div className="flex h-screen flex-col">
      <header className="border-base-300 bg-base-200 flex h-14 shrink-0 items-center justify-between border-b px-4">
        <div className="flex items-center gap-3">
          <button
            className="btn btn-ghost btn-sm gap-1"
            onClick={() => router.push('/')}
            aria-label="Back to chess tools">
            <span className="text-lg leading-none">‹</span>
            <span>Chess</span>
          </button>
          <span className="divider divider-horizontal mx-0" />
          <h1 className="text-sm font-semibold">{title}</h1>
        </div>
      </header>
      <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>
    </div>
  );
};
ToolPage.displayName = 'ToolPage';
