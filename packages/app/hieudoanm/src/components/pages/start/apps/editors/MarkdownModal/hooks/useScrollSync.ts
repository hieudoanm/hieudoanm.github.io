import { EditorView } from '@codemirror/view';
import { RefObject, useEffect, useRef } from 'react';

export const useScrollSync = (viewRef: RefObject<EditorView | null>) => {
  const previewScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const view = viewRef.current;
    const previewEl = previewScrollRef.current;
    if (!view || !previewEl) return;

    const editorScroll = view.scrollDOM;
    let syncing = false;

    const onEditorScroll = () => {
      if (syncing) return;
      syncing = true;
      const maxScroll = editorScroll.scrollHeight - editorScroll.clientHeight;
      if (maxScroll > 0) {
        const previewMax = previewEl.scrollHeight - previewEl.clientHeight;
        previewEl.scrollTop =
          previewMax > 0
            ? (editorScroll.scrollTop / maxScroll) * previewMax
            : 0;
      }
      syncing = false;
    };

    const onPreviewScroll = () => {
      if (syncing) return;
      syncing = true;
      const maxScroll = previewEl.scrollHeight - previewEl.clientHeight;
      if (maxScroll > 0) {
        const editorMax = editorScroll.scrollHeight - editorScroll.clientHeight;
        editorScroll.scrollTop =
          editorMax > 0 ? (previewEl.scrollTop / maxScroll) * editorMax : 0;
      }
      syncing = false;
    };

    editorScroll.addEventListener('scroll', onEditorScroll, { passive: true });
    previewEl.addEventListener('scroll', onPreviewScroll, { passive: true });

    return () => {
      editorScroll.removeEventListener('scroll', onEditorScroll);
      previewEl.removeEventListener('scroll', onPreviewScroll);
    };
  });

  return previewScrollRef;
};
