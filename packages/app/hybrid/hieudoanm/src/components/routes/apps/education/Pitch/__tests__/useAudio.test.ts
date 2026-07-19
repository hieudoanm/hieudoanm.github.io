import { act, renderHook } from '@testing-library/react';
import { useAudio } from '../useAudio';

beforeEach(() => {
  HTMLAudioElement.prototype.play = jest.fn().mockResolvedValue(undefined);
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

it('returns initial state', () => {
  const { result } = renderHook(() => useAudio());
  expect(result.current.ripple).toBe(false);
  expect(result.current.audioRef.current).toBeNull();
});

it('plays a tone and sets ripple', () => {
  const { result } = renderHook(() => useAudio());
  act(() => result.current.playTone('C4'));
  expect(result.current.ripple).toBe(true);
  expect(result.current.audioRef.current).toBeInstanceOf(HTMLAudioElement);
});

it('clears ripple after 600ms', () => {
  const { result } = renderHook(() => useAudio());
  act(() => result.current.playTone('C4'));
  expect(result.current.ripple).toBe(true);
  act(() => {
    jest.advanceTimersByTime(600);
  });
  expect(result.current.ripple).toBe(false);
});

it('handles audio constructor error gracefully', () => {
  const originalAudio = globalThis.Audio;
  (globalThis as any).Audio = jest.fn(() => {
    throw new Error('audio error');
  }) as any;
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  const { result } = renderHook(() => useAudio());
  expect(() => result.current.playTone('C4')).not.toThrow();
  expect(consoleSpy).toHaveBeenCalled();
  consoleSpy.mockRestore();
  (globalThis as any).Audio = originalAudio;
});
