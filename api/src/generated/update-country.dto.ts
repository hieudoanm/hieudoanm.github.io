import { Prisma, DayOfWeek, Region } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCountryDto {
  name?: string;
  cca2?: string;
  ccn3?: string;
  @ApiProperty({ enum: DayOfWeek })
  startOfWeek?: DayOfWeek;
  @ApiProperty({ enum: Region })
  region?: Region;
  subregion?: string;
  status?: string;
  flag?: string;
  area?: number;
  population?: number;
  independent?: boolean;
  unMember?: boolean;
  landlocked?: boolean;
  idd?: Prisma.InputJsonValue;
  demonyms?: Prisma.InputJsonValue;
  maps?: Prisma.InputJsonValue;
  flags?: Prisma.InputJsonValue;
  car?: Prisma.InputJsonValue;
  capitalInfo?: Prisma.InputJsonValue;
  coatOfArms?: Prisma.InputJsonValue;
  postalCode?: Prisma.InputJsonValue;
  createdAt?: Date;
}
