import type { FC } from 'react';
import { useState } from 'react';

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
    <div className="bg-neutral text-neutral-content flex min-h-screen flex-col items-center justify-center px-6 py-24">
      <p className="text-neutral-content/50 mb-6 text-xs tracking-[0.2em] uppercase">
        Current deployment
      </p>

      <h1 className="mb-3 text-4xl font-light tracking-tight">
        API Client Version
      </h1>

      <p className="text-neutral-content/50 mb-10 max-w-sm text-center text-sm">
        Build version of the current deployment
      </p>

      <div className="border-neutral-content/10 bg-neutral mb-8 w-full max-w-lg rounded-2xl border p-6">
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
          <p className="text-primary text-center font-mono text-xl font-bold break-all">
            {version}
          </p>
        )}
      </div>

      <div className="mb-8 flex flex-wrap justify-center gap-3">
        <button
          onClick={copy}
          className={`btn btn-sm rounded-full transition-colors ${
            copied ? 'btn-success' : 'btn-primary'
          }`}>
          {copied ? 'Copied' : 'Copy version'}
        </button>
        <button onClick={copy} className="btn btn-outline btn-sm rounded-full">
          {version}
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <span className="badge badge-outline text-neutral-content/50 rounded-full text-xs">
          Format: YYYY.MM.DD.hh.mm.ss
        </span>
        <span className="badge badge-neutral rounded-full text-xs">Stable</span>
      </div>
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
      className={`font-mono text-2xl font-bold ${
        primary ? 'text-primary' : 'text-neutral-content'
      }`}>
      {value}
    </span>
    <span className="text-neutral-content/50 mt-1 text-[10px] tracking-widest uppercase">
      {label}
    </span>
  </div>
);

const Dot: FC = () => (
  <span className="text-neutral-content/50 font-mono text-xl">.</span>
);

VersionTemplate.displayName = 'VersionTemplate';
