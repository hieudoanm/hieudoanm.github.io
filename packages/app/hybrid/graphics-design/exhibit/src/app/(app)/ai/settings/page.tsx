'use client';

import { type FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Providers } from '@/providers/ai/Providers';
import { useData } from '@/providers/ai/DataProvider';
import { PageTransition } from '@/components/ai/templates/PageTransition';
import { FiArrowLeft } from 'react-icons/fi';
import { AI_MODELS, SYSTEM_PROMPT_TEMPLATES } from '@/data/ai/models';

const SettingsContent: FC = () => {
  const router = useRouter();
  const { settings, updateSettings } = useData();
  const [defaultModel, setDefaultModel] = useState(settings.defaultModel);
  const [systemPrompt, setSystemPrompt] = useState(settings.systemPrompt);

  const handleSave = async () => {
    await updateSettings({ defaultModel, systemPrompt });
  };

  const handleApplyTemplate = (prompt: string) => {
    setSystemPrompt(prompt);
  };

  return (
    <div className="bg-base-100 min-h-screen">
      <header className="border-base-300 bg-base-100 sticky top-0 z-10 flex items-center gap-3 border-b px-4 py-3">
        <button
          type="button"
          onClick={() => router.push('/ai')}
          className="btn btn-neutral btn-sm btn-circle">
          <FiArrowLeft className="size-4" />
        </button>
        <h1 className="text-lg font-bold">Settings</h1>
      </header>

      <PageTransition>
        <div className="mx-auto max-w-2xl space-y-8 p-6">
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
