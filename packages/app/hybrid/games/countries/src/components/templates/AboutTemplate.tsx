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
  <div className="flex w-full flex-col items-center gap-6 px-4 py-10 text-center sm:px-6 sm:py-16">
    <p className="text-base-content/50 text-xs tracking-[0.2em] uppercase">
      About
    </p>

    <h1 className="mb-1">{name}</h1>

    <p className="text-base-content/50 w-full text-sm sm:w-3/5">
      {description}
    </p>

    <div className="border-base-content/10 bg-base-200 w-full rounded-2xl border p-4 sm:w-3/4 sm:p-6 md:w-2/3">
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
