import type { ReactNode } from 'react';

export const generateStaticParams = () => [
  { id: 'board-1' },
  { id: 'board-2' },
  { id: 'board-3' },
];

export default function BoardLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
