import { ApiProperty } from '@nestjs/swagger';

export class OpponentDto {
  @ApiProperty()
  opponent: string;

  @ApiProperty()
  games: number;

  @ApiProperty()
  win: number;

  @ApiProperty()
  draw: number;

  @ApiProperty()
  loss: number;
}
