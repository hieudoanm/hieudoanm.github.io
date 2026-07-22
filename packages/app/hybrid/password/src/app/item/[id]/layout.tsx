import type { ReactNode } from 'react';

export const generateStaticParams = () =>
  Array.from({ length: 10 }, (_, i) => ({ id: `v-${i + 1}` }));

export default function ItemLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
