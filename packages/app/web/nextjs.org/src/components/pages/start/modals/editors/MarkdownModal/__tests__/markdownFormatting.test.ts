import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import {
  insertAround,
  insertAtLineStart,
  insertBlock,
  insertHeading,
  insertTable,
  autoClose,
  computeStats,
  STRING_STYLES,
  STYLE_FN,
} from '../markdownFormatting';

function createView(doc: string): EditorView {
  const parent = document.createElement('div');
  const state = EditorState.create({ doc });
  return new EditorView({ state, parent });
}

describe('insertAround', () => {
  it('wraps selected text', () => {
    const view = createView('hello world');
    view.dispatch({ selection: { anchor: 0, head: 5 } });
    insertAround(view, '**', '**', 'bold text');
    expect(view.state.doc.toString()).toBe('**hello** world');
  });

  it('uses placeholder when no selection', () => {
    const view = createView('hello world');
    insertAround(view, '*', '*', 'italic text');
    expect(view.state.doc.toString()).toBe('*italic text*hello world');
  });

  it('uses placeholder when text is empty', () => {
    const view = createView('');
    insertAround(view, '`', '`', 'code');
    expect(view.state.doc.toString()).toBe('`code`');
  });
});

describe('insertAtLineStart', () => {
  it('adds prefix at line start', () => {
    const view = createView('hello\nworld');
    view.dispatch({ selection: { anchor: 6 } });
    insertAtLineStart(view, '-');
    expect(view.state.doc.toString()).toBe('hello\n- world');
  });
});

describe('insertBlock', () => {
  it('wraps selected text in block', () => {
    const view = createView('hello world');
    view.dispatch({ selection: { anchor: 0, head: 5 } });
    insertBlock(view, '```', '```', 'code');
    expect(view.state.doc.toString()).toBe('```\nhello\n``` world');
  });

  it('uses placeholder when no selection', () => {
    const view = createView('hello');
    insertBlock(view, '```', '```', 'code');
    expect(view.state.doc.toString()).toBe('```\ncode\n```hello');
  });
});

describe('insertHeading', () => {
  it('inserts heading prefix', () => {
    const view = createView('hello world');
    insertHeading(view, 1);
    expect(view.state.doc.toString()).toBe('# hello world');
  });

  it('toggles heading off when same level exists', () => {
    const view = createView('# hello world');
    insertHeading(view, 1);
    expect(view.state.doc.toString()).toBe('hello world');
  });

  it('adds higher heading level without removing existing', () => {
    const view = createView('# hello world');
    insertHeading(view, 2);
    expect(view.state.doc.toString()).toBe('## # hello world');
  });

  it('inserts H3 heading prefix', () => {
    const view = createView('text');
    insertHeading(view, 3);
    expect(view.state.doc.toString()).toBe('### text');
  });
});

describe('insertTable', () => {
  it('inserts a table template', () => {
    const view = createView('');
    insertTable(view);
    expect(view.state.doc.toString()).toContain('Column 1');
    expect(view.state.doc.toString()).toContain('Column 2');
    expect(view.state.doc.toString()).toContain('Column 3');
  });
});

describe('autoClose', () => {
  it('wraps selection with open/close', () => {
    const view = createView('hello world');
    view.dispatch({ selection: { anchor: 0, head: 5 } });
    autoClose('"', '"')(view);
    expect(view.state.doc.toString()).toBe('"hello" world');
  });

  it('skips over closing pair when cursor is before it', () => {
    const view = createView('hello "" world');
    view.dispatch({ selection: { anchor: 6 } });
    autoClose('"', '"')(view);
    expect(view.state.doc.toString()).toBe('hello "" world');
  });

  it('inserts paired chars when no selection', () => {
    const view = createView('hello');
    view.dispatch({ selection: { anchor: 5 } });
    autoClose('(', ')')(view);
    expect(view.state.doc.toString()).toBe('hello()');
  });
});

describe('STRING_STYLES', () => {
  it('has all style entries', () => {
    expect(STRING_STYLES).toHaveLength(7);
    expect(STRING_STYLES[0].label).toBe('Format…');
  });
});

describe('STYLE_FN', () => {
  it('transforms string with capitalize', () => {
    expect(STYLE_FN.capitalize('hello')).toBe('Hello');
  });

  it('transforms string with upperCase', () => {
    expect(STYLE_FN.upperCase('hello')).toBe('HELLO');
  });

  it('transforms string with lowerCase', () => {
    expect(STYLE_FN.lowerCase('HELLO')).toBe('hello');
  });

  it('transforms string with snakeCase', () => {
    expect(STYLE_FN.snakeCase('hello world')).toBe('hello_world');
  });

  it('transforms string with kebabCase', () => {
    expect(STYLE_FN.kebabCase('hello world')).toBe('hello-world');
  });

  it('transforms string with deburr', () => {
    expect(STYLE_FN.deburr('héllo')).toBe('hello');
  });
});

describe('computeStats', () => {
  it('computes stats for normal text', () => {
    const stats = computeStats('hello world');
    expect(stats.characters).toBe(11);
    expect(stats.charactersNoSpaces).toBe(10);
    expect(stats.words).toBe(2);
    expect(stats.lines).toBe(1);
    expect(stats.readingTime).toBe('1 min');
  });

  it('handles empty text', () => {
    const stats = computeStats('');
    expect(stats.characters).toBe(0);
    expect(stats.words).toBe(0);
    expect(stats.lines).toBe(0);
    expect(stats.readingTime).toBe('1 min');
  });

  it('computes reading time for longer text', () => {
    const words = Array(400).fill('word').join(' ');
    const stats = computeStats(words);
    expect(stats.readingTime).toBe('2 min');
    expect(stats.words).toBe(400);
  });

  it('counts lines correctly', () => {
    expect(computeStats('a\nb\nc').lines).toBe(3);
  });
});
