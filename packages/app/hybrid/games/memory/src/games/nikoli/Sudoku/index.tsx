import { FC, useState } from 'react';
import { GameInstructions } from '../_shared/GameInstructions';
import { GAME_DATA } from '../_shared/gameData';
import { useSudoku } from './useSudoku';
import { formatTime } from './utils/sudoku';

export const Sudoku: FC = () => {
  const [diff, setDiff] = useState(0.5);
  const {
    userGrid,
    puzzle,
    selected,
    won,
    timer,
    size,
    N,
    newGame,
    undo,
    hint,
    selectCell,
    note,
  } = useSudoku(3, diff);
  const [helpOpen, setHelpOpen] = useState(false);
  const data = GAME_DATA.sudoku;

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
        <div className="text-center text-xs opacity-60">
          Fill the grid so each row, column, and 3×3 box contains digits 1–9.
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex gap-1">
            {['Easy', 'Medium', 'Hard'].map((l, i) => (
              <button
                key={l}
                onClick={() => setDiff(i * 0.25 + 0.25)}
                className={`btn btn-xs ${Math.abs(diff - (i * 0.25 + 0.25)) < 0.01 ? 'btn-primary' : 'btn-ghost'}`}>
                {l}
              </button>
            ))}
          </div>
          <div>
            <span className="opacity-50">Timer:</span> {formatTime(timer)}
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div
            className="bg-base-300 grid w-full max-w-[360px] gap-px rounded-lg p-1 select-none"
            style={{ gridTemplateColumns: `repeat(${N}, 1fr)` }}>
            {userGrid.flatMap((row, r) =>
              row.map((val, c) => {
                const isGiven = puzzle[r][c] !== 0;
                const isSelected = selected?.[0] === r && selected?.[1] === c;
                const isSameNum =
                  selected &&
                  val !== 0 &&
                  val === userGrid[selected[0]]?.[selected[1]];
                const boxBorderR = (c + 1) % size === 0 && c !== N - 1;
                const boxBorderB = (r + 1) % size === 0 && r !== N - 1;
                return (
                  <div
                    key={`${r}-${c}`}
                    onClick={() => (isGiven ? undefined : selectCell(r, c))}
                    className={`flex aspect-square cursor-pointer items-center justify-center rounded-sm text-xs font-bold transition-all ${isGiven ? 'bg-base-200 text-base-content' : isSelected ? 'bg-primary/20' : isSameNum ? 'bg-primary/10' : 'bg-base-100 hover:bg-base-200'} ${boxBorderR ? 'border-base-300 border-r-2' : ''} ${boxBorderB ? 'border-base-300 border-b-2' : ''}`}>
                    {val !== 0 ? val : ''}
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-1">
          {Array.from({ length: N }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => note(n)}
              className="btn btn-square btn-ghost h-8 w-8 text-xs">
              {n}
            </button>
          ))}
          <button
            onClick={() => note(0)}
            className="btn btn-square btn-ghost h-8 w-8 text-xs">
            ✕
          </button>
        </div>

        {won && (
          <div className="alert alert-success justify-center py-2 text-sm">
            Solved in {formatTime(timer)}!
          </div>
        )}

        <div className="flex justify-center gap-2">
          <button className="btn btn-sm" onClick={undo}>
            Undo
          </button>
          <button className="btn btn-sm" onClick={hint} disabled={won}>
            Hint
          </button>
          <button className="btn btn-sm btn-primary" onClick={newGame}>
            New Game
          </button>
          <button
            className="btn btn-sm btn-ghost"
            onClick={() => setHelpOpen(true)}>
            How to Play
          </button>
        </div>
      </div>

      <GameInstructions
        isOpen={helpOpen}
        onClose={() => setHelpOpen(false)}
        title={data.title}
        subtitle={data.subtitle}
        instructions={data.instructions}
        visualization={data.visualization}
      />
    </>
  );
};
Sudoku.displayName = 'Sudoku';
