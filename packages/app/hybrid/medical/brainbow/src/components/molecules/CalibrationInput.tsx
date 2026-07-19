import type { ChangeEvent, FC } from 'react';

export interface CalibrationInputProps {
  value: number | null;
  onChange: (value: number | null) => void;
}

export const CalibrationInput: FC<CalibrationInputProps> = ({
  value,
  onChange,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const parsed = Number.parseFloat(event.target.value);
    onChange(Number.isFinite(parsed) && parsed > 0 ? parsed : null);
  };

  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm font-medium">Scale</span>
      <input
        type="number"
        min="0"
        step="0.01"
        inputMode="decimal"
        aria-label="Pixels per micron"
        placeholder={'px per \u00b5m'}
        className="input-bordered input input-sm w-full"
        value={value?.toString() ?? ''}
        onChange={handleChange}
      />
      <span className="text-base-content/60 text-xs">
        Set pixels per micron to show a scale bar.
      </span>
    </label>
  );
};
