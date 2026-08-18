import { renderHook } from '@testing-library/react';
import { useShortcuts, type ShortcutHandlers } from '@/hooks/useShortcuts';

const handlers = (): ShortcutHandlers & Record<string, jest.Mock> => ({
  setTool: jest.fn(),
  undo: jest.fn(),
  redo: jest.fn(),
  zoomIn: jest.fn(),
  zoomOut: jest.fn(),
  fit: jest.fn(),
  panBy: jest.fn(),
});

const keyEvent = (key: string, init: KeyboardEventInit = {}): KeyboardEvent =>
  new KeyboardEvent('keydown', {
    key,
    bubbles: true,
    cancelable: true,
    ...init,
  });

describe('useShortcuts', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('pans with the arrow keys', () => {
    const actions = handlers();
    renderHook(() => useShortcuts(actions));
    window.dispatchEvent(keyEvent('ArrowLeft'));
    window.dispatchEvent(keyEvent('ArrowUp'));
    expect(actions.panBy).toHaveBeenCalledTimes(2);
    expect(actions.panBy).toHaveBeenNthCalledWith(1, -40, 0);
    expect(actions.panBy).toHaveBeenNthCalledWith(2, 0, -40);
  });

  it('ignores arrow keys while typing in inputs', () => {
    const actions = handlers();
    renderHook(() => useShortcuts(actions));
    const input = document.createElement('input');
    input.dispatchEvent(keyEvent('ArrowRight'));
    expect(actions.panBy).not.toHaveBeenCalled();
  });

  it('zooms with + and -', () => {
    const actions = handlers();
    renderHook(() => useShortcuts(actions));
    window.dispatchEvent(keyEvent('+'));
    window.dispatchEvent(keyEvent('-'));
    expect(actions.zoomIn).toHaveBeenCalledTimes(1);
    expect(actions.zoomOut).toHaveBeenCalledTimes(1);
  });

  it('fits the view with 0', () => {
    const actions = handlers();
    renderHook(() => useShortcuts(actions));
    window.dispatchEvent(keyEvent('0'));
    expect(actions.fit).toHaveBeenCalledTimes(1);
  });

  it('undoes and redoes with cmd+z and cmd+shift+z', () => {
    const actions = handlers();
    renderHook(() => useShortcuts(actions));
    window.dispatchEvent(keyEvent('z', { metaKey: true }));
    window.dispatchEvent(keyEvent('z', { metaKey: true, shiftKey: true }));
    expect(actions.undo).toHaveBeenCalledTimes(1);
    expect(actions.redo).toHaveBeenCalledTimes(1);
  });

  it('switches tools with number keys', () => {
    const actions = handlers();
    renderHook(() => useShortcuts(actions));
    window.dispatchEvent(keyEvent('2'));
    window.dispatchEvent(keyEvent('6'));
    expect(actions.setTool).toHaveBeenNthCalledWith(1, 'polygon');
    expect(actions.setTool).toHaveBeenNthCalledWith(2, 'measureArea');
  });
});
