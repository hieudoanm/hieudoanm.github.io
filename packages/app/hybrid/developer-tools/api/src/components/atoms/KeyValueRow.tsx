'use client';

import { KeyValue } from '@/types/api-client';
import { type FC } from 'react';
import { FiTrash2 } from 'react-icons/fi';

interface KeyValueRowProps {
  row: KeyValue;
  keyPlaceholder?: string;
  valuePlaceholder?: string;
  ariaLabel: string;
  onChange: (patch: Partial<KeyValue>) => void;
  onRemove: () => void;
}

export const KeyValueRow: FC<KeyValueRowProps> = ({
  row,
  keyPlaceholder = 'Key',
  valuePlaceholder = 'Value',
  ariaLabel,
  onChange,
  onRemove,
}) => (
  <div className="flex items-center gap-2">
    <input
      type="checkbox"
      checked={row.enabled}
      onChange={(e) => onChange({ enabled: e.target.checked })}
      aria-label="Toggle row"
      className="checkbox checkbox-xs"
    />
    <input
      type="text"
      value={row.key}
      onChange={(e) => onChange({ key: e.target.value })}
      placeholder={keyPlaceholder}
      aria-label={`${ariaLabel} key`}
      className="input input-bordered input-sm flex-1 font-mono"
    />
    <span className="text-base-content/30">=</span>
    <input
      type="text"
      value={row.value}
      onChange={(e) => onChange({ value: e.target.value })}
      placeholder={valuePlaceholder}
      aria-label={`${ariaLabel} value`}
      className="input input-bordered input-sm flex-1 font-mono"
    />
    <button
      type="button"
      onClick={onRemove}
      aria-label="Remove row"
      className="btn btn-ghost btn-xs btn-square">
      <FiTrash2 className="size-4" />
    </button>
  </div>
);

KeyValueRow.displayName = 'KeyValueRow';
