import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import {
  FrankfurterLatestResponseDto,
  RateDto,
  RatesRequestQueryDto,
  RatesResponseDto,
} from './forex.dto';

@Injectable()
export class ForexService {
  private readonly logger = new Logger(ForexService.name);

  constructor(private readonly httpService: HttpService) {}

  private async getCurrencies(): Promise<Record<string, string>> {
    try {
      const url: string = `https://api.frankfurter.app/currencies`;
      this.logger.log(`getCurrencies url=${url}`);
      const response =
        await this.httpService.axiosRef.get<Record<string, string>>(url);
      const currencies = response.data;
      return currencies;
    } catch (error) {
      this.logger.log(`getRates error=${error}`);
      return {};
    }
  }

  async getRates({
    amount = 1,
    base = 'EUR',
  }: RatesRequestQueryDto): Promise<RatesResponseDto> {
    try {
      const url: string = `https://api.frankfurter.app/latest?amount=${amount}&from=${base}`;
      this.logger.log(`getRates url=${url}`);
      const response =
        await this.httpService.axiosRef.get<FrankfurterLatestResponseDto>(url);
      const currencies: Record<string, string> = await this.getCurrencies();
      const rates: Record<string, number> = response.data.rates;
      const fullRates: RateDto[] = Object.entries(rates).map(([code, rate]) => {
        const name: string = currencies[code] ?? '';
        return { code, rate, name };
      });
      const total = fullRates.length;
      return { total, amount, base, rates: fullRates };
    } catch (error) {
      this.logger.log(`getRates error=${error}`);
      return { total: 0, amount, base, rates: [] };
    }
  }
}
