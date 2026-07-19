import { act, renderHook } from '@testing-library/react';
import { useClipboard } from '../useClipboard';

describe('useClipboard', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockResolvedValue(undefined),
      },
    });
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('starts with no copied label', () => {
    const { result } = renderHook(() => useClipboard());
    expect(result.current.copied).toBeNull();
  });

  it('writes text to the clipboard and marks the label', async () => {
    const { result } = renderHook(() => useClipboard());
    await act(async () => {
      await result.current.copy('hex', '#ff0000');
    });
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('#ff0000');
    expect(result.current.copied).toBe('hex');
  });

  it('clears the copied label after 2 seconds', async () => {
    const { result } = renderHook(() => useClipboard());
    await act(async () => {
      await result.current.copy('hex', '#ff0000');
    });
    expect(result.current.copied).toBe('hex');
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(result.current.copied).toBeNull();
  });
});
