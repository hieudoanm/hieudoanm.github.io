import chess960 from '@web/json/chess/chess960.json';
import { addZero, range } from '@web/utils/number/utils';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Chessboard } from './Chessboard';

const toFen = (position: string) => {
  return `${position.toLowerCase()}/pppppppp/8/8/8/8/PPPPPPPP/${position.toUpperCase()} w KQkq - 0 1`;
};

export const Chess960: FC = () => {
  const initialPosition: string = chess960.at(960 - 1) ?? '';
  const initialFen: string = toFen(initialPosition);

  const [{ fen = initialFen, id = 960 }, setState] = useState<{
    fen: string;
    id: number;
  }>({
    fen: initialFen,
    id: 960,
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
    const randomId = Math.floor(Math.random() * 960) + 1;
    const position: string = chess960[randomId - 1];
    setState((previous) => ({
      ...previous,
      id: randomId,
      fen: toFen(position),
    }));
  };

  return (
    <div className="flex h-full w-full max-w-sm flex-col gap-y-4 md:gap-y-8">
      <h1 className="text-center text-2xl md:text-4xl">
        <span>Chess</span>
        <select
          id="id"
          name="id"
          value={id}
          className="appearance-none"
          onChange={(event: ChangeEvent<HTMLSelectElement>) => {
            const newId: number = parseInt(event.target.value, 10) ?? 1;
            const newPosition: string = chess960.at(newId - 1) ?? '';
            setState((previous) => ({
              ...previous,
              id: newId,
              fen: toFen(newPosition),
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
      <button
        className="aspect-square w-full overflow-hidden rounded border border-gray-800"
        onClick={randomisePosition}>
        <Chessboard id="board" position={fen} />
      </button>
    </div>
  );
};
