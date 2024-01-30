import { ChessGame } from '@prisma/client';

export type GamesResponse = { total: number; games: ChessGame[] };

export type SyncedResponse = { total: number; synced: number; existed: number };
