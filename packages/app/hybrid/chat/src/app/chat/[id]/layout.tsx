import type { ReactNode } from 'react';

export const generateStaticParams = () => [
  { id: 'conv-1' },
  { id: 'conv-2' },
  { id: 'conv-3' },
];

export default function ChatLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
