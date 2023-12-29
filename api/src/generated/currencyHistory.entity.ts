import { CurrencyDto } from './currency.entity';

export class CurrencyHistoryDto {
  currency?: CurrencyDto;
  currencyCode: string;
  date: Date;
  rate: number;
  amount: number;
  base: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}
