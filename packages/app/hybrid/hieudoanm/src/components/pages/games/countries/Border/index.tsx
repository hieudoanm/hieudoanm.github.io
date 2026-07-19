'use client';

import { countries } from '@hieudoanm.github.io/data/countries';
import { FC, useCallback, useMemo, useState } from 'react';
import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';
import { borders } from './borders';

const OPTIONS_COUNT = 4;

const COUNTRY_MAP = new Map(countries.map((c) => [c.name, c]));

const VALID = Object.keys(borders).filter(
  (name) => borders[name].length >= 2 && COUNTRY_MAP.has(name)
);

const POPULAR = countries
  .filter((c) => c.rank > 0 && VALID.includes(c.name))
  .sort((a, b) => a.rank - b.rank)
  .slice(0, 80);

const POOL =
  POPULAR.length > 0 ? POPULAR : VALID.map((n) => COUNTRY_MAP.get(n)!);

const pickQuestion = () => {
  const current = POOL[Math.floor(Math.random() * POOL.length)];
  const neighbors = borders[current.name];
  const correct = neighbors[Math.floor(Math.random() * neighbors.length)];

  const others = VALID.filter(
    (n) => n !== current.name && !neighbors.includes(n)
  );
  const shuffled = [...others]
    .sort(() => Math.random() - 0.5)
    .slice(0, OPTIONS_COUNT - 1);
  const options = [...shuffled, correct].sort(() => Math.random() - 0.5);

  return { current, correct, options };
};

export const Border: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [question, setQuestion] = useState(pickQuestion);
  const [score, setScore] = useState(0);
  const [games, setGames] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [message, setMessage] = useState<{
    text: string;
    correct: boolean;
  } | null>(null);
  const [revealed, setRevealed] = useState(false);

  const { current, correct, options } = question;
  const currentCountry = COUNTRY_MAP.get(current.name);

  const nextRound = useCallback(() => {
    setQuestion(pickQuestion());
    setMessage(null);
    setRevealed(false);
  }, []);

  const guess = useCallback(
    (name: string) => {
      if (message) return;
      const isCorrect = name === correct;
      setGames((g) => g + 1);

      if (isCorrect) {
        setScore((s) => s + 1);
        setStreak((s) => {
          const next = s + 1;
          setBestStreak((b) => Math.max(b, next));
          return next;
        });
        setMessage({ text: 'Correct!', correct: true });
      } else {
        setStreak(0);
        setRevealed(true);
        setMessage({
          text: `Wrong! ${current.name} borders ${correct}`,
          correct: false,
        });
      }
    },
    [message, correct, current.name]
  );

  const onKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= OPTIONS_COUNT) {
        guess(options[num - 1]);
      }
      if ((e.key === 'Enter' || e.key === ' ') && message) {
        e.preventDefault();
        nextRound();
      }
    },
    [onClose, guess, message, nextRound, options]
  );

  const allNeighbors = useMemo(() => borders[current.name], [current.name]);

  return (
    <FullScreen onClose={onClose} title="Border">
      <div
        tabIndex={0}
        onKeyDown={onKey}
        className="mx-auto flex w-80 flex-1 flex-col gap-4 outline-none">
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

        <div className="bg-base-200 flex items-center justify-center gap-3 rounded-xl py-8">
          <span className="text-5xl">{currentCountry?.flag}</span>
          <span className="text-lg font-medium">{current.name}</span>
        </div>

        <p className="text-center text-xs opacity-60">
          Which country does {current.name} border?
        </p>

        <div className="grid grid-cols-2 gap-2">
          {options.map((name, i) => {
            const country = COUNTRY_MAP.get(name);
            const isCorrect = name === correct;
            const showCorrect = message && isCorrect;
            const showWrong =
              message && !isCorrect && revealed && name !== correct;
            return (
              <button
                key={name}
                onClick={() => guess(name)}
                disabled={!!message}
                className={`btn btn-sm justify-start gap-2 ${showCorrect ? 'btn-success' : showWrong ? 'btn-ghost opacity-40' : message ? 'btn-ghost' : 'btn-outline'}`}>
                <span className="text-xs opacity-40">{i + 1}</span>
                <span className="text-lg leading-none">{country?.flag}</span>
                <span className="truncate">{name}</span>
              </button>
            );
          })}
        </div>

        {message && (
          <div className="flex flex-col items-center gap-2">
            <div
              className={`text-sm font-bold ${message.correct ? 'text-success' : 'text-error'}`}>
              {message.text}
            </div>
            {revealed && (
              <p className="text-center text-xs opacity-50">
                Neighbors: {allNeighbors.join(', ')}
              </p>
            )}
            <button
              onClick={nextRound}
              className="btn btn-primary btn-sm w-full">
              Next Country
            </button>
          </div>
        )}

        <p className="text-center text-xs opacity-40">
          1–{OPTIONS_COUNT} pick · Enter next · Esc close
        </p>
      </div>
    </FullScreen>
  );
};
Border.displayName = 'Border';
