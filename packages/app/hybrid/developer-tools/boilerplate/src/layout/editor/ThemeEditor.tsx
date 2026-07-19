'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, useState } from 'react';
import { FiDroplet, FiGrid, FiHome, FiMenu, FiSliders } from 'react-icons/fi';
import { ThemeConfig } from './ThemeConfig';
import { generateCSS } from './css-utils';
import { ThemeEditorPane } from './ThemeEditorPane';

const TABS = [
  { id: 'Presets', label: 'Presets', icon: <FiGrid /> },
  { id: 'Theme', label: 'Theme', icon: <FiSliders /> },
] as const;

const NAV_LINKS = [
  { href: '/', label: 'Home', icon: <FiHome /> },
  { href: '/colors', label: 'Colors', icon: <FiDroplet /> },
] as const;

const isActive = (href: string, pathname: string | null): boolean =>
  href === '/' ? pathname === '/' : (pathname?.startsWith(href) ?? false);

export const ThemeEditor: FC<{
  config: ThemeConfig;
  onChange: (config: ThemeConfig) => void;
  selectedTheme: string;
  onThemeSelect: (theme: string) => void;
}> = ({ config, onChange, selectedTheme, onThemeSelect }) => {
  const [tab, setTab] = useState<string>('Theme');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cssCopied, setCssCopied] = useState(false);
  const pathname = usePathname();

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
    <div className="flex shrink-0">
      <div className="bg-base-200 border-base-300 flex w-12 shrink-0 flex-col items-center gap-2 border-r py-2">
        <button
          aria-label={sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
          title={sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
          className={`btn btn-ghost btn-square btn-sm ${
            sidebarOpen ? 'text-primary' : 'text-base-content/60'
          }`}
          onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FiMenu />
        </button>
        {sidebarOpen &&
          TABS.map((t) => (
            <button
              key={t.id}
              aria-label={t.label}
              title={t.label}
              className={`btn btn-ghost btn-square btn-sm ${
                tab === t.id ? 'text-primary' : 'text-base-content/60'
              }`}
              onClick={() => setTab(t.id)}>
              {t.icon}
            </button>
          ))}
        <div className="flex-1" />
        {NAV_LINKS.map((link) => {
          const active = isActive(link.href, pathname);
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-label={link.label}
              title={link.label}
              aria-current={active ? 'page' : undefined}
              className={`btn btn-ghost btn-square btn-sm ${
                active ? 'text-primary' : 'text-base-content/60'
              }`}>
              {link.icon}
            </Link>
          );
        })}
      </div>
      {sidebarOpen && (
        <div className="bg-base-200 border-base-100 flex w-96 shrink-0 flex-col overflow-hidden border-l">
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
