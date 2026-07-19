import { FC } from 'react';

export const ColorPicker: FC<{
  label: string;
  value: string;
  onChange: (hex: string) => void;
}> = ({ label, value, onChange }) => (
  <div className="border-base-content/10 flex flex-col gap-1 rounded-md border p-1.5">
    <input
      type="color"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-6 w-full cursor-pointer appearance-none rounded-sm border-0 bg-transparent p-0"
    />
    <span className="text-base-content/60 truncate text-[9px] font-medium uppercase">
      {label}
    </span>
    <span className="text-base-content/40 truncate font-mono text-[9px] uppercase">
      {value}
    </span>
  </div>
);
ColorPicker.displayName = 'ColorPicker';
