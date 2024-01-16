import { ApiProperty } from '@nestjs/swagger';
import { CurrencyDto } from '@hieudoanm/generated/currency.entity';

export class CurrenciesResponseDto {
  @ApiProperty({ default: 0 })
  total: number;

  @ApiProperty({ type: [CurrencyDto], default: [] })
  currencies: CurrencyDto[];
}
