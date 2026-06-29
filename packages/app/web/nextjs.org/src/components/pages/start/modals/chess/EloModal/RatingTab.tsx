import { calculateRating, Score } from '@chess/ts';
import { FC } from 'react';
import { Formula } from './types';

export const RatingTab: FC<{
  formula: Formula;
  setFormula: (f: Formula) => void;
}> = ({ formula, setFormula }) => {
  return (
    <div className="space-y-3">
      <div className="form-control">
        <label className="label mb-1 p-0">
          <span className="label-text text-xs font-medium opacity-70">
            Your Rating
          </span>
        </label>
        <input
          type="number"
          className="input input-sm input-bordered w-full text-right"
          value={formula.ratingPlayer}
          onChange={(e) =>
            setFormula({
              ...formula,
              ratingPlayer: Number.parseInt(e.target.value, 10),
            })
          }
        />
      </div>

      <div className="form-control">
        <label className="label mb-1 p-0">
          <span className="label-text text-xs font-medium opacity-70">
            Opponent Rating
          </span>
        </label>
        <input
          type="number"
          className="input input-sm input-bordered w-full text-right"
          value={formula.ratingOpponent}
          onChange={(e) =>
            setFormula({
              ...formula,
              ratingOpponent: Number.parseInt(e.target.value, 10),
            })
          }
        />
      </div>

      <div className="form-control">
        <label className="label mb-1 p-0">
          <span className="label-text text-xs font-medium opacity-70">
            Score
          </span>
        </label>
        <select
          className="select select-sm select-bordered w-full text-right"
          value={formula.score}
          onChange={(e) =>
            setFormula({ ...formula, score: e.target.value as Score })
          }>
          <option value={Score.WIN}>Win</option>
          <option value={Score.DRAW}>Draw</option>
          <option value={Score.LOSS}>Loss</option>
        </select>
      </div>

      <button
        className="btn btn-primary btn-sm w-full"
        onClick={() => {
          const ratingNew = calculateRating(formula);
          setFormula({ ...formula, ratingNew });
        }}>
        Calculate Rating
      </button>

      <div className="form-control mt-4">
        <label className="label mb-1 p-0">
          <span className="label-text text-xs font-medium opacity-70">
            New Rating
          </span>
        </label>
        <input
          type="number"
          className="input input-sm input-bordered w-full text-right font-bold"
          value={formula.ratingNew}
          readOnly
        />
      </div>
    </div>
  );
};
RatingTab.displayName = 'RatingTab';
