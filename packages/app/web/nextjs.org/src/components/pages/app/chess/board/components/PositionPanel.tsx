import type { FC } from 'react';

interface PositionPanelProps {
  fen: string;
  pgn: string;
  onFENChange: (value: string) => void;
  onPGNChange: (value: string) => void;
  onReset: () => void;
  onRandomize: () => void;
}

export const PositionPanel: FC<PositionPanelProps> = ({
  fen,
  pgn,
  onFENChange,
  onPGNChange,
  onReset,
  onRandomize,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-base-content/60 text-xs font-semibold tracking-widest uppercase">
        FEN String
      </label>
      <input
        type="text"
        className="input input-bordered input-sm w-full font-mono text-xs"
        value={fen}
        onChange={(e) => onFENChange(e.target.value)}
        spellCheck={false}
      />
      <label className="text-base-content/60 text-xs font-semibold tracking-widest uppercase">
        PGN
      </label>
      <textarea
        rows={6}
        className="textarea textarea-bordered w-full font-mono text-xs"
        placeholder="Paste PGN here…"
        value={pgn}
        onChange={(e) => onPGNChange(e.target.value)}
        spellCheck={false}
      />
      <div className="flex gap-2">
        <button className="btn btn-outline btn-sm flex-1" onClick={onReset}>
          🔄 Reset
        </button>
        <button className="btn btn-outline btn-sm flex-1" onClick={onRandomize}>
          🔀 Random 960
        </button>
      </div>
    </div>
  );
};
PositionPanel.displayName = 'PositionPanel';
