import type { FC } from 'react';
import { getMoves } from '@chess/ts';

interface ExportPanelProps {
  pgn: string;
  gifLoading: boolean;
  onExportPNG: () => void;
  onExportGIF: () => void;
}

export const ExportPanel: FC<ExportPanelProps> = ({
  pgn,
  gifLoading,
  onExportPNG,
  onExportGIF,
}) => (
  <div className="flex flex-col gap-3">
    <span className="text-base-content/60 text-xs font-semibold tracking-widest uppercase">
      Export
    </span>
    <div className="bg-base-100 flex flex-col gap-2 rounded-xl p-4">
      <div className="flex items-center gap-2">
        <span className="text-lg">🔲</span>
        <div>
          <p className="text-sm font-bold">FEN → PNG</p>
          <p className="text-base-content/50 text-xs">
            Snapshot current board position
          </p>
        </div>
      </div>
      <button className="btn btn-primary btn-sm w-full" onClick={onExportPNG}>
        ⬇️ Download PNG
      </button>
    </div>
    <div className="bg-base-100 flex flex-col gap-2 rounded-xl p-4">
      <div className="flex items-center gap-2">
        <span className="text-lg">🎞️</span>
        <div>
          <p className="text-sm font-bold">PGN → GIF</p>
          <p className="text-base-content/50 text-xs">
            Animate the game from PGN
          </p>
        </div>
      </div>
      <p className="text-base-content/40 text-xs">
        {pgn
          ? `${getMoves(pgn).length} moves loaded`
          : 'Paste PGN in the Position tab first'}
      </p>
      <button
        className="btn btn-primary btn-sm w-full"
        disabled={gifLoading || !pgn}
        onClick={onExportGIF}>
        {gifLoading ? (
          <>
            <span className="loading loading-spinner loading-xs" />
            Rendering…
          </>
        ) : (
          <>⬇️ Download GIF</>
        )}
      </button>
    </div>
  </div>
);
