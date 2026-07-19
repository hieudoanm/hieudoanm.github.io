import { FC } from 'react';

export interface FilterChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
  testid?: string;
}

export const FilterChip: FC<FilterChipProps> = ({
  label,
  active,
  onClick,
  testid,
}) => (
  <button
    type="button"
    onClick={onClick}
    data-testid={testid}
    className={`badge badge-outline badge-sm cursor-pointer transition-colors ${
      active ? 'badge-primary' : 'badge-neutral hover:badge-primary'
    }`}>
    {label}
  </button>
);

FilterChip.displayName = 'FilterChip';
