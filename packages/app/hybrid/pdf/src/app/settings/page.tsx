'use client';

import { type FC, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import { Providers } from '@/providers/Providers';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';

const THEMES = [
  'night',
  'dark',
  'light',
  'cupcake',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'coffee',
  'winter',
  'dim',
  'nord',
  'sunset',
];

const SettingsPage: FC = () => {
  const { settings, updateSettings } = useData();
  const { addToast } = useToast();

  const [theme, setTheme] = useState(settings.theme);
  const [defaultZoom, setDefaultZoom] = useState(settings.defaultZoom);
  const [pageLayout, setPageLayout] = useState(settings.pageLayout);
  const [annotationColor, setAnnotationColor] = useState(
    settings.annotationDefaults.color
  );
  const [strokeWidth, setStrokeWidth] = useState(
    settings.annotationDefaults.strokeWidth
  );

  useEffect(() => {
    setTheme(settings.theme);
    setDefaultZoom(settings.defaultZoom);
    setPageLayout(settings.pageLayout);
    setAnnotationColor(settings.annotationDefaults.color);
    setStrokeWidth(settings.annotationDefaults.strokeWidth);
  }, [settings]);

  const handleSave = useCallback(async () => {
    await updateSettings({
      theme,
      defaultZoom,
      pageLayout,
      annotationDefaults: { color: annotationColor, strokeWidth },
    });
    document.documentElement.setAttribute('data-theme', theme);
    addToast('Settings saved', 'success');
  }, [
    theme,
    defaultZoom,
    pageLayout,
    annotationColor,
    strokeWidth,
    updateSettings,
    addToast,
  ]);

  return (
    <div className="bg-base-200 min-h-screen">
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <div className="mb-6 flex items-center gap-3">
          <Link href="/" className="btn btn-ghost btn-sm btn-circle">
            <FiArrowLeft className="size-4" />
          </Link>
          <h1 className="text-base-content text-2xl font-bold">Settings</h1>
        </div>

        <div className="space-y-6">
          <div className="bg-base-100 rounded-lg p-6">
            <h2 className="text-base-content mb-4 text-lg font-semibold">
              Theme
            </h2>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
              {THEMES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTheme(t)}
                  className={`rounded-lg p-2 text-xs capitalize transition-colors ${
                    theme === t
                      ? 'bg-primary text-primary-content ring-primary ring-2'
                      : 'bg-base-200 hover:bg-base-300 text-base-content'
                  }`}
                  data-theme={t}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-base-100 rounded-lg p-6">
            <h2 className="text-base-content mb-4 text-lg font-semibold">
              Viewer
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-base-content/60 mb-1 text-xs">
                  Default Zoom: {defaultZoom}%
                </label>
                <input
                  type="range"
                  min={25}
                  max={400}
                  step={25}
                  value={defaultZoom}
                  onChange={(e) => setDefaultZoom(Number(e.target.value))}
                  className="range range-sm w-full"
                />
              </div>
              <div>
                <label className="text-base-content/60 mb-1 text-xs">
                  Page Layout
                </label>
                <select
                  value={pageLayout}
                  onChange={(e) =>
                    setPageLayout(e.target.value as 'single' | 'continuous')
                  }
                  className="select select-bordered w-full">
                  <option value="single">Single Page</option>
                  <option value="continuous">Continuous Scroll</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-base-100 rounded-lg p-6">
            <h2 className="text-base-content mb-4 text-lg font-semibold">
              Annotations
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-base-content/60 mb-1 text-xs">
                  Default Color
                </label>
                <input
                  type="color"
                  value={annotationColor}
                  onChange={(e) => setAnnotationColor(e.target.value)}
                  className="input input-sm w-full"
                />
              </div>
              <div>
                <label className="text-base-content/60 mb-1 text-xs">
                  Stroke Width: {strokeWidth}px
                </label>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={strokeWidth}
                  onChange={(e) => setStrokeWidth(Number(e.target.value))}
                  className="range range-sm w-full"
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="btn btn-primary w-full">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

const Settings: FC = () => (
  <Providers>
    <SettingsPage />
  </Providers>
);

export default Settings;
