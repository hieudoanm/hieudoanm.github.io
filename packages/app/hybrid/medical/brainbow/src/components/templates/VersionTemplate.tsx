'use client';

import type { FC } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiCheck, FiCopy } from 'react-icons/fi';

export const VersionTemplate: FC<{ version: string }> = ({ version }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(version);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const [year, month, day, hh, mm, ss] = version.split('.');
  const hasSegments = year && month && day;

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-base-300 bg-base-100 sticky top-0 z-10 border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="btn btn-ghost btn-sm">
              <FiArrowLeft className="text-lg" />
            </Link>
            <h1 className="text-sm font-bold">Brainbow</h1>
          </div>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center gap-6 p-6 text-center">
        <p className="text-base-content/50 text-xs tracking-[0.2em] uppercase">
          Current deployment
        </p>

        <h1>Version</h1>

        <div className="border-base-content/10 bg-base-200 mb-8 w-full max-w-lg rounded-2xl border p-6">
          {hasSegments ? (
            <div className="flex items-center justify-center gap-0">
              <Segment value={year} label="Year" primary />
              <Dot />
              <Segment value={month} label="Month" />
              <Dot />
              <Segment value={day} label="Day" />
              {hh && (
                <>
                  <Dot />
                  <Segment value={hh} label="Hour" />
                </>
              )}
              {mm && (
                <>
                  <Dot />
                  <Segment value={mm} label="Min" />
                </>
              )}
              {ss && (
                <>
                  <Dot />
                  <Segment value={ss} label="Sec" />
                </>
              )}
            </div>
          ) : (
            <p className="text-error font-mono text-xl font-bold break-all">
              {version}
            </p>
          )}
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={copy}
            className={`btn btn-sm rounded-full ${copied ? 'btn-success' : 'btn-primary'}`}>
            {copied ? <FiCheck /> : <FiCopy />}
            {copied ? 'Copied' : 'Copy version'}
          </button>
          <button
            className="btn btn-neutral btn-sm rounded-full"
            onClick={copy}>
            {version}
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <span className="border-base-content/20 text-base-content/50 rounded-full border px-3 py-1 text-xs">
            Format: YYYY.MM.DD.hh.mm.ss
          </span>
          <span className="badge badge-neutral rounded-full">Stable</span>
        </div>
      </main>
    </div>
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

VersionTemplate.displayName = 'VersionTemplate';
