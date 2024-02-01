import { OrganizationDto } from '@hieudoanm/generated/prisma/dto/organization.entity';
import { ApiProperty } from '@nestjs/swagger';

export class OrganizationsResponseDto {
  @ApiProperty({ type: Number, default: 0 })
  total: number;

  @ApiProperty({ type: [OrganizationDto], default: [] })
  organizations: OrganizationDto[];
}
