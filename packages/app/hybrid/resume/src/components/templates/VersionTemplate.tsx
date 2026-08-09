'use client';

import { useState, type FC } from 'react';
import { LuCopy, LuCheck } from 'react-icons/lu';

export const VersionTemplate: FC<{ version: string }> = ({ version }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(version);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <p className="text-base-content/50 mb-6 text-xs tracking-[0.2em] uppercase">
        Version
      </p>

      <h1 className="mb-3">Resume Builder</h1>

      <p className="text-base-content/50 mb-10 max-w-sm text-center text-sm">
        Build your resume with 32 free templates and export it as PDF.
      </p>

      <div className="border-base-content/10 bg-base-200 mb-8 w-full max-w-md rounded-2xl border p-6">
        <div className="flex items-center justify-between gap-4">
          <span className="text-base-content/50 text-sm">Build version</span>
          <button
            type="button"
            onClick={copy}
            className="btn btn-accent btn-sm font-mono"
            aria-label="Copy version">
            {copied ? <LuCheck /> : <LuCopy />}
            {version}
          </button>
        </div>
      </div>

      <span className="badge badge-accent rounded-full">Stable</span>
    </div>
  );
};

VersionTemplate.displayName = 'VersionTemplate';
