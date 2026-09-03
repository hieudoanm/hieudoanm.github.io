'use client';

import { PageTransition } from '@/components/templates/PageTransition';
import { type FC, useEffect, useState } from 'react';
import { FiArrowLeft, FiMoon, FiSun } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const THEMES: readonly string[] = ['api-light', 'api-dark'];

const THEME_KEY = 'api-client:theme';
const HISTORY_KEY = 'api-client:history';
const DRAFT_KEY = 'api-client:draft';

const SettingsPage: FC = () => {
  const router = useRouter();
  const [theme, setTheme] = useState('api-light');

  useEffect(() => {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) {
      setTheme(stored);
      document.documentElement.setAttribute('data-theme', stored);
    }
  }, []);

  const applyTheme = (next: string): void => {
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(THEME_KEY, next);
  };

  const clearHistory = (): void => {
    localStorage.removeItem(HISTORY_KEY);
    localStorage.removeItem(DRAFT_KEY);
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

      <PageTransition>
        <div className="mx-auto max-w-2xl space-y-8 p-6">
          <section className="card bg-base-200 card-body">
            <h2 className="card-title flex items-center gap-2">
              {theme === 'api-dark' ? (<FiMoon className="size-4" />) : (<FiSun className="size-4" />)}
              Appearance
            </h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Theme</span>
              </label>
              <select
                value={theme}
                onChange={(e) => applyTheme(e.target.value)}
                className="select select-bordered w-full">
                {THEMES.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </section>

          <section className="card bg-base-200 card-body">
            <h2 className="card-title">Data</h2>
            <p className="text-base-content/60 text-sm">
              Request history and the saved draft are stored locally in your
              browser.
            </p>
            <button
              type="button"
              onClick={clearHistory}
              className="btn btn-outline btn-sm w-fit">
              Clear history and draft
            </button>
          </section>
        </div>
      </PageTransition>
    </div>
  );
};

export default SettingsPage;
