import { addZero } from '@hieudoanm/common/utils/add-zero';
import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import {
  ChessFullPlayer,
  ChessGame,
  ChessPlayer,
  ChessStats,
  ChessTitle,
} from './chess.dto';

export const TITLES: ChessTitle[] = [
  'GM',
  'IM',
  'FM',
  'CM',
  'NM',
  'WGM',
  'WIM',
  'WFM',
  'WCM',
  'WNM',
];

@Injectable()
export class ChessClient {
  private baseUrl = 'https://api.chess.com/pub';
  private readonly logger = new Logger(ChessClient.name);

  async getChessPlayer(username: string): Promise<ChessPlayer> {
    const encodedUsername: string = encodeURIComponent(username);
    const url = `${this.baseUrl}/player/${encodedUsername}`;
    this.logger.log(`getChessPlayer url=${url}`);
    const { data } = await axios.get<ChessPlayer>(url);
    return data;
  }

  async getChessStats(username: string): Promise<ChessStats> {
    const encodedUsername: string = encodeURIComponent(username);
    const url = `${this.baseUrl}/player/${encodedUsername}/stats`;
    this.logger.log(`getChessStats url=${url}`);
    const { data } = await axios.get<ChessStats>(url);
    return data;
  }

  async getChessArchives(username: string): Promise<string[]> {
    const encodedUsername: string = encodeURIComponent(username);
    const url = `${this.baseUrl}/player/${encodedUsername}/games/archives`;
    this.logger.log(`getChessArchives url=${url}`);
    const { data } = await axios.get<{ archives: string[] }>(url);
    return data.archives || [];
  }

  async getChessGamesByYearAndMonth(
    username: string,
    year: number,
    month: number
  ): Promise<ChessGame[]> {
    const encodedUsername: string = encodeURIComponent(username);
    const yyyy: string = encodeURIComponent(addZero(year));
    const mm: string = encodeURIComponent(addZero(month));
    const url = `${this.baseUrl}/player/${encodedUsername}/games/${yyyy}/${mm}`;
    this.logger.log(`getChessGamesByYearAndMonth url=${url}`);
    const { data } = await axios.get<{ games: ChessGame[] }>(url);
    return data.games || [];
  }

  async getChessFullPlayer(username: string): Promise<ChessFullPlayer> {
    const player = await this.getChessPlayer(username);
    const stats = await this.getChessStats(username);
    const archives = await this.getChessArchives(username);
    return { ...player, stats, archives };
  }

  async getChessGames(
    username: string,
    { month = 0, year = 0 }: { month: number; year: number }
  ): Promise<ChessGame[]> {
    const archives = await this.getChessArchives(username);
    const filterArchives = archives.filter((archive: string) => {
      const [yearPath = '', monthPath = ''] = archive.split('/').slice(-2);
      const monthFlag: boolean =
        month === 0 ? true : addZero(month) === monthPath;
      const yearFlag: boolean = year === 0 ? true : addZero(year) === yearPath;
      return monthFlag && yearFlag;
    });
    this.logger.log(`filterArchives ${JSON.stringify(filterArchives)}`);
    const promiseArchives = filterArchives.map(async (archive: string) => {
      try {
        const { data } = await axios.get<{ games: ChessGame[] }>(archive);
        const games = data.games || [];
        games.sort((a, b) => (a > b ? 1 : -1));
        return games;
      } catch (error) {
        this.logger.error(archive, error);
        return [];
      }
    });
    const responses: ChessGame[][] = await Promise.all(promiseArchives);
    return responses.flat();
  }

  async getChessTitledPlayers(title: ChessTitle): Promise<string[]> {
    const encodedTitle: string = encodeURIComponent(title);
    const url = `${this.baseUrl}/titled/${encodedTitle}`;
    this.logger.log(`getChessTitledPlayers url=${url}`);
    const { data } = await axios.get<{ players: string[] }>(url);
    return data.players || [];
  }
}
