'use client';

import { FC, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { trpcClient } from '@hieudoanm.github.io/utils/trpc';
import { tryCatch } from '@lodashx/ts';
import { LANGUAGES } from './utils';

export const ImageTranslateModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [input, setInput] = useState('');
  const [targetLang, setTargetLang] = useState('English');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult('');
    const { data } = await tryCatch(
      trpcClient.openrouter.generate.mutate({
        messages: [
          {
            role: 'ai',
            text: `Translate the following text to ${targetLang}. Preserve original meaning and formatting.`,
          },
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
        <p className="text-base-content/60 text-sm">
          Paste text to translate (use OCR tool first for text from images).
        </p>
        <select
          className="select select-bordered w-full"
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}>
          {LANGUAGES.map((lang) => (
            <option key={lang}>{lang}</option>
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
          onClick={handleTranslate}>
          {loading ? (
            <>
              <span className="loading loading-spinner" /> Translating...
            </>
          ) : (
            'Translate'
          )}
        </button>
        {result && (
          <div className="bg-base-200 rounded p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-normal">Translation:</span>
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
ImageTranslateModal.displayName = 'ImageTranslateModal';
