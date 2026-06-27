'use client';

import { FC, useState, useMemo } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

function computeDiff(a: string, b: string): string {
  const linesA = a.split('\n');
  const linesB = b.split('\n');
  const result: string[] = [];
  const maxLen = Math.max(linesA.length, linesB.length);
  for (let i = 0; i < maxLen; i++) {
    if (i >= linesA.length) {
      result.push(`+ ${linesB[i]}`);
    } else if (i >= linesB.length) {
      result.push(`- ${linesA[i]}`);
    } else if (linesA[i] !== linesB[i]) {
      result.push(`- ${linesA[i]}`);
      result.push(`+ ${linesB[i]}`);
    } else {
      result.push(`  ${linesA[i]}`);
    }
  }
  return result.join('\n');
}

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
