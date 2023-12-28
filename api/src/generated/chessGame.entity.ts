export class ChessGameDto {
  id: string;
  url: string;
  pgn: string;
  timeControl: string;
  timeClass: string;
  endTime: Date;
  rated: boolean;
  tcn: string;
  initialSetup: string;
  rules: string;
  whiteId: string;
  blackId: string;
  whiteUsername: string;
  blackUsername: string;
  whiteAccuracy: number;
  blackAccuracy: number;
  whiteResult: string;
  blackResult: string;
  whiteRating: number;
  blackRating: number;
  fen: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}
