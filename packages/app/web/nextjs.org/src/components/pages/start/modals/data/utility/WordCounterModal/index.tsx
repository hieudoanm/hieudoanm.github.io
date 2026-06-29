'use client';

import { FC, useState, useMemo } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { Stats, computeStats } from './utils';

export const WordCounterModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [text, setText] = useState('');

  const stats = useMemo(() => computeStats(text), [text]);

  return (
    <ModalWrapper onClose={onClose} title="Word Counter" size="max-w-lg">
      <div className="flex flex-col gap-4">
        <textarea
          className="textarea textarea-bordered h-40 text-sm"
          placeholder="Type or paste text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(
            [
              ['Characters', stats.chars],
              ['No Spaces', stats.charsNoSpace],
              ['Words', stats.words],
              ['Lines', stats.lines],
              ['Sentences', stats.sentences],
              ['Paragraphs', stats.paragraphs],
            ] as const
          ).map(([label, value]) => (
            <div key={label} className="bg-base-200 rounded p-3 text-center">
              <p className="text-base-content/40 text-[10px] font-bold tracking-widest uppercase">
                {label}
              </p>
              <p className="mt-1 font-mono text-xl font-black">{value}</p>
            </div>
          ))}
          <div className="bg-base-200 col-span-2 rounded p-3 text-center">
            <p className="text-base-content/40 text-[10px] font-bold tracking-widest uppercase">
              Reading Time
            </p>
            <p className="mt-1 font-mono text-xl font-black">
              {stats.readingTime}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            className="btn btn-ghost btn-xs"
            onClick={() => setText(text.toLowerCase())}>
            Lowercase
          </button>
          <button
            className="btn btn-ghost btn-xs"
            onClick={() => setText(text.toUpperCase())}>
            Uppercase
          </button>
          <button
            className="btn btn-ghost btn-xs"
            onClick={() => setText(text.replace(/\s+/g, ' ').trim())}>
            Trim Spaces
          </button>
          <button
            className="btn btn-ghost btn-xs ml-auto"
            onClick={() => {
              navigator.clipboard.writeText(text).catch(() => {});
            }}>
            Copy
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};
WordCounterModal.displayName = 'WordCounterModal';
