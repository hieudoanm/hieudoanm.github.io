import { FC } from 'react';

const SWATCHES: { key: string; label: string }[] = [
  { key: 'primary', label: 'Primary' },
  { key: 'primaryContent', label: 'Primary Content' },
  { key: 'secondary', label: 'Secondary' },
  { key: 'secondaryContent', label: 'Secondary Content' },
  { key: 'accent', label: 'Accent' },
  { key: 'accentContent', label: 'Accent Content' },
  { key: 'neutral', label: 'Neutral' },
  { key: 'neutralContent', label: 'Neutral Content' },
  { key: 'base100', label: 'Base 100' },
  { key: 'base200', label: 'Base 200' },
  { key: 'base300', label: 'Base 300' },
  { key: 'baseContent', label: 'Base Content' },
  { key: 'info', label: 'Info' },
  { key: 'infoContent', label: 'Info Content' },
  { key: 'success', label: 'Success' },
  { key: 'successContent', label: 'Success Content' },
  { key: 'warning', label: 'Warning' },
  { key: 'warningContent', label: 'Warning Content' },
  { key: 'error', label: 'Error' },
  { key: 'errorContent', label: 'Error Content' },
];

export const ColorPalette: FC<{
  colors: Record<string, string>;
}> = ({ colors }) => (
  <div className="grid grid-cols-2 gap-3 p-6 lg:grid-cols-4">
    {SWATCHES.map(({ key, label }) => (
      <div
        key={key}
        className="border-base-300 overflow-hidden rounded-xl border">
        <div className="h-16 w-full" style={{ backgroundColor: colors[key] }} />
        <div className="bg-base-100 p-3">
          <div className="text-base-content text-xs font-medium">{label}</div>
          <div className="text-base-content/40 font-mono text-[10px] uppercase">
            {colors[key]}
          </div>
        </div>
      </div>
    ))}
  </div>
);
ColorPalette.displayName = 'ColorPalette';
