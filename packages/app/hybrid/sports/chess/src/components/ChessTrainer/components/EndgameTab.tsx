import { FC, useState } from 'react';
import type { GameState } from '@chess/ts';
import { createGame, makeMove, toFen } from '@chess/ts';
import { Chessboard } from '../../organisms/chess/ChessBoard';
import type { EndgamePreset } from '../types';
import {
  applyUserMove,
  generateEndgameFen,
  isCheckmate,
  legalMoveFor,
} from '../utils/endgame';
import { bestMoveFrom } from '../utils/tactics';

const PRESETS: EndgamePreset[] = [
  { id: 'KQ', label: 'Queen vs King', material: 'KQ' },
  { id: 'KR', label: 'Rook vs King', material: 'KR' },
  { id: 'KBB', label: 'Two Bishops vs King', material: 'KBB' },
  { id: 'KBN', label: 'Bishop & Knight vs King', material: 'KBN' },
];

export const EndgameTab: FC = () => {
  const [preset, setPreset] = useState<EndgamePreset>(PRESETS[0]!);
  const [game, setGame] = useState<GameState>(() =>
    createGame(generateEndgameFen(PRESETS[0]!.material))
  );
  const [thinking, setThinking] = useState(false);

  const newPosition = (material: EndgamePreset['material']) => {
    setGame(createGame(generateEndgameFen(material)));
    setThinking(false);
  };

  const engineReply = (state: GameState) => {
    setThinking(true);
    window.setTimeout(() => {
      const best = bestMoveFrom(state, 10);
      if (best) {
        const move = legalMoveFor(state, best.from, best.to);
        if (move) {
          setGame(makeMove(state, move));
        }
      }
      setThinking(false);
    }, 60);
  };

  const handleDrop = (
    sourceSquare: string,
    targetSquare: string | null
  ): boolean => {
    if (!targetSquare) return false;
    if (game.turn !== 'w' || thinking) return false;
    const next = applyUserMove(game, sourceSquare, targetSquare);
    if (next === game) return false;
    setGame(next);
    if (!isCheckmate(next)) engineReply(next);
    return true;
  };

  const mate = isCheckmate(game);

  return (
    <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
      <div className="card bg-base-200 p-4">
        <h3 className="font-semibold">Endgame Practice</h3>
        <p className="mt-1 text-xs opacity-70">
          Play White and mate the lone king. The engine defends Black.
        </p>
        <div className="mt-3 flex flex-col gap-1">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setPreset(p);
                newPosition(p.material);
              }}
              className={`btn btn-sm justify-start ${
                preset.id === p.id ? 'btn-primary' : 'btn-ghost'
              }`}>
              {p.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => newPosition(preset.material)}
          className="btn btn-outline btn-sm mt-3">
          New position
        </button>
      </div>

      <div className="card bg-base-200 p-4">
        <Chessboard
          position={toFen(game)}
          allowDragging={game.turn === 'w' && !mate}
          onPieceDrop={({ sourceSquare, targetSquare }) =>
            handleDrop(sourceSquare, targetSquare)
          }
        />
        <div className="mt-3 flex items-center gap-2 text-sm">
          {mate && <span className="badge badge-success">Checkmate!</span>}
          {thinking && <span className="loading loading-spinner loading-xs" />}
          {!mate && !thinking && (
            <span className="opacity-70">
              {game.turn === 'w' ? 'Your move (White)' : 'Engine thinking…'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
EndgameTab.displayName = 'EndgameTab';
