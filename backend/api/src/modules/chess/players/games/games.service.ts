import { ChessClient } from '@hieudoanm/common/clients/apis/chess/chess.com/chess.client';
import { ChessGame } from '@hieudoanm/common/clients/apis/chess/chess.com/chess.dto';
import { PrismaChessClient } from '@hieudoanm/common/prisma/chess/prisma.chess';
import { ChessGameDto } from '@hieudoanm/generated/prisma/chess/dto/chessGame.entity';
import { Injectable, Logger } from '@nestjs/common';
import {
  ChessResult,
  ChessTimeClass,
  ChessVariant,
  Prisma,
} from '@hieudoanm/generated/prisma/chess/client';

@Injectable()
export class GamesService {
  private readonly logger = new Logger(GamesService.name);

  constructor(
    private readonly chessClient: ChessClient,
    private readonly prismaChessClient: PrismaChessClient
  ) {}

  async getGames(
    username: string,
    {
      month = new Date().getMonth() + 1,
      year = new Date().getFullYear(),
    }: { month: number; year: number },
    { limit = 100, offset = 0 }: { limit: number; offset: number }
  ): Promise<{ total: number; games: ChessGameDto[] }> {
    this.logger.log(`getGames month=${month} year=${year}`);
    const where: Prisma.ChessGameWhereInput = {
      OR: [
        { whiteUsername: { equals: username, mode: 'insensitive' } },
        { blackUsername: { equals: username, mode: 'insensitive' } },
      ],
      endTime: {
        gte: new Date(year, month - 1, 1),
        lt: new Date(year, month, 1),
      },
    };
    const [total = 0, games = []] = await this.prismaChessClient.$transaction([
      this.prismaChessClient.chessGame.count({
        where,
        take: limit,
        skip: offset,
      }),
      this.prismaChessClient.chessGame.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: { endTime: 'desc' },
      }),
    ]);
    return { total, games };
  }

  async getGame(username: string, gameId: string): Promise<ChessGameDto> {
    const where: Prisma.ChessGameWhereInput = {
      OR: [{ whiteUsername: username }, { blackUsername: username }],
      id: gameId,
    };
    const game: ChessGameDto =
      await this.prismaChessClient.chessGame.findFirstOrThrow({
        where,
      });
    return game;
  }

  async getGamePGN(username: string, gameId: string): Promise<string> {
    const game: ChessGameDto = await this.getGame(username, gameId);
    return game.pgn || '';
  }

  private async upsertGames(games: ChessGameDto[]): Promise<ChessGameDto[]> {
    const upsertTransactions = games.map((game) => {
      const upsertArguments = {
        create: game,
        update: game,
        where: { id: game.id },
      };
      return this.prismaChessClient.chessGame.upsert(upsertArguments);
    });
    return this.prismaChessClient.$transaction(upsertTransactions);
  }

  private mapGames(chessGames: ChessGame[]): ChessGameDto[] {
    const games: ChessGameDto[] = [];
    for (const chessGame of chessGames) {
      try {
        const {
          url = '',
          uuid: id = '',
          pgn = '',
          time_control: timeControl = '',
          end_time: endTime = 0,
          rated = false,
          tcn = '',
          initial_setup: initialSetup = '',
          fen = '',
          time_class: timeClass = '',
          rules = '',
          accuracies: { white: whiteAccuracy = 0, black: blackAccuracy = 0 } = {
            white: 0,
            black: 0,
          },
          white: {
            username: whiteUsername = '',
            result: whiteResult = '',
            rating: whiteRating = 0,
          } = {
            username: '',
            result: '',
            rating: 0,
          },
          black: {
            username: blackUsername = '',
            result: blackResult = '',
            rating: blackRating = 0,
          } = {
            username: '',
            result: '',
            rating: 0,
          },
        } = chessGame;
        const endDate: Date = new Date(endTime * 1000);
        const d: Date = new Date();
        const lowerWhiteUsername: string = whiteUsername.toLowerCase();
        const lowerBlackUsername: string = blackUsername.toLowerCase();
        const lowerWhiteResult: ChessResult =
          whiteResult.toLowerCase() as ChessResult;
        const lowerBlackResult: ChessResult =
          blackResult.toLowerCase() as ChessResult;
        games.push({
          url,
          id,
          pgn,
          timeControl,
          timeClass: timeClass as ChessTimeClass,
          endTime: endDate,
          rated,
          tcn,
          initialSetup,
          fen,
          rules: rules as ChessVariant,
          whiteUsername: lowerWhiteUsername,
          blackUsername: lowerBlackUsername,
          whiteResult: lowerWhiteResult,
          blackResult: lowerBlackResult,
          whiteAccuracy,
          blackAccuracy,
          whiteRating,
          blackRating,
          createdAt: d,
          updatedAt: d,
        });
      } catch (error) {
        this.logger.error(`mapGames error=${error}`);
      }
    }
    return games;
  }

  private async syncGamesByYearAndMonth(
    username: string,
    year: number,
    month: number
  ): Promise<{
    total: number;
    synced: number;
    existed: number;
  }> {
    const chessGames: ChessGame[] =
      await this.chessClient.getChessGamesByYearAndMonth(username, year, month);
    const chessGameUuids: string[] = chessGames.map(({ uuid }) => uuid);
    const { games: databaseGames = [] } = await this.getGames(
      username,
      { year, month },
      { offset: 0, limit: 1_000_000 }
    );
    const databaseGameIds: Set<string> = new Set(
      databaseGames.map(({ id }) => id)
    );
    const newChessGameUuids: Set<string> = new Set(
      chessGameUuids.filter((uuid: string) => !databaseGameIds.has(uuid))
    );
    const newChessGames: ChessGame[] = chessGames.filter(
      ({ uuid }: ChessGame) => newChessGameUuids.has(uuid)
    );
    const newGames: ChessGameDto[] = this.mapGames(newChessGames);
    const games: (ChessGameDto | undefined)[] =
      await this.upsertGames(newGames);
    return {
      total: chessGames.length,
      existed: databaseGames.length,
      synced: games.length,
    };
  }

  async syncGames(
    username: string,
    {
      month = new Date().getMonth() + 1,
      year = new Date().getFullYear(),
    }: { month: number; year: number }
  ): Promise<{ total: number; synced: number; existed: number }> {
    this.logger.log(`syncGames month=${month} year=${year}`);
    const {
      total = 0,
      synced = 0,
      existed = 0,
    } = await this.syncGamesByYearAndMonth(username, year, month);
    return { total, synced, existed };
  }
}
