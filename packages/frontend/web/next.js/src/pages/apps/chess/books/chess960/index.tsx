import { Chessboard } from '@web/components/Chessboard';
import chess960 from '@web/json/chess/chess960.json';
import { addZero, range } from '@web/utils/number';
import { NextPage } from 'next';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import {
  FaChessBishop,
  FaChessKing,
  FaChessKnight,
  FaChessQueen,
  FaChessRook,
} from 'react-icons/fa6';

export type Opening = {
  eco: string;
  name: string;
  pgn: string;
};

const Pieces: FC<{ position: string }> = ({ position = '' }) => {
  return (
    <>
      {position.split('').map((piece, index) => {
        if (piece === 'K') {
          return (
            <FaChessKing key={piece + index} className="text-2xl md:text-4xl" />
          );
        }
        if (piece === 'Q') {
          return (
            <FaChessQueen
              key={piece + index}
              className="text-2xl md:text-4xl"
            />
          );
        }
        if (piece === 'R') {
          return (
            <FaChessRook key={piece + index} className="text-2xl md:text-4xl" />
          );
        }
        if (piece === 'B') {
          return (
            <FaChessBishop
              key={piece + index}
              className="text-2xl md:text-4xl"
            />
          );
        }
        if (piece === 'N') {
          return (
            <FaChessKnight
              key={piece + index}
              className="text-2xl md:text-4xl"
            />
          );
        }
        return <>{piece}</>;
      })}
    </>
  );
};

const Chess960Page: NextPage = () => {
  const initialPositionString = chess960.at(960 - 1) ?? '';
  const initialFen: string = `${initialPositionString.toLowerCase()}/pppppppp/8/8/8/8/PPPPPPPP/${initialPositionString.toUpperCase()} w KQkq - 0 1`;

  const [
    {
      expand = false,
      fen = initialFen,
      positionNumber = 960,
      positionString = initialPositionString,
    },
    setState,
  ] = useState<{
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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space' || event.key === ' ') {
        randomisePosition();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const randomisePosition = () => {
    const randomPositionNumber = Math.floor(Math.random() * 960) + 1;
    const positionString: string = chess960[randomPositionNumber - 1];
    setState((previous) => ({
      ...previous,
      positionNumber: randomPositionNumber,
      positionString,
      fen: `${positionString.toLowerCase()}/pppppppp/8/8/8/8/PPPPPPPP/${positionString.toUpperCase()} w KQkq - 0 1`,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="container mx-auto px-8">
        <div className="flex h-full flex-col items-center justify-center gap-y-4 pt-4 md:gap-y-8 md:pt-8">
          <h1 className="text-2xl md:text-4xl">
            <span>Chess</span>
            <select
              id="positionNumber"
              name="positionNumber"
              value={positionNumber}
              className="appearance-none"
              onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                const newPositionNumber: number =
                  parseInt(event.target.value, 10) ?? 1;
                const newPositionString: string =
                  chess960.at(newPositionNumber - 1) ?? '';
                setState((previous) => ({
                  ...previous,
                  positionNumber: newPositionNumber,
                  positionString: newPositionString,
                  fen: `${newPositionString.toLowerCase()}/pppppppp/8/8/8/8/PPPPPPPP/${newPositionString.toUpperCase()} w KQkq - 0 1`,
                }));
              }}>
              <option value={0}>000</option>
              {range(1, 960).map((positionIndex: number) => {
                return (
                  <option key={positionIndex} value={positionIndex}>
                    {addZero(positionIndex, 3)}
                  </option>
                );
              })}
            </select>
          </h1>
          <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center gap-y-4 md:gap-y-8">
            <button
              type="button"
              className="flex w-full items-center justify-between rounded bg-gray-900 p-2 text-red-500 shadow md:p-4"
              onClick={randomisePosition}>
              <Pieces position={positionString} />
            </button>
            <button
              className="aspect-square w-full overflow-hidden rounded"
              onClick={randomisePosition}>
              <Chessboard id="board" position={fen} />
            </button>
          </div>
        </div>
        <button
          type="button"
          className="w-full py-4 md:py-8"
          onClick={() => {
            setState((previous) => ({
              ...previous,
              expand: !previous.expand,
            }));
          }}>
          {!expand ? 'Show' : 'Hide'} Full List
        </button>
        <div className={`${expand ? 'pb-8' : 'pb-0'}`}>
          <div
            className="w-full overflow-hidden rounded transition-all ease-linear"
            style={{ height: expand ? 'auto' : '0px' }}>
            <div className="grid grid-cols-1 md:grid-cols-4">
              {chess960.map((positionString: string, index: number) => {
                return (
                  <div key={positionString} className="col-span-1">
                    <div className="flex w-full flex-col items-center justify-between bg-gray-900 pt-2 md:pt-4">
                      <p className="truncate text-gray-100">
                        Position {addZero(index + 1, 3)}
                      </p>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between rounded p-2 text-red-500 shadow md:p-4"
                        onClick={() => {
                          setState((previous) => ({
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
