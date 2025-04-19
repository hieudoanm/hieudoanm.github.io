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
    console.info('sourceSquare', sourceSquare);
    console.info('targetSquare', targetSquare);
    console.info('piece', piece);
    return false;
  },
}) => {
  return (
    <ReactChessboard
      id={id}
      position={position}
      arePiecesDraggable={arePiecesDraggable}
      onPieceDrop={onPieceDrop}
      customDarkSquareStyle={{
        backgroundColor: 'oklch(12.9% 0.042 264.695)',
        text: 'white',
      }}
      customLightSquareStyle={{
        backgroundColor: 'oklch(20.8% 0.042 265.755)',
        text: 'white',
      }}
      customPieces={{
        wK: () => (
          <div className="flex h-full w-full items-center justify-center">
            <FaChessKing className="text-2xl text-white md:text-4xl" />
          </div>
        ),
        wQ: () => (
          <div className="flex h-full w-full items-center justify-center">
            <FaChessQueen className="text-2xl text-white md:text-4xl" />
          </div>
        ),
        wR: () => (
          <div className="flex h-full w-full items-center justify-center">
            <FaChessRook className="text-2xl text-white md:text-4xl" />
          </div>
        ),
        wB: () => (
          <div className="flex h-full w-full items-center justify-center">
            <FaChessBishop className="text-2xl text-white md:text-4xl" />
          </div>
        ),
        wN: () => (
          <div className="flex h-full w-full items-center justify-center">
            <FaChessKnight className="text-2xl text-white md:text-4xl" />
          </div>
        ),
        wP: () => (
          <div className="flex h-full w-full items-center justify-center">
            <FaChessPawn className="text-2xl text-white md:text-4xl" />
          </div>
        ),
        bK: () => (
          <div className="flex h-full w-full items-center justify-center">
            <FaChessKing className="text-2xl text-red-500 md:text-4xl" />
          </div>
        ),
        bQ: () => (
          <div className="flex h-full w-full items-center justify-center">
            <FaChessQueen className="text-2xl text-red-500 md:text-4xl" />
          </div>
        ),
        bR: () => (
          <div className="flex h-full w-full items-center justify-center">
            <FaChessRook className="text-2xl text-red-500 md:text-4xl" />
          </div>
        ),
        bB: () => (
          <div className="flex h-full w-full items-center justify-center">
            <FaChessBishop className="text-2xl text-red-500 md:text-4xl" />
          </div>
        ),
        bN: () => (
          <div className="flex h-full w-full items-center justify-center">
            <FaChessKnight className="text-2xl text-red-500 md:text-4xl" />
          </div>
        ),
        bP: () => (
          <div className="flex h-full w-full items-center justify-center">
            <FaChessPawn className="text-2xl text-red-500 md:text-4xl" />
          </div>
        ),
      }}
    />
  );
};
