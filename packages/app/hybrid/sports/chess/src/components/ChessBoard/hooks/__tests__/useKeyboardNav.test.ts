import { renderHook, act } from '@testing-library/react';
import { useKeyboardNav } from '../useKeyboardNav';

describe('useKeyboardNav', () => {
  const onSan = jest.fn().mockReturnValue(false);
  const onUndo = jest.fn();
  const onRedo = jest.fn();

  beforeEach(() => {
    onSan.mockClear();
    onUndo.mockClear();
    onRedo.mockClear();
    onSan.mockReturnValue(false);
  });

  const setup = (enabled = true) =>
    renderHook(() => useKeyboardNav({ enabled, onSan, onUndo, onRedo }));

  const fireKey = (key: string, opts: Partial<KeyboardEvent> = {}) => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key, ...opts }));
  };

  it('returns empty buffer initially', () => {
    const { result } = setup();
    expect(result.current.buffer).toBe('');
  });

  it('calls onUndo on ArrowLeft', () => {
    setup();
    fireKey('ArrowLeft');
    expect(onUndo).toHaveBeenCalled();
  });

  it('calls onRedo on ArrowRight', () => {
    setup();
    fireKey('ArrowRight');
    expect(onRedo).toHaveBeenCalled();
  });

  it('calls onUndo on Ctrl+Z', () => {
    setup();
    fireKey('z', { ctrlKey: true });
    expect(onUndo).toHaveBeenCalled();
  });

  it('calls onRedo on Ctrl+Shift+Z', () => {
    setup();
    fireKey('z', { ctrlKey: true, shiftKey: true });
    expect(onRedo).toHaveBeenCalled();
  });

  it('calls onRedo on Ctrl+Y', () => {
    setup();
    fireKey('y', { ctrlKey: true });
    expect(onRedo).toHaveBeenCalled();
  });

  it('calls onRedo on Meta+Y', () => {
    setup();
    fireKey('y', { metaKey: true });
    expect(onRedo).toHaveBeenCalled();
  });

  it('clears buffer on Escape', () => {
    const { result } = setup();
    act(() => fireKey('e'));
    act(() => fireKey('4'));
    expect(result.current.buffer).toBe('e4');
    act(() => fireKey('Escape'));
    expect(result.current.buffer).toBe('');
  });

  it('removes last char on Backspace', () => {
    const { result } = setup();
    act(() => fireKey('e'));
    act(() => fireKey('4'));
    act(() => fireKey('Backspace'));
    expect(result.current.buffer).toBe('e');
  });

  it('appends valid SAN characters to buffer', () => {
    const { result } = setup();
    act(() => fireKey('N'));
    act(() => fireKey('f'));
    act(() => fireKey('3'));
    expect(result.current.buffer).toBe('Nf3');
  });

  it('clears buffer when onSan returns true', () => {
    onSan.mockReturnValue(true);
    const { result } = setup();
    act(() => fireKey('e'));
    expect(result.current.buffer).toBe('');
  });

  it('does nothing when disabled', () => {
    setup(false);
    fireKey('ArrowLeft');
    expect(onUndo).not.toHaveBeenCalled();
  });

  it('ignores key events from inputs', () => {
    setup();
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true })
    );
    expect(onUndo).not.toHaveBeenCalled();
    document.body.removeChild(input);
  });

  it('ignores key events from textareas', () => {
    setup();
    const ta = document.createElement('textarea');
    document.body.appendChild(ta);
    ta.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
    );
    expect(onRedo).not.toHaveBeenCalled();
    document.body.removeChild(ta);
  });

  it('ignores non-SAN characters', () => {
    const { result } = setup();
    act(() => fireKey('!'));
    expect(result.current.buffer).toBe('');
  });

  it('ignores keys with length > 1', () => {
    const { result } = setup();
    act(() => fireKey('Shift'));
    expect(result.current.buffer).toBe('');
  });
});
