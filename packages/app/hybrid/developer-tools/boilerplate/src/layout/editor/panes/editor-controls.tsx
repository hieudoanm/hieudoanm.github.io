import { FC } from 'react';
import { RADIUS_OPTIONS } from '../theme-data';

export const RadiusSelector: FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
}> = ({ label, value, onChange }) => (
  <div className="mb-3 last:mb-0">
    <div className="text-base-content/50 mb-2 text-[10px]">{label}</div>
    <div className="flex gap-1">
      {RADIUS_OPTIONS.map((r) => (
        <button
          key={r}
          className={`bg-base-100 h-8 flex-1 border-2 transition-colors ${
            value === r
              ? 'border-primary'
              : 'border-base-300 hover:border-base-content/20'
          }`}
          style={{ borderRadius: r }}
          onClick={() => onChange(r)}
        />
      ))}
    </div>
  </div>
);

export const SizeSlider: FC<{
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}> = ({ label, value, options, onChange }) => {
  const idx = options.indexOf(value);
  return (
    <div className="mb-4 last:mb-0">
      <div className="text-base-content/50 mb-2 flex justify-between text-[10px]">
        <span>{label}</span>
        <span className="font-mono">{value}</span>
      </div>
      <input
        type="range"
        min={0}
        max={options.length - 1}
        value={idx >= 0 ? idx : 1}
        onChange={(e) => onChange(options[Number(e.target.value)])}
        className="range range-xs w-full"
      />
    </div>
  );
};
