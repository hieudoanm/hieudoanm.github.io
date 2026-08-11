import { FC, useMemo, useState } from 'react';
import { createGame, toFen } from '@chess/ts';
import { Chessboard } from '../../organisms/chess/ChessBoard';
import type { StoredGame } from '../types';
import { downloadPgn, studyMoves } from '../utils/library';

interface StudyViewProps {
  game: StoredGame;
  onBack: () => void;
  onDelete: () => void;
  onShare: (game: StoredGame) => void;
}

export const StudyView: FC<StudyViewProps> = ({ game, onBack, onDelete, onShare }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const moves = useMemo(() => studyMoves(game.pgn), [game.pgn]);
  const startFen = useMemo(() => toFen(createGame()), []);
  const fen = selected === null ? startFen : moves[selected]?.fen ?? startFen;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 p-4">
      <div className="card bg-base-200 flex flex-wrap items-center justify-between gap-2 p-3">
        <div className="min-w-0">
          <h2 className="truncate text-sm font-semibold">{game.name}</h2>
          <p className="text-xs opacity-70">
            {game.white} vs {game.black} · {game.result}
            {game.eco ? ` · ${game.eco}` : ''}
          </p>
        </div>
        <div className="flex gap-1">
          <button onClick={onBack} className="btn btn-sm">
            Back
          </button>
          <button onClick={() => onShare(game)} className="btn btn-ghost btn-sm">
            Share link
          </button>
          <button onClick={() => downloadPgn(game)} className="btn btn-ghost btn-sm">
            Download .pgn
          </button>
          <button onClick={onDelete} className="btn btn-error btn-ghost btn-sm">
            Delete
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_280px]">
        <div className="card bg-base-200 max-h-[60vh] overflow-y-auto p-3">
          {moves.length === 0 && (
            <p className="py-4 text-center text-sm opacity-60">No moves in this game.</p>
          )}
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs sm:grid-cols-3">
            {moves.map((move) => (
              <button
                key={move.index}
                onClick={() => setSelected(move.index)}
                className={`flex items-center gap-1 rounded px-1.5 py-1 text-left hover:bg-base-300 ${
                  selected === move.index ? 'bg-base-300' : ''
                }`}>
                <span className="opacity-50">
                  {move.moveNumber}.{move.color === 'w' ? '' : '…'}
                </span>
                <span className="font-semibold">{move.san}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="card bg-base-200 p-3">
          <Chessboard position={fen} />
          <div className="mt-2 flex gap-1">
            <button onClick={() => setSelected(null)} className="btn btn-xs">
              Start
            </button>
            <button
              onClick={() =>
                setSelected((s) => (s === null ? 0 : Math.max(0, s - 1)))
              }
              className="btn btn-xs">
              ←
            </button>
            <button
              onClick={() =>
                setSelected((s) =>
                  s === null ? 0 : Math.min(moves.length - 1, s + 1)
                )
              }
              className="btn btn-xs">
              →
            </button>
            <button
              onClick={() => setSelected(moves.length - 1)}
              className="btn btn-xs">
              End
            </button>
          </div>
          {selected !== null && moves[selected]?.comment && (
            <p className="mt-2 rounded border border-base-300 bg-base-100 p-2 text-xs">
              {moves[selected].comment}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
StudyView.displayName = 'StudyView';
