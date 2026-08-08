'use client';

import { FC, useState } from 'react';
import {
  FiChevronsLeft,
  FiChevronsRight,
  FiGrid,
  FiMenu,
  FiSliders,
  FiX,
} from 'react-icons/fi';
import { ThemeConfig } from './ThemeConfig';
import { generateCSS } from './css-utils';
import { ThemeEditorPane } from './ThemeEditorPane';

const TABS = [
  { id: 'Presets', label: 'Presets', icon: <FiGrid /> },
  { id: 'Theme', label: 'Theme', icon: <FiSliders /> },
] as const;

export const ThemeEditor: FC<{
  config: ThemeConfig;
  onChange: (config: ThemeConfig) => void;
  selectedTheme: string;
  onThemeSelect: (theme: string) => void;
}> = ({ config, onChange, selectedTheme, onThemeSelect }) => {
  const [tab, setTab] = useState<string>('Theme');
  const [collapsed, setCollapsed] = useState(false);
  const [hidden, setHidden] = useState(false);
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

  if (hidden) {
    return (
      <div className="border-base-300 flex shrink-0 border-r">
        <div className="bg-base-200 flex w-12 shrink-0 flex-col items-center gap-1 py-2">
          <button
            aria-label="Show sidebar"
            title="Show sidebar"
            className="btn btn-ghost btn-square btn-sm"
            onClick={() => setHidden(false)}>
            <FiMenu />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border-base-300 flex shrink-0 border-r">
      <div className="bg-base-200 border-base-300 flex w-12 shrink-0 flex-col items-center gap-1 border-r py-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            aria-label={t.label}
            title={t.label}
            className={`btn btn-ghost btn-square btn-sm ${
              tab === t.id ? 'btn-active' : ''
            }`}
            onClick={() => setTab(t.id)}>
            {t.icon}
          </button>
        ))}
        <div className="flex-1" />
        <button
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="btn btn-ghost btn-square btn-sm"
          onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <FiChevronsRight /> : <FiChevronsLeft />}
        </button>
        <button
          aria-label="Hide sidebar"
          title="Hide sidebar"
          className="btn btn-ghost btn-square btn-sm"
          onClick={() => setHidden(true)}>
          <FiX />
        </button>
      </div>
      {!collapsed && (
        <div className="bg-base-200 border-base-300 flex w-96 shrink-0 flex-col overflow-hidden border-l">
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
      )}
    </div>
  );
};
ThemeEditor.displayName = 'ThemeEditor';
