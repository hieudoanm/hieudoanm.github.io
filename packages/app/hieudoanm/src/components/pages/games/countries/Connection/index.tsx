'use client';

import { FC, useCallback, useMemo, useState } from 'react';
import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';
import type { Group, Puzzle } from './types';
import { getRandomPuzzle } from './puzzles';

const MAX_MISTAKES = 4;
const GROUP_COLORS = [
  { bg: 'bg-yellow-400', text: 'text-yellow-900', border: 'border-yellow-400' },
  { bg: 'bg-green-400', text: 'text-green-900', border: 'border-green-400' },
  { bg: 'bg-blue-400', text: 'text-blue-900', border: 'border-blue-400' },
  { bg: 'bg-purple-400', text: 'text-purple-900', border: 'border-purple-400' },
];

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const Connection: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [puzzle, setPuzzle] = useState<Puzzle>(getRandomPuzzle);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [solved, setSolved] = useState<Group[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [shuffles, setShuffles] = useState(0);
  const [message, setMessage] = useState<{
    text: string;
    type: 'correct' | 'wrong';
  } | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  const solvedNames = useMemo(
    () => new Set(solved.flatMap((g) => g.countries)),
    [solved]
  );

  const allCountries = useMemo(
    () => shuffle(puzzle.groups.flatMap((g) => g.countries)),
    [puzzle, shuffles]
  );

  const remaining = useMemo(
    () => allCountries.filter((c) => !solvedNames.has(c)),
    [allCountries, solvedNames]
  );

  const oneAway = useMemo(() => {
    if (selected.size !== 4) return false;
    const sel = [...selected];
    return puzzle.groups.some(
      (g) =>
        !solvedNames.has(g.countries[0]) &&
        sel.filter((c) => g.countries.includes(c)).length === 3
    );
  }, [selected, puzzle, solvedNames]);

  const toggle = useCallback(
    (country: string) => {
      if (gameOver || solvedNames.has(country)) return;
      setSelected((prev) => {
        const next = new Set(prev);
        if (next.has(country)) {
          next.delete(country);
        } else if (next.size < 4) {
          next.add(country);
        }
        return next;
      });
    },
    [gameOver, solvedNames]
  );

  const submit = useCallback(() => {
    if (selected.size !== 4 || message) return;

    const sel = [...selected];
    const matched = puzzle.groups.find(
      (g) =>
        !solvedNames.has(g.countries[0]) &&
        sel.every((c) => g.countries.includes(c))
    );

    if (matched) {
      setSolved((prev) => [...prev, matched]);
      setSelected(new Set());
      setMessage({ text: matched.category, type: 'correct' });

      if (solved.length + 1 === 4) {
        setTimeout(() => {
          setWon(true);
          setGameOver(true);
        }, 1000);
      }
    } else {
      setMistakes((m) => {
        const next = m + 1;
        if (next >= MAX_MISTAKES) {
          setGameOver(true);
        }
        return next;
      });
      setSelected(new Set());
      setMessage({
        text: oneAway ? 'One away!' : 'Not quite',
        type: 'wrong',
      });
    }

    setTimeout(() => setMessage(null), 1200);
  }, [selected, message, puzzle, solved, solvedNames, oneAway]);

  const reset = useCallback(() => {
    setPuzzle(getRandomPuzzle());
    setSelected(new Set());
    setSolved([]);
    setMistakes(0);
    setShuffles(0);
    setMessage(null);
    setGameOver(false);
  }, []);

  const onShuffle = useCallback(() => {
    setShuffles((s) => s + 1);
    setSelected(new Set());
  }, []);

  const onDeselect = useCallback(() => setSelected(new Set()), []);

  return (
    <FullScreen onClose={onClose} title="Connection">
      <div
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Escape') onClose();
          if (e.key === 'Enter' && selected.size === 4) submit();
        }}
        className="flex flex-1 flex-col gap-3 overflow-y-auto p-4 outline-none">
        <p className="text-center text-xs opacity-60">
          Group the countries into four sets of four.
        </p>

        <div className="flex flex-col gap-1.5">
          {solved.map((group, i) => {
            const color = GROUP_COLORS[i];
            return (
              <div
                key={group.category}
                className={`flex flex-col items-center rounded-lg py-2 ${color.bg} ${color.text}`}>
                <span className="text-xs font-bold tracking-wider uppercase">
                  {group.category}
                </span>
                <span className="text-[11px] opacity-80">
                  {group.countries.join(', ')}
                </span>
              </div>
            );
          })}

          {gameOver
            ? puzzle.groups
                .filter((g) => !solvedNames.has(g.countries[0]))
                .map((g, i) => {
                  const color = GROUP_COLORS[solved.length + i];
                  return (
                    <div
                      key={g.category}
                      className={`flex flex-col items-center rounded-lg py-2 opacity-60 ${color.bg} ${color.text}`}>
                      <span className="text-xs font-bold tracking-wider uppercase">
                        {g.category}
                      </span>
                      <span className="text-[11px] opacity-80">
                        {g.countries.join(', ')}
                      </span>
                    </div>
                  );
                })
            : Array.from({ length: 4 - solved.length }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="bg-base-200 flex h-12 items-center justify-center rounded-lg border border-dashed opacity-20">
                  <span className="text-xs">??? </span>
                </div>
              ))}
        </div>

        {message && (
          <div
            className={`text-center text-sm font-bold ${
              message.type === 'correct' ? 'text-success' : 'text-error'
            }`}>
            {message.text}
          </div>
        )}

        {!gameOver && (
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
            {remaining.map((country) => {
              const isSelected = selected.has(country);
              return (
                <button
                  key={country}
                  onClick={() => toggle(country)}
                  className={`btn btn-sm h-auto min-h-0 py-2 text-xs whitespace-normal ${
                    isSelected ? 'btn-primary' : 'btn-outline'
                  }`}>
                  {country}
                </button>
              );
            })}
          </div>
        )}

        {gameOver ? (
          <div className="flex flex-col items-center gap-2">
            {won ? (
              <p className="text-success text-sm">You found all 4 groups!</p>
            ) : (
              <p className="text-error text-sm">
                Game Over — {solved.length}/4 groups found
              </p>
            )}
            <button onClick={reset} className="btn btn-accent btn-sm w-full">
              New Game
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={onDeselect}
              disabled={selected.size === 0}
              className="btn btn-outline btn-sm flex-1">
              Deselect
            </button>
            <button
              onClick={onShuffle}
              className="btn btn-outline btn-sm flex-1">
              Shuffle
            </button>
            <button
              onClick={submit}
              disabled={selected.size !== 4}
              className="btn btn-primary btn-sm flex-1">
              Submit
            </button>
          </div>
        )}

        <div className="flex items-center justify-between text-xs opacity-40">
          <span>
            Mistakes: {mistakes}/{MAX_MISTAKES}
          </span>
          {oneAway && <span className="text-warning">One away!</span>}
          <span>Esc close</span>
        </div>
      </div>
    </FullScreen>
  );
};
Connection.displayName = 'Connection';
