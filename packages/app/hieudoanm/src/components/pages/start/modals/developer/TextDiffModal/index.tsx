'use client';

import { FC, useState, useMemo } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { computeDiff } from './utils';

export const TextDiffModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [textA, setTextA] = useState('');
  const [textB, setTextB] = useState('');

  const diffResult = useMemo(() => {
    if (!textA && !textB) return '';
    return computeDiff(textA, textB);
  }, [textA, textB]);

  return (
    <ModalWrapper onClose={onClose} title="Text Diff">
      <div className="flex flex-col gap-4">
        <textarea
          className="textarea textarea-bordered min-h-[100px] font-mono text-sm"
          placeholder="Original text..."
          value={textA}
          onChange={(e) => setTextA(e.target.value)}
        />
        <textarea
          className="textarea textarea-bordered min-h-[100px] font-mono text-sm"
          placeholder="Modified text..."
          value={textB}
          onChange={(e) => setTextB(e.target.value)}
        />
        {diffResult && (
          <pre className="bg-base-200 overflow-x-auto rounded p-4 font-mono text-sm">
            {diffResult}
          </pre>
        )}
      </div>
    </ModalWrapper>
  );
};
TextDiffModal.displayName = 'TextDiffModal';
