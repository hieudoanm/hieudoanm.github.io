'use client';

import { FC, useState, useEffect } from 'react';
import {
  ThemeEditor,
  buildThemeStyles,
  DEFAULT_CONFIG,
  ThemeConfig,
} from './editor';
import { PreviewTabs } from './demo/PreviewTabs';
import { ComponentsDemo } from './demo/components/ComponentsDemo';

export const ComponentsTemplate: FC = () => {
  const [selectedTheme, setSelectedTheme] = useState('night');
  const [config, setConfig] = useState<ThemeConfig>(DEFAULT_CONFIG);

  useEffect(() => {
    document.documentElement.dataset.theme = selectedTheme;
  }, [selectedTheme]);

  return (
    <div className="bg-base-100 text-base-content flex h-dvh flex-col font-sans">
      <div
        className="flex min-h-0 flex-1 overflow-hidden"
        style={buildThemeStyles(config)}>
        <ThemeEditor
          config={config}
          onChange={setConfig}
          selectedTheme={selectedTheme}
          onThemeSelect={setSelectedTheme}
        />
        <PreviewTabs colors={config.colors}>
          <ComponentsDemo />
        </PreviewTabs>
      </div>
    </div>
  );
};
ComponentsTemplate.displayName = 'ComponentsTemplate';
