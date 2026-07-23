import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { CHOICES, Choice, Result, play, randomChoice } from './utils';

export const RockPaperScissors: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [score, setScore] = useState(0);
  const [games, setGames] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  const handleChoice = useCallback((choice: Choice) => {
    const comp = randomChoice();
    setPlayerChoice(choice);
    setComputerChoice(comp);
    const res = play(choice, comp);
    setResult(res);
    setGames((g) => g + 1);
    if (res === 'win') {
      setScore((s) => s + 1);
      setStreak((s) => {
        const next = s + 1;
        setBestStreak((b) => Math.max(b, next));
        return next;
      });
    } else if (res === 'lose') {
      setStreak(0);
    }
  }, []);

  const reset = useCallback(() => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setScore(0);
    setGames(0);
    setStreak(0);
    setBestStreak(0);
    containerRef.current?.focus();
  }, []);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'r') {
        reset();
        return;
      }
      const idx = Number(e.key);
      if (idx >= 1 && idx <= CHOICES.length) {
        handleChoice(CHOICES[idx - 1].value);
      }
    },
    [onClose, handleChoice, reset]
  );

  const resultBg =
    result === 'win'
      ? 'bg-success/10 border-success/30'
      : result === 'lose'
        ? 'bg-error/10 border-error/30'
        : 'bg-base-200 border-base-300';

  const resultLabel =
    result === 'win'
      ? 'You win!'
      : result === 'lose'
        ? 'You lose!'
        : result === 'draw'
          ? 'Draw!'
          : '';

  return (
    <FullScreen onClose={onClose} title="Rock Paper Scissors">
      <div
        ref={containerRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 outline-none">
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

        <div className="mx-auto flex w-full max-w-xs flex-col-reverse items-center gap-3 sm:flex-row">
          <div
            className={`flex aspect-square w-full flex-col items-center justify-center gap-1 rounded-xl border transition-colors sm:flex-1 ${resultBg}`}>
            <span className="text-[10px] font-normal tracking-widest uppercase opacity-40">
              You
            </span>
            <span className="text-4xl">
              {playerChoice
                ? CHOICES.find((c) => c.value === playerChoice)!.emoji
                : '❔'}
            </span>
          </div>

          <span className="text-sm font-normal opacity-30">vs</span>

          <div
            className={`flex aspect-square w-full flex-col items-center justify-center gap-1 rounded-xl border transition-colors sm:flex-1 ${resultBg}`}>
            <span className="text-[10px] font-normal tracking-widest uppercase opacity-40">
              Bot
            </span>
            <span className="text-4xl">
              {computerChoice
                ? CHOICES.find((c) => c.value === computerChoice)!.emoji
                : '❔'}
            </span>
          </div>
        </div>

        {resultLabel && (
          <p
            className={`text-center text-sm font-normal ${
              result === 'win'
                ? 'text-success'
                : result === 'lose'
                  ? 'text-error'
                  : 'text-base-content/60'
            }`}>
            {resultLabel}
          </p>
        )}

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {CHOICES.map((c, i) => (
            <button
              key={c.value}
              onClick={() => handleChoice(c.value)}
              className={`btn btn-sm ${
                playerChoice === c.value ? 'btn-active' : ''
              }`}>
              <span className="text-xl">{c.emoji}</span>
              <span className="text-[10px] opacity-40">{i + 1}</span>
            </button>
          ))}
        </div>

        <button onClick={reset} className="btn btn-primary btn-sm">
          Reset
        </button>

        <p className="text-center text-xs opacity-40">
          1–{CHOICES.length} pick · R reset · Esc close
        </p>
      </div>
    </FullScreen>
  );
};
RockPaperScissors.displayName = 'RockPaperScissors';
