import type { FC } from 'react';
import Link from 'next/link';
import { FiChevronLeft } from 'react-icons/fi';
import { Badge } from '@/components/atoms/Badge';

interface InfoRow {
  label: string;
  value: string;
}

export interface AboutTemplateProps {
  name: string;
  description: string;
  version: string;
  items: InfoRow[];
}

export const AboutTemplate: FC<AboutTemplateProps> = ({
  name,
  description,
  version,
  items,
}) => (
  <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-6 p-8 text-center">
    <div className="flex w-full items-center gap-4">
      <Link href="/" className="btn btn-ghost btn-sm">
        <FiChevronLeft /> Home
      </Link>
    </div>

    <p className="text-base-content/50 text-xs tracking-[0.2em] uppercase">
      About
    </p>

    <h1 className="text-3xl font-bold">{name}</h1>

    <p className="text-base-content/70 max-w-md text-sm">{description}</p>

    <div className="border-base-content/10 bg-base-200 w-full max-w-lg rounded-2xl border p-6">
      <div className="flex flex-col gap-4">
        {items.map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between">
            <span className="text-base-content/50 text-sm">{label}</span>
            <span className="text-base-content font-mono text-sm font-bold">
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>

    <div className="flex flex-wrap items-center justify-center gap-3">
      <span className="border-base-content/20 text-base-content/50 rounded-full border px-3 py-1 text-xs">
        {version}
      </span>
      <Badge variant="neutral">Stable</Badge>
    </div>
  </main>
);
