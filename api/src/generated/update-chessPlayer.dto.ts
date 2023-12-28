import { Title, League } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateChessPlayerDto {
  username?: string;
  @ApiProperty({ enum: Title })
  title?: Title;
  @ApiProperty({ enum: League })
  league?: League;
  createdAt?: Date;
}
