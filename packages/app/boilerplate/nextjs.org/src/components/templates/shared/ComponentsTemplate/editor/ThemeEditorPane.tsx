'use client';

import { FC } from 'react';
import { ThemeConfig } from './ThemeConfig';
import { ColorsPane } from './colors/ColorsPane';
import { ThemeSwatches } from './presets/ThemeSwatches';
import { SettingsPane } from './settings/SettingsPane';

export const ThemeEditorPane: FC<{
  tab: string;
  config: ThemeConfig;
  onChange: (config: ThemeConfig) => void;
  selectedTheme: string;
  onThemeSelect: (theme: string) => void;
  onUpdateColor: (key: string, value: string) => void;
  onUpdate: (partial: Partial<ThemeConfig>) => void;
  onUpdateShape: (key: string, value: string) => void;
  cssCopied: boolean;
  onCopyCSS: () => void;
}> = ({
  tab,
  config,
  onChange,
  selectedTheme,
  onThemeSelect,
  onUpdateColor,
  onUpdate,
  onUpdateShape,
  cssCopied,
  onCopyCSS,
}) => {
  if (tab === 'Presets') {
    return (
      <div className="flex-1 overflow-y-auto p-5">
        <ThemeSwatches
          selectedTheme={selectedTheme}
          onThemeSelect={onThemeSelect}
          onChange={onChange}
        />
      </div>
    );
  }
  if (tab === 'Colors') {
    return (
      <ColorsPane
        config={config}
        onUpdateColor={onUpdateColor}
        onUpdateName={(name) => onUpdate({ name })}
      />
    );
  }
  return (
    <SettingsPane
      config={config}
      onUpdate={onUpdate}
      onUpdateShape={onUpdateShape}
      cssCopied={cssCopied}
      onCopyCSS={onCopyCSS}
    />
  );
};

ThemeEditorPane.displayName = 'ThemeEditorPane';
