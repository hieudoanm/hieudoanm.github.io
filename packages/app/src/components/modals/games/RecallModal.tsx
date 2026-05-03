import { FC, useEffect, useRef, useState } from 'react';

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

export const RecallModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [lastRoundFailed, setLastRoundFailed] = useState(false);
  const [phase, setPhase] = useState<Phase>('ready');
  const [level, setLevel] = useState(1);
  const [number, setNumber] = useState('');
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [mask, setMask] = useState(false);
  const [highStreak, setHighStreak] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('highStreak');
      return stored ? parseInt(stored, 10) : 0;
    }
    return 0;
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);
  useEffect(() => {
    if (phase !== 'input') containerRef.current?.focus();
  }, [phase]);
  useEffect(() => () => clearTimers(), []);

  const clearTimers = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const startRound = (nextLevel = level) => {
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

    intervalRef.current = setInterval(
      () => setCountdown((c) => Math.max(0, c - 1)),
      1000
    );
    timerRef.current = setTimeout(() => {
      clearTimers();
      setCountdown(0);
      setPhase('input');
      setTimeout(() => inputRef.current?.focus(), 0);
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
    if (input === number) {
      setMessage('Correct! Level up 🎉');
      setLevel((l) => l + 1);
      updateHighStreak(level);
      setLastRoundFailed(false);
    } else {
      const highlighted = highlightMistakes(input, number);
      setMessage(
        `Wrong 😢 The number was <span class="font-bold">${chunkDigits(number)}</span><br/>Your input: <span>${highlighted}</span>`
      );
      setLevel(1);
      setLastRoundFailed(true);
    }
    setPhase('result');
  };

  const next = () => {
    setMessage('');
    startRound(level);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
      return;
    }
    if (e.key !== 'Enter') return;
    if (phase === 'ready') start();
    if (phase === 'result') next();
  };

  return (
    <dialog
      className="modal modal-open"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
      <div
        ref={containerRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="modal-box w-full max-w-sm outline-none">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2">
          ✕
        </button>

        <h3 className="mb-4 text-center text-lg font-bold">Memory Recall</h3>

        {/* Badges */}
        <div className="mb-4 flex justify-center gap-2">
          <span className="badge badge-secondary">Level {level}</span>
          <span className="badge badge-accent">🏆 Best {highStreak}</span>
          {phase === 'show' && (
            <span className="badge badge-info">⏱ {countdown}s</span>
          )}
        </div>

        {phase === 'ready' && (
          <div className="space-y-3 text-center">
            <p className="text-base-content/70 text-sm">
              Memorize the number and type it back.
            </p>
            <button className="btn btn-primary w-full" onClick={start}>
              Start
            </button>
            <p className="text-xs opacity-50">Press Enter</p>
          </div>
        )}

        {phase === 'show' && (
          <div className="py-4 text-center font-mono text-4xl tracking-widest">
            {chunkDigits(number)}
          </div>
        )}

        {phase === 'input' && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (input) submit();
            }}
            className="space-y-3">
            <div className="relative flex items-center">
              <input
                ref={inputRef}
                type={mask ? 'password' : 'text'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="input input-bordered w-full text-center text-xl tracking-widest"
                placeholder="Type here"
                maxLength={number.length}
              />
              <button
                type="button"
                className="absolute right-2 text-lg opacity-50 hover:opacity-100"
                onClick={() => setMask((m) => !m)}>
                {mask ? '🙈' : '👁'}
              </button>
            </div>
            <button
              type="submit"
              className="btn btn-success w-full"
              disabled={input.length !== number.length}>
              Submit
            </button>
            <p className="text-center text-xs opacity-50">
              {input.length}/{number.length} digits
            </p>
          </form>
        )}

        {phase === 'result' && (
          <div className="space-y-3 text-center">
            <p
              className="text-sm font-medium"
              dangerouslySetInnerHTML={{ __html: message }}
            />
            <button className="btn btn-secondary w-full" onClick={next}>
              {lastRoundFailed ? 'Start Over' : 'Next'}
            </button>
            <p className="text-xs opacity-50">Press Enter</p>
          </div>
        )}
      </div>

      <div className="modal-backdrop" onClick={onClose} />
    </dialog>
  );
};
