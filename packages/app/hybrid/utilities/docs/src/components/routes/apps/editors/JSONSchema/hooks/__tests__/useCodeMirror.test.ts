let mockDispatch = jest.fn();
let mockDestroy = jest.fn();
let mockToString = jest.fn().mockReturnValue('');

const createMockView = () =>
  ({
    dispatch: mockDispatch,
    destroy: mockDestroy,
    state: { doc: { toString: mockToString } },
    scrollDOM: document.createElement('div'),
    contentDOM: document.createElement('div'),
  }) as unknown as import('@codemirror/view').EditorView;

jest.mock('@codemirror/state', () => ({
  EditorState: { create: jest.fn(() => ({})) },
}));

jest.mock('@codemirror/view', () => ({
  EditorView: Object.assign(
    jest.fn(() => createMockView()),
    {
      lineWrapping: {},
      editable: { of: jest.fn() },
      theme: jest.fn(() => ({})),
      updateListener: { of: jest.fn() },
    }
  ),
}));

jest.mock('@codemirror/theme-one-dark', () => ({
  oneDark: {},
}));

import { renderHook } from '@testing-library/react';
import { useCodeMirror } from '../useCodeMirror';

describe('useCodeMirror', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockDispatch = jest.fn();
    mockDestroy = jest.fn();
    mockToString = jest.fn().mockReturnValue('');
    document.body.innerHTML = '<div id="editor"></div>';
  });

  it('returns ref and viewRef', () => {
    const { result } = renderHook(() =>
      useCodeMirror({ value: 'test', editable: true })
    );
    expect(result.current.ref).toBeDefined();
    expect(result.current.viewRef).toBeDefined();
  });

  it('accepts onChange callback', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() =>
      useCodeMirror({ value: 'test', onChange })
    );
    expect(result.current.ref).toBeDefined();
  });

  it('works with empty value', () => {
    const { result } = renderHook(() => useCodeMirror({ value: '' }));
    expect(result.current.ref).toBeDefined();
  });

  it('updates view when value changes', () => {
    const { rerender, result } = renderHook(
      (props: { value: string }) => useCodeMirror({ value: props.value }),
      { initialProps: { value: 'initial' } }
    );

    const view = createMockView();
    view.state.doc.toString = jest.fn().mockReturnValue('initial');
    result.current.viewRef.current = view;
    mockDispatch.mockClear();

    rerender({ value: 'updated' });
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('does not dispatch when value is unchanged', () => {
    const { rerender, result } = renderHook(
      (props: { value: string }) => useCodeMirror({ value: props.value }),
      { initialProps: { value: 'same' } }
    );

    const view = createMockView();
    view.state.doc.toString = jest.fn().mockReturnValue('same');
    result.current.viewRef.current = view;
    mockDispatch.mockClear();

    rerender({ value: 'same' });
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('handles undefined viewRef gracefully', () => {
    const { rerender } = renderHook(
      (props: { value: string }) => useCodeMirror({ value: props.value }),
      { initialProps: { value: 'test' } }
    );
    expect(() => rerender({ value: 'new' })).not.toThrow();
  });
});
