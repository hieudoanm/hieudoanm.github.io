'use client';

import type { FC } from 'react';
import { useConnections } from './useConnections';
import { MAX_MISTAKES } from './utils';

export interface ConnectionsProps {
  /** Overrides the daily date key; used by tests. */
  dateKey?: string;
}

export const Connections: FC<ConnectionsProps> = ({ dateKey }) => {
  const {
    puzzleId,
    tiles,
    solved,
    selected,
    mistakesLeft,
    status,
    message,
    toggle,
    shuffle,
    deselectAll,
    submit,
    nextPuzzle,
  } = useConnections(dateKey);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="flex w-full max-w-lg items-center justify-between">
        <h1 className="text-xl font-bold">Country Connections</h1>
        <span className="text-base-content/60 text-sm">Puzzle #{puzzleId}</span>
      </div>
      <p className="text-base-content/60 text-center text-xs">
        Find four groups of four related countries. You have {MAX_MISTAKES}{' '}
        guesses.
      </p>

      {status === 'won' ? (
        <div
          className="alert alert-success py-2 text-sm"
          role="status"
          data-testid="connections-status">
          Perfect! You found every connection.
          <button
            type="button"
            className="btn btn-sm ml-2"
            onClick={nextPuzzle}>
            Next puzzle
          </button>
        </div>
      ) : null}
      {status === 'lost' ? (
        <div
          className="alert alert-error py-2 text-sm"
          role="alert"
          data-testid="connections-status">
          Out of guesses — the remaining groups are shown below.
        </div>
      ) : null}

      <div
        className="flex w-full flex-col gap-2"
        data-testid="connections-solved">
        {solved.map((group) => (
          <div
            key={group.label}
            className={`rounded-md p-3 text-center ${group.color}`}>
            <p className="text-sm font-bold uppercase">{group.label}</p>
            <p className="text-sm font-semibold">{group.members.join(', ')}</p>
          </div>
        ))}
      </div>

      <div
        className="grid w-full max-w-lg grid-cols-4 gap-2"
        data-testid="connections-grid">
        {tiles.map(({ country }) => {
          const isSelected = selected.includes(country);
          return (
            <button
              key={country}
              type="button"
              className={`btn btn-sm h-16 text-xs font-bold whitespace-normal uppercase ${
                isSelected ? 'btn-primary' : 'bg-base-200'
              }`}
              onClick={() => toggle(country)}
              data-testid={`tile-${country}`}>
              {country}
            </button>
          );
        })}
      </div>

      <p
        className="text-error min-h-5 text-sm font-semibold"
        aria-live="polite"
        data-testid="connections-message">
        {message}
      </p>

      <div className="flex items-center gap-2">
        <span className="text-sm">
          Mistakes remaining: {'●'.repeat(mistakesLeft)}
          {'○'.repeat(MAX_MISTAKES - mistakesLeft)}
        </span>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          className="btn btn-outline btn-sm"
          onClick={shuffle}
          disabled={status !== 'playing'}
          data-testid="connections-shuffle">
          Shuffle
        </button>
        <button
          type="button"
          className="btn btn-outline btn-sm"
          onClick={deselectAll}
          disabled={selected.length === 0 || status !== 'playing'}
          data-testid="connections-deselect">
          Deselect all
        </button>
        <button
          type="button"
          className="btn btn-primary btn-sm px-6"
          onClick={submit}
          disabled={status !== 'playing'}
          data-testid="connections-submit">
          Submit
        </button>
      </div>
      {status === 'lost' ? (
        <button
          type="button"
          className="btn btn-sm"
          onClick={nextPuzzle}
          data-testid="connections-next-lost">
          Next puzzle
        </button>
      ) : null}
    </div>
  );
};
