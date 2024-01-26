import { AccuracyDto } from './accuracy/model';
import { GamesDto } from './games/model';
import { OpponentDto } from './opponents/model';
import { ResultsDto } from './results/model';

export type InsightsDto = {
  username: string;
  accuracy: AccuracyDto;
  games: GamesDto;
  opponents: OpponentDto[];
  results: ResultsDto;
};
