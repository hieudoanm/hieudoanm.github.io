import { FC, useState } from 'react';
import { ThemeEditor, buildThemeStyles } from './ThemeEditor';
import { PreviewTabs } from './PreviewTabs';
import { DEFAULT_CONFIG, ThemeConfig } from './ThemePresets';
import { ComponentsDemo } from './ComponentsDemo';

export const ComponentsTemplate: FC = () => {
  const [config, setConfig] = useState<ThemeConfig>(DEFAULT_CONFIG);

  return (
    <div
      className="bg-base-100 text-base-content flex h-screen font-sans"
      data-theme="nothing"
      style={buildThemeStyles(config)}>
      <ThemeEditor config={config} onChange={setConfig} />
      <PreviewTabs colors={config.colors}>
        <ComponentsDemo />
      </PreviewTabs>
    </div>
  );
};
ComponentsTemplate.displayName = 'ComponentsTemplate';
