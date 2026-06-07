import { renderHook } from '@testing-library/react';
import { useCodeMirror } from '../useCodeMirror';

let mockDispatch = jest.fn();
let mockFocus = jest.fn();
let mockDestroy = jest.fn();
let mockToString = jest.fn().mockReturnValue('');

const createMockView = () => ({
  dispatch: mockDispatch,
  focus: mockFocus,
  destroy: mockDestroy,
  state: {
    doc: { toString: mockToString },
  },
  scrollDOM: document.createElement('div'),
});

jest.mock('@codemirror/state', () => ({
  EditorState: {
    create: jest.fn().mockReturnValue({
      doc: { toString: () => '' },
    }),
  },
  Compartment: jest.fn().mockImplementation(() => ({
    of: jest.fn().mockReturnValue([]),
    reconfigure: jest.fn().mockReturnValue([]),
  })),
}));

jest.mock('@codemirror/view', () => ({
  EditorView: Object.assign(
    jest.fn(() => createMockView()),
    {
      lineWrapping: {},
      theme: jest.fn().mockReturnValue({}),
      editable: { of: jest.fn().mockReturnValue([]) },
      updateListener: { of: jest.fn().mockReturnValue([]) },
      domEventHandlers: jest.fn().mockReturnValue([]),
    }
  ),
  keymap: { of: jest.fn().mockReturnValue([]) },
  lineNumbers: jest.fn().mockReturnValue([]),
}));

jest.mock('@codemirror/search', () => ({
  search: jest.fn().mockReturnValue([]),
  searchKeymap: [],
}));

jest.mock('@codemirror/lang-markdown', () => ({
  markdown: jest.fn().mockReturnValue([]),
}));

jest.mock('@codemirror/theme-one-dark', () => ({
  oneDark: [],
}));

describe('useCodeMirror', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockDispatch = jest.fn();
    mockFocus = jest.fn();
    mockDestroy = jest.fn();
    mockToString = jest.fn().mockReturnValue('');
  });

  it('returns refs and exec function', () => {
    const onDocChange = jest.fn();
    const { result } = renderHook(() =>
      useCodeMirror('# Hello', false, false, onDocChange)
    );
    expect(result.current.editorRef).toBeDefined();
    expect(result.current.viewRef).toBeDefined();
    expect(result.current.exec).toBeInstanceOf(Function);
  });

  it('does not create EditorView when editorRef is null', () => {
    const onDocChange = jest.fn();
    renderHook(() => useCodeMirror('# Hello', false, false, onDocChange));
    const { EditorView } = require('@codemirror/view');
    expect(EditorView).not.toHaveBeenCalled();
  });

  it('exec function calls view if available', () => {
    const onDocChange = jest.fn();
    const { result } = renderHook(() =>
      useCodeMirror('# Hello', false, false, onDocChange)
    );
    const fn = jest.fn();
    result.current.exec(fn);
    expect(fn).not.toHaveBeenCalled();

    const view = createMockView();
    result.current.viewRef.current = view;
    result.current.exec(fn);
    expect(fn).toHaveBeenCalledWith(view);
  });

  it('updates editable when ocrLoading changes', () => {
    const onDocChange = jest.fn();
    const { rerender, result } = renderHook(
      (props: { ocrLoading: boolean }) =>
        useCodeMirror('# Hello', props.ocrLoading, false, onDocChange),
      { initialProps: { ocrLoading: false } }
    );

    const view = createMockView();
    view.state.doc.toString = jest.fn().mockReturnValue('# Hello');
    result.current.viewRef.current = view;
    mockDispatch.mockClear();

    rerender({ ocrLoading: true });
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('updates line numbers when showLineNumbers changes', () => {
    const onDocChange = jest.fn();
    const { rerender, result } = renderHook(
      (props: { showLineNumbers: boolean }) =>
        useCodeMirror('# Hello', false, props.showLineNumbers, onDocChange),
      { initialProps: { showLineNumbers: false } }
    );

    const view = createMockView();
    result.current.viewRef.current = view;
    mockDispatch.mockClear();

    rerender({ showLineNumbers: true });
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('updates markdown content when markdown changes', () => {
    const onDocChange = jest.fn();
    const { rerender, result } = renderHook(
      (props: { markdown: string }) =>
        useCodeMirror(props.markdown, false, false, onDocChange),
      { initialProps: { markdown: '# Hello' } }
    );

    const view = createMockView();
    view.state.doc.toString = jest.fn().mockReturnValue('# Hello');
    result.current.viewRef.current = view;
    mockDispatch.mockClear();

    rerender({ markdown: '# Updated' });
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('does not update markdown if content is the same', () => {
    const onDocChange = jest.fn();
    const { rerender, result } = renderHook(
      (props: { markdown: string }) =>
        useCodeMirror(props.markdown, false, false, onDocChange),
      { initialProps: { markdown: '# Hello' } }
    );

    const view = createMockView();
    view.state.doc.toString = jest.fn().mockReturnValue('# Hello');
    result.current.viewRef.current = view;
    mockDispatch.mockClear();

    rerender({ markdown: '# Hello' });
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
