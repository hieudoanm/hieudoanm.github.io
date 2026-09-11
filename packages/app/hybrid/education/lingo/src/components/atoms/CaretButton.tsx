import { FC } from 'react';
import { PiCaretDown, PiCaretUp } from 'react-icons/pi';

export interface CaretButtonProps {
  open: boolean;
  onClick: () => void;
  label: string;
}

export const CaretButton: FC<CaretButtonProps> = ({ open, onClick, label }) => (
  <button
    type="button"
    onClick={onClick}
    data-testid="advanced-toggle"
    className="btn btn-ghost btn-xs text-base-content/50 hover:text-base-content/70 gap-1 self-start">
    {open ? (
      <PiCaretUp className="text-xs" />
    ) : (
      <PiCaretDown className="text-xs" />
    )}
    {label}
  </button>
);

CaretButton.displayName = 'CaretButton';
