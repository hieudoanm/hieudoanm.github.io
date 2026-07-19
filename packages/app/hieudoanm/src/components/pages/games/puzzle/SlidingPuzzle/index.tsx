import { Dropzone, FullScreen } from '@hieudoanm.github.io/components/atoms';
import { FC } from 'react';
import { useSlidingPuzzle } from './useSlidingPuzzle';

export const SlidingPuzzle: FC<{ onClose: () => void }> = ({ onClose }) => {
  const {
    imageUrl,
    tileImages,
    tiles,
    gridSize,
    movesCount,
    solved,
    autoSolving,
    dragging,
    error,
    handleFile,
    handleClick,
    startAutoSolve,
    handleGridSizeChange,
    handleNewGame,
    handleChangeImage,
  } = useSlidingPuzzle();

  if (!imageUrl) {
    return (
      <FullScreen onClose={onClose} title="Slide Puzzle">
        <div className="flex flex-col gap-4 p-4">
          <Dropzone
            accept="image/*"
            onFile={handleFile}
            label="Click or drag an image here"
            className={`${dragging ? 'border-primary bg-primary/5' : ''}`}
          />
          {error && <p className="text-error text-center text-sm">{error}</p>}
        </div>
      </FullScreen>
    );
  }

  return (
    <FullScreen onClose={onClose} title="Slide Puzzle">
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm">
            Moves: <strong>{movesCount}</strong>
          </span>
          <div className="flex items-center gap-2 text-sm">
            <span className="min-w-[3ch] text-right font-mono text-xs font-normal">
              {gridSize}×{gridSize}
            </span>
            <input
              type="range"
              min={3}
              max={5}
              step={1}
              value={gridSize}
              onChange={(e) => handleGridSizeChange(Number(e.target.value))}
              className="range range-primary range-xs w-24"
              disabled={autoSolving}
            />
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div
            className="bg-base-300 grid w-full max-w-[300px] gap-[2px] overflow-hidden rounded-lg"
            style={{
              aspectRatio: '1',
              gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            }}>
            {tiles.map((tile, pos) => {
              const empty = tile === 0;
              return (
                <div
                  id={`tile-${pos}`}
                  key={pos}
                  onClick={() => handleClick(pos)}
                  className={`relative overflow-hidden ${
                    empty
                      ? ''
                      : 'cursor-pointer transition-transform hover:brightness-110 active:scale-95'
                  } ${autoSolving ? 'pointer-events-none' : ''}`}
                  style={
                    empty
                      ? { background: 'transparent' }
                      : {
                          backgroundImage: `url(${tileImages[tile]})`,
                          backgroundSize: '100% 100%',
                        }
                  }
                />
              );
            })}
          </div>
        </div>

        {solved && (
          <div className="alert alert-success justify-center py-2 text-sm">
            Solved in {movesCount} moves!
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-2">
          <button
            className="btn btn-sm"
            onClick={startAutoSolve}
            disabled={solved}>
            {autoSolving ? 'Stop' : 'Auto Solve'}
          </button>
          <button
            className="btn btn-sm btn-primary"
            onClick={handleNewGame}
            disabled={autoSolving}>
            New Game
          </button>
          <button
            className="btn btn-sm btn-ghost"
            onClick={handleChangeImage}
            disabled={autoSolving}>
            Change Image
          </button>
        </div>
      </div>
    </FullScreen>
  );
};
SlidingPuzzle.displayName = 'SlidingPuzzle';
