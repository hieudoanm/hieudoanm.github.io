import type { FC } from 'react';
import { useState } from 'react';

export const VersionTemplate: FC<{ version: string }> = ({ version }) => {
  const [copied, setCopied] = useState(false);

  const copy = async (): Promise<void> => {
    await navigator.clipboard.writeText(version);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const [year, month, day, hh, mm, ss] = version.split('.');
  const hasSegments = year && month && day;

  return (
    <div className="flex h-full flex-col items-center justify-center px-6 py-24">
      <p className="text-base-content/50 mb-6 text-xs tracking-[0.2em] uppercase">
        Current deployment
      </p>

      <h1 className="mb-3 font-mono text-4xl font-light tracking-tight">
        Casino Version
      </h1>

      <p className="text-base-content/50 mb-10 max-w-sm text-center text-sm">
        Build version of the current deployment
      </p>

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
          <p className="text-base-content text-center font-mono text-xl font-bold break-all">
            {version}
          </p>
        )}
      </div>

      <div className="mb-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={copy}
          data-testid="copy-version"
          className={`btn btn-sm rounded-full ${copied ? 'btn-success' : 'btn-primary'}`}>
          {copied ? 'Copied' : 'Copy version'}
        </button>
        <button
          type="button"
          className="btn btn-outline btn-sm rounded-full"
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
    <span className="text-base-content/50 mt-1 text-[10px] tracking-widest uppercase">
      {label}
    </span>
  </div>
);

const Dot: FC = () => (
  <span className="text-base-content/50 font-mono text-xl">.</span>
);

VersionTemplate.displayName = 'VersionTemplate';
