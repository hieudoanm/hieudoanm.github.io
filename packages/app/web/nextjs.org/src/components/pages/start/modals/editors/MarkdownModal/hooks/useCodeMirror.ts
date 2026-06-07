import { markdown as markdownLang } from '@codemirror/lang-markdown';
import { search, searchKeymap } from '@codemirror/search';
import { Compartment, EditorState } from '@codemirror/state';
import { EditorView, keymap, lineNumbers } from '@codemirror/view';
import { oneDark } from '@codemirror/theme-one-dark';
import { useCallback, useEffect, useRef } from 'react';

import {
  autoClose,
  insertAround,
  insertAtLineStart,
  insertBlock,
} from '../markdownFormatting';

export const useCodeMirror = (
  markdown: string,
  ocrLoading: boolean,
  showLineNumbers: boolean,
  onDocChange: (value: string) => void
) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<EditorView | null>(null);
  const editableCompartment = useRef(new Compartment()).current;
  const lineNumbersCompartment = useRef(new Compartment()).current;

  useEffect(() => {
    if (!editorRef.current) return;
    const state = EditorState.create({
      doc: markdown,
      extensions: [
        oneDark,
        markdownLang(),
        EditorView.lineWrapping,
        EditorView.theme({
          '&': { height: '100%' },
          '.cm-editor': { height: '100%' },
          '.cm-scroller': { overflow: 'auto', fontFamily: 'monospace' },
        }),
        editableCompartment.of(EditorView.editable.of(!ocrLoading)),
        lineNumbersCompartment.of(showLineNumbers ? lineNumbers() : []),
        search({ top: true }),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) onDocChange(update.state.doc.toString());
        }),
        EditorView.domEventHandlers({
          paste: (event, view) => {
            const items = event.clipboardData?.items;
            if (!items) return false;
            for (let i = 0; i < items.length; i++) {
              if (items[i].type.startsWith('image/')) {
                event.preventDefault();
                const file = items[i].getAsFile();
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    const dataUrl = e.target?.result as string;
                    if (dataUrl) {
                      const { from } = view.state.selection.main;
                      view.dispatch({
                        changes: { from, insert: `![image](${dataUrl})` },
                      });
                      view.focus();
                    }
                  };
                  reader.readAsDataURL(file);
                }
                return true;
              }
            }
            return false;
          },
        }),
        keymap.of([
          ...searchKeymap,
          {
            key: 'Mod-b',
            run: (v) => {
              insertAround(v, '**', '**', 'bold text');
              return true;
            },
          },
          {
            key: 'Mod-i',
            run: (v) => {
              insertAround(v, '*', '*', 'italic text');
              return true;
            },
          },
          {
            key: 'Mod-Shift-x',
            run: (v) => {
              insertAround(v, '~~', '~~', 'strikethrough text');
              return true;
            },
          },
          {
            key: 'Mod-k',
            run: (v) => {
              insertAround(v, '[', '](url)', 'link text');
              return true;
            },
          },
          {
            key: 'Mod-`',
            run: (v) => {
              insertAround(v, '`', '`', 'code');
              return true;
            },
          },
          {
            key: 'Mod-Shift-c',
            run: (v) => {
              insertBlock(v, '```', '```', 'code');
              return true;
            },
          },
          { key: '"', run: autoClose('"', '"') },
          { key: "'", run: autoClose("'", "'") },
          { key: '`', run: autoClose('`', '`') },
          { key: '[', run: autoClose('[', ']') },
          { key: '(', run: autoClose('(', ')') },
        ]),
      ],
    });
    viewRef.current = new EditorView({ state, parent: editorRef.current });
    return () => viewRef.current?.destroy();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    view.dispatch({
      effects: editableCompartment.reconfigure(
        EditorView.editable.of(!ocrLoading)
      ),
    });
  }, [ocrLoading, editableCompartment]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const current = view.state.doc.toString();
    if (current !== markdown) {
      view.dispatch({
        changes: { from: 0, to: current.length, insert: markdown },
      });
    }
  }, [markdown]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    view.dispatch({
      effects: lineNumbersCompartment.reconfigure(
        showLineNumbers ? lineNumbers() : []
      ),
    });
  }, [showLineNumbers, lineNumbersCompartment]);

  const exec = useCallback((fn: (view: EditorView) => void) => {
    const view = viewRef.current;
    if (view) fn(view);
  }, []);

  return { editorRef, viewRef, exec };
};
