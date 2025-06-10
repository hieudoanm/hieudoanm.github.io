import { FC } from 'react';
import {
  FaChessBishop,
  FaChessKing,
  FaChessKnight,
  FaChessPawn,
  FaChessQueen,
  FaChessRook,
} from 'react-icons/fa6';
import { Chessboard as ReactChessboard } from 'react-chessboard';
import { Piece, Square } from 'react-chessboard/dist/chessboard/types';
import { logger } from '@web/utils/log';

export const Chessboard: FC<{
  id: string;
  position: string;
  arePiecesDraggable?: boolean;
  onPieceDrop?: (
    sourceSquare: Square,
    targetSquare: Square,
    piece: Piece
  ) => boolean;
}> = ({
  id = '',
  position = '',
  arePiecesDraggable = false,
  onPieceDrop = (
    sourceSquare: Square,
    targetSquare: Square,
    piece: Piece
  ): boolean => {
    logger.info('sourceSquare', sourceSquare);
    logger.info('targetSquare', targetSquare);
    logger.info('piece', piece);
    return false;
  },
}) => {
  const darkSquareColor: string = 'oklch(14.5% 0 0)';
  const lightSquareColor: string = 'oklch(20.5% 0 0)';

  return (
    <ReactChessboard
      id={id}
      position={position}
      arePiecesDraggable={arePiecesDraggable}
      onPieceDrop={onPieceDrop}
      customDarkSquareStyle={{
        backgroundColor: darkSquareColor,
        text: 'white',
      }}
      customLightSquareStyle={{
        backgroundColor: lightSquareColor,
        text: 'white',
      }}
      customPieces={{
        wK: () => (
          <div className="flex h-full w-full items-center justify-center">
            <FaChessKing className="text-xl text-white md:text-2xl" />
          </div>
        ),
        wQ: () => (
          <div className="flex h-full w-full items-center justify-center">
            <FaChessQueen className="text-xl text-white md:text-2xl" />
          </div>
        ),
        wR: () => (
          <div className="flex h-full w-full items-center justify-center">
            <FaChessRook className="text-xl text-white md:text-2xl" />
          </div>
        ),
        wB: () => (
          <div className="flex h-full w-full items-center justify-center">
            <FaChessBishop className="text-xl text-white md:text-2xl" />
          </div>
        ),
        wN: () => (
          <div className="flex h-full w-full items-center justify-center">
            <FaChessKnight className="text-xl text-white md:text-2xl" />
          </div>
        ),
        wP: () => (
          <div className="flex h-full w-full items-center justify-center">
            <FaChessPawn className="text-xl text-white md:text-2xl" />
          </div>
        ),
        bK: () => (
          <div className="flex h-full w-full items-center justify-center">
            <FaChessKing className="text-xl text-red-500 md:text-2xl" />
          </div>
        ),
        bQ: () => (
          <div className="flex h-full w-full items-center justify-center">
            <FaChessQueen className="text-xl text-red-500 md:text-2xl" />
          </div>
        ),
        bR: () => (
          <div className="flex h-full w-full items-center justify-center">
            <FaChessRook className="text-xl text-red-500 md:text-2xl" />
          </div>
        ),
        bB: () => (
          <div className="flex h-full w-full items-center justify-center">
            <FaChessBishop className="text-xl text-red-500 md:text-2xl" />
          </div>
        ),
        bN: () => (
          <div className="flex h-full w-full items-center justify-center">
            <FaChessKnight className="text-xl text-red-500 md:text-2xl" />
          </div>
        ),
        bP: () => (
          <div className="flex h-full w-full items-center justify-center">
            <FaChessPawn className="text-xl text-red-500 md:text-2xl" />
          </div>
        ),
      }}
    />
  );
};
