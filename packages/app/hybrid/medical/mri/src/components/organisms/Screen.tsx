'use client';

import type { ReactNode } from 'react';

import { AppShell } from '@/components/organisms/AppShell';
import { PROTOTYPE_NOTICE } from '@/content/navigation';

const Notice = () => (
  <div className="border-base-300 bg-base-200 text-base-content/70 border-b px-6 py-1 text-xs">
    {PROTOTYPE_NOTICE}
  </div>
);

/** Every screen lives inside the shell; the notice states what the build can do. */
export const Screen = ({ children }: { children: ReactNode }) => (
  <AppShell>
    <Notice />
    <div className="pt-6">{children}</div>
  </AppShell>
);
