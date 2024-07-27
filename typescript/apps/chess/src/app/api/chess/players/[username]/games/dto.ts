import { ChessGame, ChessTimeClass } from '@prisma/client';

export type TimeControl = {
  timeClass: ChessTimeClass;
  timeControl: string;
  timeControlMinutes: number;
  timeControlSeconds: number;
  timeControlExtra: number;
  timeControlDisplay: string;
};

export type GamesResponse = {
  timeClasses: ChessTimeClass[];
  timeControls: TimeControl[];
  total: number;
  games: ChessGame[];
};

export type SyncedResponse = { total: number; synced: number; existed: number };
