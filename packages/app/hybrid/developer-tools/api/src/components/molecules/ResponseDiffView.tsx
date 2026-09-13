'use client';

import { diffLines } from '@/lib/diff';
import { type FC } from 'react';

interface ResponseDiffViewProps {
  previous: string;
  current: string;
}

export const ResponseDiffView: FC<ResponseDiffViewProps> = ({
  previous,
  current,
}) => (
  <div className="bg-base-200 max-h-96 overflow-y-auto rounded-lg p-3 font-mono text-xs">
    {diffLines(previous, current).map((line, index) => (
      <div
        key={index}
        className={`whitespace-pre-wrap ${
          line.type === 'added'
            ? 'text-success'
            : line.type === 'removed'
              ? 'text-error'
              : 'text-base-content/70'
        }`}>
        <span className="mr-2 select-none">
          {line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '}
        </span>
        {line.text}
      </div>
    ))}
  </div>
);

ResponseDiffView.displayName = 'ResponseDiffView';
