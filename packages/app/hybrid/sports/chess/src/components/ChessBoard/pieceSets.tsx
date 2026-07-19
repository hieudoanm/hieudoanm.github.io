import type { CSSProperties, JSX } from 'react';
import type { PieceRenderObject } from 'react-chessboard';

export type PieceSetKey = 'standard' | 'unicode';
export const PIECE_SET_KEYS: PieceSetKey[] = ['standard', 'unicode'];

export type PieceKey =
  | 'wP'
  | 'wN'
  | 'wB'
  | 'wR'
  | 'wQ'
  | 'wK'
  | 'bP'
  | 'bN'
  | 'bB'
  | 'bR'
  | 'bQ'
  | 'bK';

export const PIECE_GLYPHS: Record<PieceKey, string> = {
  wP: '♙',
  wN: '♘',
  wB: '♗',
  wR: '♖',
  wQ: '♕',
  wK: '♔',
  bP: '♟',
  bN: '♞',
  bB: '♝',
  bR: '♜',
  bQ: '♛',
  bK: '♚',
};

const pieceStyle = (white: boolean): CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 42,
  lineHeight: 1,
  color: white ? '#f8fafc' : '#0f172a',
  WebkitTextStroke: `1px ${white ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.6)'}`,
});

const unicodePiece = (white: boolean, glyph: string): JSX.Element => (
  <span style={pieceStyle(white)}>{glyph}</span>
);

export const renderPieces = (
  set: PieceSetKey
): PieceRenderObject | undefined => {
  if (set === 'standard') return undefined;
  return (Object.keys(PIECE_GLYPHS) as PieceKey[]).reduce<PieceRenderObject>(
    (acc, key) => {
      acc[key] = () => unicodePiece(key[1] === 'w', PIECE_GLYPHS[key]);
      return acc;
    },
    {}
  );
};
