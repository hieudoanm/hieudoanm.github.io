import { ProgrammingLanguageDto } from '@hieudoanm/generated/programmingLanguage.entity';
import { ApiProperty } from '@nestjs/swagger';

export class GitHubLanguagesResponseDto {
  @ApiProperty()
  total: number;

  @ApiProperty({ type: [ProgrammingLanguageDto], default: [] })
  languages: ProgrammingLanguageDto[];
}
