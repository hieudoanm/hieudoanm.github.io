import type { FC } from 'react';
import type { CSSProperties } from 'react';
import type {
  PieceDropHandlerArgs,
  PieceHandlerArgs,
  PieceRenderObject,
  SquareHandlerArgs,
} from 'react-chessboard';
import { Chessboard as ReactChessboard } from 'react-chessboard';
import { BOARD_THEMES } from '../../ChessBoard/constants';
import type { BoardTheme } from '../../ChessBoard/types';
import { renderPieces } from '../../ChessBoard/pieceSets';
import type { PieceSetKey } from '../../ChessBoard/pieceSets';

interface ChessboardProps {
  position: string;
  allowDragging?: boolean;
  boardOrientation?: 'white' | 'black';
  showNotation?: boolean;
  theme?: BoardTheme;
  pieceSet?: PieceSetKey;
  squareStyles?: Record<string, CSSProperties>;
  animationDurationInMs?: number;
  canDragPiece?: ({ isSparePiece, piece, square }: PieceHandlerArgs) => boolean;
  onPieceDrop?: ({
    piece,
    sourceSquare,
    targetSquare,
  }: PieceDropHandlerArgs) => boolean;
  onSquareClick?: ({ piece, square }: SquareHandlerArgs) => void;
}

export const Chessboard: FC<ChessboardProps> = ({
  allowDragging = false,
  position = '',
  boardOrientation = 'white',
  showNotation = true,
  theme = 'dark',
  pieceSet = 'standard',
  squareStyles = {},
  animationDurationInMs = 200,
  canDragPiece = () => false,
  onPieceDrop = () => false,
  onSquareClick = () => undefined,
}) => {
  const colors = BOARD_THEMES[theme];
  const pieces: PieceRenderObject | undefined = renderPieces(pieceSet);

  return (
    <ReactChessboard
      options={{
        position,
        allowDragging,
        boardOrientation,
        showNotation,
        animationDurationInMs,
        canDragPiece,
        onPieceDrop,
        onSquareClick,
        squareStyles,
        pieces,
        darkSquareStyle: { backgroundColor: colors.dark, color: 'white' },
        lightSquareStyle: { backgroundColor: colors.light, color: 'white' },
      }}
    />
  );
};
Chessboard.displayName = 'Chessboard';
