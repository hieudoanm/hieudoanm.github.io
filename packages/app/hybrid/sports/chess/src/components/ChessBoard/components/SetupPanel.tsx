import type { FC } from 'react';
import { PIECE_GLYPHS } from '../pieceSets';
import type { PieceKey } from '../pieceSets';

interface SetupPanelProps {
  setupMode: boolean;
  setupFen: string;
  setupPalette: string | null;
  onStart: () => void;
  onApply: () => void;
  onCancel: () => void;
  onClear: () => void;
  onPaletteChange: (palette: string | null) => void;
  onSetupFenChange: (fen: string) => void;
}

const PALETTE: PieceKey[] = [
  'wK',
  'wQ',
  'wR',
  'wB',
  'wN',
  'wP',
  'bK',
  'bQ',
  'bR',
  'bB',
  'bN',
  'bP',
];

export const SetupPanel: FC<SetupPanelProps> = ({
  setupMode,
  setupFen,
  setupPalette,
  onStart,
  onApply,
  onCancel,
  onClear,
  onPaletteChange,
  onSetupFenChange,
}) => {
  if (!setupMode) {
    return (
      <div className="flex flex-col gap-3">
        <p className="text-base-content/60 text-sm">
          Set up a custom position: pick a piece, click squares to place it, or
          type a FEN directly. When you're done, the board becomes playable.
        </p>
        <button className="btn btn-primary btn-sm" onClick={onStart}>
          🧱 Start Setup
        </button>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-6 gap-1">
        {PALETTE.map((key) => (
          <button
            key={key}
            className={`btn btn-xs p-0 ${setupPalette === key ? 'btn-primary' : 'btn-ghost'}`}
            title={key}
            onClick={() => onPaletteChange(key)}>
            {PIECE_GLYPHS[key]}
          </button>
        ))}
        <button
          className={`btn btn-xs ${setupPalette === null ? 'btn-primary' : 'btn-ghost'}`}
          title="Erase"
          onClick={() => onPaletteChange(null)}>
          ✕
        </button>
      </div>
      <textarea
        className="textarea textarea-bordered textarea-xs w-full"
        rows={3}
        value={setupFen}
        onChange={(e) => onSetupFenChange(e.target.value)}
      />
      <div className="flex gap-1">
        <button className="btn btn-primary btn-sm flex-1" onClick={onApply}>
          Apply
        </button>
        <button className="btn btn-ghost btn-sm" onClick={onClear}>
          Clear
        </button>
        <button className="btn btn-ghost btn-sm" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};
SetupPanel.displayName = 'SetupPanel';
