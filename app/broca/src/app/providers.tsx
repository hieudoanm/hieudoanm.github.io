'use client';

import { ReactNode } from 'react';

export type ProvidersProperties = { children?: ReactNode };

export const Providers: React.FC<ProvidersProperties> = ({
  children = <></>,
}) => {
  return <>{children}</>;
};
