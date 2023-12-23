import { ApiProperty } from '@nestjs/swagger';
import { LicensePlateDto } from 'src/generated/licensePlate.entity';

export class LicensePlatesResponseDto {
  @ApiProperty()
  total: number;

  @ApiProperty({ type: [LicensePlateDto], default: [] })
  licensePlates: LicensePlateDto[];
}
