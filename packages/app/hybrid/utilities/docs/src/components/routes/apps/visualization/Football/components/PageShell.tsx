import type { FC, ReactNode } from 'react';

export const PageShell: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="mx-auto min-h-screen w-full max-w-5xl px-4 pt-7 pb-12">
    {children}
  </div>
);
