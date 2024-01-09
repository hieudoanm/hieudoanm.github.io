import { ApiProperty } from '@nestjs/swagger';

export class ResultDto {
  result: string;
  count: number;
}

export class ResultsByTimeOfDayDto {
  win: number;
  draw: number;
  loss: number;
  timeOfDay: string;
}

export class ResultsByDayOfWeekDto {
  win: number;
  draw: number;
  loss: number;
  dayOfWeek: string;
}

export class ResultsDto {
  @ApiProperty({ type: [ResultDto] })
  win: ResultDto[];

  @ApiProperty({ type: [ResultDto] })
  draw: ResultDto[];

  @ApiProperty({ type: [ResultDto] })
  loss: ResultDto[];

  @ApiProperty({ type: [ResultsByTimeOfDayDto] })
  timeOfDays: ResultsByTimeOfDayDto[];

  @ApiProperty({ type: [ResultsByDayOfWeekDto] })
  daysOfWeek: ResultsByDayOfWeekDto[];
}
