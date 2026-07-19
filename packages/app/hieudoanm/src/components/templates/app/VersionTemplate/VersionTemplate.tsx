import { FC, useState } from 'react';

export const VersionTemplate: FC<{
  version: string;
}> = ({ version }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(version);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const [year, month, day, hh, mm, ss] = version.split('.');
  const hasSegments = year && month && day;

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-6 py-24"
      style={{
        backgroundColor: '#000000',
        color: '#f5f5f5',
      }}>
      <p
        className="mb-6 text-xs tracking-[0.2em] uppercase"
        style={{ color: '#8a8a8a' }}>
        Current deployment
      </p>

      <h1
        className="mb-3 text-4xl font-light tracking-tight"
        style={{ fontFamily: 'monospace' }}>
        App Version
      </h1>

      <p
        className="mb-10 max-w-sm text-center text-sm"
        style={{ color: '#8a8a8a' }}>
        Build version of the current deployment
      </p>

      <div
        className="mb-8 w-full max-w-lg rounded-2xl border p-6"
        style={{
          backgroundColor: '#0a0a0a',
          borderColor: '#1f1f1f',
        }}>
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
          <p
            className="text-center font-mono text-xl font-bold break-all"
            style={{ color: '#ff0030' }}>
            {version}
          </p>
        )}
      </div>

      <div className="mb-8 flex flex-wrap justify-center gap-3">
        <button
          onClick={copy}
          className="rounded-full px-6 py-2 text-sm font-medium transition-colors"
          style={{
            backgroundColor: copied ? '#00c853' : '#ff0030',
            color: '#f5f5f5',
          }}>
          {copied ? 'Copied' : 'Copy version'}
        </button>
        <button
          className="rounded-full px-6 py-2 text-sm font-medium transition-colors"
          style={{
            backgroundColor: '#1f1f1f',
            color: '#f5f5f5',
          }}
          onClick={copy}>
          {version}
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <span
          className="rounded-full border px-3 py-1 text-xs"
          style={{
            borderColor: '#1f1f1f',
            color: '#8a8a8a',
          }}>
          Format: YYYY.MM.DD.hh.mm.ss
        </span>
        <span
          className="rounded-full px-3 py-1 text-xs"
          style={{
            backgroundColor: '#1f1f1f',
            color: '#f5f5f5',
          }}>
          Stable
        </span>
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
      className="font-mono text-2xl font-bold"
      style={{ color: primary ? '#ff0030' : '#f5f5f5' }}>
      {value}
    </span>
    <span
      className="mt-1 text-[10px] tracking-widest uppercase"
      style={{ color: '#8a8a8a' }}>
      {label}
    </span>
  </div>
);

const Dot: FC = () => (
  <span className="font-mono text-xl" style={{ color: '#8a8a8a' }}>
    .
  </span>
);

VersionTemplate.displayName = 'VersionTemplate';
