import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';
import { countries } from '@hieudoanm.github.io/data/countries';
import { FC, useCallback, useState } from 'react';

const OPTIONS_COUNT = 4;
const POPULAR = countries
  .filter((c) => c.rank > 0)
  .sort((a, b) => a.rank - b.rank)
  .slice(0, 80);
const POOL = POPULAR.length > 0 ? POPULAR : countries;

const pickOptions = (
  correct: (typeof countries)[number]
): (typeof countries)[number][] => {
  const others = countries.filter(
    (c) => c.name !== correct.name && c.flag !== correct.flag
  );
  const shuffled = [...others]
    .sort(() => Math.random() - 0.5)
    .slice(0, OPTIONS_COUNT - 1);
  const options = [...shuffled, correct];
  return options.sort(() => Math.random() - 0.5);
};

export const FlagGuesser: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [current, setCurrent] = useState(
    () => POOL[Math.floor(Math.random() * POOL.length)]
  );
  const [options, setOptions] = useState(() => pickOptions(current));
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [message, setMessage] = useState<{
    text: string;
    correct: boolean;
  } | null>(null);
  const [revealed, setRevealed] = useState(false);

  const nextRound = useCallback(() => {
    const next = POOL[Math.floor(Math.random() * POOL.length)];
    setCurrent(next);
    setOptions(pickOptions(next));
    setMessage(null);
    setRevealed(false);
  }, []);

  const guess = useCallback(
    (name: string) => {
      if (message) return;
      const correct = name === current.name;
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
        setRevealed(true);
        setMessage({ text: `Wrong! It was ${current.name}`, correct: false });
      }
    },
    [message, current]
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= OPTIONS_COUNT) {
        guess(options[num - 1].name);
      }
      if (e.key === 'Enter' && message) {
        nextRound();
      }
    },
    [onClose, guess, message, nextRound, options]
  );

  return (
    <FullScreen onClose={onClose} title="Flag Guesser">
      <div
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="mx-auto flex w-80 flex-col gap-4 outline-none">
        <div className="flex items-center justify-between text-sm">
          <span>
            Score: <strong>{score}</strong>
          </span>
          <span className="opacity-60">
            Streak: <strong>{streak}</strong> / Best:{' '}
            <strong>{bestStreak}</strong>
          </span>
        </div>

        <div className="bg-base-200 flex items-center justify-center rounded-xl py-10">
          <span className="text-7xl leading-none">{current.flag}</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {options.map((c, i) => {
            const isCorrect = c.name === current.name;
            const showCorrect = message && isCorrect;
            const showWrong =
              message && !isCorrect && revealed && c.name !== current.name;
            return (
              <button
                key={c.name}
                onClick={() => guess(c.name)}
                disabled={!!message}
                className={`btn btn-sm justify-start gap-2 ${showCorrect ? 'btn-success' : showWrong ? 'btn-ghost opacity-40' : message ? 'btn-ghost' : 'btn-outline'}`}>
                <span className="text-xs opacity-40">{i + 1}</span>
                <span className="truncate">{c.name}</span>
              </button>
            );
          })}
        </div>

        {message && (
          <div className="flex flex-col items-center gap-2">
            <div
              className={`text-sm font-normal ${message.correct ? 'text-success' : 'text-error'}`}>
              {message.text}
              {!message.correct && (
                <span className="ml-2 text-base">{current.flag}</span>
              )}
            </div>
            <button
              onClick={nextRound}
              className="btn btn-primary btn-sm w-full">
              Next Flag
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
FlagGuesser.displayName = 'FlagGuesser';
