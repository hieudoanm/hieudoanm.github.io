import { Chessboard } from '@web/components/chess/Board';
import openings from '@web/json/chess/openings.json';
import { logger } from '@web/utils/log';
import { copyToClipboard } from '@web/utils/navigator';
import { Chess } from 'chess.js';
import { NextPage } from 'next';
import { useState } from 'react';
import { Square } from 'react-chessboard/dist/chessboard/types';

export type Opening = {
  eco: string;
  name: string;
  pgn: string;
};

const simplifyPGN = (pgn: string) => {
  const endIndex = pgn.lastIndexOf(']') + 1;
  return pgn.slice(endIndex).replaceAll('*', '').trim();
};

export const ChessOpenings: NextPage = () => {
  const initial: string =
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  const [
    {
      game = new Chess(initial),
      gamePGN = simplifyPGN(new Chess(initial).pgn()),
    },
    setState,
  ] = useState<{
    game: Chess;
    gamePGN: string;
  }>({
    game: new Chess(initial),
    gamePGN: simplifyPGN(new Chess(initial).pgn()),
  });

  const makeMove = (move: { from: Square; to: Square; promotion: string }) => {
    try {
      const result = game.move(move);
      if (move !== null) {
        setState((previous) => ({
          ...previous,
          game,
          gamePGN: simplifyPGN(game.pgn()),
        }));
      }
      return result; // null if the move was illegal, the move object if the move was legal
    } catch (error) {
      logger.error(error);
    }
  };

  const onPieceDrop = (sourceSquare: Square, targetSquare: Square) => {
    const move = makeMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q', // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return false;
    return true;
  };

  const openingIndex: number = openings.findIndex(
    ({ pgn }) => pgn === gamePGN || pgn.includes(gamePGN)
  );

  const filterOpenings = openings.filter(({ pgn }) => {
    const allMoves = pgn.split(' ');
    const currentMove = gamePGN.split(' ');
    const currentMoveIndex = currentMove.length;
    const restMoves = allMoves.splice(currentMoveIndex);
    return pgn.length === 0
      ? true
      : pgn === gamePGN || (pgn.includes(gamePGN) && restMoves.length > 0);
  });

  return (
    <div className="grid w-full max-w-md grid-cols-1 grid-rows-2 overflow-hidden rounded border border-neutral-800 md:max-w-[896px] md:grid-cols-2 md:grid-rows-1">
      <div className="col-span-1">
        <div className="aspect-square w-full max-w-md">
          <Chessboard
            id="board"
            position={game.fen()}
            arePiecesDraggable={true}
            onPieceDrop={onPieceDrop}
          />
        </div>
      </div>
      <div className="col-span-1">
        <div className="aspect-square w-full max-w-md">
          <div className="flex h-full w-full flex-col">
            <div className="flex justify-between gap-x-2 border-b border-neutral-800 p-4">
              {filterOpenings.length < openings.length && (
                <button
                  type="button"
                  className="cursor-pointer text-red-500"
                  onClick={() => {
                    game.undo();
                    const newGamePGN: string = simplifyPGN(game.pgn());
                    setState({ game, gamePGN: newGamePGN });
                  }}>
                  Undo
                </button>
              )}
              <p
                className="grow truncate text-center"
                title={openings.at(openingIndex)?.name ?? 'Openings'}>
                {filterOpenings.length < openings.length ? (
                  <strong>
                    {openings.at(openingIndex)?.name ?? 'Opening'}
                  </strong>
                ) : (
                  <strong>Openings ({filterOpenings.length})</strong>
                )}
              </p>
              {filterOpenings.length < openings.length && (
                <button
                  type="button"
                  className="cursor-pointer text-red-500"
                  onClick={() => {
                    const newGame: Chess = new Chess(initial);
                    const newGamePGN: string = simplifyPGN(newGame.pgn());
                    setState({ game: newGame, gamePGN: newGamePGN });
                  }}>
                  Reset
                </button>
              )}
            </div>
            <div className="scroll-none w-full grow overflow-auto">
              {filterOpenings.map(({ eco, name, pgn }) => {
                const allMoves: string[] = pgn.split(' ');
                const currentMoves: string[] = gamePGN.split(' ');
                const currentMoveIndex = currentMoves.length;
                const currentMoveNumber = Math.floor(currentMoveIndex / 3);
                const restMoves = allMoves.splice(currentMoveIndex);

                return (
                  <button
                    key={pgn}
                    title={`${eco}. ${name}`}
                    type="button"
                    className="flex w-full cursor-pointer flex-col gap-y-1 border-b border-neutral-800 px-4 py-2 text-left"
                    onClick={async () => {
                      copyToClipboard(pgn);
                    }}>
                    <p className="max-w-[280px] truncate md:max-w-full">
                      {eco}. <span className="font-bold">{name}</span>
                    </p>
                    <p className="max-w-[280px] truncate md:max-w-full">
                      <span className="text-red-500">
                        {restMoves.length > 0 ? (
                          <>
                            {currentMoveIndex === 1 && '1.'}
                            {currentMoveIndex === 2 && '1. ...'}
                            {currentMoveIndex > 2 &&
                              currentMoveIndex % 3 === 1 &&
                              `${currentMoveNumber}.`}
                            {currentMoveIndex > 2 &&
                              currentMoveIndex % 3 === 2 &&
                              `${currentMoveNumber + 1}. ...`}
                            {restMoves.join(' ')}
                          </>
                        ) : (
                          <>{pgn}</>
                        )}
                      </span>
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
