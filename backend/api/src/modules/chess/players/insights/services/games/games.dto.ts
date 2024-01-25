import { ApiProperty } from '@nestjs/swagger';

export class GamesByPeriodDto {
  @ApiProperty()
  games: number;

  @ApiProperty()
  period: number;
}
export class GamesByTimeOfDayDto {
  @ApiProperty()
  games: number;

  @ApiProperty()
  timeOfDay: string;
}
export class GamesByDayOfWeekDto {
  @ApiProperty()
  games: number;

  @ApiProperty()
  dayOfWeek: string;
}

export class GamesDto {
  @ApiProperty()
  total: number;

  @ApiProperty()
  win: number;

  @ApiProperty()
  draw: number;

  @ApiProperty()
  loss: number;

  @ApiProperty()
  periods: GamesByPeriodDto[];

  @ApiProperty()
  timeOfDays: GamesByTimeOfDayDto[];

  @ApiProperty()
  daysOfWeek: GamesByDayOfWeekDto[];
}
