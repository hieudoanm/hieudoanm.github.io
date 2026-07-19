'use client';

import { FC, ReactNode } from 'react';
import { FiBookOpen } from 'react-icons/fi';

export const TheoryNote: FC<{ title: string; children: ReactNode }> = ({
  title,
  children,
}) => (
  <aside className="border-primary/40 bg-primary/5 mt-5 rounded-xl border border-dashed p-4">
    <h3 className="text-primary flex items-center gap-2 text-xs font-semibold tracking-wide uppercase">
      <FiBookOpen className="shrink-0" />
      {title}
    </h3>
    <div className="text-base-content/70 mt-2 text-xs leading-relaxed">
      {children}
    </div>
  </aside>
);
TheoryNote.displayName = 'TheoryNote';
