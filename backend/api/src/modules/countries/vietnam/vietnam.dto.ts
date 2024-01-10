import { ApiProperty } from '@nestjs/swagger';
import { EthnicGroupDto } from '../../../generated/ethnicGroup.entity';
import { LicensePlateDto } from '../../../generated/licensePlate.entity';

export class EthnicGroupsResponseDto {
  @ApiProperty({ default: 0 })
  total: number;

  @ApiProperty({ type: [EthnicGroupDto], default: [] })
  ethnicGroups: EthnicGroupDto[];
}

export class LicensePlatesResponseDto {
  @ApiProperty({ default: 0 })
  total: number;

  @ApiProperty({ type: [LicensePlateDto], default: [] })
  licensePlates: LicensePlateDto[];
}
