import type { ReactNode } from 'react';

export const generateStaticParams = () =>
  Array.from({ length: 10 }, (_, i) => ({ id: `img-${i + 1}` }));

export default function EditLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
