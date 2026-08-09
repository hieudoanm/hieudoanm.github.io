import { fireEvent, renderHook } from '@testing-library/react';
import { useKeyboardShortcuts } from '../useKeyboardShortcuts';

const dispatchKey = (init: KeyboardEventInit) => {
  const event = new KeyboardEvent('keydown', {
    bubbles: true,
    cancelable: true,
    ...init,
  });
  const spy = jest.spyOn(event, 'preventDefault');
  window.dispatchEvent(event);
  return spy;
};

describe('useKeyboardShortcuts', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('undoes on Cmd/Ctrl+Z', () => {
    const onUndo = jest.fn();
    renderHook(() =>
      useKeyboardShortcuts({ onUndo, onRedo: jest.fn(), onSave: jest.fn() })
    );
    dispatchKey({ key: 'z', metaKey: true });
    dispatchKey({ key: 'Z', ctrlKey: true });
    expect(onUndo).toHaveBeenCalledTimes(2);
  });

  it('redoes on Cmd/Ctrl+Shift+Z and Cmd/Ctrl+Y', () => {
    const onRedo = jest.fn();
    renderHook(() =>
      useKeyboardShortcuts({ onUndo: jest.fn(), onRedo, onSave: jest.fn() })
    );
    dispatchKey({ key: 'z', metaKey: true, shiftKey: true });
    dispatchKey({ key: 'y', ctrlKey: true });
    expect(onRedo).toHaveBeenCalledTimes(2);
  });

  it('saves on Cmd/Ctrl+S and prevents the browser dialog', () => {
    const onSave = jest.fn();
    renderHook(() =>
      useKeyboardShortcuts({ onUndo: jest.fn(), onRedo: jest.fn(), onSave })
    );
    const spy = dispatchKey({ key: 's', metaKey: true });
    expect(onSave).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
  });

  it('ignores keys without a modifier', () => {
    const onUndo = jest.fn();
    const onRedo = jest.fn();
    const onSave = jest.fn();
    renderHook(() => useKeyboardShortcuts({ onUndo, onRedo, onSave }));
    dispatchKey({ key: 'z' });
    dispatchKey({ key: 's' });
    expect(onUndo).not.toHaveBeenCalled();
    expect(onSave).not.toHaveBeenCalled();
  });

  it('ignores unrelated shortcuts', () => {
    const onUndo = jest.fn();
    renderHook(() =>
      useKeyboardShortcuts({ onUndo, onRedo: jest.fn(), onSave: jest.fn() })
    );
    dispatchKey({ key: 'a', metaKey: true });
    dispatchKey({ key: 'c', metaKey: true });
    expect(onUndo).not.toHaveBeenCalled();
  });

  it('removes the listener when the hook unmounts', () => {
    const onUndo = jest.fn();
    const { unmount } = renderHook(() =>
      useKeyboardShortcuts({ onUndo, onRedo: jest.fn(), onSave: jest.fn() })
    );
    unmount();
    dispatchKey({ key: 'z', metaKey: true });
    expect(onUndo).not.toHaveBeenCalled();
  });

  it('re-subscribes when handlers change', () => {
    const first = jest.fn();
    const second = jest.fn();
    const { rerender } = renderHook(
      ({ onUndo }) =>
        useKeyboardShortcuts({ onUndo, onRedo: jest.fn(), onSave: jest.fn() }),
      { initialProps: { onUndo: first } }
    );
    rerender({ onUndo: second });
    dispatchKey({ key: 'z', metaKey: true });
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalled();
  });
});
