import { useState, useEffect, useRef, FC } from 'react';

const MESSAGES = [
  'Loading... hang tight!',
  'Connecting to magic servers...',
  'Fetching fresh bits...',
  'Warming up the hamster wheel...',
  'Almost there — just a sec!',
  'Still working — thanks for waiting!',
  'Good things take a moment...',
  'Double-checking the pixels...',
  'Pouring virtual coffee ☕️...',
  'Tidying things up for you...',
  'Final touches in progress...',
  'Ready in 3... 2... 1...',
];

const getMessageIndex = (seconds: number): number => {
  const index = Math.floor(seconds / 5);
  if (index < 0) return 0;
  if (index >= MESSAGES.length) return MESSAGES.length - 1;
  return index;
};

export const Counter: FC = () => {
  const [{ seconds, messageIndex = getMessageIndex(seconds) }, setState] =
    useState<{
      seconds: number;
      messageIndex: number;
    }>({
      seconds: 0,
      messageIndex: 0,
    });
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
    if (seconds > 0) {
      setState((previous) => ({
        ...previous,
        seconds: 0,
        messageIndex: getMessageIndex(0),
      }));
    }
    intervalRef.current = window.setInterval(() => {
      setState((previous) => ({
        ...previous,
        seconds: previous.seconds + 1,
        messageIndex: getMessageIndex(previous.seconds + 1),
      }));
    }, 1000);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex w-full items-center gap-x-2 text-neutral-500">
      <p>{seconds}s</p>
      <div className="h-6 overflow-hidden">
        <div
          className="h-6 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateY(-${messageIndex * 100}%)` }}>
          {MESSAGES.map((message: string) => (
            <p key={message} className="h-6 whitespace-nowrap">
              {message}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
