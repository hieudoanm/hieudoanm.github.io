'use client';

import { FC, useState } from 'react';
import { trpcClient } from '@hieudoanm.github.io/utils/trpc';
import { WriteToolConfig } from './config';

interface WriteToolProps {
  config: WriteToolConfig;
}

export const WriteTool: FC<WriteToolProps> = ({ config }) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [configValues, setConfigValues] = useState<Record<string, string>>(
    Object.fromEntries(
      (config.configFields ?? []).map((f) => [
        f.id,
        f.options[0]?.value ?? f.placeholder,
      ])
    )
  );

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult('');
    try {
      let prompt = config.systemPrompt;
      for (const [key, value] of Object.entries(configValues)) {
        prompt = prompt.replace(`{${key}}`, value);
      }
      const result = await trpcClient.openrouter.generate.mutate({
        messages: [
          { role: 'ai', text: prompt },
          { role: 'user', text: input },
        ],
        model: 'openrouter/free',
      });
      setResult(result.text ?? 'No response generated.');
    } catch (err) {
      setResult(
        'Error: ' + (err instanceof Error ? err.message : 'Unknown error')
      );
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-4 p-6">
      <h2 className="text-lg font-medium">{config.title}</h2>
      <p className="text-base-content/50 text-sm">{config.description}</p>
      {config.configFields?.map((field) => (
        <select
          key={field.id}
          className="select select-bordered"
          value={configValues[field.id]}
          onChange={(e) =>
            setConfigValues((prev) => ({
              ...prev,
              [field.id]: e.target.value,
            }))
          }>
          {field.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ))}
      <textarea
        className="textarea textarea-bordered h-32 font-mono text-sm"
        placeholder={config.placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="btn btn-primary"
        disabled={!input.trim() || loading}
        onClick={handleGenerate}>
        {loading ? (
          <>
            <span className="loading loading-spinner" /> Generating...
          </>
        ) : (
          (config.buttonLabel ?? 'Generate')
        )}
      </button>
      {result && (
        <div className="bg-base-200 rounded p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-normal">Result:</span>
            <button
              className="btn btn-ghost btn-xs"
              onClick={() => navigator.clipboard.writeText(result)}>
              Copy
            </button>
          </div>
          <pre className="font-sans text-sm whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  );
};
WriteTool.displayName = 'WriteTool';
