import { renderHook } from '@testing-library/react';
import { useCodeMirror } from '../useCodeMirror';

let updateListenerCallback:
  | ((update: {
      docChanged: boolean;
      state: { doc: { toString: () => string } };
    }) => void)
  | null = null;

jest.mock('@codemirror/state', () => ({
  EditorState: {
    create: jest.fn(() => ({})),
  },
}));

jest.mock('@codemirror/view', () => {
  const mockEditorView = jest.fn(() => ({
    destroy: jest.fn(),
  }));
  mockEditorView.lineWrapping = Symbol('lineWrapping');
  mockEditorView.theme = jest.fn(() => Symbol('theme'));
  mockEditorView.updateListener = {
    of: jest.fn((cb: typeof updateListenerCallback) => {
      updateListenerCallback = cb;
      return Symbol('listener');
    }),
  };
  return { EditorView: mockEditorView };
});

jest.mock('@codemirror/theme-one-dark', () => ({
  oneDark: Symbol('oneDark'),
}));

import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';

describe('useCodeMirror', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    updateListenerCallback = null;
  });

  it('returns a ref', () => {
    const { result } = renderHook(() => useCodeMirror({ value: 'hello' }));
    expect(result.current.ref).toBeDefined();
    expect(result.current.ref.current).toBeNull();
  });

  it('creates EditorView when ref is attached and calls onChange', () => {
    const onChange = jest.fn();
    const { result, rerender } = renderHook(
      (props: { value: string; onChange?: (v: string) => void }) =>
        useCodeMirror({ value: props.value, onChange: props.onChange }),
      { initialProps: { value: 'test', onChange } }
    );

    const div = document.createElement('div');
    result.current.ref.current = div;
    rerender({ value: 'test', onChange });

    expect(EditorState.create).toHaveBeenCalled();
    expect(EditorView).toHaveBeenCalled();

    if (updateListenerCallback) {
      updateListenerCallback({
        docChanged: true,
        state: { doc: { toString: () => 'new value' } },
      });
      expect(onChange).toHaveBeenCalledWith('new value');
    }
  });

  it('does not call onChange when docChanged is false', () => {
    const onChange = jest.fn();
    const { result, rerender } = renderHook(
      (props: { value: string; onChange?: (v: string) => void }) =>
        useCodeMirror({ value: props.value, onChange: props.onChange }),
      { initialProps: { value: 'test', onChange } }
    );

    const div = document.createElement('div');
    result.current.ref.current = div;
    rerender({ value: 'test', onChange });

    if (updateListenerCallback) {
      updateListenerCallback({
        docChanged: false,
        state: { doc: { toString: () => 'new value' } },
      });
      expect(onChange).not.toHaveBeenCalled();
    }
  });
});
