import { ApiProperty } from '@nestjs/swagger';
import { AccuracyDto } from './services/accuracy/accuracy.dto';
import { GamesDto } from './services/games/games.dto';
import { OpponentDto } from './services/opponents/opponents.dto';
import { ResultsDto } from './services/results/results.dto';

export class InsightsDto {
  @ApiProperty()
  username: string;

  @ApiProperty({ type: GamesDto })
  games: GamesDto;

  @ApiProperty({ type: AccuracyDto })
  accuracy: AccuracyDto;

  @ApiProperty({ type: ResultsDto })
  results: ResultsDto;

  @ApiProperty({ type: [OpponentDto] })
  opponents: OpponentDto[];
}
