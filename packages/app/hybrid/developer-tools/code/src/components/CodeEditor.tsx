import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLine,
  highlightActiveLineGutter,
  highlightTrailingWhitespace,
  rectangularSelection,
  highlightWhitespace,
} from '@codemirror/view';
import { Compartment, EditorState } from '@codemirror/state';
import {
  defaultKeymap,
  history,
  historyKeymap,
  copyLineUp,
  copyLineDown,
  deleteLine,
} from '@codemirror/commands';
import { oneDark } from '@codemirror/theme-one-dark';
import {
  bracketMatching,
  indentOnInput,
  foldGutter,
  foldKeymap,
} from '@codemirror/language';
import { closeBrackets } from '@codemirror/autocomplete';
import { searchKeymap, highlightSelectionMatches } from '@codemirror/search';
import { autoCloseTags } from '@codemirror/lang-html';
import { getLanguageExtension } from '../utils/editor-languages';

export interface CodeEditorHandle {
  goToLine: (line: number) => void;
}

interface CodeEditorProps {
  filename: string;
  content: string;
  wordWrap: boolean;
  fontSize: number;
  onChange: (content: string) => void;
  onSave: () => void;
  onSaveAs?: () => void;
  onCursorChange: (line: number, col: number) => void;
  onSelectionChange: (count: number) => void;
  onGoToLine?: () => void;
}

export const CodeEditor = forwardRef<CodeEditorHandle, CodeEditorProps>(
  (
    {
      filename,
      content,
      wordWrap,
      fontSize,
      onChange,
      onSave,
      onSaveAs,
      onCursorChange,
      onSelectionChange,
      onGoToLine,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const viewRef = useRef<EditorView | null>(null);
    const onChangeRef = useRef(onChange);
    const onSaveRef = useRef(onSave);
    const onSaveAsRef = useRef(onSaveAs);
    const onCursorChangeRef = useRef(onCursorChange);
    const onSelectionChangeRef = useRef(onSelectionChange);
    const onGoToLineRef = useRef(onGoToLine);

    useEffect(() => {
      onChangeRef.current = onChange;
      onSaveRef.current = onSave;
      onSaveAsRef.current = onSaveAs;
      onCursorChangeRef.current = onCursorChange;
      onSelectionChangeRef.current = onSelectionChange;
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
      const whitespaceCompartment = new Compartment();
      let whitespaceActive = false;

      const state = EditorState.create({
        doc: content,
        extensions: [
          lineNumbers(),
          history(),
          bracketMatching(),
          closeBrackets(),
          indentOnInput(),
          highlightSelectionMatches(),
          highlightActiveLine(),
          highlightActiveLineGutter(),
          highlightTrailingWhitespace(),
          rectangularSelection(),
          foldGutter(),
          autoCloseTags,
          whitespaceCompartment.of([]),
          wordWrap ? EditorView.lineWrapping : [],
          keymap.of([
            ...defaultKeymap,
            ...historyKeymap,
            ...foldKeymap,
            ...searchKeymap,
            { key: 'Shift-Alt-ArrowUp', run: copyLineUp },
            { key: 'Shift-Alt-ArrowDown', run: copyLineDown },
            { key: 'Mod-Shift-k', run: deleteLine },
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
            {
              key: 'Mod-Shift-s',
              run: () => {
                onSaveAsRef.current?.();
                return true;
              },
            },
          ]),
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              onChangeRef.current(update.state.doc.toString());
            }
            if (update.selectionSet) {
              const sel = update.state.selection;
              const main = sel.main;
              const pos = main.head;
              const line = update.state.doc.lineAt(pos);
              onCursorChangeRef.current(line.number, pos - line.from + 1);
              const hasSelection = sel.ranges.some(
                (r: { from: number; to: number }) => r.from !== r.to
              );
              if (hasSelection !== whitespaceActive) {
                whitespaceActive = hasSelection;
                update.view.dispatch({
                  effects: whitespaceCompartment.reconfigure(
                    hasSelection ? highlightWhitespace() : []
                  ),
                });
              }
              if (hasSelection) {
                const count = update.state.sliceDoc(
                  main.from,
                  main.to - main.from
                ).length;
                onSelectionChangeRef.current(count);
              } else {
                onSelectionChangeRef.current(0);
              }
            }
          }),
          EditorView.theme({
            '&': {
              fontFamily: 'var(--editor-font)',
              fontSize: 'var(--editor-font-size, 13px)',
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

    return (
      <div
        ref={editorRef}
        className="h-full w-full"
        style={{ '--editor-font-size': `${fontSize}px` } as React.CSSProperties}
      />
    );
  }
);
