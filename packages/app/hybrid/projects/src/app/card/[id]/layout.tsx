import type { ReactNode } from 'react';

export const generateStaticParams = () =>
  Array.from({ length: 14 }, (_, i) => ({ id: `card-${i + 1}` }));

export default function CardLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
