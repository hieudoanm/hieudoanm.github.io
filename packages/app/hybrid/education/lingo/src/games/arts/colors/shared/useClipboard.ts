'use client';

import { useState } from 'react';

export const useClipboard = (): {
  copied: string | null;
  copy: (label: string, text: string) => void;
} => {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (label: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return { copied, copy };
};
