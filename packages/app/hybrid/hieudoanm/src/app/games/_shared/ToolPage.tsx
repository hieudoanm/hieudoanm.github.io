'use client';

import { ComponentType, FC } from 'react';
import { useRouter } from 'next/navigation';

interface ToolPageProps {
  Component: ComponentType<{ onClose: () => void }>;
  backPath: string;
}

export const ToolPage: FC<ToolPageProps> = ({ Component, backPath }) => {
  const router = useRouter();

  return <Component onClose={() => router.push(backPath)} />;
};
