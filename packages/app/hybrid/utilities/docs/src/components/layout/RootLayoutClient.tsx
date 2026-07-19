'use client';

import { Breadcrumb } from '@hieudoanm.github.io/components/organisms/layout/Breadcrumb';
import { useSWRegister } from '@hieudoanm.github.io/hooks/useSWRegister';
import { FC, ReactNode } from 'react';

const RootLayoutClient: FC<{ children: ReactNode }> = ({ children }) => {
  useSWRegister();

  return (
    <div className="bg-base-100 text-base-content flex h-screen w-screen flex-col overflow-hidden">
      <main className="flex-1 overflow-y-auto">{children}</main>
      <Breadcrumb />
    </div>
  );
};

export default RootLayoutClient;
