import { EthnicGroupDto } from '@hieudoanm/generated/prisma/dto/ethnicGroup.entity';
import { LicensePlateDto } from '@hieudoanm/generated/prisma/dto/licensePlate.entity';
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
