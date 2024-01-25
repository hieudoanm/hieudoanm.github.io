import { Injectable, Logger } from '@nestjs/common';
import { ChessResult, Prisma } from '@hieudoanm/generated/prisma/chess/client';
import {
  CHESS_DRAW_RESULTS,
  CHESS_LOSS_RESULTS,
  CHESS_WIN_RESULTS,
} from '../../../../../../common/constants/chess.constants';
import {
  DAYS_OF_WEEK,
  RULE,
  TIME_OF_DAYS,
} from '../../../../../../common/constants/time.constants';
import { PrismaChessClient } from '../../../../../../common/prisma/chess/prisma.chess';
import {
  GamesByDayOfWeekDto,
  GamesByPeriodDto,
  GamesByTimeOfDayDto,
  GamesDto,
} from './games.dto';

@Injectable()
export class GamesService {
  private readonly logger = new Logger(GamesService.name);

  constructor(private readonly prismaChessClient: PrismaChessClient) {}

  private buildGameResultsWhereInput(username: string, results: ChessResult[]) {
    return {
      OR: [
        { whiteUsername: username, whiteResult: { in: results } },
        { blackUsername: username, blackResult: { in: results } },
      ],
    };
  }

  private buildGameWhereInput(
    options: Prisma.ChessGameWhereInput
  ): Prisma.ChessGameWhereInput {
    return { ...options, rated: true, rules: RULE };
  }

  private async getNumberOfGames(username: string) {
    const totalWhere: Prisma.ChessGameWhereInput = this.buildGameWhereInput({
      OR: [{ whiteUsername: username }, { blackUsername: username }],
    });
    const winWhere: Prisma.ChessGameWhereInput = this.buildGameWhereInput(
      this.buildGameResultsWhereInput(username, CHESS_WIN_RESULTS)
    );
    const drawWhere: Prisma.ChessGameWhereInput = this.buildGameWhereInput(
      this.buildGameResultsWhereInput(username, CHESS_DRAW_RESULTS)
    );
    const lossWhere: Prisma.ChessGameWhereInput = this.buildGameWhereInput(
      this.buildGameResultsWhereInput(username, CHESS_LOSS_RESULTS)
    );
    const [total = 0, win = 0, draw = 0, loss = 0] =
      await this.prismaChessClient.$transaction([
        this.prismaChessClient.chessGame.count({ where: totalWhere }),
        this.prismaChessClient.chessGame.count({ where: winWhere }),
        this.prismaChessClient.chessGame.count({ where: drawWhere }),
        this.prismaChessClient.chessGame.count({ where: lossWhere }),
      ]);
    return { total, win, draw, loss };
  }

  private buildGamesByPeriodsQuery(username: string): Prisma.Sql {
    const selectClause =
      'SELECT COUNT(*) as "games", extract(year from g."endTime")::int as "period"';
    const groupByClause = 'GROUP BY extract(year from g."endTime")';
    const whereClause = `WHERE (g."whiteUsername"='${username}' OR g."blackUsername"='${username}') AND g."rules" = '${RULE}' AND g."rated" = true`;
    const query = `${selectClause} FROM chess."ChessGame" as g ${whereClause} ${groupByClause}`;
    this.logger.log(`buildGamesByPeriodsQuery query=${query}`);
    const sql: Prisma.Sql = Prisma.raw(query);
    return sql;
  }

  private buildGamesByTimeOfDaysQuery(username: string): Prisma.Sql {
    const selectClause =
      'SELECT COUNT(*) as "games", floor(extract(hour from g."endTime") / 6.0)::int as "timeOfDayIndex"';
    const groupByClause = 'GROUP BY "timeOfDayIndex"';
    const whereClause = `WHERE (g."whiteUsername"='${username}' OR g."blackUsername"='${username}') AND g."rules" = '${RULE}' AND g."rated" = true`;
    const query = `${selectClause} FROM chess."ChessGame" as g ${whereClause} ${groupByClause}`;
    this.logger.log(`buildGamesByTimeOfDaysQuery query=${query}`);
    const sql: Prisma.Sql = Prisma.raw(query);
    return sql;
  }

  private buildGamesByDaysOfWeek(username: string): Prisma.Sql {
    const selectClause =
      'SELECT COUNT(*) as "games", extract(dow from g."endTime") as "dayOfWeekIndex"';
    const groupByClause = 'GROUP BY "dayOfWeekIndex"';
    const whereClause = `WHERE (g."whiteUsername"='${username}' OR g."blackUsername"='${username}') AND g."rules" = '${RULE}' AND g."rated" = true`;
    const query = `${selectClause} FROM chess."ChessGame" as g ${whereClause} ${groupByClause}`;
    this.logger.log(`buildGamesByDaysOfWeek query=${query}`);
    const sql: Prisma.Sql = Prisma.raw(query);
    return sql;
  }

  private async getGamesByCalender(username: string): Promise<{
    periods: GamesByPeriodDto[];
    timeOfDays: GamesByTimeOfDayDto[];
    daysOfWeek: GamesByDayOfWeekDto[];
  }> {
    const gamesByPeriodsQuery: Prisma.Sql =
      this.buildGamesByPeriodsQuery(username);
    const gamesByTimeOfDaysQuery: Prisma.Sql =
      this.buildGamesByTimeOfDaysQuery(username);
    const gamesByDaysOfWeekQuery: Prisma.Sql =
      this.buildGamesByDaysOfWeek(username);
    const [periods = [], timeOfDaysList = [], daysOfWeekList = []] =
      await this.prismaChessClient.$transaction([
        this.prismaChessClient.$queryRaw<GamesByPeriodDto[]>(
          gamesByPeriodsQuery
        ),
        this.prismaChessClient.$queryRaw<
          { games: number; timeOfDayIndex: number }[]
        >(gamesByTimeOfDaysQuery),
        this.prismaChessClient.$queryRaw<
          { games: number; dayOfWeekIndex: number }[]
        >(gamesByDaysOfWeekQuery),
      ]);
    const timeOfDays: GamesByTimeOfDayDto[] = timeOfDaysList.map(
      ({ games = 0, timeOfDayIndex = 0 }) => ({
        games,
        timeOfDay: Array.from(TIME_OF_DAYS)[`${timeOfDayIndex}`],
      })
    );
    const daysOfWeek: GamesByDayOfWeekDto[] = daysOfWeekList.map(
      ({ games = 0, dayOfWeekIndex = 0 }) => ({
        games,
        dayOfWeek: Array.from(DAYS_OF_WEEK)[`${dayOfWeekIndex}`],
      })
    );
    return { periods, timeOfDays, daysOfWeek };
  }

  async getGames(username: string): Promise<GamesDto> {
    const {
      total = 0,
      win = 0,
      draw = 0,
      loss = 0,
    } = await this.getNumberOfGames(username);
    const {
      periods = [],
      timeOfDays = [],
      daysOfWeek = [],
    } = await this.getGamesByCalender(username);
    return { total, win, draw, loss, periods, timeOfDays, daysOfWeek };
  }
}
