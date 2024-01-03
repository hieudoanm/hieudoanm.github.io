import { Status, ChessTitle, League } from '@prisma/client';
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
  status: Status;
  title: ChessTitle | null;
  league: League | null;
  archives: string[];
  stats?: ChessStatsDto[];
  createdAt: Date | null;
  updatedAt: Date | null;
}
