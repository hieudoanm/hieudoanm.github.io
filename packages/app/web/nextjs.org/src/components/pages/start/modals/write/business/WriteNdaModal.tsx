'use client';

import { FC, useState, useCallback } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { trpcClient } from '@hieudoanm.github.io/utils/trpc';

const SYSTEM_PROMPT =
  'You are a legal document writer. Draft a Non-Disclosure Agreement based on the context provided.';

export const WriteNdaModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = useCallback(async () => {
    if (!input.trim()) return;
    setLoading(true);
    setOutput('');
    try {
      const result = await trpcClient.openrouter.generate.mutate({
        messages: [
          { role: 'ai', text: SYSTEM_PROMPT },
          { role: 'user', text: input },
        ],
        model: 'openrouter/free',
      });
      setOutput(result.text);
    } catch (err) {
      setOutput(
        'Error: ' + (err instanceof Error ? err.message : 'Unknown error')
      );
    }
    setLoading(false);
  }, [input]);

  return (
    <ModalWrapper onClose={onClose} title="NDA">
      <div className="flex flex-col gap-4">
        <textarea
          className="textarea textarea-bordered min-h-[120px]"
          placeholder="Describe the context for the NDA..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="btn btn-primary btn-sm"
          disabled={!input.trim() || loading}
          onClick={handleGenerate}>
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            'Generate NDA'
          )}
        </button>
        {output && (
          <div className="bg-base-200 rounded p-4">
            <pre className="text-sm whitespace-pre-wrap">{output}</pre>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
};
WriteNdaModal.displayName = 'WriteNdaModal';
