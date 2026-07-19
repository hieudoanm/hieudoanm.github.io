import { FC, useMemo, useState } from 'react';
import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';
import { GameInstructionsModal } from '../_shared/GameInstructionsModal';
import { GAME_DATA } from '../_shared/gameData';
import { ROWS, COLS, getRegionColor } from './utils';
import { useShikaku } from './useShikaku';
import { GAME_NAME } from './types';

export const Shikaku: FC<{ onClose: () => void }> = ({ onClose }) => {
  const {
    clues,
    placed,
    selectedClue,
    wrongFlash,
    isComplete,
    autoSolving,
    handleCellClick,
    undo,
    autoSolve,
    newGame,
  } = useShikaku();
  const [helpOpen, setHelpOpen] = useState(false);
  const data = GAME_DATA.shikaku;

  const cellColors = useMemo(() => {
    const map = Array.from({ length: ROWS }, () =>
      Array<string | null>(COLS).fill(null)
    );
    for (const region of placed) {
      const color = getRegionColor(region.id);
      for (const [r, c] of region.cells) {
        map[r][c] = color;
      }
    }
    return map;
  }, [placed]);

  const isWrong = (row: number, col: number) =>
    wrongFlash?.some(([r, c]) => r === row && c === col) ?? false;

  const isSelected = (row: number, col: number) =>
    selectedClue?.row === row && selectedClue?.col === col;

  const previewCells = useMemo(() => {
    if (!selectedClue) return new Set<string>();
    return new Set(
      clues.filter((c) => c !== selectedClue).map((c) => `${c.row}-${c.col}`)
    );
  }, [selectedClue, clues]);

  return (
    <FullScreen onClose={onClose} title={GAME_NAME.en} subtitle={GAME_NAME.ja}>
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
        <div className="text-center text-xs opacity-60">
          Click a number, then click a cell to define a rectangle. The
          rectangle&apos;s area must equal the number.
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div
            className="bg-base-300 grid w-full max-w-[360px] gap-1 rounded-lg p-1 select-none"
            style={{
              gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            }}>
            {Array.from({ length: ROWS }, (_, r) =>
              Array.from({ length: COLS }, (_, c) => {
                const clue = clues.find((cl) => cl.row === r && cl.col === c);
                const bg = cellColors[r][c];
                const wrong = isWrong(r, c);
                const selected = isSelected(r, c);
                const isClueCell = !!clue && !bg;
                const blocked = previewCells.has(`${r}-${c}`) && !bg;

                return (
                  <div
                    key={`${r}-${c}`}
                    onClick={() => handleCellClick(r, c)}
                    className={`flex aspect-square cursor-pointer items-center justify-center rounded-sm text-xs font-bold transition-all duration-150 ${wrong ? 'ring-error animate-pulse ring-2' : ''} ${selected ? 'ring-primary scale-105 ring-2' : ''} ${blocked ? 'opacity-30' : ''} ${
                      bg
                        ? 'text-base-content'
                        : isClueCell
                          ? 'bg-base-100 hover:bg-base-200'
                          : 'bg-base-100 hover:bg-base-200'
                    } `}
                    style={bg ? { backgroundColor: bg } : undefined}>
                    {clue?.value ?? ''}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {isComplete && (
          <div className="alert alert-success justify-center py-2 text-sm">
            Puzzle solved!
          </div>
        )}

        <div className="flex justify-center gap-2">
          <button
            className="btn btn-sm"
            onClick={undo}
            disabled={placed.length === 0 || autoSolving}>
            Undo
          </button>
          <button
            className="btn btn-sm"
            onClick={autoSolve}
            disabled={isComplete}>
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
Shikaku.displayName = 'Shikaku';
