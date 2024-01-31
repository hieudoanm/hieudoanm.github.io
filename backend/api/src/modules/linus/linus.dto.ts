import { ProgrammingLanguageDto } from '@hieudoanm/generated/prisma/dto/programmingLanguage.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ProgrammingLanguagesResponseDto {
  @ApiProperty()
  total: number;

  @ApiProperty({ type: [ProgrammingLanguageDto], default: [] })
  languages: ProgrammingLanguageDto[];
}

export class StatusDto {
  @ApiProperty()
  error: boolean;
}
