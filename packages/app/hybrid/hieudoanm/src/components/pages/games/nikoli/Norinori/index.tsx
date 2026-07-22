import { FC, useState } from 'react';
import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';
import { GameInstructions } from '../_shared/GameInstructions';
import { GAME_DATA } from '../_shared/gameData';
import { useNorinori } from './useNorinori';
import { GAME_NAME } from './types';

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
  const [helpOpen, setHelpOpen] = useState(false);
  const data = GAME_DATA.norinori;

  return (
    <FullScreen onClose={onClose} title={GAME_NAME.en} subtitle={GAME_NAME.ja}>
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
    </FullScreen>
  );
};
Norinori.displayName = 'Norinori';
