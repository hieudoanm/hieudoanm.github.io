'use client';

import Link from 'next/link';
import { FC, ReactNode } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { ThemeToggle } from '@/components/atoms/ThemeToggle';

export interface ToolTemplateProps {
  title: string;
  children: ReactNode;
}

export const ToolTemplate: FC<ToolTemplateProps> = ({ title, children }) => (
  <div className="flex min-h-dvh flex-col">
    <header className="border-base-300 bg-base-100 sticky top-0 z-10 border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="btn btn-ghost btn-sm">
            <FiArrowLeft className="text-lg" />
          </Link>
          <h1 className="text-sm font-bold">{title}</h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
    <main className="mx-auto w-full max-w-2xl flex-1 p-6">{children}</main>
  </div>
);
