import type { ReactNode } from 'react';

export const generateStaticParams = () =>
  Array.from({ length: 8 }, (_, i) => ({ id: `doc-${i + 1}` }));

export default function PdfLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
