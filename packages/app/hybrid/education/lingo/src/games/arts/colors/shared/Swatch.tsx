'use client';

import { FC } from 'react';
import { FiCheck, FiCopy } from 'react-icons/fi';

export const Swatch: FC<{
  hex: string;
  copied: boolean;
  onCopy: (hex: string) => void;
}> = ({ hex, copied, onCopy }) => (
  <button
    type="button"
    aria-label={`Copy ${hex}`}
    className="flex flex-1 flex-col overflow-hidden rounded-lg border"
    onClick={() => onCopy(hex)}>
    <div className="h-20 w-full" style={{ backgroundColor: hex }} />
    <div className="bg-base-100 flex items-center justify-between px-2 py-1.5">
      <span className="text-base-content/70 font-mono text-[10px] uppercase">
        {hex}
      </span>
      {copied ? (
        <FiCheck className="text-success shrink-0" />
      ) : (
        <FiCopy className="text-base-content/40 shrink-0" />
      )}
    </div>
  </button>
);
Swatch.displayName = 'Swatch';
