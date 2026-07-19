import { createSignal, onCleanup } from 'solid-js';

interface UseCountdownOptions {
  interval?: number;
  onComplete?: () => void;
}

export function createCountdown(
  initialSeconds: number,
  options?: UseCountdownOptions
) {
  const { interval = 1000, onComplete } = options || {};
  const [secondsLeft, setSecondsLeft] = createSignal(initialSeconds);
  let timerRef: ReturnType<typeof setInterval> | null = null;
  let isPaused = true;

  const clearTimer = () => {
    if (timerRef !== null) {
      clearInterval(timerRef);
      timerRef = null;
    }
  };

  const tick = () => {
    setSecondsLeft((prev) => {
      if (prev <= 1) {
        clearTimer();
        isPaused = true;
        onComplete?.();
        return 0;
      }
      return prev - 1;
    });
  };

  const start = () => {
    clearTimer();
    isPaused = false;
    setSecondsLeft(initialSeconds);
    timerRef = setInterval(tick, interval);
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
      timerRef = setInterval(tick, interval);
    }
  };

  const reset = () => {
    clearTimer();
    isPaused = true;
    setSecondsLeft(initialSeconds);
  };

  onCleanup(() => clearTimer());

  return { secondsLeft, start, stop, pause, resume, reset };
}
