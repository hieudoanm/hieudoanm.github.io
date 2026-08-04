'use client';

import { useEffect, useRef } from 'react';
import type { ViewTool } from '@/types/annotation';

export interface ShortcutHandlers {
  setTool: (tool: ViewTool) => void;
  undo: () => void;
  redo: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  fit: () => void;
}

const IGNORED_TAGS = ['INPUT', 'TEXTAREA', 'SELECT'];

const isEditableTarget = (target: EventTarget | null): boolean =>
  target instanceof HTMLElement && IGNORED_TAGS.includes(target.tagName);

export const useShortcuts = (handlers: ShortcutHandlers): void => {
  const ref = useRef(handlers);
  ref.current = handlers;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent): void => {
      if (isEditableTarget(event.target)) return;
      const key = event.key.toLowerCase();

      if (key === '1' || key === '2' || key === '3') {
        const tools: ViewTool[] = ['pan', 'polygon', 'freehand'];
        ref.current.setTool(tools[Number(key) - 1]);
        event.preventDefault();
        return;
      }
      if (key === '+' || key === '=') {
        ref.current.zoomIn();
        event.preventDefault();
        return;
      }
      if (key === '-') {
        ref.current.zoomOut();
        event.preventDefault();
        return;
      }
      if (key === '0') {
        ref.current.fit();
        event.preventDefault();
        return;
      }
      if ((event.metaKey || event.ctrlKey) && key === 'z') {
        if (event.shiftKey) ref.current.redo();
        else ref.current.undo();
        event.preventDefault();
        return;
      }
      if ((event.metaKey || event.ctrlKey) && key === 'y') {
        ref.current.redo();
        event.preventDefault();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);
};
