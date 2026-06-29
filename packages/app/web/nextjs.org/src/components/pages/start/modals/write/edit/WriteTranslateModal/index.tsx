'use client';

import { FC, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { trpcClient } from '@hieudoanm.github.io/utils/trpc';
import { tryCatch } from '@lodashx/ts';
import { LANGUAGES } from './utils';

export const WriteTranslateModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('Vietnamese');

  const getSystemPrompt = (): string =>
    `Translate the following text to ${language}. Detect the source language automatically. Return only the translated text.`;

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult('');
    const { data } = await tryCatch(
      trpcClient.openrouter.generate.mutate({
        messages: [
          { role: 'ai', text: getSystemPrompt() },
          { role: 'user', text: input },
        ],
        model: 'openrouter/free',
      })
    );
    setResult(data?.text ?? 'No response generated.');
    setLoading(false);
  };

  return (
    <ModalWrapper onClose={onClose} title="Translate" size="max-w-2xl">
      <div className="flex flex-col gap-4">
        <select
          className="select select-bordered"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}>
          {LANGUAGES.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
        <textarea
          className="textarea textarea-bordered h-32 font-mono text-sm"
          placeholder="Enter text to translate..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="btn btn-primary"
          disabled={!input.trim() || loading}
          onClick={handleGenerate}>
          {loading ? (
            <>
              <span className="loading loading-spinner" /> Processing...
            </>
          ) : (
            'Process'
          )}
        </button>
        {result && (
          <div className="bg-base-200 rounded p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-bold">Result:</span>
              <button
                className="btn btn-ghost btn-xs"
                onClick={() => navigator.clipboard.writeText(result)}>
                Copy
              </button>
            </div>
            <pre className="font-sans text-sm whitespace-pre-wrap">
              {result}
            </pre>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
};
WriteTranslateModal.displayName = 'WriteTranslateModal';
