import { FC, ReactNode } from 'react';

export interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  ariaLabel: string;
  testid: string;
  children: ReactNode;
}

export const SelectField: FC<SelectFieldProps> = ({
  label,
  value,
  onChange,
  ariaLabel,
  testid,
  children,
}) => (
  <div className="flex flex-wrap items-center gap-2">
    <span className="text-base-content/50 w-20 shrink-0 text-xs font-medium">
      {label}
    </span>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      data-testid={testid}
      aria-label={ariaLabel}
      className="select select-bordered select-sm">
      {children}
    </select>
  </div>
);

SelectField.displayName = 'SelectField';
