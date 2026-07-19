'use client';

import { EditorView } from '@codemirror/view';
import { RefObject, useEffect, useRef } from 'react';

export const useScrollSync = (viewRef: RefObject<EditorView | null>) => {
  const previewScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const editorView = viewRef.current;
    const previewEl = previewScrollRef.current;
    if (!editorView || !previewEl) return;
    const editorDOM = editorView.scrollDOM;

    const syncToPreview = () => {
      const maxScroll = editorDOM.scrollHeight - editorDOM.clientHeight;
      const pct = maxScroll > 0 ? editorDOM.scrollTop / maxScroll : 0;
      const previewMax = previewEl.scrollHeight - previewEl.clientHeight;
      previewEl.scrollTop = pct * previewMax;
    };

    const syncToEditor = () => {
      const maxScroll = previewEl.scrollHeight - previewEl.clientHeight;
      const pct = maxScroll > 0 ? previewEl.scrollTop / maxScroll : 0;
      const editorMax = editorDOM.scrollHeight - editorDOM.clientHeight;
      editorDOM.scrollTop = pct * editorMax;
    };

    editorDOM.addEventListener('scroll', syncToPreview);
    previewEl.addEventListener('scroll', syncToEditor);
    return () => {
      editorDOM.removeEventListener('scroll', syncToPreview);
      previewEl.removeEventListener('scroll', syncToEditor);
    };
  }, [viewRef]);

  return previewScrollRef;
};
