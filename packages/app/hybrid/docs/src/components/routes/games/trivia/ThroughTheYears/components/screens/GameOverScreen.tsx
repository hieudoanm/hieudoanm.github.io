import { FC } from 'react';
import { useGameStore } from '../../store';

export const GameOverScreen: FC<{ onClose: () => void }> = ({ onClose }) => {
  const stats = useGameStore((s) => s.stats);
  const restart = useGameStore((s) => s.restart);
  const reset = useGameStore((s) => s.reset);

  const accuracy =
    stats.totalEvents > 0
      ? Math.round((stats.correctCount / stats.totalEvents) * 100)
      : 0;

  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-6 p-4 md:p-8">
      <h2 className="text-lg font-light tracking-tight">Game Over</h2>

      <div className="grid w-full grid-cols-2 gap-3">
        <div className="bg-base-200 rounded-box flex flex-col items-center p-4">
          <span className="text-base-content/50 text-[10px] tracking-wider uppercase">
            Score
          </span>
          <span className="text-2xl font-light">{stats.score}</span>
        </div>
        <div className="bg-base-200 rounded-box flex flex-col items-center p-4">
          <span className="text-base-content/50 text-[10px] tracking-wider uppercase">
            Accuracy
          </span>
          <span className="text-2xl font-light">{accuracy}%</span>
        </div>
        <div className="bg-base-200 rounded-box flex flex-col items-center p-4">
          <span className="text-base-content/50 text-[10px] tracking-wider uppercase">
            Correct
          </span>
          <span className="text-2xl font-light">
            {stats.correctCount}/{stats.totalEvents}
          </span>
        </div>
        <div className="bg-base-200 rounded-box flex flex-col items-center p-4">
          <span className="text-base-content/50 text-[10px] tracking-wider uppercase">
            Best Streak
          </span>
          <span className="text-2xl font-light">{stats.bestStreak}</span>
        </div>
      </div>

      <div className="flex w-full gap-2">
        <button onClick={restart} className="btn btn-primary flex-1">
          Play Again
        </button>
        <button onClick={reset} className="btn btn-ghost flex-1">
          Change Mode
        </button>
      </div>
      <button onClick={onClose} className="btn btn-outline btn-sm w-full">
        Quit
      </button>
    </div>
  );
};

GameOverScreen.displayName = 'GameOverScreen';
