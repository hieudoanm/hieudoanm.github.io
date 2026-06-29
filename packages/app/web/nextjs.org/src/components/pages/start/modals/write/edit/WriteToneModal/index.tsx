'use client';

import { FC, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { trpcClient } from '@hieudoanm.github.io/utils/trpc';
import { tryCatch } from '@lodashx/ts';
import { TONES, SYSTEM_PROMPT } from './utils';

export const WriteToneModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [tone, setTone] = useState('Professional');

  const getSystemPrompt = (): string => SYSTEM_PROMPT.replace('{tone}', tone);

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
    <ModalWrapper onClose={onClose} title="Tone Rewriter" size="max-w-2xl">
      <div className="flex flex-col gap-4">
        <select
          className="select select-bordered"
          value={tone}
          onChange={(e) => setTone(e.target.value)}>
          {TONES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <textarea
          className="textarea textarea-bordered h-32 font-mono text-sm"
          placeholder="Enter text to rewrite..."
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
            'Generate'
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
WriteToneModal.displayName = 'WriteToneModal';
