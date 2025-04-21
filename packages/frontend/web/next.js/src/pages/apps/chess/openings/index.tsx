import { Chessboard } from '@web/components/chess/Chessboard';
import openings from '@web/json/chess/openings.json';
import { getMoves } from '@web/utils/chess';
import { copyToClipboard } from '@web/utils/navigator';
import { sleep } from '@web/utils/sleep';
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

const OpeningsPage: NextPage = () => {
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
      console.error(error);
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
    <div className="h-[200vh] w-screen md:h-screen">
      <div className="grid h-full w-full grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1">
        <div className="col-span-1">
          <div className="flex h-full w-full flex-col items-center justify-center gap-y-4 bg-gray-100 px-8 py-8 text-gray-900 md:px-16 lg:px-32">
            <div className="flex w-full max-w-xs flex-col gap-y-2">
              {gamePGN.length > 0 ? (
                <button
                  type="button"
                  className="w-full cursor-pointer rounded bg-gray-900 px-4 py-2 text-left text-xs text-red-500"
                  onClick={() => {
                    copyToClipboard(gamePGN);
                  }}>
                  {gamePGN}
                </button>
              ) : (
                <></>
              )}
              <Chessboard
                id="board"
                position={game.fen()}
                arePiecesDraggable={true}
                onPieceDrop={onPieceDrop}
              />
              <div className="flex flex-col gap-2 text-xs md:flex-row">
                <button
                  type="button"
                  className="w-full rounded bg-gray-900 py-2 text-red-500"
                  onClick={() => {
                    game.undo();
                    const newGamePGN: string = simplifyPGN(game.pgn());
                    setState({ game, gamePGN: newGamePGN });
                  }}>
                  Undo
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 overflow-hidden">
          <div className="h-full w-full overflow-auto bg-gray-900 text-gray-100">
            <div className="scroll-none flex grow flex-col overflow-auto">
              <div className="flex justify-between gap-x-2 px-4 py-2">
                <p
                  className="truncate"
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
              {filterOpenings.map(({ eco, name, pgn }) => {
                const allMoves: string[] = pgn.split(' ');
                const currentMoves: string[] = gamePGN.split(' ');
                const currentMoveIndex = currentMoves.length;
                const currentMoveNumber = Math.floor(currentMoveIndex / 3);
                const restMoves = allMoves.splice(currentMoveIndex);

                return (
                  <button
                    key={pgn}
                    type="button"
                    className="flex cursor-pointer flex-col gap-y-1 border-t border-gray-800 px-4 py-2 text-left"
                    onClick={async () => {
                      const newGame: Chess = new Chess(initial);
                      const newGamePGN: string = simplifyPGN(newGame.pgn());
                      setState({ game: newGame, gamePGN: newGamePGN });
                      const moves: string[] = getMoves(pgn);
                      for (const move of moves) {
                        newGame.move(move);
                        const newGamePGN: string = simplifyPGN(newGame.pgn());
                        setState({
                          game: new Chess(newGame.fen()),
                          gamePGN: newGamePGN,
                        });
                        await sleep(1000);
                      }
                    }}>
                    <p className="max-w-[280px] truncate md:max-w-full">
                      {eco}. <span className="font-bold">{name}</span>
                    </p>
                    <p className="max-w-[280px] truncate md:max-w-full">
                      <span className="text-red-500">
                        {currentMoveIndex === 1 && '1.'}
                        {currentMoveIndex === 2 && '1. ...'}
                        {currentMoveIndex > 2 &&
                          currentMoveIndex % 3 === 1 &&
                          `${currentMoveNumber}.`}
                        {currentMoveIndex > 2 &&
                          currentMoveIndex % 3 === 2 &&
                          `${currentMoveNumber + 1}. ...`}
                        {restMoves.join(' ')}
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

export default OpeningsPage;
