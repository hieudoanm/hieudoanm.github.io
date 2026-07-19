export type FENFields = {
  piecePlacement: string;
  activeColor: 'w' | 'b';
  castlingAvailability: string;
  enPassantTarget: string;
  halfMoveClock: number;
  fullMoveNumber: number;
};

export const fromFenFields = (fen: string): FENFields => {
  const parts = fen.trim().split(/\s+/);

  if (parts.length !== 6) {
    throw new Error('Invalid FEN: must have 6 fields');
  }

  const [
    piecePlacement,
    activeColor,
    castlingAvailability,
    enPassantTarget,
    halfmoveClock,
    fullmoveNumber,
  ] = parts;

  if (
    !piecePlacement ||
    !activeColor ||
    !castlingAvailability ||
    !enPassantTarget ||
    !halfmoveClock ||
    !fullmoveNumber
  ) {
    throw new Error('Invalid FEN: missing fields');
  }

  if (activeColor !== 'w' && activeColor !== 'b') {
    throw new Error('Invalid FEN: active color');
  }

  const halfmove = Number(halfmoveClock);
  const fullmove = Number(fullmoveNumber);

  if (Number.isNaN(halfmove) || Number.isNaN(fullmove)) {
    throw new Error('Invalid FEN: move counters');
  }

  return {
    piecePlacement,
    activeColor,
    castlingAvailability,
    enPassantTarget,
    halfMoveClock: halfmove,
    fullMoveNumber: fullmove,
  };
};

export const toFenFields = (fen: FENFields): string => {
  return [
    fen.piecePlacement,
    fen.activeColor,
    fen.castlingAvailability,
    fen.enPassantTarget,
    fen.halfMoveClock,
    fen.fullMoveNumber,
  ].join(' ');
};

const FILES: string = 'abcdefgh';

const get960Castling = (backRank: string): string => {
  const rank: string = backRank.toUpperCase();
  const kingFile: number = rank.indexOf('K');

  if (kingFile === -1) return '-';

  const rookFiles: number[] = [...rank]
    .map((p, i) => (p === 'R' ? i : -1))
    .filter((i) => i !== -1);

  if (rookFiles.length !== 2) {
    throw new Error('Chess960 back rank must contain exactly two rooks');
  }

  const white: string = rookFiles
    .sort((a, b) => a - b)
    .map((f) => FILES[f])
    .join('')
    .toUpperCase();

  const black: string = white.toLowerCase();

  return white + black;
};

type Variant =
  | 'standard'
  | 'chess960'
  | 'crazyhouse'
  | 'antichess'
  | 'atomic'
  | 'horde'
  | 'kingOfTheHill'
  | 'racingKings'
  | 'threeCheck'
  | 'fromPosition';

export const toInitialFen = (
  position: string,
  { variant = 'standard' }: { variant: Variant } = { variant: 'standard' }
): string => {
  if (position.length !== 8) {
    throw new Error('Back rank must be exactly 8 characters');
  }

  const black: string = position.toLowerCase();
  const white: string = position.toUpperCase();

  const castling: string =
    variant === 'chess960' ? get960Castling(position) : 'KQkq';

  return `${black}/pppppppp/8/8/8/8/PPPPPPPP/${white} w ${castling} - 0 1`;
};
