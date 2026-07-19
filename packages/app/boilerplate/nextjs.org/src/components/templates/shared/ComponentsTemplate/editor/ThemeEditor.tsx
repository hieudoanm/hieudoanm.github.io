'use client';

import { FC, useState } from 'react';
import { ThemeConfig } from './ThemeConfig';
import { generateCSS } from './css-utils';
import { ThemeEditorPane } from './ThemeEditorPane';

const TABS = ['Presets', 'Colors', 'Settings'] as const;

export const ThemeEditor: FC<{
  config: ThemeConfig;
  onChange: (config: ThemeConfig) => void;
  selectedTheme: string;
  onThemeSelect: (theme: string) => void;
}> = ({ config, onChange, selectedTheme, onThemeSelect }) => {
  const [tab, setTab] = useState<string>('Colors');
  const [cssCopied, setCssCopied] = useState(false);

  const update = (partial: Partial<ThemeConfig>) =>
    onChange({ ...config, ...partial });
  const updateColor = (key: string, value: string) =>
    update({ colors: { ...config.colors, [key]: value } });
  const updateShape = (key: string, value: string) =>
    update({ shape: { ...config.shape, [key]: value } });

  const copyCSS = async () => {
    await navigator.clipboard.writeText(generateCSS(config));
    setCssCopied(true);
    setTimeout(() => setCssCopied(false), 2000);
  };

  return (
    <div className="bg-base-200 border-base-300 flex h-full w-96 shrink-0 flex-col overflow-hidden border-r">
      <div className="border-base-300 border-b">
        <div className="tabs tabs-box">
          {TABS.map((t) => (
            <button
              key={t}
              className={`tab flex-1 ${tab === t ? 'tab-active' : ''}`}
              onClick={() => setTab(t)}>
              {t}
            </button>
          ))}
        </div>
      </div>
      <ThemeEditorPane
        tab={tab}
        config={config}
        onChange={onChange}
        selectedTheme={selectedTheme}
        onThemeSelect={onThemeSelect}
        onUpdateColor={updateColor}
        onUpdate={update}
        onUpdateShape={updateShape}
        cssCopied={cssCopied}
        onCopyCSS={copyCSS}
      />
    </div>
  );
};
ThemeEditor.displayName = 'ThemeEditor';
