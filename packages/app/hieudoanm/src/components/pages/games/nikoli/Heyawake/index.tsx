import { FC } from 'react';
import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';
import { useHeyawake } from './useHeyawake';

export const Heyawake: FC<{ onClose: () => void }> = ({ onClose }) => {
  const {
    grid,
    rooms,
    won,
    size,
    autoSolving,
    toggle,
    undo,
    autoSolve,
    newGame,
  } = useHeyawake();

  const getClueCell = (r: number, c: number) => {
    for (const room of rooms) {
      if (room.clue === null) continue;
      const first = room.cells[0];
      if (first[0] === r && first[1] === c) return room.clue;
    }
    return null;
  };

  return (
    <FullScreen onClose={onClose} title="Heyawake">
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
        <div className="text-center text-xs opacity-60">
          Shade cells so each room&apos;s count matches its clue. No two shaded
          cells adjacent. All white cells connected. No 2×2 white blocks.
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div
            className="bg-base-300 grid w-full max-w-[360px] gap-px rounded-lg p-1 select-none"
            style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
            {grid.flatMap((row, r) =>
              row.map((cell, c) => {
                const clue = getClueCell(r, c);
                return (
                  <div
                    key={`${r}-${c}`}
                    onClick={() => toggle(r, c)}
                    className={`flex aspect-square cursor-pointer items-center justify-center rounded-sm text-xs font-bold transition-all ${cell.shaded ? 'bg-base-content text-base-100' : 'bg-base-100 hover:bg-base-200'} `}>
                    {clue ?? ''}
                  </div>
                );
              })
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
Heyawake.displayName = 'Heyawake';
