import { Injectable, Logger } from '@nestjs/common';
import {
  ChessLeague,
  ChessStatus,
  ChessTimeClass,
  ChessTitle,
  Prisma,
} from '@prisma/client';
import axios from 'axios';
import { ChessClient } from '../../../common/clients/apis/chess.com/chess.client';
import {
  ChessPlayer,
  ChessStats,
} from '../../../common/clients/apis/chess.com/chess.dto';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { ChessPlayerDto } from '../../../generated/chessPlayer.entity';
import { PlayersResponseDto } from './players.dto';

@Injectable()
export class PlayerService {
  private readonly logger = new Logger(PlayerService.name);

  constructor(
    private readonly chessClient: ChessClient,
    private readonly prismaService: PrismaService
  ) {}

  public async getPlayers({
    limit = 100,
    offset = 0,
  }: {
    limit: number;
    offset: number;
  }): Promise<PlayersResponseDto> {
    const players = await this.prismaService.chessPlayer.findMany({
      take: limit,
      skip: offset,
      include: { stats: true },
    });
    const total = players.length;
    return { total, players };
  }

  public async getPlayer(username: string): Promise<ChessPlayerDto> {
    const where: Prisma.ChessPlayerWhereInput = { username };
    const player = await this.prismaService.chessPlayer.findFirst({
      where,
      include: { stats: true },
    });
    if (player !== null) return player;
    return this.syncPlayer(username);
  }

  private async mapPlayer(chessPlayer: ChessPlayer, archives: string[]) {
    const {
      avatar = '',
      username = '',
      player_id: playerId = 0,
      name = '',
      title = '',
      followers = 0,
      country: countryUrl = '',
      location = '',
      last_online: lastOnline = 0,
      joined = 0,
      status = '',
      is_streamer: isStreamer = false,
      twitch_url: twitchUrl = '',
      verified = false,
      league = '',
    } = chessPlayer;
    const {
      data: { name: country = '', code: countryCode = '' },
    } = await axios.get<{
      name: string;
      code: string;
    }>(countryUrl);
    const d = new Date();
    const lastOnlineDate: Date = new Date(lastOnline * 1000);
    const joinedDate: Date = new Date(joined * 1000);
    return {
      id: playerId,
      avatar,
      name,
      username,
      followers,
      location,
      country,
      countryCode,
      lastOnline: lastOnlineDate,
      joined: joinedDate,
      isStreamer,
      verified,
      twitchUrl,
      status: status as ChessStatus,
      title: title ? (title as ChessTitle) : null,
      league: league ? (league as ChessLeague) : null,
      archives: archives.map((archive) =>
        archive.split('/').slice(-2).join('/')
      ),
      createdAt: d,
      updatedAt: d,
    };
  }

  private async syncProfile(username: string) {
    const chessPlayer: ChessPlayer =
      await this.chessClient.getChessPlayer(username);
    const archives: string[] =
      await this.chessClient.getChessArchives(username);
    archives.sort((a, b) => (a < b ? 1 : -1));
    const player = await this.mapPlayer(chessPlayer, archives);

    return this.prismaService.chessPlayer.upsert({
      create: player,
      update: player,
      where: { id: player.id },
      include: { stats: true },
    });
  }

  private mapStats(stats: ChessStats, id: number) {
    const {
      chess_daily: {
        last: {
          rating: statsDailyRatingLast = 0,
          rd: statsDailyRatingDeviation = 0,
        } = { rating: 0, rd: 0 },
        best: { rating: statsDailyRatingBest = 0 } = { rating: 0 },
        record: {
          win: statsDailyRecordWin = 0,
          draw: statsDailyRecordDraw = 0,
          loss: statsDailyRecordLoss = 0,
        } = {
          record: { win: 0, draw: 0, loss: 0 },
        },
      } = {
        last: { rating: 0, rd: 0 },
        best: { rating: 0 },
        record: { win: 0, draw: 0, loss: 0 },
      },
      chess_rapid: {
        last: {
          rating: statsRapidRatingLast = 0,
          rd: statsRapidRatingDeviation = 0,
        } = { rating: 0, rd: 0 },
        best: { rating: statsRapidRatingBest = 0 } = { rating: 0 },
        record: {
          win: statsRapidRecordWin = 0,
          draw: statsRapidRecordDraw = 0,
          loss: statsRapidRecordLoss = 0,
        } = {
          record: { win: 0, draw: 0, loss: 0 },
        },
      } = {
        last: { rating: 0, rd: 0 },
        best: { rating: 0 },
        record: { win: 0, draw: 0, loss: 0 },
      },
      chess_blitz: {
        last: {
          rating: statsBlitzRatingLast = 0,
          rd: statsBlitzRatingDeviation = 0,
        } = { rating: 0, rd: 0 },
        best: { rating: statsBlitzRatingBest = 0 } = { rating: 0 },
        record: {
          win: statsBlitzRecordWin = 0,
          draw: statsBlitzRecordDraw = 0,
          loss: statsBlitzRecordLoss = 0,
        } = {
          record: { win: 0, draw: 0, loss: 0 },
        },
      } = {
        last: { rating: 0, rd: 0 },
        best: { rating: 0 },
        record: { win: 0, draw: 0, loss: 0 },
      },
      chess_bullet: {
        last: {
          rating: statsBulletRatingLast = 0,
          rd: statsBulletRatingDeviation = 0,
        } = { rating: 0, rd: 0 },
        best: { rating: statsBulletRatingBest = 0 } = { rating: 0 },
        record: {
          win: statsBulletRecordWin = 0,
          draw: statsBulletRecordDraw = 0,
          loss: statsBulletRecordLoss = 0,
        } = {
          record: { win: 0, draw: 0, loss: 0 },
        },
      } = {
        last: { rating: 0, rd: 0 },
        best: { rating: 0 },
        record: { win: 0, draw: 0, loss: 0 },
      },
    } = stats;
    const d = new Date();
    return [
      {
        playerId: id,
        timeClass: ChessTimeClass.daily,
        best: statsDailyRatingBest,
        last: statsDailyRatingLast,
        deviation: statsDailyRatingDeviation,
        win: statsDailyRecordWin,
        draw: statsDailyRecordDraw,
        loss: statsDailyRecordLoss,
        createdAt: d,
        updatedAt: d,
      },
      {
        playerId: id,
        timeClass: ChessTimeClass.rapid,
        best: statsRapidRatingBest,
        last: statsRapidRatingLast,
        deviation: statsRapidRatingDeviation,
        win: statsRapidRecordWin,
        draw: statsRapidRecordDraw,
        loss: statsRapidRecordLoss,
        createdAt: d,
        updatedAt: d,
      },
      {
        playerId: id,
        timeClass: ChessTimeClass.blitz,
        best: statsBlitzRatingBest,
        last: statsBlitzRatingLast,
        deviation: statsBlitzRatingDeviation,
        win: statsBlitzRecordWin,
        draw: statsBlitzRecordDraw,
        loss: statsBlitzRecordLoss,
        createdAt: d,
        updatedAt: d,
      },
      {
        playerId: id,
        timeClass: ChessTimeClass.bullet,
        best: statsBulletRatingBest,
        last: statsBulletRatingLast,
        deviation: statsBulletRatingDeviation,
        win: statsBulletRecordWin,
        draw: statsBulletRecordDraw,
        loss: statsBulletRecordLoss,
        createdAt: d,
        updatedAt: d,
      },
    ];
  }

  private async syncStats(username: string, id: number): Promise<number> {
    const stats: ChessStats = await this.chessClient.getChessStats(username);
    const playerStats = this.mapStats(stats, id);
    for (const timeClassStats of playerStats) {
      await this.prismaService.chessStats.upsert({
        create: timeClassStats,
        update: timeClassStats,
        where: {
          playerId_timeClass: {
            playerId: id,
            timeClass: timeClassStats.timeClass,
          },
        },
      });
    }
    return id;
  }

  public async syncPlayer(username: string) {
    const player = await this.syncProfile(username);
    const id: number = await this.syncStats(username, player.id);
    this.logger.log(`id=${id}`);
    return player;
  }
}
