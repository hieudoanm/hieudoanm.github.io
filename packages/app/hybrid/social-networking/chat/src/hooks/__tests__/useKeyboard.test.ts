import { renderHook } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import { useKeyboard } from '@/hooks/useKeyboard';

describe('useKeyboard', () => {
  it('triggers a shortcut and prevents default', () => {
    const handler = jest.fn();
    renderHook(() => useKeyboard({ 'ctrl+k': handler }));
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    expect(handler).toHaveBeenCalled();
  });

  it('triggers meta shortcuts too', () => {
    const handler = jest.fn();
    renderHook(() => useKeyboard({ 'ctrl+n': handler }));
    fireEvent.keyDown(window, { key: 'N', metaKey: true });
    expect(handler).toHaveBeenCalled();
  });

  it('triggers ctrl+shift shortcuts', () => {
    const handler = jest.fn();
    renderHook(() => useKeyboard({ 'ctrl+shift+c': handler }));
    fireEvent.keyDown(window, { key: 'c', ctrlKey: true, shiftKey: true });
    expect(handler).toHaveBeenCalled();
  });

  it('triggers alt shortcuts', () => {
    const handler = jest.fn();
    renderHook(() => useKeyboard({ 'alt+1': handler }));
    fireEvent.keyDown(window, { key: '1', altKey: true });
    expect(handler).toHaveBeenCalled();
  });

  it('ignores unregistered combinations', () => {
    const handler = jest.fn();
    renderHook(() => useKeyboard({ 'ctrl+k': handler }));
    const preventDefault = jest.fn();
    const event = new KeyboardEvent('keydown', {
      key: 'x',
      ctrlKey: true,
      cancelable: true,
    });
    Object.defineProperty(event, 'preventDefault', {
      value: preventDefault,
    });
    window.dispatchEvent(event);
    expect(handler).not.toHaveBeenCalled();
    expect(preventDefault).not.toHaveBeenCalled();
  });

  it('removes the listener on unmount', () => {
    const handler = jest.fn();
    const { unmount } = renderHook(() => useKeyboard({ 'ctrl+k': handler }));
    unmount();
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    expect(handler).not.toHaveBeenCalled();
  });
});
