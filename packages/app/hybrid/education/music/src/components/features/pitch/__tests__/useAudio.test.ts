import { act, renderHook } from '@testing-library/react';
import { useAudio } from '../useAudio';

describe('useAudio', () => {
  it('plays a tone and toggles the ripple', async () => {
    jest.useFakeTimers();
    const play = jest
      .spyOn(HTMLMediaElement.prototype, 'play')
      .mockResolvedValue(undefined);
    const error = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() => useAudio());
    expect(result.current.ripple).toBe(false);

    act(() => {
      result.current.playTone('c');
    });
    expect(play).toHaveBeenCalled();
    expect(result.current.audioRef.current?.src).toContain('/audio/3/c.mp3');
    expect(result.current.ripple).toBe(true);

    await act(async () => {
      await jest.advanceTimersByTimeAsync(600);
    });
    expect(result.current.ripple).toBe(false);

    play.mockRestore();
    error.mockRestore();
    jest.useRealTimers();
  });

  it('logs errors when audio cannot be created', () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => {});
    const original = global.Audio;
    (global as { Audio: unknown }).Audio = class {
      constructor() {
        throw new Error('no audio');
      }
    };

    const { result } = renderHook(() => useAudio());
    act(() => {
      result.current.playTone('c');
    });
    expect(error).toHaveBeenCalled();

    (global as { Audio: unknown }).Audio = original;
    error.mockRestore();
  });
});
