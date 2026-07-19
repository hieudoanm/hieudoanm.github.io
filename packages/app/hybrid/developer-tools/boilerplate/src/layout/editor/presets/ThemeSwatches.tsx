import { FC } from 'react';
import { ThemeConfig } from '../ThemeConfig';
import { ALL_THEMES, PRESET_MAP } from '../theme-data';

export const ThemeSwatches: FC<{
  selectedTheme: string;
  onThemeSelect: (theme: string) => void;
  onChange: (config: ThemeConfig) => void;
}> = ({ selectedTheme, onThemeSelect, onChange }) => (
  <div className="grid grid-cols-3 gap-1">
    {ALL_THEMES.map((theme) => {
      const preset = PRESET_MAP[theme.value];
      return (
        <div
          key={theme.value}
          data-theme={theme.value}
          className={`border-base-content/10 hover:border-base-content/30 flex cursor-pointer flex-col gap-0 rounded-lg border p-1.5 transition-colors ${
            selectedTheme === theme.value ? 'border-base-content/50' : ''
          }`}
          onClick={() => {
            onThemeSelect(theme.value);
            if (preset) onChange(preset);
          }}>
          <div className="flex w-full gap-0.5">
            <div className="bg-primary h-2 flex-1 rounded-l-sm" />
            <div className="bg-secondary h-2 flex-1" />
            <div className="bg-accent h-2 flex-1" />
            <div className="bg-base-100 h-2 flex-1 rounded-r-sm" />
          </div>
          <span className="text-[10px]">{theme.label}</span>
        </div>
      );
    })}
  </div>
);
ThemeSwatches.displayName = 'ThemeSwatches';
