import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';
import { FC } from 'react';
import { useLightsOut } from './useLightsOut';

export const LightsOut: FC<{ onClose: () => void }> = ({ onClose }) => {
  const {
    board,
    movesCount,
    solved,
    autoSolving,
    gridSize,
    handleClick,
    startAutoSolve,
    newGame,
  } = useLightsOut();

  return (
    <FullScreen onClose={onClose} title="Lights Out">
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
        <div className="flex items-center justify-between text-sm">
          <span>
            Moves: <strong>{movesCount}</strong>
          </span>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div
            className="bg-base-300 grid w-full max-w-[300px] gap-2 rounded-lg p-2 select-none"
            style={{
              aspectRatio: '1',
              gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            }}>
            {board.flatMap((row, r) =>
              row.map((cell, c) => (
                <div
                  key={`${r}-${c}`}
                  onClick={() => handleClick(r, c)}
                  className={`aspect-square cursor-pointer rounded-lg transition-all duration-150 ${
                    cell
                      ? 'shadow-[0_0_12px_theme(colors.warning)] bg-warning'
                      : 'bg-base-100 hover:bg-base-200'
                  } ${autoSolving ? 'pointer-events-none' : 'active:scale-95'}`}
                />
              ))
            )}
          </div>
        </div>

        {solved && (
          <div className="alert alert-success justify-center py-2 text-sm">
            Solved in {movesCount} moves!
          </div>
        )}

        <div className="flex justify-center gap-2">
          <button
            className="btn btn-sm"
            onClick={startAutoSolve}
            disabled={solved}>
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
LightsOut.displayName = 'LightsOut';
