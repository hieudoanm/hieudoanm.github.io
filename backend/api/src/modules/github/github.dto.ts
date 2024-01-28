import { ProgrammingLanguageDto } from '@hieudoanm/generated/prisma/dto/programmingLanguage.entity';
import { ApiProperty } from '@nestjs/swagger';

export class GitHubLanguagesResponseDto {
  @ApiProperty()
  total: number;

  @ApiProperty({ type: [ProgrammingLanguageDto], default: [] })
  languages: ProgrammingLanguageDto[];
}
