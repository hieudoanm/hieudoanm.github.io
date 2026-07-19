import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GameInstructions } from '../_shared/GameInstructions';
import { GAME_DATA } from '../_shared/gameData';
import { CHOICES, Choice, Result, play, randomChoice } from './utils';

export const RockPaperScissors: FC = () => {
  const router = useRouter();
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [score, setScore] = useState(0);
  const [games, setGames] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [helpOpen, setHelpOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const data = GAME_DATA['rock-paper-scissors'];

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
        router.push('/');
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
    [router, handleChoice, reset]
  );

  const resultLabel =
    result === 'win'
      ? 'YOU WIN!'
      : result === 'lose'
        ? 'YOU LOSE!'
        : result === 'draw'
          ? 'DRAW!'
          : '';

  return (
    <>
      <div
        ref={containerRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 outline-none">
        <div className="flex items-center justify-between text-[8px]">
          <span>
            SCORE:{' '}
            <strong>
              {score} / {games}
            </strong>
            {games > 0 && (
              <span className="text-base-content/40 ml-1">
                ({Math.round((score / games) * 100)}%)
              </span>
            )}
          </span>
          <span className="text-base-content/40">
            STREAK: <strong>{streak}</strong> / BEST:{' '}
            <strong>{bestStreak}</strong>
          </span>
        </div>

        <div className="mx-auto flex w-full max-w-xs flex-col-reverse items-center gap-3 sm:flex-row">
          <div className="border-base-content/20 flex aspect-square w-full flex-col items-center justify-center gap-2 border-2 sm:flex-1">
            <span className="text-base-content/40 text-[8px]">YOU</span>
            <span className="text-primary text-2xl font-bold">
              {playerChoice
                ? CHOICES.find((c) => c.value === playerChoice)!.label
                : '???'}
            </span>
          </div>

          <span className="text-base-content/20 text-[8px]">VS</span>

          <div className="border-base-content/20 flex aspect-square w-full flex-col items-center justify-center gap-2 border-2 sm:flex-1">
            <span className="text-base-content/40 text-[8px]">BOT</span>
            <span className="text-primary text-2xl font-bold">
              {computerChoice
                ? CHOICES.find((c) => c.value === computerChoice)!.label
                : '???'}
            </span>
          </div>
        </div>

        {resultLabel && (
          <p
            className={`text-center text-[8px] font-bold ${
              result === 'win'
                ? 'text-primary'
                : result === 'lose'
                  ? 'text-base-content/40'
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
              className={`border-2 p-2 text-[8px] font-bold transition-colors ${
                playerChoice === c.value
                  ? 'bg-primary text-primary-content'
                  : 'border-base-content/20 text-base-content hover:border-primary hover:text-primary'
              }`}>
              <span>{c.label}</span>
              <span className="text-base-content/40 ml-1">{i + 1}</span>
            </button>
          ))}
        </div>

        <button
          onClick={reset}
          className="bg-primary text-primary-content hover:bg-primary/80 w-full p-2 text-[8px] font-bold transition-colors">
          RESET
        </button>

        <p className="text-base-content/30 text-center text-[8px]">
          1-3 PICK / R RESET / ESC BACK
        </p>
      </div>

      <GameInstructions
        isOpen={helpOpen}
        onClose={() => setHelpOpen(false)}
        title={data.title}
        subtitle={data.subtitle}
        instructions={data.instructions}
        visualization={data.visualization}
      />
    </>
  );
};
RockPaperScissors.displayName = 'RockPaperScissors';
