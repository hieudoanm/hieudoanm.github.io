import { FC } from 'react';
import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';
import { useNorinori } from './useNorinori';

export const Norinori: FC<{ onClose: () => void }> = ({ onClose }) => {
  const {
    clues,
    grid,
    won,
    size,
    autoSolving,
    toggle,
    undo,
    autoSolve,
    newGame,
  } = useNorinori();

  return (
    <FullScreen onClose={onClose} title="Norinori">
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
        <div className="text-center text-xs opacity-60">
          Shade cells so each row/column matches its count. No two shaded cells
          may be adjacent.
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="inline-flex flex-col items-center">
            <div className="mb-1 flex gap-px">
              <div className="w-6" />
              {clues.cols.map((c, i) => (
                <div
                  key={i}
                  className="flex w-10 items-center justify-center text-xs font-bold">
                  {c}
                </div>
              ))}
            </div>
            {grid.map((row, r) => (
              <div key={r} className="flex items-center gap-px">
                <div className="flex w-6 items-center justify-center text-xs font-bold">
                  {clues.rows[r]}
                </div>
                {row.map((val, c) => (
                  <div
                    key={`${r}-${c}`}
                    onClick={() => toggle(r, c)}
                    className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm transition-all ${val ? 'bg-base-content' : 'bg-base-100 hover:bg-base-200'} `}
                  />
                ))}
              </div>
            ))}
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
Norinori.displayName = 'Norinori';
