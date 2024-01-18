import { EthnicGroupDto } from '@hieudoanm/generated/ethnicGroup.entity';
import { LicensePlateDto } from '@hieudoanm/generated/licensePlate.entity';
import { ApiProperty } from '@nestjs/swagger';

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
