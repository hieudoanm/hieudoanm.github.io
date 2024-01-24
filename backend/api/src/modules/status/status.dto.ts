import { ApiProperty } from '@nestjs/swagger';

export class StatusDto {
  @ApiProperty()
  error: boolean;
}
