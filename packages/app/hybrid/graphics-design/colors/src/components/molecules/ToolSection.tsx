'use client';

import { FC, ReactNode } from 'react';

export const ToolSection: FC<{
  description: string;
  children: ReactNode;
}> = ({ description, children }) => (
  <section className="border-base-300 bg-base-200 rounded-2xl border">
    <header className="border-base-300 border-b px-5 py-4">
      <p className="text-base-content/50 text-sm">{description}</p>
    </header>
    <div className="p-5">{children}</div>
  </section>
);
ToolSection.displayName = 'ToolSection';
