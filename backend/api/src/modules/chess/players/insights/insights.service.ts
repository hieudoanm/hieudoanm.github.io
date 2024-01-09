import { Injectable } from '@nestjs/common';
import { InsightsDto } from './insights.dto';
import { AccuracyService } from './services/accuracy/accuracy.service';
import { GamesService } from './services/games/games.service';
import { OpponentDto } from './services/opponents/opponents.dto';
import { OpponentsService } from './services/opponents/opponents.service';
import { ResultsService } from './services/results/results.service';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(BigInt.prototype as any).toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

@Injectable()
export class InsightsService {
  constructor(
    private readonly gamesService: GamesService,
    private readonly resultsService: ResultsService,
    private readonly accuracyService: AccuracyService,
    private readonly opponentsService: OpponentsService
  ) {}

  public async getGamesInsights(
    username: string
  ): Promise<Pick<InsightsDto, 'username' | 'games'>> {
    const games = await this.gamesService.getGames(username);
    return { username, games };
  }

  public async getAccuracyInsights(
    username: string
  ): Promise<Pick<InsightsDto, 'username' | 'accuracy'>> {
    const accuracy = await this.accuracyService.getAccuracy(username);
    return { username, accuracy };
  }

  public async getResultsInsights(
    username: string
  ): Promise<Pick<InsightsDto, 'username' | 'results'>> {
    const results = await this.resultsService.getResults(username);
    return { username, results };
  }

  public async getOpponentsInsights(
    username: string
  ): Promise<Pick<InsightsDto, 'username' | 'opponents'> & { total: number }> {
    const opponents: OpponentDto[] =
      await this.opponentsService.getOpponents(username);
    const total: number = opponents.length;
    return { username, total, opponents };
  }

  public async getInsights(username: string): Promise<InsightsDto> {
    const games = await this.gamesService.getGames(username);
    const accuracy = await this.accuracyService.getAccuracy(username);
    const results = await this.resultsService.getResults(username);
    const opponents = await this.opponentsService.getOpponents(username);
    return { username, games, accuracy, results, opponents };
  }
}
