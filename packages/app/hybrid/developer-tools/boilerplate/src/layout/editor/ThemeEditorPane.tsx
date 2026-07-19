'use client';

import { FC } from 'react';
import { ThemeConfig } from './ThemeConfig';
import { ThemePresets } from './presets/ThemePresets';
import { ThemeSwatches } from './presets/ThemeSwatches';
import { ThemePane } from './panes/ThemePane';

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
        <div className="flex flex-col gap-4">
          <section data-testid="daisyui-themes-section">
            <h4 className="text-base-content/50 mb-2 font-mono text-xs uppercase">
              DaisyUI Themes
            </h4>
            <ThemeSwatches
              selectedTheme={selectedTheme}
              onThemeSelect={onThemeSelect}
              onChange={onChange}
            />
          </section>
          <section data-testid="custom-themes-section">
            <h4 className="text-base-content/50 mb-2 font-mono text-xs uppercase">
              Custom Themes
            </h4>
            <ThemePresets onSelect={onChange} />
          </section>
        </div>
      </div>
    );
  }
  return (
    <ThemePane
      config={config}
      onUpdateColor={onUpdateColor}
      onUpdateName={(name) => onUpdate({ name })}
      onUpdate={onUpdate}
      onUpdateShape={onUpdateShape}
      cssCopied={cssCopied}
      onCopyCSS={onCopyCSS}
    />
  );
};

ThemeEditorPane.displayName = 'ThemeEditorPane';
