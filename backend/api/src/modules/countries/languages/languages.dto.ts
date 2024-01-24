import { LanguageDto } from '@hieudoanm/generated/prisma/public/dto/language.entity';
import { ApiProperty } from '@nestjs/swagger';

export class LanguagesResponseDto {
  @ApiProperty({ default: 0 })
  total: number;

  @ApiProperty({ type: [LanguageDto], default: [] })
  languages: LanguageDto[];
}
