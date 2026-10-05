import type { ReactNode } from 'react';

export const Stat = ({
  label,
  value,
  hint,
  tone = 'neutral',
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  tone?: 'neutral' | 'success' | 'warning' | 'error' | 'info';
}) => {
  const toneClass = {
    neutral: '',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error',
    info: 'text-info',
  }[tone];
  return (
    <div className="rounded-box border-base-300 border px-4 py-3">
      <p className="text-base-content/60 text-xs tracking-wide uppercase">
        {label}
      </p>
      <p className={`text-2xl font-semibold tabular-nums ${toneClass}`}>
        {value}
      </p>
      {hint && <p className="text-base-content/60 text-xs">{hint}</p>}
    </div>
  );
};
