import { Chess } from 'chess.js';
import { createSignal } from 'solid-js';
import { Chessboard } from '~/components/Chessboard';
import openings from '~/json/chess/openings.json';
import { getMovesFromPGN } from '~/utils/chess';
import { sleep } from '~/utils/sleep';

export type Opening = {
  eco: string;
  name: string;
  pgn: string;
};

const OpeningsPage = () => {
  const initial: string =
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  const [signal, setState] = createSignal<{
    game: Chess;
    pgn: string;
  }>({
    game: new Chess(initial),
    pgn: new Chess(initial).pgn(),
  });

  const makeMove = (move: { from: string; to: string; promotion: string }) => {
    const result = signal().game.move(move);
    if (move !== null) {
      setState((previous) => ({
        ...previous,
        game: previous.game,
        pgn: previous.game.pgn(),
      }));
    }
    return result; // null if the move was illegal, the move object if the move was legal
  };

  const onPieceDrop = (sourceSquare: string, targetSquare: string) => {
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
    ({ pgn: openingPGN }) => openingPGN === signal().pgn
  );
  console.log('openingIndex', openingIndex);

  return (
    <div class="h-screen w-screen">
      <div class="grid h-full w-full grid-cols-1 md:grid-cols-2">
        <div class="col-span-1">
          <div class="flex h-full w-full flex-col items-center justify-center gap-y-4 bg-gray-100 px-8 py-8 text-gray-900 md:px-16 lg:px-32">
            <h1 class="w-full text-center">
              {openingIndex > -1
                ? (openings.at(openingIndex)?.name ?? 'Opening')
                : 'Opening'}
            </h1>
            {signal().pgn.length > 0 ? (
              <div class="w-full rounded bg-gray-900 p-4 text-red-500">
                {signal().pgn}
              </div>
            ) : (
              <></>
            )}
            <Chessboard
              id="board"
              position={signal().game.fen()}
              arePiecesDraggable={true}
              onPieceDrop={onPieceDrop}
            />
            <div class="grid w-full grid-cols-2 gap-4">
              <div class="col-span-1">
                <button
                  type="button"
                  class="w-full rounded bg-gray-900 py-2 text-red-500"
                  onClick={() => {
                    const newGame: Chess = new Chess(initial);
                    const newPGN: string = newGame.pgn();
                    setState({ game: newGame, pgn: newPGN });
                  }}>
                  Reset
                </button>
              </div>
              <div class="col-span-1">
                <button
                  type="button"
                  class="w-full rounded bg-gray-900 py-2 text-red-500"
                  onClick={() => {
                    signal().game.undo();
                    const newPGN: string = signal().game.pgn();
                    setState({ game: signal().game, pgn: newPGN });
                  }}>
                  Undo
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-1 overflow-hidden">
          <div class="h-full w-full overflow-auto bg-gray-900 text-gray-100">
            <div class="no-scrollbar flex grow flex-col gap-y-2 overflow-auto">
              {openings
                .filter(({ pgn: openingPGN }) => {
                  return openingPGN.length === 0
                    ? true
                    : openingPGN.includes(signal().pgn);
                })
                .map(({ eco, name, pgn }) => {
                  return (
                    <button
                      title={pgn}
                      type="button"
                      class="flex flex-col gap-y-1 border-b border-gray-100 px-4 py-2 text-left"
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
                      <p class="max-w-[280px] truncate md:max-w-full">
                        {eco}. <span class="font-bold">{name}</span>
                      </p>
                      <p class="max-w-[280px] truncate md:max-w-full">
                        <span class="text-red-500">{pgn}</span>
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
