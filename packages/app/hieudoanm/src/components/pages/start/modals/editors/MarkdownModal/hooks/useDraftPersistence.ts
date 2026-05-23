import { useEffect } from 'react';

import { STORAGE_KEY, DraftData } from '../constants';
import { INITIAL_MARKDOWN } from '../initialMarkdown';
import { MarkdownState, ViewMode } from '../types';

export const useDraftRestore = (
  onRestore: (data: Partial<MarkdownState>) => void
) => {
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw) as DraftData;
        if (data.markdown && data.markdown !== INITIAL_MARKDOWN) {
          onRestore({
            markdown: data.markdown,
            fontId: data.fontId,
            viewMode: data.viewMode,
            fileName: data.fileName,
            showLineNumbers: data.showLineNumbers,
            restored: true,
          });
        }
      }
    } catch {
      // ignore corrupted data
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

export const useDraftSave = (
  markdown: string,
  fontId: string,
  viewMode: ViewMode,
  fileName: string,
  showLineNumbers: boolean
) => {
  useEffect(() => {
    try {
      if (markdown && markdown !== INITIAL_MARKDOWN) {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            markdown,
            fontId,
            viewMode,
            fileName,
            showLineNumbers,
          } satisfies DraftData)
        );
      }
    } catch {
      // localStorage may be full
    }
  }, [markdown, fontId, viewMode]);
};
