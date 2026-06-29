import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { FC } from 'react';
import { useSlidingPuzzle } from './useSlidingPuzzle';

export const SlidingPuzzleModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
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
    fileRef,
    handleFile,
    handleClick,
    startAutoSolve,
    handleGridSizeChange,
    handleNewGame,
    handleChangeImage,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  } = useSlidingPuzzle();

  if (!imageUrl) {
    return (
      <ModalWrapper onClose={onClose} title="Slide Puzzle">
        <div className="flex flex-col gap-4 p-4">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-12 transition-colors ${
              dragging
                ? 'border-primary bg-primary/5'
                : 'border-base-content/20 hover:border-base-content/40'
            }`}>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
              }}
            />
            <span className="text-4xl opacity-30">🖼️</span>
            <p className="text-sm font-medium">Click or drag an image here</p>
            <p className="text-xs opacity-40">
              The image will be cropped to a square
            </p>
          </div>
          {error && <p className="text-error text-center text-sm">{error}</p>}
        </div>
      </ModalWrapper>
    );
  }

  return (
    <ModalWrapper
      onClose={onClose}
      title="Slide Puzzle"
      size="max-w-sm"
      fullHeight>
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm">
            Moves: <strong>{movesCount}</strong>
          </span>
          <div className="flex items-center gap-2 text-sm">
            <span className="min-w-[3ch] text-right font-mono text-xs font-bold">
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
    </ModalWrapper>
  );
};
SlidingPuzzleModal.displayName = 'SlidingPuzzleModal';
