import { useCallback, useEffect, useRef, useState } from 'react';

interface UseCountdownOptions {
  interval?: number; // tick interval in ms, default 1000
  onComplete?: () => void; // called when countdown reaches 0
}

export function useCountdown(
  initialSeconds: number,
  options?: UseCountdownOptions
) {
  const { interval = 1000, onComplete } = options || {};
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isPausedRef = useRef(true);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const tick = useCallback(() => {
    setSecondsLeft((prev) => {
      if (prev <= 1) {
        clearTimer();
        isPausedRef.current = true;
        if (onComplete) onComplete();
        return 0;
      }
      return prev - 1;
    });
  }, [clearTimer, onComplete]);

  const start = useCallback(() => {
    clearTimer();
    isPausedRef.current = false;
    setSecondsLeft(initialSeconds);
    timerRef.current = setInterval(tick, interval);
  }, [clearTimer, initialSeconds, interval, tick]);

  const stop = useCallback(() => {
    clearTimer();
    isPausedRef.current = true;
  }, [clearTimer]);

  const pause = useCallback(() => {
    clearTimer();
    isPausedRef.current = true;
  }, [clearTimer]);

  const resume = useCallback(() => {
    if (secondsLeft > 0 && isPausedRef.current) {
      isPausedRef.current = false;
      clearTimer();
      timerRef.current = setInterval(tick, interval);
    }
  }, [secondsLeft, clearTimer, interval, tick]);

  const reset = useCallback(() => {
    clearTimer();
    isPausedRef.current = true;
    setSecondsLeft(initialSeconds);
  }, [clearTimer, initialSeconds]);

  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  return { secondsLeft, start, stop, pause, resume, reset };
}
