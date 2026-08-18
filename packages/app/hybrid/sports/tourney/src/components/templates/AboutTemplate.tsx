import type { FC } from 'react';

interface InfoRow {
  label: string;
  value: string;
}

export const AboutTemplate: FC<{
  name: string;
  description: string;
  version: string;
  items: InfoRow[];
}> = ({ name, description, version, items }) => (
  <div className="flex min-h-dvh flex-col items-center justify-center px-6 py-24">
    <p className="text-base-content/50 mb-6 text-xs tracking-[0.2em] uppercase">
      About
    </p>

    <h1 className="mb-3">{name}</h1>

    <p className="text-base-content/50 mb-10 max-w-sm text-center text-sm">
      {description}
    </p>

    <div className="border-base-content/10 bg-base-200 container mx-auto mb-8 w-full rounded-2xl border p-6">
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

    <div className="flex flex-wrap justify-center gap-3">
      <span className="border-base-content/20 text-base-content/50 rounded-full border px-3 py-1 text-xs">
        {version}
      </span>
      <span className="badge badge-neutral rounded-full">Stable</span>
    </div>
  </div>
);

AboutTemplate.displayName = 'AboutTemplate';
