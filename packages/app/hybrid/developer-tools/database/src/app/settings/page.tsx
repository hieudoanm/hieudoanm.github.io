'use client';

import { type FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Providers } from '@/providers/Providers';
import { useData } from '@/providers/DataProvider';
import { FiArrowLeft, FiSave } from 'react-icons/fi';

const SettingsContent: FC = () => {
  const router = useRouter();
  const { settings, updateSettings } = useData();
  const [theme, setTheme] = useState(settings.theme);
  const [fontSize, setFontSize] = useState(settings.editorFontSize);
  const [timeout, setTimeout_] = useState(settings.queryTimeout);

  const handleSave = async () => {
    await updateSettings({
      theme,
      editorFontSize: fontSize,
      queryTimeout: timeout,
    });
    document.documentElement.setAttribute('data-theme', theme);
  };

  return (
    <div className="bg-base-100 min-h-screen">
      <header className="border-base-300 bg-base-100 sticky top-0 z-10 flex items-center gap-3 border-b px-4 py-3">
        <button
          type="button"
          onClick={() => router.push('/')}
          className="btn btn-neutral btn-sm btn-circle">
          <FiArrowLeft className="size-4" />
        </button>
        <h1 className="text-lg font-bold">Settings</h1>
      </header>
      <div className="mx-auto max-w-2xl space-y-6 p-6">
        <div className="card bg-base-200 card-body">
          <h2 className="card-title">Appearance</h2>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="select select-bordered w-full">
            <option value="database-light">Database Light</option>
            <option value="database-dark">Database Dark</option>
          </select>
        </div>
        <div className="card bg-base-200 card-body">
          <h2 className="card-title">Editor</h2>
          <label className="label">
            <span className="label-text">Font Size: {fontSize}px</span>
          </label>
          <input
            type="range"
            min={10}
            max={24}
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value))}
            className="range range-primary"
          />
          <label className="label">
            <span className="label-text">Query Timeout: {timeout}s</span>
          </label>
          <input
            type="range"
            min={5}
            max={120}
            value={timeout}
            onChange={(e) => setTimeout_(parseInt(e.target.value))}
            className="range range-primary"
          />
        </div>
        <button
          type="button"
          onClick={handleSave}
          className="btn btn-primary w-full">
          <FiSave className="size-4" /> Save Settings
        </button>
      </div>
    </div>
  );
};

const SettingsPage: FC = () => (
  <Providers>
    <SettingsContent />
  </Providers>
);
export default SettingsPage;
