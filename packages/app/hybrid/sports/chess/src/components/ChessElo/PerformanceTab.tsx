import { calculatePerformance, Score } from '@chess/ts';
import { FC } from 'react';
import { GameRow } from './types';

export const PerformanceTab: FC<{
  games: GameRow[];
  performance: number;
  updateGame: (index: number, field: keyof GameRow, value: unknown) => void;
  addGame: () => void;
  calcPerformance: () => void;
}> = ({ games, performance, updateGame, addGame, calcPerformance }) => {
  return (
    <div className="space-y-3">
      <div className="max-h-48 space-y-2 overflow-y-auto pr-1">
        {games.map((g, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="text-center">{index + 1}.</span>
            <input
              type="number"
              className="input input-sm input-bordered flex-1"
              value={g.ratingOpponent}
              onChange={(e) =>
                updateGame(
                  index,
                  'ratingOpponent',
                  Number.parseInt(e.target.value, 10)
                )
              }
            />
            <select
              className="select select-sm select-bordered flex-1"
              value={g.score}
              onChange={(e) => updateGame(index, 'score', e.target.value)}>
              <option value={Score.WIN}>Win</option>
              <option value={Score.DRAW}>Draw</option>
              <option value={Score.LOSS}>Loss</option>
            </select>
          </div>
        ))}
      </div>

      <button
        className="btn btn-outline btn-sm border-base-content/20 bg-base-100/10 hover:bg-base-100/20 w-full backdrop-blur"
        onClick={addGame}>
        Add Game
      </button>

      <button
        className="btn btn-primary btn-sm w-full"
        onClick={calcPerformance}>
        Calculate Performance
      </button>

      <div className="form-control mt-4">
        <label className="label mb-1 p-0">
          <span className="label-text text-xs font-normal opacity-70">
            Performance
          </span>
        </label>
        <input
          type="number"
          className="input input-sm input-bordered w-full text-center font-normal"
          value={performance}
          readOnly
        />
      </div>
    </div>
  );
};
PerformanceTab.displayName = 'PerformanceTab';
