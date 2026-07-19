import type { FC, RefObject } from 'react';
import type { DraggingPieceDataType, PieceDataType } from 'react-chessboard';
import { Chessboard } from '@hieudoanm.github.io/components/organisms/chess/ChessBoard';
import type { BoardMode, SidePanel } from '../types';

interface BoardSectionProps {
  boardRef: RefObject<HTMLDivElement | null>;
  displayFen: string;
  panel: SidePanel;
  boardMode: BoardMode;
  evalPercent: number;
  evalLabel: string;
  statusLabel: string | null;
  ecoCursor: number;
  ecoTotal: number;
  ecoMoves: string[];
  onPieceDrop: (args: {
    piece?: DraggingPieceDataType;
    sourceSquare: string;
    targetSquare: string | null;
  }) => boolean;
  canDragPiece: (args: {
    isSparePiece: boolean;
    piece: PieceDataType;
    square: string | null;
  }) => boolean;
  onEcoCursorChange: (cursor: number) => void;
  onEcoPrev: () => void;
  onEcoNext: () => void;
  onEcoStart: () => void;
  onEcoEnd: () => void;
}

export const BoardSection: FC<BoardSectionProps> = ({
  boardRef,
  displayFen,
  panel,
  boardMode,
  evalPercent,
  evalLabel,
  statusLabel,
  ecoCursor,
  ecoTotal,
  ecoMoves,
  onPieceDrop,
  canDragPiece,
  onEcoCursorChange,
  onEcoPrev,
  onEcoNext,
  onEcoStart,
  onEcoEnd,
}) => {
  return (
    <>
      <div className="flex items-stretch gap-2">
        <div className="border-base-content/20 flex-1 overflow-hidden rounded border">
          <Chessboard
            allowDragging={panel !== 'openings'}
            position={displayFen}
            onPieceDrop={onPieceDrop}
            canDragPiece={canDragPiece}
          />
        </div>
        <div
          className={`border-base-content/20 bg-base-100 relative w-6 overflow-hidden rounded border transition-opacity duration-300 ${
            boardMode === 'play' && panel !== 'openings'
              ? 'opacity-100'
              : 'pointer-events-none opacity-0'
          }`}
          style={{ minHeight: 320 }}>
          <div
            className="absolute bottom-0 w-full bg-white transition-all duration-300"
            style={{ height: `${evalPercent}%` }}
          />
          <div className="bg-base-content/40 absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2" />
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[8px] font-bold">
            {evalLabel}
          </div>
        </div>
      </div>
      {panel === 'openings' && ecoTotal > 0 && (
        <div className="flex flex-col gap-2">
          <div className="bg-base-300 h-1.5 w-full overflow-hidden rounded-full">
            <div
              className="bg-primary h-full rounded-full transition-all duration-200"
              style={{ width: `${(ecoCursor / ecoTotal) * 100}%` }}
            />
          </div>
          <div className="flex flex-wrap gap-1">
            {ecoMoves.map((move, i) => {
              const moveNum = Math.floor(i / 2) + 1;
              const isWhite = i % 2 === 0;
              const isActive = i + 1 === ecoCursor;
              const isPast = i + 1 <= ecoCursor;
              return (
                <button
                  key={i}
                  onClick={() => onEcoCursorChange(i + 1)}
                  className={`rounded px-1.5 py-0.5 font-mono text-xs transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-content font-bold'
                      : isPast
                        ? 'bg-base-content/10 text-base-content/70'
                        : 'text-base-content/30 hover:text-base-content/60'
                  }`}>
                  {isWhite && (
                    <span className="text-base-content/30 mr-0.5">
                      {moveNum}.
                    </span>
                  )}
                  {move}
                </button>
              );
            })}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-base-content/40 font-mono text-xs">
              {ecoCursor}/{ecoTotal}
            </span>
            <div className="flex gap-1">
              <button
                className="btn btn-ghost btn-xs"
                onClick={onEcoStart}
                disabled={ecoCursor === 0}>
                ⏪
              </button>
              <button
                className="btn btn-ghost btn-xs"
                onClick={onEcoPrev}
                disabled={ecoCursor === 0}>
                ◀️
              </button>
              <button
                className="btn btn-ghost btn-xs"
                onClick={onEcoNext}
                disabled={ecoCursor >= ecoTotal}>
                ▶️
              </button>
              <button
                className="btn btn-ghost btn-xs"
                onClick={onEcoEnd}
                disabled={ecoCursor >= ecoTotal}>
                ⏩
              </button>
            </div>
          </div>
        </div>
      )}
      {statusLabel && panel !== 'openings' && (
        <p className="text-base-content/60 text-center text-sm">
          {statusLabel}
        </p>
      )}
    </>
  );
};
BoardSection.displayName = 'BoardSection';
