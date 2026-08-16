import { renderHook, act } from '@testing-library/react';
import { useCaptions } from '@/hooks/useCaptions';

describe('useCaptions', () => {
  it('reports no support when the Web Speech API is unavailable', () => {
    const { result } = renderHook(() => useCaptions());
    expect(result.current.supported).toBe(false);
    expect(result.current.listening).toBe(false);
  });

  it('toggling without support is a no-op', () => {
    const { result } = renderHook(() => useCaptions());
    act(() => result.current.toggle());
    expect(result.current.listening).toBe(false);
    expect(result.current.text).toBe('');
  });
});
