'use client';

import { FC, useState } from 'react';
import { ImageToolConfig } from '../config';
import { downloadBlob, loadImage } from '../lib/canvas';

export const HouseTool: FC<{ config: ImageToolConfig }> = ({ config }) => {
  const [name, setName] = useState('House');
  const letters = name.trim().toUpperCase().split('');

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setName('House')}
          className="btn btn-outline btn-xs font-mono tracking-widest">
          Reset
        </button>
      </div>

      <input
        type="text"
        placeholder="e.g. Gregory"
        className="input input-bordered input-sm w-full font-mono tracking-widest"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div className="bg-base-200 border-base-300 flex min-h-36 items-center justify-center overflow-x-auto rounded-xl border p-6">
        {letters.length > 0 && (
          <div className="relative flex items-center">
            {letters.map((letter, index) => {
              const isFirst = index === 0;
              return (
                <div
                  key={`${letter}-${index}`}
                  className={`border-base-content flex h-16 w-16 items-center justify-center text-4xl font-normal ${
                    isFirst ? 'mr-3 border-4' : 'border-b-4'
                  }`}>
                  {letter}
                </div>
              );
            })}
            <div className="absolute -right-12 -bottom-1 font-mono text-xs font-normal tracking-[0.3em] opacity-60">
              M.D.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
HouseTool.displayName = 'HouseTool';
