import type { FC } from 'react';

export interface ToggleProps {
  checked: boolean;
  disabled?: boolean;
  label: string;
  showLabel?: boolean;
  onChange: (checked: boolean) => void;
}

export const Toggle: FC<ToggleProps> = ({
  checked,
  disabled = false,
  label,
  showLabel = true,
  onChange,
}) => (
  <label className="flex cursor-pointer items-center gap-2">
    <input
      type="checkbox"
      checked={checked}
      disabled={disabled}
      aria-label={label}
      className="toggle toggle-primary toggle-sm"
      onChange={(event) => onChange(event.target.checked)}
    />
    {showLabel ? <span className="text-sm">{label}</span> : null}
  </label>
);
