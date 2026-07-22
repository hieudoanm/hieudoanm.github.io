import type { ReactNode } from 'react';

export const generateStaticParams = () => [
  { id: 'db-1' },
  { id: 'db-2' },
  { id: 'db-3' },
];

export default function DbLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
