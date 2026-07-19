import type { ReactNode } from 'react';

export const generateStaticParams = () => [
  { id: 'doc-logo' },
  { id: 'doc-icons' },
  { id: 'doc-illustration' },
];

export default function EditLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
