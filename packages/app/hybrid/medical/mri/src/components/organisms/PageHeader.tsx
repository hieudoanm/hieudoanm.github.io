'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';

import { ErrorNote } from '@/components/atoms/EmptyState';

/**
 * A screen header states what the page is, what it reads, and what the user can
 * do next. Research questions and clinical claims never appear here.
 */
export const PageHeader = ({
  title,
  description,
  actions,
  children,
}: {
  title: string;
  description: string;
  actions?: ReactNode;
  children?: ReactNode;
}) => (
  <header className="border-base-300 mb-6 flex flex-col gap-3 border-b pb-4">
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-base-content/70 max-w-2xl text-sm">{description}</p>
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
    {children}
  </header>
);

export const ProblemList = ({ messages }: { messages: string[] }) => {
  if (messages.length === 0) return null;
  return (
    <ul className="text-warning space-y-1 text-xs">
      {messages.map((message) => (
        <li key={message}>⚠ {message}</li>
      ))}
    </ul>
  );
};

export const SettingsHint = () => (
  <ErrorNote
    message="No project folder is selected yet."
    action={
      <Link className="btn btn-sm btn-primary" href="/settings">
        Open settings
      </Link>
    }
  />
);
