'use client';

import { FC, useState, useMemo } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

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
    <ModalWrapper onClose={onClose} title="Word Counter">
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
    </ModalWrapper>
  );
};
TextWordCountModal.displayName = 'TextWordCountModal';
