import { FC, ReactNode } from 'react';

export interface FilterRowProps {
  label: string;
  children: ReactNode;
}

export const FilterRow: FC<FilterRowProps> = ({ label, children }) => (
  <div className="flex flex-wrap items-center gap-2">
    <span className="text-base-content/50 w-20 shrink-0 text-xs font-medium">
      {label}
    </span>
    <div className="flex flex-wrap gap-1.5">{children}</div>
  </div>
);

FilterRow.displayName = 'FilterRow';
