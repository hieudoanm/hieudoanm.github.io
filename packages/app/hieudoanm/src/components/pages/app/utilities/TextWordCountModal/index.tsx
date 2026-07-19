'use client';

import { FC, useState, useMemo } from 'react';
import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';

export const TextWordCountModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [inputText, setInputText] = useState('');

  const wordCounts = useMemo(() => {
    if (!inputText) return null;
    const chars = inputText.length;
    const words = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
    const lines = inputText.split('\n').length;
    const sentences = inputText.split(/[.!?]+/).filter((s) => s.trim()).length;
    return { chars, words, lines, sentences };
  }, [inputText]);

  return (
    <FullScreen centered onClose={onClose} title="Word Counter">
      <div className="rounded-box border-base-300 bg-base-200 border p-4">
        <div className="flex flex-col gap-4">
          <textarea
            className="textarea textarea-bordered min-h-[150px]"
            placeholder="Paste text to analyze..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          {wordCounts && (
            <div className="bg-base-200 space-y-1 rounded p-4 text-sm">
              <div>
                Characters: <strong>{wordCounts.chars}</strong>
              </div>
              <div>
                Words: <strong>{wordCounts.words}</strong>
              </div>
              <div>
                Lines: <strong>{wordCounts.lines}</strong>
              </div>
              <div>
                Sentences: <strong>{wordCounts.sentences}</strong>
              </div>
            </div>
          )}
        </div>
      </div>
    </FullScreen>
  );
};
TextWordCountModal.displayName = 'TextWordCountModal';
