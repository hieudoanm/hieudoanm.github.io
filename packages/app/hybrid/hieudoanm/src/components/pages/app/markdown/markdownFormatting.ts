import { EditorView } from '@codemirror/view';
import {
  capitalize,
  deburr,
  kebabCase,
  lowerCase,
  snakeCase,
  upperCase,
} from '@lodash/ts';

export const insertAround = (
  view: EditorView,
  before: string,
  after: string,
  placeholder?: string
) => {
  const { from, to } = view.state.selection.main;
  const text = view.state.sliceDoc(from, to) || placeholder || '';
  view.dispatch({
    changes: { from, to, insert: `${before}${text}${after}` },
    selection: {
      anchor: from + before.length,
      head: from + before.length + text.length,
    },
  });
  view.focus();
};

export const insertAtLineStart = (view: EditorView, prefix: string) => {
  const { from } = view.state.selection.main;
  const line = view.state.doc.lineAt(from);
  view.dispatch({
    changes: { from: line.from, to: line.from, insert: `${prefix} ` },
  });
  view.focus();
};

export const insertBlock = (
  view: EditorView,
  before: string,
  after: string,
  placeholder?: string
) => {
  const { from, to } = view.state.selection.main;
  const text = view.state.sliceDoc(from, to) || placeholder || '';
  view.dispatch({
    changes: { from, to, insert: `${before}\n${text}\n${after}` },
    selection: {
      anchor: from + before.length + 1,
      head: from + before.length + 1 + text.length,
    },
  });
  view.focus();
};

export const insertHeading = (view: EditorView, level: number) => {
  const { from } = view.state.selection.main;
  const line = view.state.doc.lineAt(from);
  const prefix = '#'.repeat(level);
  const existingMatch = line.text.match(/^(#{1,6})\s/);
  if (existingMatch && existingMatch[1].length === level) {
    view.dispatch({
      changes: { from: line.from, to: line.from + level + 1, insert: '' },
    });
  } else {
    view.dispatch({
      changes: { from: line.from, to: line.from, insert: `${prefix} ` },
    });
  }
  view.focus();
};

export const insertTable = (view: EditorView) => {
  const { from } = view.state.selection.main;
  view.dispatch({
    changes: {
      from,
      to: from,
      insert:
        '| Column 1 | Column 2 | Column 3 |\n|----------|----------|----------|\n| Cell     | Cell     | Cell     |',
    },
  });
  view.focus();
};

export type StringStyle =
  | 'capitalize'
  | 'deburr'
  | 'kebabCase'
  | 'lowerCase'
  | 'snakeCase'
  | 'upperCase';

export const STRING_STYLES: { value: StringStyle | ''; label: string }[] = [
  { value: '', label: 'Format…' },
  { value: 'capitalize', label: 'Capitalise' },
  { value: 'deburr', label: 'deburr' },
  { value: 'kebabCase', label: 'kebab-case' },
  { value: 'lowerCase', label: 'lowercase' },
  { value: 'snakeCase', label: 'snake_case' },
  { value: 'upperCase', label: 'UPPERCASE' },
];

export const STYLE_FN: Record<StringStyle, (s: string) => string> = {
  capitalize,
  deburr,
  kebabCase,
  lowerCase,
  snakeCase,
  upperCase,
};

export const autoClose =
  (open: string, close: string) => (view: EditorView) => {
    const { from, to } = view.state.selection.main;
    if (from !== to) {
      view.dispatch({
        changes: {
          from,
          to,
          insert: open + view.state.sliceDoc(from, to) + close,
        },
        selection: { anchor: from + open.length, head: to + open.length },
      });
    } else if (
      from < view.state.doc.length &&
      view.state.sliceDoc(from, from + close.length) === close
    ) {
      view.dispatch({ selection: { anchor: from + close.length } });
    } else {
      view.dispatch({
        changes: { from, insert: open + close },
        selection: { anchor: from + open.length },
      });
    }
    view.focus();
    return true;
  };

export interface Stats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  lines: number;
  readingTime: string;
}

export const computeStats = (text: string): Stats => ({
  characters: text.length,
  charactersNoSpaces: text.replace(/\s/g, '').length,
  words: text.trim() ? text.trim().split(/\s+/).length : 0,
  lines: text ? text.split('\n').length : 0,
  readingTime: `${Math.max(1, Math.ceil((text.trim() ? text.trim().split(/\s+/).length : 0) / 200))} min`,
});
