'use client';

import { countries } from '@hieudoanm.github.io/data/countries';
import { FC, useCallback, useMemo, useState } from 'react';
import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';
import { population } from './population';

const POPULAR = countries.filter(
  (c) => c.rank > 0 && population[c.name] !== undefined
);

const formatNum = (n: number): string => {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
};

const pickPair = (): [(typeof POPULAR)[number], (typeof POPULAR)[number]] => {
  const a = POPULAR[Math.floor(Math.random() * POPULAR.length)];
  let b = a;
  while (b.name === a.name) {
    b = POPULAR[Math.floor(Math.random() * POPULAR.length)];
  }
  return [a, b];
};

export const HigherOrLower: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [[left, right], setPair] = useState(pickPair);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [games, setGames] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    correct: boolean;
  } | null>(null);

  const leftPop = population[left.name];
  const rightPop = population[right.name];

  const nextRound = useCallback(() => {
    setPair(pickPair());
    setRevealed(false);
    setMessage(null);
  }, []);

  const guess = useCallback(
    (side: 'left' | 'right') => {
      if (revealed) return;
      const correct =
        (side === 'left' && leftPop >= rightPop) ||
        (side === 'right' && rightPop >= leftPop);

      setGames((g) => g + 1);
      setRevealed(true);

      if (correct) {
        setScore((s) => s + 1);
        setStreak((s) => {
          const next = s + 1;
          setBestStreak((b) => Math.max(b, next));
          return next;
        });
        setMessage({ text: 'Correct!', correct: true });
      } else {
        setStreak(0);
        setMessage({ text: 'Wrong!', correct: false });
      }
    },
    [revealed, leftPop, rightPop]
  );

  const onKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'ArrowLeft' || e.key === '1') guess('left');
      if (e.key === 'ArrowRight' || e.key === '2') guess('right');
      if ((e.key === 'Enter' || e.key === ' ') && revealed) {
        e.preventDefault();
        nextRound();
      }
    },
    [onClose, guess, revealed, nextRound]
  );

  const renderCard = useMemo(
    () =>
      ({
        country,
        pop,
        side,
      }: {
        country: (typeof POPULAR)[number];
        pop: number;
        side: 'left' | 'right';
      }) => {
        const isCorrect =
          revealed &&
          ((side === 'left' && leftPop >= rightPop) ||
            (side === 'right' && rightPop >= leftPop));
        const isWrong =
          revealed &&
          ((side === 'left' && leftPop < rightPop) ||
            (side === 'right' && rightPop < leftPop));

        return (
          <button
            onClick={() => guess(side)}
            disabled={revealed}
            className={`flex flex-1 flex-col items-center gap-2 rounded-xl border p-4 transition-colors ${
              isCorrect
                ? 'border-success bg-success/10'
                : isWrong
                  ? 'border-error bg-error/10 opacity-50'
                  : revealed
                    ? 'border-base-300'
                    : 'border-base-300 hover:border-primary cursor-pointer'
            }`}>
            <span className="text-4xl">{country.flag}</span>
            <span className="text-sm font-medium">{country.name}</span>
            {revealed && (
              <span className="text-lg font-bold">{formatNum(pop)}</span>
            )}
          </button>
        );
      },
    [revealed, leftPop, rightPop, guess]
  );

  return (
    <FullScreen onClose={onClose} title="Higher or Lower">
      <div
        tabIndex={0}
        onKeyDown={onKey}
        className="flex flex-1 flex-col gap-4 outline-none">
        <div className="flex items-center justify-between text-sm">
          <span>
            Score:{' '}
            <strong>
              {score} / {games}
            </strong>
            {games > 0 && (
              <span className="ml-1 opacity-40">
                ({Math.round((score / games) * 100)}%)
              </span>
            )}
          </span>
          <span className="opacity-60">
            Streak: <strong>{streak}</strong> / Best:{' '}
            <strong>{bestStreak}</strong>
          </span>
        </div>

        <p className="text-center text-xs opacity-60">
          Which country has a larger population?
        </p>

        <div className="flex gap-3">
          {renderCard({ country: left, pop: leftPop, side: 'left' })}
          <div className="flex items-center">
            <span className="text-sm font-bold opacity-20">VS</span>
          </div>
          {renderCard({ country: right, pop: rightPop, side: 'right' })}
        </div>

        {message && (
          <div className="flex flex-col items-center gap-2">
            <div
              className={`text-sm font-bold ${message.correct ? 'text-success' : 'text-error'}`}>
              {message.text}
            </div>
            <button
              onClick={nextRound}
              className="btn btn-primary btn-sm w-full">
              Next Pair
            </button>
          </div>
        )}

        <p className="text-center text-xs opacity-40">
          ← → pick · Enter next · Esc close
        </p>
      </div>
    </FullScreen>
  );
};
HigherOrLower.displayName = 'HigherOrLower';
