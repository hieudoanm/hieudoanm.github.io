import type { FC } from 'react';
import {
  bestResponseSummary,
  cellLabel,
  dominantSummary,
  hasPureNash,
  isCellNash,
  nashSummary,
  quizFeedback,
} from './game';
import type { Cell, Game, Review } from './types';

export const ReviewPanel: FC<{ game: Game; review: Review }> = ({
  game,
  review,
}) => (
  <div
    data-testid="review"
    className="card border-base-content/10 flex flex-col gap-2 border p-4 text-sm">
    <div className="flex items-center justify-between">
      <span className="font-semibold">
        Cell {cellLabel(game, review.cell.row, review.cell.col)}
      </span>
      {review.isNash && <span className="badge badge-success">Nash</span>}
    </div>
    <div className="flex gap-4">
      <span>
        Row payoff: <strong data-testid="payoff-a">{review.payoffA}</strong>
      </span>
      <span>
        Col payoff: <strong data-testid="payoff-b">{review.payoffB}</strong>
      </span>
    </div>
    <p className="text-base-content/70">
      Best response: {bestResponseSummary(review, game)}
    </p>
    <p className="text-base-content/70">{dominantSummary(review, game)}</p>
    <p className="text-base-content/70">{nashSummary(game, review.nash)}</p>
    <p className="text-base-content/50 text-xs">{game.note}</p>
  </div>
);

export const QuizPanel: FC<{
  game: Game;
  lastGuess: Cell | null;
  attempts: number;
  correct: number;
}> = ({ game, lastGuess, attempts, correct }) => {
  const solved =
    lastGuess !== null &&
    (hasPureNash(game) ? isCellNash(game, lastGuess.row, lastGuess.col) : true);
  return (
    <div className="card border-base-content/10 flex flex-col gap-2 border p-4 text-sm">
      <div className="flex items-center justify-between">
        <span className="font-semibold">Find the NE</span>
        <span>
          {correct} found in {attempts} tries
        </span>
      </div>
      <p className="text-base-content/70">
        Click the cell of a pure-strategy Nash equilibrium. In games with none,
        any click proves the point.
      </p>
      {lastGuess && (
        <p className={solved ? 'text-success' : 'text-warning'}>
          {quizFeedback(game, lastGuess)}
        </p>
      )}
    </div>
  );
};
