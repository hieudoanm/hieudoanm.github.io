import { FC, useMemo, useRef, useState } from 'react';
import { createGame } from '@chess/ts';
import { Chessboard } from '../../organisms/chess/ChessBoard';
import { TACTICS_PUZZLES } from '../data/puzzles';
import { bestMoveFrom } from '../utils/tactics';

export const TacticsTab: FC = () => {
  const puzzles = useMemo(
    () =>
      TACTICS_PUZZLES.filter(
        (p) => bestMoveFrom(createGame(p.fen), 12) !== null
      ),
    []
  );
  const [index, setIndex] = useState(0);
  const [solved, setSolved] = useState<boolean | null>(null);
  const [lastMove, setLastMove] = useState<string | null>(null);
  const scoreRef = useRef(0);
  const [score, setScore] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const puzzle = puzzles[index % puzzles.length] ?? null;

  const advance = (correct: boolean) => {
    if (correct) {
      scoreRef.current += 1;
      setScore(scoreRef.current);
    }
    setSolved(correct);
    window.setTimeout(
      () => {
        setSolved(null);
        setLastMove(null);
        setRevealed(false);
        setIndex((i) => i + 1);
      },
      correct ? 900 : 1200
    );
  };

  const handleDrop = (
    sourceSquare: string,
    targetSquare: string | null
  ): boolean => {
    if (!targetSquare) return false;
    if (!puzzle || solved !== null) return false;
    const state = createGame(puzzle.fen);
    const best = bestMoveFrom(state, 12);
    if (!best) return false;
    if (
      String(best.from) === sourceSquare &&
      String(best.to) === targetSquare
    ) {
      setLastMove(`${sourceSquare}${targetSquare}`);
      advance(true);
      return true;
    }
    setLastMove(`${sourceSquare}${targetSquare}`);
    advance(false);
    return true;
  };

  if (!puzzle) {
    return <p className="text-sm opacity-70">No verified tactics.</p>;
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
      <div className="card bg-base-200 p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Tactics</h3>
          <span className="badge badge-primary badge-sm">{puzzle.rating}</span>
        </div>
        <div className="mt-3 space-y-1 text-sm">
          <p className="opacity-70">
            Puzzle {index + 1} of {puzzles.length}
          </p>
          <p>
            Score: <span className="font-semibold tabular-nums">{score}</span>
          </p>
          <button
            onClick={() => setRevealed(true)}
            className="btn btn-outline btn-xs mt-2">
            Reveal hint
          </button>
          {revealed && <p className="text-warning text-xs">{puzzle.hint}</p>}
        </div>
        <button
          onClick={() => {
            scoreRef.current = 0;
            setScore(0);
            setIndex(0);
            setSolved(null);
            setLastMove(null);
            setRevealed(false);
          }}
          className="btn btn-ghost btn-xs mt-3">
          Reset
        </button>
      </div>

      <div className="card bg-base-200 p-4">
        <Chessboard
          position={puzzle.fen}
          allowDragging
          onPieceDrop={({ sourceSquare, targetSquare }) =>
            handleDrop(sourceSquare, targetSquare)
          }
        />
        {solved !== null && (
          <div
            className={`alert mt-3 text-sm ${
              solved ? 'alert-success' : 'alert-error'
            }`}>
            {solved
              ? 'Correct!'
              : 'Not the best move — try again on the next one.'}
          </div>
        )}
        {lastMove && !solved && (
          <p className="mt-2 text-xs opacity-60">
            You played {lastMove}. The engine evaluates with depth 12.
          </p>
        )}
      </div>
    </div>
  );
};
TacticsTab.displayName = 'TacticsTab';
