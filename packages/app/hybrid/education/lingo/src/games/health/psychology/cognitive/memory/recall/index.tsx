'use client';

import type { FC } from 'react';

import { chunkDigits, mistakesOf } from './utils';
import { useRecall } from './useRecall';

const CorrectResult: FC = () => (
  <p className="text-sm font-normal">Correct! Level up 🎉</p>
);

const WrongResult: FC<{ number: string; input: string }> = ({
  number,
  input,
}) => (
  <div className="space-y-1 text-sm">
    <p className="font-normal">
      Wrong 😢 {mistakesOf(input, number)} wrong. The number was{' '}
      <span className="font-normal">{chunkDigits(number)}</span>
    </p>
    <p className="font-normal">
      Your input:{' '}
      {input.split('').map((digit, index) => (
        <span
          key={index}
          className={digit === number[index] ? '' : 'text-red-500'}>
          {digit}
        </span>
      ))}
    </p>
  </div>
);

export const Recall: FC = () => {
  const {
    phase,
    level,
    number,
    input,
    setInput,
    countdown,
    mask,
    setMask,
    highStreak,
    inputRef,
    containerRef,
    lastRoundFailed,
    start,
    submit,
    next,
    onKeyDown,
  } = useRecall();

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="outline-none">
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
          onSubmit={(event) => {
            event.preventDefault();
            if (input) submit();
          }}
          className="space-y-3">
          <div className="relative flex items-center">
            <input
              ref={inputRef}
              type={mask ? 'password' : 'text'}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="input input-bordered w-full text-center text-xl tracking-widest"
              placeholder="Type here"
              maxLength={number.length}
            />
            <button
              type="button"
              className="absolute right-2 text-lg opacity-50 hover:opacity-100"
              onClick={() => setMask((value) => !value)}>
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
          {lastRoundFailed ? (
            <WrongResult number={number} input={input} />
          ) : (
            <CorrectResult />
          )}
          <button className="btn btn-secondary w-full" onClick={next}>
            {lastRoundFailed ? 'Start Over' : 'Next'}
          </button>
          <p className="text-xs opacity-50">Press Enter</p>
        </div>
      )}
    </div>
  );
};

Recall.displayName = 'Recall';
