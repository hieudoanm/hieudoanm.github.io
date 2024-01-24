import {
  ChessStatus,
  ChessTitle,
  ChessLeague,
} from '@hieudoanm/generated/prisma/chess/client';
import { ChessStatsDto } from './chessStats.entity';

export class ChessPlayerDto {
  id: number;
  username: string;
  name: string;
  followers: number;
  avatar: string;
  location: string;
  country: string;
  countryCode: string;
  twitchUrl: string;
  isStreamer: boolean;
  verified: boolean;
  lastOnline: Date;
  joined: Date;
  status: ChessStatus;
  title: ChessTitle | null;
  league: ChessLeague | null;
  archives: string[];
  stats?: ChessStatsDto[];
  createdAt: Date | null;
  updatedAt: Date | null;
}
