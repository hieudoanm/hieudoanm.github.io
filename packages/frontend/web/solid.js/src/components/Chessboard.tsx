import { Chessground } from 'chessground';
import { onMount } from 'solid-js';

export const Chessboard = ({
  id = '',
  position = '',
  arePiecesDraggable = false,
  onPieceDrop = (sourceSquare, targetSquare, piece): boolean => {
    console.info('sourceSquare', sourceSquare);
    console.info('targetSquare', targetSquare);
    console.info('piece', piece);
    return false;
  },
}: {
  id: string;
  position: string;
  arePiecesDraggable?: boolean;
  onPieceDrop?: (
    sourceSquare: string,
    targetSquare: string,
    piece: string
  ) => boolean;
}) => {
  console.log({
    id,
    position,
    arePiecesDraggable,
    onPieceDrop,
  });

  let boardRef: HTMLDivElement;

  onMount(() => {
    Chessground(boardRef, {
      movable: {
        free: false,
        color: 'white',
      },
    });
  });

  return (
    <div
      ref={(el) => (boardRef = el)}
      style={{ width: '400px', height: '400px' }}
    />
  );
};
