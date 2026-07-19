'use client';

import { generateCode } from '@/lib/codegen';
import { copyText } from '@/lib/clipboard';
import {
  CodegenFormat,
  EnvironmentVariable,
  RequestConfig,
} from '@/types/api-client';
import { type FC, useEffect, useState } from 'react';
import { FiCopy } from 'react-icons/fi';

interface CodegenPanelProps {
  request: RequestConfig;
  env?: EnvironmentVariable[];
}

const FORMATS: readonly { value: CodegenFormat; label: string }[] = [
  { value: 'curl', label: 'cURL' },
  { value: 'fetch', label: 'fetch (JS)' },
  { value: 'fetch-ts', label: 'fetch (TypeScript)' },
];

export const CodegenPanel: FC<CodegenPanelProps> = ({ request, env }) => {
  const [format, setFormat] = useState<CodegenFormat>('curl');
  const [copied, setCopied] = useState(false);
  const code = generateCode(format, request, env);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(timer);
  }, [copied]);

  const onCopy = (): void => {
    void copyText(code).then((ok) => {
      if (ok) setCopied(true);
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value as CodegenFormat)}
          aria-label="Code generation format"
          className="select select-bordered select-sm w-48">
          {FORMATS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={onCopy}
          aria-label="Copy generated code"
          className="btn btn-ghost btn-xs gap-1">
          <FiCopy className="size-4" />
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <pre className="bg-base-200 overflow-x-auto rounded-lg p-3 font-mono text-xs whitespace-pre">
        {code}
      </pre>
    </div>
  );
};

CodegenPanel.displayName = 'CodegenPanel';
