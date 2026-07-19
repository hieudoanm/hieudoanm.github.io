import { renderHook } from '@testing-library/react';
import { useBrowserDetect } from '../useBrowserDetect';

describe('useBrowserDetect', () => {
  it('returns browser info', () => {
    const { result } = renderHook(() => useBrowserDetect());
    expect(result.current).toHaveProperty('browser');
    expect(result.current).toHaveProperty('engine');
    expect(result.current).toHaveProperty('version');
    expect(result.current).toHaveProperty('isMobile');
  });
});
