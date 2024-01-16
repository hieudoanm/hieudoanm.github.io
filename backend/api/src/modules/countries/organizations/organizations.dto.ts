import { ApiProperty } from '@nestjs/swagger';
import { OrganizationDto } from '@hieudoanm/generated/organization.entity';

export class OrganizationsResponseDto {
  @ApiProperty({ type: Number, default: 0 })
  total: number;

  @ApiProperty({ type: [OrganizationDto], default: [] })
  organizations: OrganizationDto[];
}
