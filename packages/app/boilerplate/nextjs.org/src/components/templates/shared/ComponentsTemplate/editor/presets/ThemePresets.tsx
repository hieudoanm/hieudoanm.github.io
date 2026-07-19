import { FC } from 'react';
import { PRESET_LIST, ThemeConfig } from '../ThemeConfig';

export const ThemePresets: FC<{
  onSelect: (config: ThemeConfig) => void;
}> = ({ onSelect }) => (
  <div className="grid grid-cols-3 gap-1">
    {PRESET_LIST.map((preset) => (
      <div
        key={preset.name}
        className="border-base-content/10 hover:border-base-content/30 flex cursor-pointer flex-col gap-0 rounded-lg border p-2 transition-colors"
        onClick={() => onSelect(preset)}>
        <div className="flex w-full gap-0.5">
          <div
            className="h-3 flex-1 rounded-l-sm"
            style={{ backgroundColor: preset.colors.primary }}
          />
          <div
            className="h-3 flex-1"
            style={{ backgroundColor: preset.colors.secondary }}
          />
          <div
            className="h-3 flex-1"
            style={{ backgroundColor: preset.colors.accent }}
          />
          <div
            className="h-3 flex-1 rounded-r-sm"
            style={{ backgroundColor: preset.colors.base100 }}
          />
        </div>
        <span className="text-[10px]">{preset.name}</span>
      </div>
    ))}
  </div>
);
ThemePresets.displayName = 'ThemePresets';
