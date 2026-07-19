'use client';

import { type FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Providers } from '@/providers/Providers';
import { useData } from '@/providers/DataProvider';
import { PageTransition } from '@/components/templates/PageTransition';
import { FiArrowLeft, FiMoon, FiSun } from 'react-icons/fi';
import { AI_MODELS, SYSTEM_PROMPT_TEMPLATES } from '@/data/models';

const SettingsContent: FC = () => {
  const router = useRouter();
  const { settings, updateSettings } = useData();
  const [theme, setTheme] = useState(settings.theme);
  const [defaultModel, setDefaultModel] = useState(settings.defaultModel);
  const [systemPrompt, setSystemPrompt] = useState(settings.systemPrompt);

  const handleSave = async () => {
    await updateSettings({ theme, defaultModel, systemPrompt });
    document.documentElement.setAttribute('data-theme', theme);
  };

  const handleApplyTemplate = (prompt: string) => {
    setSystemPrompt(prompt);
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
            <h2 className="card-title">AI Model</h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Default Model</span>
              </label>
              <select
                value={defaultModel}
                onChange={(e) => setDefaultModel(e.target.value)}
                className="select select-bordered w-full">
                {AI_MODELS.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name} - {model.description}
                  </option>
                ))}
              </select>
            </div>
          </section>

          <section className="card bg-base-200 card-body">
            <h2 className="card-title">Custom Instructions</h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text">System Prompt</span>
              </label>
              <textarea
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                placeholder="Enter custom instructions..."
                className="textarea textarea-bordered h-32"
              />
            </div>
            <div className="mt-4">
              <h3 className="mb-2 text-sm font-semibold">Templates</h3>
              <div className="flex flex-wrap gap-2">
                {SYSTEM_PROMPT_TEMPLATES.map((template) => (
                  <button
                    key={template.name}
                    type="button"
                    onClick={() => handleApplyTemplate(template.prompt)}
                    className="btn btn-outline btn-sm">
                    {template.name}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <button
            type="button"
            onClick={handleSave}
            className="btn btn-primary w-full">
            Save Settings
          </button>
        </div>
      </PageTransition>
    </div>
  );
};

const SettingsPage: FC = () => (
  <Providers>
    <SettingsContent />
  </Providers>
);

export default SettingsPage;
