import { FC, useCallback, useReducer } from 'react';
import { ActionPicker, GameSelect, MatrixView } from './components';
import { QuizPanel, ReviewPanel } from './panels';
import { createInitialState, gameReducer } from './reducer';
import type { Cell, GameId } from './types';

export const MatrixGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const {
    phase,
    game,
    rowIdx,
    colIdx,
    review,
    quizCell,
    quizAttempts,
    quizCorrect,
  } = state;

  const pickGame = useCallback(
    (gameId: GameId) => dispatch({ type: 'SELECT_GAME', gameId }),
    []
  );
  const pickRow = useCallback(
    (index: number) => dispatch({ type: 'CHOOSE_ROW', index }),
    []
  );
  const pickCol = useCallback(
    (index: number) => dispatch({ type: 'CHOOSE_COL', index }),
    []
  );
  const startQuiz = useCallback(() => dispatch({ type: 'START_QUIZ' }), []);
  const clickCell = useCallback(
    (cell: Cell) => dispatch({ type: 'QUIZ_CLICK', cell }),
    []
  );
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  if (!game) {
    return (
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Matrix Explorer</h2>
        <GameSelect onPick={pickGame} />
      </div>
    );
  }

  const inQuiz = phase === 'quiz';
  const chosen: Cell | null =
    rowIdx !== null && colIdx !== null ? { row: rowIdx, col: colIdx } : null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="badge badge-lg">{game.name}</span>
        <div className="flex gap-2">
          {!inQuiz && (
            <button
              type="button"
              onClick={startQuiz}
              data-testid="start-quiz"
              className="btn btn-outline btn-sm">
              Find the NE
            </button>
          )}
          <button
            type="button"
            onClick={reset}
            data-testid="reset-game"
            className="btn btn-ghost btn-sm">
            New Game
          </button>
        </div>
      </div>

      <ActionPicker
        game={game}
        selectedRow={rowIdx}
        selectedCol={colIdx}
        onRow={pickRow}
        onCol={pickCol}
      />

      <MatrixView
        game={game}
        highlight={review ? review.rowBestToCol : null}
        chosen={chosen}
        nash={inQuiz ? [] : review ? review.nash : []}
        quizMode={inQuiz}
        onPick={clickCell}
      />

      {inQuiz && (
        <QuizPanel
          game={game}
          lastGuess={quizCell}
          attempts={quizAttempts}
          correct={quizCorrect}
        />
      )}
      {!inQuiz && review && <ReviewPanel game={game} review={review} />}
    </div>
  );
};
MatrixGame.displayName = 'MatrixGame';
