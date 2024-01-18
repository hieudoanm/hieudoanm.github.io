import { CurrencyDto } from '@hieudoanm/generated/currency.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CurrenciesResponseDto {
  @ApiProperty({ default: 0 })
  total: number;

  @ApiProperty({ type: [CurrencyDto], default: [] })
  currencies: CurrencyDto[];
}
