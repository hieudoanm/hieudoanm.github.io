import { createEffect, createSignal, onCleanup, onMount } from 'solid-js';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

type Phase = 'ready' | 'show' | 'input' | 'result';

const TIME_PER_DIGIT = 650;
const MIN_TIME = 1200;
const MAX_TIME = 6000;

const chunkDigits = (value: string, size = 3) => {
  const firstGroupLength = value.length % size || size;
  const first = value.slice(0, firstGroupLength);
  const rest = value
    .slice(firstGroupLength)
    .match(new RegExp(`.{1,${size}}`, 'g'))
    ?.join(',');
  return rest ? `${first},${rest}` : first;
};

const generateNumber = (length: number) =>
  Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');

const highlightMistakes = (input: string, correct: string) =>
  input
    .split('')
    .map((digit, i) =>
      digit === correct[i]
        ? digit
        : `<span class="text-red-500 font-bold">${digit}</span>`
    )
    .join('');

export const RecallModal = ({ onClose }: { onClose: () => void }) => {
  const [lastRoundFailed, setLastRoundFailed] = createSignal(false);
  const [phase, setPhase] = createSignal<Phase>('ready');
  const [level, setLevel] = createSignal(1);
  const [number, setNumber] = createSignal('');
  const [input, setInput] = createSignal('');
  const [message, setMessage] = createSignal('');
  const [countdown, setCountdown] = createSignal(0);
  const [mask, setMask] = createSignal(false);
  const [highStreak, setHighStreak] = createSignal(
    (() => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('highStreak');
        return stored ? parseInt(stored, 10) : 0;
      }
      return 0;
    })()
  );

  let timerRef: NodeJS.Timeout | null = null;
  let intervalRef: NodeJS.Timeout | null = null;
  let inputRef: HTMLInputElement | undefined;
  let containerRef: HTMLDivElement | undefined;

  onMount(() => {
    containerRef?.focus();
  });
  createEffect(() => {
    if (phase() !== 'input') containerRef?.focus();
  });
  onCleanup(() => clearTimers());

  const clearTimers = () => {
    if (timerRef) clearTimeout(timerRef);
    if (intervalRef) clearInterval(intervalRef);
  };

  const startRound = (nextLevel = level()) => {
    clearTimers();
    const value = generateNumber(nextLevel);
    const duration = Math.min(
      MAX_TIME,
      Math.max(MIN_TIME, nextLevel * TIME_PER_DIGIT)
    );

    setNumber(value);
    setInput('');
    setPhase('show');
    setCountdown(Math.ceil(duration / 1000));

    intervalRef = setInterval(
      () => setCountdown((c) => Math.max(0, c - 1)),
      1000
    );
    timerRef = setTimeout(() => {
      clearTimers();
      setCountdown(0);
      setPhase('input');
      setTimeout(() => inputRef?.focus(), 0);
    }, duration);
  };

  const start = () => {
    setLevel(1);
    setMessage('');
    startRound(1);
  };

  const updateHighStreak = (newStreak: number) => {
    setHighStreak((prev) => {
      const high = Math.max(prev, newStreak);
      localStorage.setItem('highStreak', high.toString());
      return high;
    });
  };

  const submit = () => {
    if (input() === number()) {
      setMessage('Correct! Level up 🎉');
      setLevel((l) => l + 1);
      updateHighStreak(level());
      setLastRoundFailed(false);
    } else {
      const highlighted = highlightMistakes(input(), number());
      setMessage(
        `Wrong 😢 The number was <span class="font-bold">${chunkDigits(number())}</span><br/>Your input: <span>${highlighted}</span>`
      );
      setLevel(1);
      setLastRoundFailed(true);
    }
    setPhase('result');
  };

  const next = () => {
    setMessage('');
    startRound(level());
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
      return;
    }
    if (e.key !== 'Enter') return;
    if (phase() === 'ready') start();
    if (phase() === 'result') next();
  };

  return (
    <ModalWrapper onClose={onClose} title="Memory Recall">
      <div
        ref={(el) => (containerRef = el)}
        tabIndex={0}
        onKeyDown={onKeyDown}
        class="outline-none">
        {/* Badges */}
        <div class="mb-4 flex justify-center gap-2">
          <span class="badge badge-secondary">Level {level()}</span>
          <span class="badge badge-accent">🏆 Best {highStreak()}</span>
          {phase() === 'show' && (
            <span class="badge badge-info">⏱ {countdown()}s</span>
          )}
        </div>

        {phase() === 'ready' && (
          <div class="space-y-3 text-center">
            <p class="text-base-content/70 text-sm">
              Memorize the number and type it back.
            </p>
            <button class="btn btn-primary w-full" onClick={start}>
              Start
            </button>
            <p class="text-xs opacity-50">Press Enter</p>
          </div>
        )}

        {phase() === 'show' && (
          <div class="py-4 text-center font-mono text-4xl tracking-widest">
            {chunkDigits(number())}
          </div>
        )}

        {phase() === 'input' && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (input()) submit();
            }}
            class="space-y-3">
            <div class="relative flex items-center">
              <input
                ref={(el) => (inputRef = el)}
                type={mask() ? 'password' : 'text'}
                value={input()}
                onChange={(e) => setInput(e.target.value)}
                class="input input-bordered w-full text-center text-xl tracking-widest"
                placeholder="Type here"
                maxLength={number().length}
              />
              <button
                type="button"
                class="absolute right-2 text-lg opacity-50 hover:opacity-100"
                onClick={() => setMask((m) => !m)}>
                {mask() ? '🙈' : '👁'}
              </button>
            </div>
            <button
              type="submit"
              class="btn btn-success w-full"
              disabled={input().length !== number().length}>
              Submit
            </button>
            <p class="text-center text-xs opacity-50">
              {input().length}/{number().length} digits
            </p>
          </form>
        )}

        {phase() === 'result' && (
          <div class="space-y-3 text-center">
            <p class="text-sm font-medium" innerHTML={message()} />
            <button class="btn btn-secondary w-full" onClick={next}>
              {lastRoundFailed() ? 'Start Over' : 'Next'}
            </button>
            <p class="text-xs opacity-50">Press Enter</p>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
};
