import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { EditorView, keymap, lineNumbers } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { oneDark } from '@codemirror/theme-one-dark';
import { bracketMatching, indentOnInput } from '@codemirror/language';
import { closeBrackets } from '@codemirror/autocomplete';
import { searchKeymap, highlightSelectionMatches } from '@codemirror/search';
import { getLanguageExtension } from '../utils/editor-languages';

export interface CodeEditorHandle {
  goToLine: (line: number) => void;
}

interface CodeEditorProps {
  filename: string;
  content: string;
  wordWrap: boolean;
  onChange: (content: string) => void;
  onSave: () => void;
  onCursorChange: (line: number, col: number) => void;
  onGoToLine?: () => void;
}

export const CodeEditor = forwardRef<CodeEditorHandle, CodeEditorProps>(
  (
    {
      filename,
      content,
      wordWrap,
      onChange,
      onSave,
      onCursorChange,
      onGoToLine,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const viewRef = useRef<EditorView | null>(null);
    const onChangeRef = useRef(onChange);
    const onSaveRef = useRef(onSave);
    const onCursorChangeRef = useRef(onCursorChange);
    const onGoToLineRef = useRef(onGoToLine);

    useEffect(() => {
      onChangeRef.current = onChange;
      onSaveRef.current = onSave;
      onCursorChangeRef.current = onCursorChange;
      onGoToLineRef.current = onGoToLine;
    });

    useImperativeHandle(
      ref,
      () => ({
        goToLine: (line: number) => {
          const view = viewRef.current;
          if (!view) return;
          const doc = view.state.doc;
          const clamped = Math.max(1, Math.min(line, doc.lines));
          const pos = doc.line(clamped).from;
          view.dispatch({
            selection: { anchor: pos },
            scrollIntoView: true,
          });
        },
      }),
      []
    );

    const editorRef = useCallback((node: HTMLDivElement | null) => {
      if (!node) return;
      containerRef.current = node;

      const lang = getLanguageExtension(filename);

      const state = EditorState.create({
        doc: content,
        extensions: [
          lineNumbers(),
          history(),
          bracketMatching(),
          closeBrackets(),
          indentOnInput(),
          highlightSelectionMatches(),
          wordWrap ? EditorView.lineWrapping : [],
          keymap.of([
            ...defaultKeymap,
            ...historyKeymap,
            ...searchKeymap,
            {
              key: 'Mod-g',
              run: () => {
                onGoToLineRef.current?.();
                return true;
              },
            },
          ]),
          oneDark,
          keymap.of([
            {
              key: 'Mod-s',
              run: () => {
                onSaveRef.current();
                return true;
              },
            },
          ]),
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              onChangeRef.current(update.state.doc.toString());
            }
            if (update.selectionSet) {
              const pos = update.state.selection.main.head;
              const line = update.state.doc.lineAt(pos);
              onCursorChangeRef.current(line.number, pos - line.from + 1);
            }
          }),
          EditorView.theme({
            '&': {
              fontFamily: 'var(--editor-font)',
              fontSize: '13px',
              height: '100%',
            },
            '.cm-scroller': { overflow: 'auto' },
          }),
          lang ?? [],
        ].flat(),
      });

      const view = new EditorView({
        state,
        parent: node,
      });
      viewRef.current = view;
      onCursorChangeRef.current(1, 1);
    }, []);

    useEffect(() => {
      return () => viewRef.current?.destroy();
    }, []);

    useEffect(() => {
      const view = viewRef.current;
      if (!view) return;
      const current = view.state.doc.toString();
      if (current !== content) {
        view.dispatch({
          changes: { from: 0, to: current.length, insert: content },
        });
      }
    }, [content]);

    return <div ref={editorRef} className="h-full w-full" />;
  }
);
