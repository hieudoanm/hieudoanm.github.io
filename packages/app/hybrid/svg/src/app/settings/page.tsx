'use client';

import { type FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Providers } from '@/providers/Providers';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';
import { FiArrowLeft, FiSave } from 'react-icons/fi';

const SettingsContent: FC = () => {
  const router = useRouter();
  const { addToast } = useToast();
  const { settings, updateSettings } = useData();
  const [theme, setTheme] = useState(settings.theme);
  const [gridSize, setGridSize] = useState(settings.gridSize);
  const [snapToGrid, setSnapToGrid] = useState(settings.snapToGrid);
  const [showGrid, setShowGrid] = useState(settings.showGrid);
  const [showRulers, setShowRulers] = useState(settings.showRulers);
  const [exportFormat, setExportFormat] = useState(settings.exportFormat);
  const [exportScale, setExportScale] = useState(settings.exportScale);

  const handleSave = async () => {
    await updateSettings({
      theme,
      gridSize,
      snapToGrid,
      showGrid,
      showRulers,
      exportFormat,
      exportScale,
    });
    document.documentElement.setAttribute('data-theme', theme);
    addToast('Settings saved', 'success');
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

      <div className="mx-auto max-w-2xl space-y-8 p-6">
        <section className="card bg-base-200 card-body">
          <h2 className="card-title">Appearance</h2>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Theme</span>
            </label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="select select-bordered w-full">
              <option value="night">Night (Dark)</option>
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              <option value="cupcake">Cupcake</option>
              <option value="emerald">Emerald</option>
              <option value="corporate">Corporate</option>
              <option value="synthwave">Synthwave</option>
              <option value="retro">Retro</option>
              <option value="cyberpunk">Cyberpunk</option>
              <option value="valentine">Valentine</option>
              <option value="halloween">Halloween</option>
              <option value="garden">Garden</option>
              <option value="forest">Forest</option>
              <option value="aqua">Aqua</option>
              <option value="lofi">Lo-Fi</option>
              <option value="pastel">Pastel</option>
              <option value="fantasy">Fantasy</option>
              <option value="wireframe">Wireframe</option>
              <option value="black">Black</option>
              <option value="luxury">Luxury</option>
              <option value="dracula">Dracula</option>
              <option value="cmyk">CMYK</option>
              <option value="autumn">Autumn</option>
              <option value="business">Business</option>
              <option value="acid">Acid</option>
              <option value="lemonade">Lemonade</option>
              <option value="coffee">Coffee</option>
              <option value="winter">Winter</option>
              <option value="dim">Dim</option>
              <option value="nord">Nord</option>
              <option value="sunset">Sunset</option>
            </select>
          </div>
        </section>

        <section className="card bg-base-200 card-body">
          <h2 className="card-title">Canvas</h2>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Grid Size (px)</span>
            </label>
            <input
              type="number"
              value={gridSize}
              onChange={(e) => setGridSize(Number(e.target.value))}
              min={5}
              max={100}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-4">
              <input
                type="checkbox"
                checked={snapToGrid}
                onChange={(e) => setSnapToGrid(e.target.checked)}
                className="checkbox checkbox-primary"
              />
              <span className="label-text">Snap to grid</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-4">
              <input
                type="checkbox"
                checked={showGrid}
                onChange={(e) => setShowGrid(e.target.checked)}
                className="checkbox checkbox-primary"
              />
              <span className="label-text">Show grid</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-4">
              <input
                type="checkbox"
                checked={showRulers}
                onChange={(e) => setShowRulers(e.target.checked)}
                className="checkbox checkbox-primary"
              />
              <span className="label-text">Show rulers</span>
            </label>
          </div>
        </section>

        <section className="card bg-base-200 card-body">
          <h2 className="card-title">Export</h2>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Default Format</span>
            </label>
            <select
              value={exportFormat}
              onChange={(e) =>
                setExportFormat(e.target.value as 'svg' | 'png' | 'jpeg')
              }
              className="select select-bordered w-full">
              <option value="svg">SVG</option>
              <option value="png">PNG</option>
              <option value="jpeg">JPEG</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Export Scale</span>
            </label>
            <select
              value={exportScale}
              onChange={(e) => setExportScale(Number(e.target.value))}
              className="select select-bordered w-full">
              <option value={1}>1x</option>
              <option value={2}>2x</option>
              <option value={4}>4x</option>
            </select>
          </div>
        </section>

        <button
          type="button"
          onClick={handleSave}
          className="btn btn-primary w-full">
          <FiSave className="size-4" />
          Save Settings
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
