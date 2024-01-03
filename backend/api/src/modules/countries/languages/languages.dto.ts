import { ApiProperty } from '@nestjs/swagger';
import { LanguageDto } from '../../../generated/language.entity';

export class LanguagesResponseDto {
  @ApiProperty({ default: 0 })
  total: number;

  @ApiProperty({ type: [LanguageDto], default: [] })
  languages: LanguageDto[];
}
