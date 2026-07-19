import type { FC } from 'react';
import type { MoveRecord } from '../types';

interface MovesPanelProps {
  moves: MoveRecord[];
  cursor: number;
  onJumpTo: (index: number) => void;
  onUndo: () => void;
  onRedo: () => void;
}

interface MoveRow {
  number: number;
  white?: MoveRecord;
  black?: MoveRecord;
}

const moveButtonClass = (index: number, cursor: number): string => {
  const base = 'rounded px-1.5 py-0.5 transition-colors';
  if (index === cursor)
    return `${base} bg-primary text-primary-content font-bold`;
  if (index < cursor) return `${base} text-base-content/70 hover:bg-base-200`;
  return `${base} text-base-content/30 hover:text-base-content/60`;
};

export const MovesPanel: FC<MovesPanelProps> = ({
  moves,
  cursor,
  onJumpTo,
  onUndo,
  onRedo,
}) => {
  if (moves.length === 0) return null;
  const rows: MoveRow[] = [];
  moves.forEach((m, i) => {
    const rowIndex = Math.floor(i / 2);
    const row = rows[rowIndex] ?? { number: rowIndex + 1 };
    if (i % 2 === 0) row.white = m;
    else row.black = m;
    rows[rowIndex] = row;
  });
  return (
    <div className="flex flex-col gap-1">
      <div className="border-base-content/10 bg-base-100 flex max-h-32 flex-wrap gap-x-3 gap-y-0.5 overflow-y-auto rounded-lg border p-2">
        {rows.map((row) => (
          <div
            key={row.number}
            className="flex items-baseline gap-1 font-mono text-xs">
            <span className="text-base-content/40">{row.number}.</span>
            {row.white && (
              <button
                className={moveButtonClass((row.number - 1) * 2, cursor)}
                onClick={() => onJumpTo((row.number - 1) * 2)}>
                {row.white.san}
              </button>
            )}
            {row.black && (
              <button
                className={moveButtonClass((row.number - 1) * 2 + 1, cursor)}
                onClick={() => onJumpTo((row.number - 1) * 2 + 1)}>
                {row.black.san}
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-base-content/40 font-mono text-xs">
          {cursor + 1}/{moves.length}
        </span>
        <div className="flex gap-1">
          <button
            className="btn btn-ghost btn-xs"
            title="Undo (Ctrl+Z)"
            disabled={cursor < 0}
            onClick={onUndo}>
            ↩
          </button>
          <button
            className="btn btn-ghost btn-xs"
            title="Redo (Ctrl+Shift+Z)"
            disabled={cursor >= moves.length - 1}
            onClick={onRedo}>
            ↪
          </button>
        </div>
      </div>
    </div>
  );
};
MovesPanel.displayName = 'MovesPanel';
