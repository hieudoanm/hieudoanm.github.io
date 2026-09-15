'use client';

import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { MarkdownPreviewer } from '@/components/md/organisms/MarkdownPreviewer';
import { useCodeMirror } from '@/hooks/md/useCodeMirror';
import { useMarkdownRender } from '@/hooks/md/useMarkdownRender';
import { loadNotes, saveNotes } from '@/lib/md/storage';
import type { Note } from '@/lib/md/types';

const SAVE_DELAY = 400;

export const LiteMarkdown: FC = () => {
  const [note, setNote] = useState<Note>(() => {
    const stored = loadNotes();
    return (
      stored[0] ?? {
        id: 'lite-note',
        title: 'Lite note',
        content: '# Hello',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }
    );
  });

  const editorRef = useRef<HTMLDivElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const saveTimerRef = useRef<number | undefined>(undefined);

  const handleDocChange = useCallback((content: string): void => {
    setNote((prev) => ({ ...prev, content, updatedAt: Date.now() }));
  }, []);

  useCodeMirror({
    containerRef: editorRef,
    initialDoc: note.content,
    onChange: handleDocChange,
  });

  const { html, isRendering } = useMarkdownRender(note.content);

  useEffect(() => {
    if (saveTimerRef.current) window.clearTimeout(saveTimerRef.current);
    saveTimerRef.current = window.setTimeout(
      () => saveNotes([note]),
      SAVE_DELAY
    );
    return () => {
      if (saveTimerRef.current) window.clearTimeout(saveTimerRef.current);
    };
  }, [note]);

  return (
    <div className="flex h-dvh min-h-0 flex-col">
      <header className="border-base-content/10 flex items-center gap-2 border-b px-3 py-2">
        <h1 className="truncate text-lg" data-testid="note-title">
          {note.title}
        </h1>
      </header>
      <div className="flex min-h-0 flex-1">
        <section className="min-w-0 flex-1">
          <div
            ref={editorRef}
            className="h-full overflow-hidden"
            data-testid="editor"
          />
        </section>
        <section className="min-w-0 flex-1">
          <MarkdownPreviewer
            html={html}
            isRendering={isRendering}
            previewRef={previewRef}
            visible
          />
        </section>
      </div>
    </div>
  );
};
LiteMarkdown.displayName = 'LiteMarkdown';
