'use client';

import { useEffect } from 'react';
import { STORAGE_KEY, DraftData } from '../constants';
import { ViewMode } from '../types';

export const useDraftRestore = (
  onRestore: (
    data: Partial<{
      markdown: string;
      fontId: string;
      viewMode: ViewMode;
      fileName: string;
      showLineNumbers: boolean;
    }>
  ) => void
) => {
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data: DraftData = JSON.parse(raw);
      if (data.markdown) {
        onRestore({
          markdown: data.markdown,
          fontId: data.fontId ?? 'roboto',
          viewMode: data.viewMode ?? 'split',
          fileName: data.fileName ?? 'untitled.md',
          showLineNumbers: data.showLineNumbers ?? false,
        });
      }
    } catch {
      /* ignore */
    }
  }, [onRestore]);
};

export const useDraftSave = (
  markdown: string,
  fontId: string,
  viewMode: ViewMode,
  fileName: string,
  showLineNumbers: boolean
) => {
  useEffect(() => {
    if (!markdown) return;
    const data: DraftData = {
      markdown,
      fontId,
      viewMode,
      fileName,
      showLineNumbers,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* ignore */
    }
  }, [markdown, fontId, viewMode, fileName, showLineNumbers]);
};
