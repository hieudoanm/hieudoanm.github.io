import { FC } from 'react';
import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';
import { useNurikabe } from './useNurikabe';

export const Nurikabe: FC<{ onClose: () => void }> = ({ onClose }) => {
  const { grid, won, size, autoSolving, toggle, undo, autoSolve, newGame } =
    useNurikabe();

  return (
    <FullScreen onClose={onClose} title="Nurikabe">
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
        <div className="text-center text-xs opacity-60">
          Shade cells to form numbered islands. All shaded cells must be
          connected. No 2×2 shaded blocks.
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div
            className="bg-base-300 grid w-full max-w-[360px] gap-px rounded-lg p-1 select-none"
            style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
            {grid.flatMap((row, r) =>
              row.map((cell, c) => (
                <div
                  key={`${r}-${c}`}
                  onClick={() => toggle(r, c)}
                  className={`flex aspect-square cursor-pointer items-center justify-center rounded-sm text-xs font-bold transition-all ${cell.state === 'shaded' ? 'bg-base-content text-base-100' : ''} ${cell.state === 'numbered' ? 'bg-base-100 text-base-content' : ''} ${cell.state === 'empty' ? 'bg-base-100 hover:bg-base-200' : ''} `}>
                  {cell.value ?? ''}
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

        <div className="flex justify-center gap-2">
          <button className="btn btn-sm" onClick={undo} disabled={autoSolving}>
            Undo
          </button>
          <button className="btn btn-sm" onClick={autoSolve} disabled={won}>
            {autoSolving ? 'Stop' : 'Auto Solve'}
          </button>
          <button
            className="btn btn-sm btn-primary"
            onClick={newGame}
            disabled={autoSolving}>
            New Game
          </button>
        </div>
      </div>
    </FullScreen>
  );
};
Nurikabe.displayName = 'Nurikabe';
