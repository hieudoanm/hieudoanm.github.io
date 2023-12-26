import { ApiProperty } from '@nestjs/swagger';
import { EthnicGroupDto } from '../../../../src/generated/ethnicGroup.entity';
import { LicensePlateDto } from '../../../../src/generated/licensePlate.entity';

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
