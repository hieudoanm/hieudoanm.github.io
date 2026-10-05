import type { ReactNode } from 'react';

/** Label/value row used by every read-only panel: manifest, config, settings. */
export const KeyValue = ({
  items,
}: {
  items: { label: string; value: ReactNode }[];
}) => (
  <dl className="grid grid-cols-[minmax(9rem,auto)_1fr] gap-x-4 gap-y-1 text-sm">
    {items.map((item) => (
      <div key={item.label} className="contents">
        <dt className="text-base-content/60">{item.label}</dt>
        <dd className="font-mono text-xs break-all">{item.value}</dd>
      </div>
    ))}
  </dl>
);
