'use client';

import { type FC, useState } from 'react';
import Link from 'next/link';
import { FiCheck, FiChevronLeft, FiCopy } from 'react-icons/fi';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';

export interface VersionTemplateProps {
  version: string;
}

export const VersionTemplate: FC<VersionTemplateProps> = ({ version }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(version);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const [year, month, day, hh, mm, ss] = version.split('.');
  const hasSegments = year && month && day;

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-6 p-8 text-center">
      <div className="flex w-full items-center gap-4">
        <Link href="/" className="btn btn-ghost btn-sm">
          <FiChevronLeft /> Home
        </Link>
      </div>

      <p className="text-base-content/50 text-xs tracking-[0.2em] uppercase">
        Current deployment
      </p>

      <h1 className="text-3xl font-bold">Version</h1>

      <div className="border-base-content/10 bg-base-200 w-full max-w-lg rounded-2xl border p-6">
        {hasSegments ? (
          <div className="flex items-center justify-center">
            <Segment value={year} label="Year" primary />
            <Dot />
            <Segment value={month} label="Month" />
            <Dot />
            <Segment value={day} label="Day" />
            {hh ? (
              <>
                <Dot />
                <Segment value={hh} label="Hour" />
              </>
            ) : null}
            {mm ? (
              <>
                <Dot />
                <Segment value={mm} label="Min" />
              </>
            ) : null}
            {ss ? (
              <>
                <Dot />
                <Segment value={ss} label="Sec" />
              </>
            ) : null}
          </div>
        ) : (
          <p className="text-error font-mono text-xl font-bold break-all">
            {version}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button
          variant={copied ? 'secondary' : 'primary'}
          size="sm"
          onClick={() => void copy()}>
          {copied ? <FiCheck className="mr-1" /> : <FiCopy className="mr-1" />}
          {copied ? 'Copied' : 'Copy version'}
        </Button>
        <Button variant="outline" size="sm" onClick={() => void copy()}>
          {version}
        </Button>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="border-base-content/20 text-base-content/50 rounded-full border px-3 py-1 text-xs">
          Format: YYYY.MM.DD.hh.mm.ss
        </span>
        <Badge variant="neutral">Stable</Badge>
      </div>
    </main>
  );
};

const Segment: FC<{ value: string; label: string; primary?: boolean }> = ({
  value,
  label,
  primary,
}) => (
  <div className="flex flex-col items-center px-4">
    <span
      className={`font-mono text-2xl font-bold ${primary ? 'text-primary' : 'text-base-content'}`}>
      {value}
    </span>
    <span className="text-base-content/50 mt-1 text-xs tracking-[0.2em] uppercase">
      {label}
    </span>
  </div>
);

const Dot: FC = () => (
  <span className="text-base-content/50 font-mono text-xl">.</span>
);
