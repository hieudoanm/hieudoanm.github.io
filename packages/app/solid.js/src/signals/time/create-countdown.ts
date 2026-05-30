import { createSignal, onCleanup } from 'solid-js';

interface UseCountdownOptions {
  interval?: number;
  onComplete?: () => void;
}

export function useCountdown(
  initialSeconds: number,
  options?: UseCountdownOptions
) {
  const { interval = 1000, onComplete } = options || {};
  const [secondsLeft, setSecondsLeft] = createSignal(initialSeconds);

  let timer: ReturnType<typeof setInterval> | null = null;
  let isPaused = true;

  const clearTimer = () => {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }
  };

  const tick = () => {
    setSecondsLeft((prev) => {
      if (prev <= 1) {
        clearTimer();
        isPaused = true;
        if (onComplete) onComplete();
        return 0;
      }
      return prev - 1;
    });
  };

  const start = () => {
    clearTimer();
    isPaused = false;
    setSecondsLeft(initialSeconds);
    timer = setInterval(tick, interval);
  };

  const stop = () => {
    clearTimer();
    isPaused = true;
  };

  const pause = () => {
    clearTimer();
    isPaused = true;
  };

  const resume = () => {
    if (secondsLeft() > 0 && isPaused) {
      isPaused = false;
      clearTimer();
      timer = setInterval(tick, interval);
    }
  };

  const reset = () => {
    clearTimer();
    isPaused = true;
    setSecondsLeft(initialSeconds);
  };

  onCleanup(clearTimer);

  return { secondsLeft, start, stop, pause, resume, reset };
}
