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
  panBy: (deltaX: number, deltaY: number) => void;
}

const IGNORED_TAGS = ['INPUT', 'TEXTAREA', 'SELECT'];

const isEditableTarget = (target: EventTarget | null): boolean =>
  target instanceof HTMLElement && IGNORED_TAGS.includes(target.tagName);

const PAN_STEP = 40;

const PAN_KEYS: Record<string, { x: number; y: number }> = {
  arrowleft: { x: -PAN_STEP, y: 0 },
  arrowright: { x: PAN_STEP, y: 0 },
  arrowup: { x: 0, y: -PAN_STEP },
  arrowdown: { x: 0, y: PAN_STEP },
};

export const useShortcuts = (handlers: ShortcutHandlers): void => {
  const ref = useRef(handlers);
  ref.current = handlers;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent): void => {
      if (isEditableTarget(event.target)) return;
      const key = event.key.toLowerCase();

      if (key >= '1' && key <= '6') {
        const tools: ViewTool[] = [
          'pan',
          'polygon',
          'freehand',
          'measureDistance',
          'measureAngle',
          'measureArea',
        ];
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
      const pan = PAN_KEYS[key];
      if (pan) {
        ref.current.panBy(pan.x, pan.y);
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
