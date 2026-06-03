import { FC } from 'react';
import {
  PieceDropHandlerArgs,
  PieceHandlerArgs,
  Chessboard as ReactChessboard,
} from 'react-chessboard';

export const Chessboard: FC<{
  position: string;
  allowDragging?: boolean;
  canDragPiece?: ({ isSparePiece, piece, square }: PieceHandlerArgs) => boolean;
  onPieceDrop?: ({
    piece,
    sourceSquare,
    targetSquare,
  }: PieceDropHandlerArgs) => boolean;
}> = ({
  allowDragging = false,
  position = '',
  canDragPiece = () => false,
  onPieceDrop = () => false,
}) => {
  const darkSquareColor: string = 'oklch(14.5% 0 0)';
  const lightSquareColor: string = 'oklch(20.5% 0 0)';

  return (
    <ReactChessboard
      options={{
        position,
        allowDragging,
        canDragPiece,
        onPieceDrop,
        darkSquareStyle: { backgroundColor: darkSquareColor, color: 'white' },
        lightSquareStyle: { backgroundColor: lightSquareColor, color: 'white' },
      }}
    />
  );
};
