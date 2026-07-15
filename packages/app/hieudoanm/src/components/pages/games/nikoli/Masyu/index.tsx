import { FC } from 'react';
import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';
import { useMasyu } from './useMasyu';

export const Masyu: FC<{ onClose: () => void }> = ({ onClose }) => {
  const {
    pearls,
    grid,
    won,
    size,
    autoSolving,
    toggle,
    undo,
    autoSolve,
    newGame,
  } = useMasyu();

  const getPearl = (r: number, c: number) =>
    pearls.find((p) => p.row === r && p.col === c);

  return (
    <FullScreen onClose={onClose} title="Masyu">
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
        <div className="text-center text-xs opacity-60">
          Draw a single loop through all pearls. White: straight through. Black:
          turn 90°.
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div
            className="bg-base-300 grid w-full max-w-[360px] gap-px rounded-lg p-1 select-none"
            style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
            {Array.from({ length: size }, (_, r) =>
              Array.from({ length: size }, (_, c) => {
                const pearl = getPearl(r, c);
                const inLoop = grid[r][c];
                return (
                  <div
                    key={`${r}-${c}`}
                    onClick={() => toggle(r, c)}
                    className={`flex aspect-square cursor-pointer items-center justify-center rounded-sm transition-all ${inLoop ? 'bg-primary/40' : 'bg-base-100 hover:bg-base-200'} `}>
                    {pearl && (
                      <div
                        className={`h-5 w-5 rounded-full ${
                          pearl.color === 'black'
                            ? 'bg-base-content'
                            : 'bg-base-100 ring-base-content ring-2'
                        }`}
                      />
                    )}
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
Masyu.displayName = 'Masyu';
