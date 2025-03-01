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

export const Chessboard: FC<{
  id: string;
  position: string;
  arePiecesDraggable?: boolean;
}> = ({ id = '', position = '', arePiecesDraggable = false }) => {
  return (
    <ReactChessboard
      id={id}
      position={position}
      arePiecesDraggable={arePiecesDraggable}
      customDarkSquareStyle={{
        backgroundColor: 'oklch(21% 0.034 264.665 / 100%)',
        text: 'white',
      }}
      customLightSquareStyle={{
        backgroundColor: 'oklch(21% 0.034 264.665 / 95%)',
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
