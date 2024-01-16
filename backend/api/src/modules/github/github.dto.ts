import { ApiProperty } from '@nestjs/swagger';
import { ProgrammingLanguageDto } from '@hieudoanm/generated/programmingLanguage.entity';

export class GitHubLanguagesResponseDto {
  @ApiProperty()
  total: number;

  @ApiProperty({ type: [ProgrammingLanguageDto], default: [] })
  languages: ProgrammingLanguageDto[];
}
