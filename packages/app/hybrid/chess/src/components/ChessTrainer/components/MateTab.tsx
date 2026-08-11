import { FC, useMemo, useState } from 'react';
import type { GameState } from '@chess/ts';
import { createGame, makeMove, toFen } from '@chess/ts';
import { Chessboard } from '../../organisms/chess/ChessBoard';
import { MATE_IN_2_PUZZLES, MATE_PUZZLES } from '../data/mates';
import type { TacticsPuzzle } from '../types';
import { isCheckmate, legalMoveFor, mateInN } from '../utils/endgame';
import { bestMoveFrom } from '../utils/tactics';

export const MateTab: FC = () => {
  const inTwo = useMemo(
    () => MATE_IN_2_PUZZLES.filter((p) => mateInN(p.fen, 2)),
    []
  );
  const puzzles: TacticsPuzzle[] = useMemo(
    () => [...MATE_PUZZLES.filter((p) => mateInN(p.fen, 1)), ...inTwo],
    [inTwo]
  );
  const [index, setIndex] = useState(0);
  const [game, setGame] = useState<GameState>(() =>
    createGame((puzzles[0] ?? MATE_PUZZLES[0])!.fen)
  );
  const [solved, setSolved] = useState(false);
  const [thinking, setThinking] = useState(false);

  const puzzle = puzzles[index % Math.max(1, puzzles.length)] ?? null;

  const next = () => {
    setSolved(false);
    setIndex((i) => i + 1);
    setGame(createGame(puzzles[(index + 1) % Math.max(1, puzzles.length)]?.fen ?? ''));
  };

  const engineReply = (state: GameState) => {
    setThinking(true);
    window.setTimeout(() => {
      const best = bestMoveFrom(state, 10);
      if (best) {
        const move = legalMoveFor(state, best.from, best.to);
        if (move) {
          const nextState = makeMove(state, move);
          setGame(nextState);
          if (isCheckmate(nextState)) {
            setSolved(true);
            window.setTimeout(next, 1100);
          }
        }
      }
      setThinking(false);
    }, 60);
  };

  const handleDrop = (sourceSquare: string, targetSquare: string | null): boolean => {
    if (!targetSquare) return false;
    if (!puzzle || solved || thinking) return false;
    const move = legalMoveFor(game, sourceSquare, targetSquare);
    if (!move) return false;
    const nextState = makeMove(game, move);
    setGame(nextState);
    if (isCheckmate(nextState)) {
      setSolved(true);
      window.setTimeout(next, 1100);
    } else {
      engineReply(nextState);
    }
    return true;
  };

  if (!puzzle) {
    return <p className="text-sm opacity-70">No verified mate puzzles.</p>;
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
      <div className="card bg-base-200 p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Mates</h3>
          <span className="badge badge-primary badge-sm">{puzzle.rating}</span>
        </div>
        <p className="mt-2 text-xs opacity-70">
          Deliver checkmate. {puzzle.id.startsWith('m2') ? 'Mate in 2.' : 'Mate in 1.'}
        </p>
        <p className="mt-2 text-xs text-warning">{puzzle.hint}</p>
        <div className="mt-3 flex gap-2">
          <button onClick={next} className="btn btn-outline btn-sm">
            Skip
          </button>
          <button
            onClick={() => setGame(createGame(puzzle.fen))}
            className="btn btn-ghost btn-sm">
            Restart
          </button>
        </div>
      </div>

      <div className="card bg-base-200 p-4">
        <Chessboard
          position={toFen(game)}
          allowDragging={!solved && !thinking}
          onPieceDrop={({ sourceSquare, targetSquare }) =>
            handleDrop(sourceSquare, targetSquare)
          }
        />
        <div className="mt-3 flex items-center gap-2 text-sm">
          {solved && <span className="badge badge-success">Checkmate!</span>}
          {thinking && <span className="loading loading-spinner loading-xs" />}
          {!solved && !thinking && (
            <span className="opacity-70">
              Puzzle {index + 1} of {puzzles.length}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
MateTab.displayName = 'MateTab';
