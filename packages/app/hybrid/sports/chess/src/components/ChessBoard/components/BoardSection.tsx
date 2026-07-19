import type { FC } from 'react';
import { useMemo } from 'react';
import type { CSSProperties, RefObject } from 'react';
import type {
  DraggingPieceDataType,
  PieceDataType,
  SquareHandlerArgs,
} from 'react-chessboard';
import { Chessboard } from '../../organisms/chess/ChessBoard';
import { BOARD_THEMES } from '../constants';
import type { BoardMode, BoardTheme, MoveRecord, SidePanel } from '../types';
import type { PieceSetKey } from '../pieceSets';
import { MovesPanel } from './MovesPanel';

interface BoardPrefs {
  flipped: boolean;
  theme: BoardTheme;
  pieceSet: PieceSetKey;
  showNotation: boolean;
}

interface BoardSelection {
  selectedSquare: string | null;
  legalTargets: string[];
  onSquareClick: (args: SquareHandlerArgs) => void;
}

interface BoardHistory {
  moves: MoveRecord[];
  cursor: number;
  onUndo: () => void;
  onRedo: () => void;
  onJumpTo: (index: number) => void;
}

interface BoardSectionProps {
  boardRef: RefObject<HTMLDivElement | null>;
  displayFen: string;
  panel: SidePanel;
  boardMode: BoardMode;
  setupMode: boolean;
  keyboardBuffer: string;
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
  board: BoardPrefs;
  selection: BoardSelection;
  history: BoardHistory;
}

const squareColor = (square: string, theme: BoardTheme): string => {
  const colors = BOARD_THEMES[theme];
  const light = (square.charCodeAt(0) - 97 + Number(square[1])) % 2 === 1;
  return light ? colors.light : colors.dark;
};

export const BoardSection: FC<BoardSectionProps> = ({
  boardRef,
  displayFen,
  panel,
  boardMode,
  setupMode,
  keyboardBuffer,
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
  board,
  selection,
  history,
}) => {
  const squareStyles = useMemo(() => {
    const styles: Record<string, CSSProperties> = {};
    if (setupMode) return styles;
    if (selection.selectedSquare) {
      styles[selection.selectedSquare] = {
        boxShadow: 'inset 0 0 0 3px rgba(255, 200, 0, 0.85)',
      };
      for (const sq of selection.legalTargets) {
        styles[sq] = {
          background: `radial-gradient(circle, rgba(0,0,0,0.3) 24%, transparent 25%), ${squareColor(sq, board.theme)}`,
        };
      }
    }
    return styles;
  }, [
    setupMode,
    selection.selectedSquare,
    selection.legalTargets,
    board.theme,
  ]);

  return (
    <>
      <div className="flex items-stretch gap-2">
        <div className="border-base-content/20 flex-1 overflow-hidden rounded border">
          <Chessboard
            allowDragging={panel !== 'openings' && !setupMode}
            position={displayFen}
            onPieceDrop={onPieceDrop}
            canDragPiece={canDragPiece}
            onSquareClick={selection.onSquareClick}
            squareStyles={squareStyles}
            boardOrientation={board.flipped ? 'black' : 'white'}
            showNotation={board.showNotation}
            theme={board.theme}
            pieceSet={board.pieceSet}
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
      {panel !== 'openings' && !setupMode && history.moves.length > 0 && (
        <MovesPanel
          moves={history.moves}
          cursor={history.cursor}
          onJumpTo={history.onJumpTo}
          onUndo={history.onUndo}
          onRedo={history.onRedo}
        />
      )}
      {keyboardBuffer && panel !== 'openings' && (
        <p className="text-base-content/60 text-center font-mono text-xs">
          ⌨ {keyboardBuffer}
        </p>
      )}
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
