export interface StoredGame {
  id: string;
  name: string;
  savedAt: number;
  white: string;
  black: string;
  result: string;
  event?: string;
  eco?: string;
  pgn: string;
}

export interface StudyMove {
  index: number;
  moveNumber: number;
  color: 'w' | 'b';
  san: string;
  fen: string;
  comment?: string;
}
