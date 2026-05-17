import type { FC } from 'react';
import type { BoardMode } from '../types';

interface EnginePanelProps {
  boardMode: BoardMode;
  whiteEval: number | null;
  evalPercent: number;
  statusLabel: string | null;
  onModeSwitch: (mode: BoardMode) => void;
}

export const EnginePanel: FC<EnginePanelProps> = ({
  boardMode,
  whiteEval,
  evalPercent,
  statusLabel,
  onModeSwitch,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-base-content/60 text-xs font-semibold tracking-widest uppercase">
          Stockfish 18
        </span>
        <span
          className={`badge badge-sm ${
            boardMode === 'play' ? 'badge-success' : 'badge-ghost'
          }`}>
          {boardMode === 'play' ? 'Active' : 'Off'}
        </span>
      </div>
      <div className="bg-base-100 flex flex-col items-center gap-1 rounded-xl p-4">
        <span className="text-base-content/40 text-xs">Evaluation</span>
        <span className="font-mono text-3xl font-black">
          {boardMode === 'play' && whiteEval !== null
            ? (whiteEval > 0 ? '+' : '') + (whiteEval / 100).toFixed(2)
            : '—'}
        </span>
        <div className="bg-base-300 mt-2 h-3 w-full overflow-hidden rounded-full">
          <div
            className="h-full rounded-full bg-white transition-all duration-300"
            style={{ width: `${evalPercent}%` }}
          />
        </div>
        <div className="text-base-content/40 mt-0.5 flex w-full justify-between text-[10px]">
          <span>Black</span>
          <span>White</span>
        </div>
      </div>
      <button
        className={`btn btn-sm w-full ${
          boardMode === 'play' ? 'btn-error' : 'btn-primary'
        }`}
        onClick={() => onModeSwitch(boardMode === 'play' ? 'explore' : 'play')}>
        🤖
        {boardMode === 'play' ? 'Stop Engine' : 'Start Engine'}
      </button>
      {statusLabel && (
        <div className="bg-base-100 rounded-lg p-3 text-center text-sm font-semibold">
          {statusLabel}
        </div>
      )}
      {boardMode === 'play' && (
        <button
          className="btn btn-outline btn-sm"
          onClick={() => onModeSwitch('play')}>
          🔄 Reset Game
        </button>
      )}
    </div>
  );
};
EnginePanel.displayName = 'EnginePanel';
