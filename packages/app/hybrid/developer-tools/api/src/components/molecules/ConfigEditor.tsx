'use client';

import { downloadRequest, readRequestFile } from '@/lib/request-file';
import { RedirectMode, RequestConfig } from '@/types/api-client';
import { type ChangeEvent, type FC, useRef } from 'react';
import { FiDownload, FiUpload } from 'react-icons/fi';

interface ConfigEditorProps {
  request: RequestConfig;
  onChange: (next: RequestConfig) => void;
}

const REDIRECT_OPTIONS: readonly { value: RedirectMode; label: string }[] = [
  { value: 'follow', label: 'Follow redirects' },
  { value: 'manual', label: 'Manual redirects' },
];

export const ConfigEditor: FC<ConfigEditorProps> = ({ request, onChange }) => {
  const fileInput = useRef<HTMLInputElement>(null);

  const onImport = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (!file) return;
    void readRequestFile(file).then((parsed) => {
      if (parsed) onChange(parsed);
    });
    event.target.value = '';
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end gap-4">
        <label className="form-control w-40">
          <span className="label-text mb-1 text-xs">Timeout (ms)</span>
          <input
            type="number"
            min="0"
            value={request.timeoutMs}
            onChange={(e) =>
              onChange({ ...request, timeoutMs: e.target.value })
            }
            placeholder="No timeout"
            aria-label="Request timeout (ms)"
            className="input input-bordered input-sm font-mono"
          />
        </label>
        <label className="form-control w-48">
          <span className="label-text mb-1 text-xs">Redirects</span>
          <select
            value={request.redirect}
            onChange={(e) =>
              onChange({ ...request, redirect: e.target.value as RedirectMode })
            }
            aria-label="Redirect mode"
            className="select select-bordered select-sm">
            {REDIRECT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => downloadRequest(request)}
          className="btn btn-outline btn-xs gap-1">
          <FiDownload className="size-4" />
          <span>Export request</span>
        </button>
        <button
          type="button"
          onClick={() => fileInput.current?.click()}
          className="btn btn-outline btn-xs gap-1">
          <FiUpload className="size-4" />
          <span>Import request</span>
        </button>
        <input
          ref={fileInput}
          type="file"
          accept="application/json,.json"
          onChange={onImport}
          aria-label="Import request file"
          className="hidden"
        />
      </div>
    </div>
  );
};

ConfigEditor.displayName = 'ConfigEditor';
