import {
  FaSolidChessBishop,
  FaSolidChessKing,
  FaSolidChessKnight,
  FaSolidChessQueen,
  FaSolidChessRook,
} from 'solid-icons/fa';
import { createSignal, onMount } from 'solid-js';
import { Chessboard } from '~/components/Chessboard';
import chess960 from '~/json/chess/chess960.json';
import { addZero, range } from '~/utils/number';

export type Opening = {
  eco: string;
  name: string;
  pgn: string;
};

const Pieces = ({ position = '' }: { position: string }) => {
  return (
    <>
      {position.split('').map((piece, index) => {
        if (piece === 'K') {
          return (
            <FaSolidChessKing
              title={piece + index}
              class="text-2xl md:text-4xl"
            />
          );
        }
        if (piece === 'Q') {
          return (
            <FaSolidChessQueen
              title={piece + index}
              class="text-2xl md:text-4xl"
            />
          );
        }
        if (piece === 'R') {
          return (
            <FaSolidChessRook
              title={piece + index}
              class="text-2xl md:text-4xl"
            />
          );
        }
        if (piece === 'B') {
          return (
            <FaSolidChessBishop
              title={piece + index}
              class="text-2xl md:text-4xl"
            />
          );
        }
        if (piece === 'N') {
          return (
            <FaSolidChessKnight
              title={piece + index}
              class="text-2xl md:text-4xl"
            />
          );
        }
        return <>{piece}</>;
      })}
    </>
  );
};

const Chess960Page = () => {
  const initialPositionString = chess960.at(960 - 1) ?? '';
  const initialFen: string = `${initialPositionString.toLowerCase()}/pppppppp/8/8/8/8/PPPPPPPP/${initialPositionString.toUpperCase()} w KQkq - 0 1`;

  const [signal, setSignal] = createSignal<{
    expand: boolean;
    fen: string;
    positionNumber: number;
    positionString: string;
  }>({
    expand: false,
    fen: initialFen,
    positionNumber: 960,
    positionString: initialPositionString,
  });

  onMount(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space' || event.key === ' ') {
        randomisePosition();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const randomisePosition = () => {
    const randomPositionNumber = Math.floor(Math.random() * 960) + 1;
    const positionString: string = chess960[randomPositionNumber - 1];
    setSignal((previous) => ({
      ...previous,
      positionNumber: randomPositionNumber,
      positionString,
      fen: `${positionString.toLowerCase()}/pppppppp/8/8/8/8/PPPPPPPP/${positionString.toUpperCase()} w KQkq - 0 1`,
    }));
  };

  return (
    <div class="min-h-screen bg-gray-100 text-gray-900">
      <div class="container mx-auto px-8">
        <div class="flex h-full flex-col items-center justify-center gap-y-4 pt-4 md:gap-y-8 md:pt-8">
          <h1 class="text-2xl md:text-4xl">
            <span>Chess</span>
            <select
              id="positionNumber"
              name="positionNumber"
              value={signal().positionNumber}
              class="appearance-none"
              onChange={(event) => {
                const newPositionNumber: number =
                  parseInt(event.target.value, 10) ?? 1;
                const newPositionString: string =
                  chess960.at(newPositionNumber - 1) ?? '';
                setSignal((previous) => ({
                  ...previous,
                  positionNumber: newPositionNumber,
                  positionString: newPositionString,
                  fen: `${newPositionString.toLowerCase()}/pppppppp/8/8/8/8/PPPPPPPP/${newPositionString.toUpperCase()} w KQkq - 0 1`,
                }));
              }}>
              <option value={0}>000</option>
              {range(1, 960).map((positionIndex: number) => {
                return (
                  <option
                    title={positionIndex.toString()}
                    value={positionIndex}>
                    {addZero(positionIndex, 3)}
                  </option>
                );
              })}
            </select>
          </h1>
          <div class="mx-auto flex w-full max-w-md flex-col items-center justify-center gap-y-4 md:gap-y-8">
            <button
              type="button"
              class="flex w-full items-center justify-between rounded bg-gray-900 p-2 text-red-500 shadow md:p-4"
              onClick={randomisePosition}>
              <Pieces position={signal().positionString} />
            </button>
            <button
              class="aspect-square w-full overflow-hidden rounded"
              onClick={randomisePosition}>
              <Chessboard id="board" position={signal().fen} />
            </button>
          </div>
        </div>
        <button
          type="button"
          class="w-full py-4 md:py-8"
          onClick={() => {
            setSignal((previous) => ({
              ...previous,
              expand: !previous.expand,
            }));
          }}>
          {!signal().expand ? 'Show' : 'Hide'} Full List
        </button>
        <div class={`${signal().expand ? 'pb-8' : 'pb-0'}`}>
          <div
            class="w-full overflow-hidden rounded transition-all ease-linear"
            style={{ height: signal().expand ? 'auto' : '0px' }}>
            <div class="grid grid-cols-1 md:grid-cols-4">
              {chess960.map((positionString: string, index: number) => {
                return (
                  <div title={positionString} class="col-span-1">
                    <div class="flex w-full flex-col items-center justify-between bg-gray-900 pt-2 md:pt-4">
                      <p class="truncate text-gray-100">
                        Position {addZero(index + 1, 3)}
                      </p>
                      <button
                        type="button"
                        class="flex w-full items-center justify-between rounded p-2 text-red-500 shadow md:p-4"
                        onClick={() => {
                          setSignal((previous) => ({
                            ...previous,
                            positionNumber: index + 1,
                            positionString,
                            fen: `${positionString.toLowerCase()}/pppppppp/8/8/8/8/PPPPPPPP/${positionString.toUpperCase()} w KQkq - 0 1`,
                          }));
                        }}>
                        <Pieces position={positionString} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chess960Page;
