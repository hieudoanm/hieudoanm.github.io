import { FC, useState } from 'react';
import type { Color, GameState, PieceType } from '@chess/ts';
import {
  createGame,
  getLegalMoves,
  makeMove,
  toFen,
  toFenBoard,
  toSquareName,
} from '@chess/ts';
import { Chessboard } from '../../organisms/chess/ChessBoard';
import { parseSquare } from '../utils/coordinates';
import {
  addToPocket,
  applyDrop,
  collectCapture,
  CRAZYHOUSE_FEN,
  dropIsLegal,
  emptyPocket,
  pocketList,
  type Pocket,
} from '../utils/variants';

const name = (sq: number | string): string =>
  typeof sq === 'number' ? toSquareName(sq) : sq;

export const CrazyhouseTab: FC = () => {
  const [game, setGame] = useState<GameState>(() => createGame(CRAZYHOUSE_FEN));
  const [pockets, setPockets] = useState<Pocket>(() => emptyPocket());
  const [selected, setSelected] = useState<PieceType | null>(null);

  const applyDropOn = (targetSquare: string, turn: Color) => {
    if (!selected) return false;
    const idx = parseSquare(targetSquare);
    if (!dropIsLegal(game.board, idx, selected, turn)) return false;
    const newBoard = applyDrop(game.board, idx, selected, turn);
    const nextTurn: Color = turn === 'w' ? 'b' : 'w';
    const fen = `${toFenBoard(newBoard)} ${nextTurn} - - 0 ${
      turn === 'b' ? game.fullMoveNumber + 1 : game.fullMoveNumber
    }`;
    setPockets({
      ...pockets,
      [turn]: { ...pockets[turn], [selected]: pockets[turn][selected] - 1 },
    });
    setSelected(null);
    setGame(createGame(fen));
    return true;
  };

  const handleDrop = (sourceSquare: string, targetSquare: string | null): boolean => {
    if (!targetSquare) return false;
    if (selected) return applyDropOn(targetSquare, game.turn);
    const moves = getLegalMoves(
      game.board,
      game.turn,
      game.castlingRights,
      game.enPassant
    );
    const move = moves.find(
      (m) => name(m.from) === sourceSquare && name(m.to) === targetSquare
    );
    if (!move) return false;
    const next = makeMove(game, move);
    const captured = collectCapture(game, move);
    setGame(next);
    if (captured) setPockets((p) => addToPocket(p, captured));
    return true;
  };

  const reset = () => {
    setGame(createGame(CRAZYHOUSE_FEN));
    setPockets(emptyPocket());
    setSelected(null);
  };

  const whitePocket = pocketList(pockets, 'w');
  const blackPocket = pocketList(pockets, 'b');
  const side: Color = game.turn;

  return (
    <div className="card bg-base-200 p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-semibold">Crazyhouse (local)</h3>
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="opacity-70">White pocket:</span>
          {whitePocket.map((p) => (
            <button
              key={p.type}
              onClick={() => setSelected(p.type)}
              className={`badge badge-lg ${
                selected === p.type ? 'badge-primary' : 'badge-outline'
              }`}>
              {p.type.toUpperCase()} ×{p.count}
            </button>
          ))}
          <span className="opacity-70">Black pocket:</span>
          {blackPocket.map((p) => (
            <button
              key={p.type}
              onClick={() => setSelected(p.type)}
              className={`badge badge-lg ${
                selected === p.type ? 'badge-primary' : 'badge-outline'
              }`}>
              {p.type.toUpperCase()} ×{p.count}
            </button>
          ))}
          <button onClick={reset} className="btn btn-ghost btn-xs">
            Reset
          </button>
        </div>
      </div>
      <Chessboard
        position={toFen(game)}
        allowDragging
        onPieceDrop={({ sourceSquare, targetSquare }) =>
          handleDrop(sourceSquare, targetSquare)
        }
      />
      <div className="mt-3 flex items-center gap-2 text-sm">
        <span className="opacity-70">
          {selected
            ? `Drop ${selected.toUpperCase()} on a legal square.`
            : `${side === 'w' ? 'White' : 'Black'} to move — two players local.`}
        </span>
      </div>
    </div>
  );
};
CrazyhouseTab.displayName = 'CrazyhouseTab';
