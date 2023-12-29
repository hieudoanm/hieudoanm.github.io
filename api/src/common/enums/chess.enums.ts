export enum ChessBoardFile {
  'a' = 'a',
  'b' = 'b',
  'c' = 'c',
  'd' = 'd',
  'e' = 'e',
  'f' = 'f',
  'g' = 'g',
  'h' = 'h',
}

export enum ChessBoardRank {
  'rank_1' = 1,
  'rank_2' = 2,
  'rank_3' = 3,
  'rank_4' = 4,
  'rank_5' = 5,
  'rank_6' = 6,
  'rank_7' = 7,
  'rank_8' = 8,
}

export enum ChessEvaluation {
  blunder = '??',
  mistake = '?',
  dubious = '?!',
  interesting = '!?',
  good = '!',
  brilliant = '!!',
}

export enum ChessPiece {
  king = 'K',
  queen = 'Q',
  rook = 'R',
  bishop = 'B',
  knight = 'N',
  pawn = '',
}

export enum ChessPoint {
  win = 1,
  draw = 0.5,
  loss = 0,
}
