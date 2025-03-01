import { Chessboard } from '@nothing/components/Chessboard';
import openings from '@nothing/json/chess/openings.json';
import { getMovesFromPGN } from '@nothing/utils/chess';
import { sleep } from '@nothing/utils/sleep';
import { Chess } from 'chess.js';
import { NextPage } from 'next';
import { useState } from 'react';
import { Square } from 'react-chessboard/dist/chessboard/types';

export type Opening = {
  eco: string;
  name: string;
  pgn: string;
};

const OpeningsPage: NextPage = () => {
  const initial: string =
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  const [
    { game = new Chess(initial), pgn = new Chess(initial).pgn() },
    setState,
  ] = useState<{
    game: Chess;
    pgn: string;
  }>({
    game: new Chess(initial),
    pgn: new Chess(initial).pgn(),
  });

  const makeMove = (move: { from: Square; to: Square; promotion: string }) => {
    const result = game.move(move);
    if (move !== null) {
      setState((previous) => ({
        ...previous,
        game,
        pgn: game.pgn(),
      }));
    }
    return result; // null if the move was illegal, the move object if the move was legal
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
    ({ pgn: openingPGN }) => openingPGN === pgn
  );
  console.log('openingIndex', openingIndex);

  return (
    <div className="h-screen w-screen">
      <div className="grid h-full w-full grid-cols-1 md:grid-cols-2">
        <div className="col-span-1">
          <div className="flex h-full w-full flex-col items-center justify-center gap-y-4 px-8 py-8 md:px-16 lg:px-32">
            <h1 className="w-full text-center">
              {openingIndex > -1
                ? (openings.at(openingIndex)?.name ?? 'Opening')
                : 'Opening'}
            </h1>
            {pgn.length > 0 ? (
              <div className="w-full rounded bg-gray-900 p-4 text-red-500">
                {pgn}
              </div>
            ) : (
              <></>
            )}
            <Chessboard
              id="board"
              position={game.fen()}
              arePiecesDraggable={true}
              onPieceDrop={onPieceDrop}
            />
            <div className="grid w-full grid-cols-2 gap-4">
              <div className="col-span-1">
                <button
                  type="button"
                  className="w-full rounded bg-gray-900 py-2 text-red-500"
                  onClick={() => {
                    const newGame: Chess = new Chess(initial);
                    const newPGN: string = newGame.pgn();
                    setState({ game: newGame, pgn: newPGN });
                  }}>
                  Reset
                </button>
              </div>
              <div className="col-span-1">
                <button
                  type="button"
                  className="w-full rounded bg-gray-900 py-2 text-red-500"
                  onClick={() => {
                    game.undo();
                    const newPGN: string = game.pgn();
                    setState({ game, pgn: newPGN });
                  }}>
                  Undo
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 overflow-hidden">
          <div className="h-full w-full overflow-auto bg-gray-900 text-gray-100">
            <div className="no-scrollbar flex grow flex-col gap-y-2 overflow-auto">
              {openings
                .filter(({ pgn: openingPGN }) => {
                  return openingPGN.length === 0
                    ? true
                    : openingPGN.includes(pgn);
                })
                .map(({ eco, name, pgn }) => {
                  return (
                    <button
                      key={pgn}
                      type="button"
                      className="flex flex-col gap-y-1 border-b border-gray-100 px-4 py-2 text-left"
                      onClick={async () => {
                        const newGame: Chess = new Chess(initial);
                        const newPGN: string = newGame.pgn();
                        setState({ game: newGame, pgn: newPGN });

                        const moves: string[] = getMovesFromPGN(pgn);
                        for (const move of moves) {
                          newGame.move(move);
                          const newPGN: string = newGame.pgn();
                          setState({
                            game: new Chess(newGame.fen()),
                            pgn: newPGN,
                          });
                          await sleep(1000);
                        }
                      }}>
                      <p className="max-w-[280px] truncate md:max-w-full">
                        {eco}. <span className="font-bold">{name}</span>
                      </p>
                      <p className="max-w-[280px] truncate md:max-w-full">
                        <span className="text-red-500">{pgn}</span>
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
