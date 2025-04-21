import { calculate, Score, TimeClass } from '@web/utils/chess/elo';
import { ChangeEvent, useState } from 'react';

export const ChessEloCalculator = () => {
  const [formula, setFormula] = useState<{
    ratingPlayer: number;
    ratingOpponent: number;
    ratingNew: number;
    score: Score;
    timeClass: TimeClass;
    lessThan30Games: boolean;
    overRating2400: boolean;
    overAge18: boolean;
  }>({
    ratingPlayer: 1000,
    ratingOpponent: 1000,
    ratingNew: 1000,
    score: Score.DRAW,
    timeClass: TimeClass.CLASSICAL,
    lessThan30Games: false,
    overRating2400: false,
    overAge18: true,
  });

  return (
    <div className="flex w-full max-w-sm flex-col gap-y-2 rounded border border-gray-700 p-4">
      <div className="flex w-full items-center gap-x-2">
        <label htmlFor="ratingPlayer" className="text-sm font-bold">
          Your Rating
        </label>
        <input
          type="number"
          id="ratingPlayer"
          name="ratingPlayer"
          placeholder="Player Rating"
          className="grow text-right"
          value={formula.ratingPlayer}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setFormula({
              ...formula,
              ratingPlayer: parseInt(event.target.value, 10),
            });
          }}
        />
      </div>
      <div className="flex w-full items-center gap-x-2">
        <label htmlFor="ratingOpponent" className="text-sm font-bold">
          Opponent Rating
        </label>
        <input
          type="number"
          id="ratingOpponent"
          name="ratingOpponent"
          placeholder="Opponent Rating"
          className="grow text-right"
          value={formula.ratingOpponent}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setFormula({
              ...formula,
              ratingOpponent: parseInt(event.target.value, 10),
            });
          }}
        />
      </div>
      <div className="flex w-full items-center gap-x-2">
        <label htmlFor="score" className="text-sm font-bold">
          Score
        </label>
        <select
          id="score"
          name="score"
          className="grow appearance-none text-right"
          value={formula.score}
          onChange={(event: ChangeEvent<HTMLSelectElement>) => {
            setFormula({
              ...formula,
              score: parseFloat(event.target.value) as Score,
            });
          }}>
          <option disabled>Score</option>
          <option value={Score.WIN}>Win (1)</option>
          <option value={Score.DRAW}>Draw (0.5)</option>
          <option value={Score.LOSS}>Loss (0)</option>
        </select>
      </div>
      <div className="flex w-full items-center gap-x-2">
        <label htmlFor="age" className="text-sm font-bold">
          Age Class
        </label>
        <select
          id="age"
          name="age"
          className="grow appearance-none text-right"
          value={formula.overAge18.toString()}
          onChange={(event: ChangeEvent<HTMLSelectElement>) => {
            setFormula({
              ...formula,
              overAge18: Boolean(event.target.value),
            });
          }}>
          <option disabled>Age</option>
          <option value="true">Over 18</option>
          <option value="false">Under 18</option>
        </select>
      </div>
      <div className="flex w-full items-center gap-x-2">
        <label htmlFor="timeClass" className="text-sm font-bold">
          Time Class
        </label>
        <select
          id="timeClass"
          name="timeClass"
          className="grow appearance-none text-right"
          value={formula.timeClass}
          onChange={(event: ChangeEvent<HTMLSelectElement>) => {
            setFormula({
              ...formula,
              timeClass: event.target.value as TimeClass,
            });
          }}>
          <option disabled>Time Class</option>
          <option value={TimeClass.CLASSICAL}>Classical</option>
          <option value={TimeClass.RAPID}>Rapid</option>
          <option value={TimeClass.BLITZ}>Blitz</option>
        </select>
      </div>
      <div className="flex w-full items-center gap-x-2">
        <label htmlFor="rating" className="text-sm font-bold">
          Rating Class
        </label>
        <select
          id="rating"
          name="rating"
          className="grow appearance-none text-right"
          value={formula.overRating2400.toString()}
          onChange={(event: ChangeEvent<HTMLSelectElement>) => {
            setFormula({
              ...formula,
              overRating2400: Boolean(event.target.value),
            });
          }}>
          <option disabled>Rating</option>
          <option value="true">Over 2400</option>
          <option value="false">Under 2400</option>
        </select>
      </div>
      <div className="flex w-full items-center gap-x-2">
        <label htmlFor="games" className="text-sm font-bold">
          Number of Games
        </label>
        <select
          id="games"
          name="games"
          className="grow appearance-none text-right"
          value={formula.lessThan30Games.toString()}
          onChange={(event: ChangeEvent<HTMLSelectElement>) => {
            setFormula({
              ...formula,
              lessThan30Games: Boolean(event.target.value),
            });
          }}>
          <option disabled>Number of Games</option>
          <option value="false">Under 30</option>
          <option value="true">Over 30</option>
        </select>
      </div>
      <button
        type="button"
        className="w-full cursor-pointer rounded bg-red-500 py-2 font-semibold text-gray-100"
        onClick={() => {
          const ratingNew = calculate(formula);
          setFormula((previous) => ({ ...previous, ratingNew }));
        }}>
        Calculate
      </button>
      <div className="flex w-full items-center gap-x-2">
        <label htmlFor="ratingNew" className="text-sm font-bold">
          New Rating
        </label>
        <input
          type="number"
          id="ratingNew"
          name="ratingNew"
          placeholder="New Rating"
          className="grow text-right"
          value={formula.ratingNew}
          readOnly
          disabled
        />
      </div>
    </div>
  );
};
