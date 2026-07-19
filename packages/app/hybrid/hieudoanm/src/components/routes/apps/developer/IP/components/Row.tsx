import { FC } from 'react';

export const Row: FC<{
  label: string;
  value?: string | number;
  mono?: boolean;
}> = ({ label, value, mono }) => (
  <div className="border-base-300 flex items-baseline justify-between gap-4 border-b py-1.5 last:border-0">
    <span className="text-base-content/50 shrink-0 text-xs tracking-wide uppercase">
      {label}
    </span>
    <span
      className={`text-right text-sm break-all ${mono ? 'font-mono' : ''} ${!value ? 'text-base-content/20' : ''}`}>
      {value ?? '—'}
    </span>
  </div>
);
Row.displayName = 'Row';
