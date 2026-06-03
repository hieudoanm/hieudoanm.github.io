import { createSignal, createEffect, onCleanup } from 'solid-js';

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

export const Counter = () => {
  const [seconds, setSeconds] = createSignal(0);
  const messageIndex = () => getMessageIndex(seconds());

  createEffect(() => {
    if (typeof window === 'undefined') return;
    const intervalId = window.setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    onCleanup(() => {
      clearInterval(intervalId);
    });
  });

  return (
    <div class="flex w-full items-center gap-x-2 text-neutral-500">
      <p>{seconds()}s</p>
      <div class="h-6 overflow-hidden">
        <div
          class="h-6 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateY(-${messageIndex() * 100}%)` } as any}>
          {MESSAGES.map((message: string) => (
            <p key={message} class="h-6 whitespace-nowrap">
              {message}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
