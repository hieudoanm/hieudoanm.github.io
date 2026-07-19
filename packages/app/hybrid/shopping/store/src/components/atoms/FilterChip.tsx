import { type FC } from 'react';

interface FilterChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export const FilterChip: FC<FilterChipProps> = ({ label, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`badge badge-sm cursor-pointer font-mono transition-all ${
      active
        ? 'badge-primary'
        : 'bg-base-300 text-base-content/60 hover:bg-base-200'
    }`}>
    {label}
  </button>
);

FilterChip.displayName = 'FilterChip';
