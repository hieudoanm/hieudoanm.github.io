'use client';

import { FC } from 'react';
import { FiCheck, FiCopy } from 'react-icons/fi';

interface CopyRowProps {
  label: string;
  value: string;
  swatch?: string;
  copied: string | null;
  onCopy: (text: string) => void;
}

export const CopyRow: FC<CopyRowProps> = ({
  label,
  value,
  swatch,
  copied,
  onCopy,
}) => (
  <div className="flex items-center gap-3">
    <span className="text-base-content/50 w-12 text-xs font-medium uppercase">
      {label}
    </span>
    {swatch && (
      <span
        className="border-base-300 h-6 w-6 shrink-0 rounded border"
        style={{ backgroundColor: swatch }}
      />
    )}
    <code className="text-base-content flex-1 text-sm">{value}</code>
    <button
      type="button"
      aria-label={`Copy ${label}`}
      className="btn btn-ghost btn-sm"
      onClick={() => onCopy(value)}>
      {copied === value ? (
        <FiCheck className="text-success" />
      ) : (
        <FiCopy className="text-base-content/50" />
      )}
    </button>
  </div>
);
CopyRow.displayName = 'CopyRow';
