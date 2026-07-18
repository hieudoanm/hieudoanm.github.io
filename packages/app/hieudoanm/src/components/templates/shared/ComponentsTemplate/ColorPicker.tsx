import { FC } from 'react';

export const ColorPicker: FC<{
  label: string;
  value: string;
  onChange: (hex: string) => void;
}> = ({ label, value, onChange }) => (
  <div className="flex items-center gap-3 py-1">
    <input
      type="color"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-7 w-7 cursor-pointer rounded border-0 bg-transparent p-0"
    />
    <span className="text-base-content flex-1 text-xs">{label}</span>
    <span className="text-base-content/40 font-mono text-[10px] uppercase">
      {value}
    </span>
  </div>
);
ColorPicker.displayName = 'ColorPicker';
