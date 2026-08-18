'use client';

import type { FC } from 'react';
import { useEffect } from 'react';
import { KEYBOARD_ROWS, MAX_GUESSES, type LetterStatus } from './types';
import { useWordle } from './useWordle';

const STATUS_CLASS: Record<LetterStatus, string> = {
  correct: 'bg-success text-success-content border-success',
  present: 'bg-warning text-warning-content border-warning',
  absent: 'bg-neutral text-neutral-content border-neutral',
};

const TILE_BASE =
  'border-base-content/30 flex aspect-square items-center justify-center rounded border-2 text-lg font-bold uppercase';

export interface WordleProps {
  /** Overrides the daily answer; used by tests and practice mode. */
  initialAnswer?: string;
}

export const Wordle: FC<WordleProps> = ({ initialAnswer }) => {
  const wordle = useWordle(initialAnswer);
  const {
    answerLength,
    guesses,
    current,
    keyboard,
    status,
    message,
    pressLetter,
    pressBackspace,
    pressEnter,
    newGame,
  } = wordle;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (/^[a-zA-Z]$/.test(event.key)) {
        pressLetter(event.key);
      } else if (event.key === 'Enter') {
        pressEnter();
      } else if (event.key === 'Backspace') {
        pressBackspace();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [pressLetter, pressEnter, pressBackspace]);

  const rowWord = (row: number): string =>
    guesses[row]?.word ??
    (row === guesses.length && status === 'playing' ? current : '');

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="flex w-full max-w-md items-center justify-between">
        <h1 className="text-xl font-bold">Country Wordle</h1>
        <button
          type="button"
          className="btn btn-outline btn-sm"
          onClick={() => newGame()}
          data-testid="wordle-new-game">
          New game
        </button>
      </div>

      {status !== 'playing' ? (
        <div
          className={`alert ${status === 'won' ? 'alert-success' : 'alert-error'} py-2 text-sm`}
          role="status"
          data-testid="wordle-status">
          {status === 'won'
            ? `Correct! Solved in ${guesses.length} guess${guesses.length > 1 ? 'es' : ''}.`
            : message}
        </div>
      ) : null}
      {message && status === 'playing' ? (
        <p
          className="text-warning text-sm font-semibold"
          role="alert"
          data-testid="wordle-message">
          {message}
        </p>
      ) : null}

      <div
        className="grid w-full max-w-md gap-1"
        style={{ gridTemplateColumns: `repeat(${answerLength}, 1fr)` }}
        data-testid="wordle-board">
        {Array.from({ length: MAX_GUESSES }, (_, row) =>
          Array.from({ length: answerLength }, (_, column) => {
            const word = rowWord(row);
            const letter = word[column] ?? '';
            const tileStatus = guesses[row]?.statuses[column];
            return (
              <div
                key={`${row}-${column}`}
                className={`${TILE_BASE} ${
                  tileStatus ? STATUS_CLASS[tileStatus] : 'bg-base-100'
                }`}
                data-testid={`wordle-tile-${row}-${column}`}>
                {letter}
              </div>
            );
          })
        )}
      </div>

      <div className="flex w-full max-w-md flex-col items-center gap-1">
        {KEYBOARD_ROWS.map((keys, rowIndex) => (
          <div key={rowIndex} className="flex w-full justify-center gap-1">
            {rowIndex === KEYBOARD_ROWS.length - 1 ? (
              <button
                type="button"
                className="btn btn-neutral btn-xs flex-1 font-bold"
                onClick={pressEnter}
                data-testid="wordle-enter">
                ENTER
              </button>
            ) : null}
            {Array.from(keys).map((key) => (
              <button
                key={key}
                type="button"
                className={`btn btn-xs flex-1 font-bold ${
                  keyboard[key] ? STATUS_CLASS[keyboard[key]] : 'bg-base-200'
                }`}
                onClick={() => pressLetter(key)}
                data-testid={`wordle-key-${key}`}>
                {key}
              </button>
            ))}
            {rowIndex === KEYBOARD_ROWS.length - 1 ? (
              <button
                type="button"
                className="btn btn-neutral btn-xs flex-1 font-bold"
                onClick={pressBackspace}
                data-testid="wordle-backspace">
                DEL
              </button>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};
