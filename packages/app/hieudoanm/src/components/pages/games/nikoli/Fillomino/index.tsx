import { FC, useState } from 'react';
import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';
import { GameInstructionsModal } from '../_shared/GameInstructionsModal';
import { GAME_DATA } from '../_shared/gameData';
import { useFillomino } from './useFillomino';
import { GAME_NAME } from './types';

export const Fillomino: FC<{ onClose: () => void }> = ({ onClose }) => {
  const {
    puzzle,
    grid,
    selected,
    won,
    size,
    autoSolving,
    emptyCount,
    handleCellClick,
    setCell,
    undo,
    autoSolve,
    newGame,
  } = useFillomino();
  const [helpOpen, setHelpOpen] = useState(false);
  const data = GAME_DATA.fillomino;

  const isSelected = (r: number, c: number) =>
    selected?.[0] === r && selected?.[1] === c;

  const isGiven = (r: number, c: number) => puzzle[r][c] !== null;

  return (
    <FullScreen onClose={onClose} title={GAME_NAME.en} subtitle={GAME_NAME.ja}>
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
        <div className="text-center text-xs opacity-60">
          Fill the grid so each contiguous region of same number has exactly
          that many cells.
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div
            className="bg-base-300 grid w-full max-w-[360px] gap-px rounded-lg p-1 select-none"
            style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
            {grid.flatMap((row, r) =>
              row.map((val, c) => (
                <div
                  key={`${r}-${c}`}
                  onClick={() => handleCellClick(r, c)}
                  className={`flex aspect-square cursor-pointer items-center justify-center rounded-sm text-xs font-bold transition-all ${isSelected(r, c) ? 'ring-primary scale-105 ring-2' : ''} ${isGiven(r, c) ? 'bg-base-200 text-base-content' : 'bg-base-100 hover:bg-base-200'} `}>
                  {val ?? ''}
                </div>
              ))
            )}
          </div>
        </div>

        {won && (
          <div className="alert alert-success justify-center py-2 text-sm">
            Puzzle solved!
          </div>
        )}

        <div className="mb-1 flex flex-wrap justify-center gap-1">
          {Array.from({ length: size }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setCell(n)}
              className="btn btn-square btn-ghost h-8 w-8 text-xs">
              {n}
            </button>
          ))}
          <button
            onClick={() => setCell(0)}
            className="btn btn-square btn-ghost h-8 w-8 text-xs">
            ✕
          </button>
        </div>

        <div className="flex justify-center gap-2">
          <button className="btn btn-sm" onClick={undo} disabled={autoSolving}>
            Undo
          </button>
          <button
            className="btn btn-sm"
            onClick={autoSolve}
            disabled={won || emptyCount === 0}>
            {autoSolving ? 'Stop' : 'Auto Solve'}
          </button>
          <button
            className="btn btn-sm btn-primary"
            onClick={newGame}
            disabled={autoSolving}>
            New Game
          </button>
          <button
            className="btn btn-sm btn-ghost"
            onClick={() => setHelpOpen(true)}>
            How to Play
          </button>
        </div>
      </div>

      <GameInstructionsModal
        isOpen={helpOpen}
        onClose={() => setHelpOpen(false)}
        title={data.title}
        subtitle={data.subtitle}
        instructions={data.instructions}
        visualization={data.visualization}
      />
    </FullScreen>
  );
};
Fillomino.displayName = 'Fillomino';
