'use client';

import { KeyValueRow } from '@/components/atoms/KeyValueRow';
import { newKeyValue } from '@/lib/http';
import { KeyValue } from '@/types/api-client';
import { type FC } from 'react';
import { FiPlus } from 'react-icons/fi';

interface KeyValueEditorProps {
  rows: KeyValue[];
  onChange: (rows: KeyValue[]) => void;
  keyPlaceholder?: string;
  valuePlaceholder?: string;
  ariaLabel: string;
}

export const KeyValueEditor: FC<KeyValueEditorProps> = ({
  rows,
  onChange,
  keyPlaceholder,
  valuePlaceholder,
  ariaLabel,
}) => {
  const update = (id: string, patch: Partial<KeyValue>): void =>
    onChange(rows.map((row) => (row.id === id ? { ...row, ...patch } : row)));

  const remove = (id: string): void =>
    onChange(rows.filter((row) => row.id !== id));

  const add = (): void => onChange([...rows, newKeyValue()]);

  return (
    <div className="flex flex-col gap-2">
      {rows.map((row) => (
        <KeyValueRow
          key={row.id}
          row={row}
          keyPlaceholder={keyPlaceholder}
          valuePlaceholder={valuePlaceholder}
          ariaLabel={ariaLabel}
          onChange={(patch) => update(row.id, patch)}
          onRemove={() => remove(row.id)}
        />
      ))}
      <button
        type="button"
        onClick={add}
        className="btn btn-ghost btn-xs w-fit gap-1">
        <FiPlus className="size-4" />
        <span>Add row</span>
      </button>
    </div>
  );
};

KeyValueEditor.displayName = 'KeyValueEditor';
