import { renderHook, act } from '@testing-library/react';
import { useStreaming } from '@/hooks/useStreaming';

describe('useStreaming', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('streams text until completion', () => {
    const { result } = renderHook(() =>
      useStreaming({ speed: 10, sentencePause: 100 })
    );
    act(() => {
      result.current.start('Hi. There');
    });
    expect(result.current.isStreaming).toBe(true);
    expect(result.current.text).toBe('');
    act(() => {
      jest.advanceTimersByTime(10);
    });
    expect(result.current.text).toBe('H');
    act(() => {
      jest.advanceTimersByTime(10 * 9 + 100 * 2);
    });
    expect(result.current.text).toBe('Hi. There');
    expect(result.current.isStreaming).toBe(false);
  });

  it('uses default options when none are provided', () => {
    const { result } = renderHook(() => useStreaming());
    act(() => {
      result.current.start('ab');
    });
    act(() => {
      jest.advanceTimersByTime(30);
    });
    expect(result.current.text).toBe('a');
    act(() => {
      jest.advanceTimersByTime(30);
    });
    expect(result.current.text).toBe('ab');
  });

  it('stop halts streaming and keeps partial text', () => {
    const { result } = renderHook(() =>
      useStreaming({ speed: 10, sentencePause: 100 })
    );
    act(() => {
      result.current.start('Hello world');
    });
    act(() => {
      jest.advanceTimersByTime(30);
    });
    act(() => {
      result.current.stop();
    });
    expect(result.current.isStreaming).toBe(false);
    const partial = result.current.text;
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.text).toBe(partial);
  });

  it('reset clears text and state', () => {
    const { result } = renderHook(() =>
      useStreaming({ speed: 10, sentencePause: 100 })
    );
    act(() => {
      result.current.start('Hello world');
    });
    act(() => {
      jest.advanceTimersByTime(30);
    });
    act(() => {
      result.current.reset();
    });
    expect(result.current.text).toBe('');
    expect(result.current.isStreaming).toBe(false);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.text).toBe('');
  });

  it('start restarts an already-completed stream', () => {
    const { result } = renderHook(() =>
      useStreaming({ speed: 10, sentencePause: 100 })
    );
    act(() => {
      result.current.start('abc');
    });
    act(() => {
      jest.advanceTimersByTime(10 * 3 + 200);
    });
    expect(result.current.isStreaming).toBe(false);
    act(() => {
      result.current.start('x');
    });
    expect(result.current.text).toBe('');
    act(() => {
      jest.advanceTimersByTime(10);
    });
    expect(result.current.text).toBe('x');
  });
});
