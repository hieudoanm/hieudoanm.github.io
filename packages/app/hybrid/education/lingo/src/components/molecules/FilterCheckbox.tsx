import { FC } from 'react';
import { PiPercent } from 'react-icons/pi';

export interface FilterCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

export const FilterCheckbox: FC<FilterCheckboxProps> = ({
  checked,
  onChange,
  label,
}) => (
  <label className="flex cursor-pointer items-center gap-2 text-xs">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      data-testid="nobel-filter"
      className="checkbox checkbox-sm"
    />
    <PiPercent className="text-base-content/60" />
    {label}
  </label>
);

FilterCheckbox.displayName = 'FilterCheckbox';
