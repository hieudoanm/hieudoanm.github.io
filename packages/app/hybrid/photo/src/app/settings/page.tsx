'use client';

import { type FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Providers } from '@/providers/Providers';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';
import { FiArrowLeft, FiSave } from 'react-icons/fi';

const SettingsContent: FC = () => {
  const router = useRouter();
  const { settings, updateSettings } = useData();
  const { addToast } = useToast();
  const [theme, setTheme] = useState(settings.theme);
  const [format, setFormat] = useState(settings.defaultExportFormat);
  const [quality, setQuality] = useState(settings.defaultQuality);

  const handleSave = async () => {
    await updateSettings({
      theme,
      defaultExportFormat: format,
      defaultQuality: quality,
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
      <div className="mx-auto max-w-2xl space-y-6 p-6">
        <div className="card bg-base-200 card-body">
          <h2 className="card-title">Appearance</h2>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="select select-bordered w-full">
            <option value="night">Night</option>
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
        <div className="card bg-base-200 card-body">
          <h2 className="card-title">Export</h2>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="select select-bordered w-full">
            <option value="png">PNG</option>
            <option value="jpeg">JPEG</option>
            <option value="webp">WebP</option>
          </select>
          <label className="label">
            <span className="label-text">Quality: {quality}%</span>
          </label>
          <input
            type="range"
            min={1}
            max={100}
            value={quality}
            onChange={(e) => setQuality(parseInt(e.target.value))}
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
