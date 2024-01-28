import { CurrencyDto } from '@hieudoanm/generated/prisma/dto/currency.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CurrenciesResponseDto {
  @ApiProperty({ default: 0 })
  total: number;

  @ApiProperty({ type: [CurrencyDto], default: [] })
  currencies: CurrencyDto[];
}
