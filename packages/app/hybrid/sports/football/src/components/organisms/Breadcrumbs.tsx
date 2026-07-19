import type { FC } from 'react';

export interface YearOption {
  year: number;
  href: string;
}

export interface Crumb {
  label: string;
  href?: string;
  years?: YearOption[];
}

export const Breadcrumbs: FC<{ crumbs: Crumb[] }> = ({ crumbs }) => (
  <nav className="mb-6 flex items-center gap-2 text-xs text-neutral-500">
    {crumbs.map((crumb, i) => (
      <span key={i} className="flex items-center gap-2">
        {i > 0 && <span className="text-neutral-700">/</span>}
        {crumb.years ? (
          <select
            value={crumb.href ?? ''}
            onChange={(e) => {
              window.location.href = e.target.value;
            }}
            className="cursor-pointer bg-transparent text-neutral-400 transition-colors outline-none hover:text-amber-400">
            {crumb.years.map((y) => (
              <option key={y.year} value={y.href}>
                {y.year}
              </option>
            ))}
          </select>
        ) : crumb.href ? (
          <a
            href={crumb.href}
            className="transition-colors hover:text-amber-400">
            {crumb.label}
          </a>
        ) : (
          <span className="text-neutral-400">{crumb.label}</span>
        )}
      </span>
    ))}
  </nav>
);
