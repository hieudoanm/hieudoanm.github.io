export enum ChessBoardFile {
  FILE_A = 'a',
  FILE_B = 'b',
  FILE_C = 'c',
  FILE_D = 'd',
  FILE_E = 'e',
  FILE_F = 'f',
  FILE_G = 'g',
  FILE_H = 'h',
}

export enum ChessBoardRank {
  RANK_1 = 1,
  RANK_2 = 2,
  RANK_3 = 3,
  RANK_4 = 4,
  RANK_5 = 5,
  RANK_6 = 6,
  RANK_7 = 7,
  RANK_8 = 8,
}

export enum ChessEvaluation {
  BLUNDER = '??',
  MISTAKE = '?',
  DUBIOUS = '?!',
  INTERESTING = '!?',
  GOOD = '!',
  BRILLIANT = '!!',
}

export enum ChessPiece {
  KING = 'K',
  QUEEN = 'Q',
  ROOK = 'R',
  BISHOP = 'B',
  KNIGHT = 'N',
  PAWN = '',
}

export enum ChessAction {
  CHECK = '+',
  CAPTURE = 'x',
  CHECKMATE = '#',
  SHORT_CASTLE = '0-0',
  LONG_CASTLE = '0-0-0',
}

export enum ChessPoint {
  WIN = 1,
  DRAW = 0.5,
  LOSS = 0,
}
