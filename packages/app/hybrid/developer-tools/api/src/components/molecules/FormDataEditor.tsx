'use client';

import { FormFiles } from '@/lib/body';
import { newKeyValue } from '@/lib/http';
import { KeyValue } from '@/types/api-client';
import { type FC } from 'react';
import { FiFile, FiPlus, FiTrash2, FiX } from 'react-icons/fi';

interface FormDataEditorProps {
  rows: KeyValue[];
  files?: FormFiles;
  onChange: (rows: KeyValue[]) => void;
  onFilesChange: (files: FormFiles) => void;
}

export const FormDataEditor: FC<FormDataEditorProps> = ({
  rows,
  files = {},
  onChange,
  onFilesChange,
}) => {
  const update = (id: string, patch: Partial<KeyValue>): void =>
    onChange(rows.map((row) => (row.id === id ? { ...row, ...patch } : row)));

  const remove = (id: string): void => {
    onChange(rows.filter((row) => row.id !== id));
    if (files[id]) {
      const next = { ...files };
      delete next[id];
      onFilesChange(next);
    }
  };

  const add = (): void => onChange([...rows, newKeyValue()]);

  const onFile = (id: string, file: File | null): void => {
    if (!file) {
      const next = { ...files };
      delete next[id];
      onFilesChange(next);
      return;
    }
    onFilesChange({ ...files, [id]: file });
    update(id, { value: file.name });
  };

  return (
    <div className="flex flex-col gap-2">
      {rows.map((row) => {
        const file = files[row.id];
        return (
          <div key={row.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={row.enabled}
              onChange={(e) => update(row.id, { enabled: e.target.checked })}
              aria-label="Toggle row"
              className="checkbox checkbox-xs"
            />
            <input
              type="text"
              value={row.key}
              onChange={(e) => update(row.id, { key: e.target.value })}
              placeholder="Field"
              aria-label="Form field key"
              className="input input-bordered input-sm w-40 flex-1 font-mono"
            />
            <span className="text-base-content/30">=</span>
            {file ? (
              <div className="flex flex-1 items-center gap-1">
                <span className="badge badge-ghost gap-1 font-mono">
                  <FiFile className="size-3" />
                  {file.name}
                </span>
                <button
                  type="button"
                  onClick={() => onFile(row.id, null)}
                  aria-label="Remove file"
                  className="btn btn-ghost btn-xs btn-square">
                  <FiX className="size-4" />
                </button>
              </div>
            ) : (
              <div className="flex flex-1 items-center gap-1">
                <input
                  type="text"
                  value={row.value}
                  onChange={(e) => update(row.id, { value: e.target.value })}
                  placeholder="Value"
                  aria-label="Form field value"
                  className="input input-bordered input-sm w-full font-mono"
                />
                <label className="btn btn-ghost btn-xs gap-1">
                  <FiFile className="size-4" />
                  <span>File</span>
                  <input
                    type="file"
                    className="hidden"
                    aria-label="Attach file"
                    onChange={(e) =>
                      onFile(row.id, e.target.files?.[0] ?? null)
                    }
                  />
                </label>
              </div>
            )}
            <button
              type="button"
              onClick={() => remove(row.id)}
              aria-label="Remove row"
              className="btn btn-ghost btn-xs btn-square">
              <FiTrash2 className="size-4" />
            </button>
          </div>
        );
      })}
      <button
        type="button"
        onClick={add}
        className="btn btn-ghost btn-xs w-fit gap-1">
        <FiPlus className="size-4" />
        <span>Add field</span>
      </button>
    </div>
  );
};

FormDataEditor.displayName = 'FormDataEditor';
