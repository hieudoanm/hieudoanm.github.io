import { ApiProperty } from '@nestjs/swagger';

export class AccuracyByPeriodDto {
  @ApiProperty()
  average: number;

  @ApiProperty()
  period: number;
}

export class AccuracyByTimeOfDayDto {
  @ApiProperty()
  average: number;

  @ApiProperty()
  timeOfDay: string;
}

export class AccuracyByDayOfWeekDto {
  @ApiProperty()
  average: number;

  @ApiProperty()
  dayOfWeek: string;
}

export class AccuracyDto {
  @ApiProperty()
  average: number;

  @ApiProperty()
  win: number;

  @ApiProperty()
  draw: number;

  @ApiProperty()
  loss: number;

  @ApiProperty({ type: AccuracyByPeriodDto })
  periods: AccuracyByPeriodDto[];

  @ApiProperty({ type: AccuracyByTimeOfDayDto })
  timeOfDays: AccuracyByTimeOfDayDto[];

  @ApiProperty({ type: AccuracyByDayOfWeekDto })
  daysOfWeek: AccuracyByDayOfWeekDto[];
}
