import { Injectable, Logger } from '@nestjs/common';
import { RateDto, RatesRequestQueryDto, RatesResponseDto } from './forex.dto';
import { FrankfurterClient } from '../../../common/clients/apis/frankfurter/frankfurter.client';
import { FrankfurterLatestRequest } from '../../../common/clients/apis/frankfurter/frankfurter.dto';

@Injectable()
export class ForexService {
  private readonly logger = new Logger(ForexService.name);

  constructor(private readonly frankfurterClient: FrankfurterClient) {}

  private async getCurrencies(): Promise<Record<string, string>> {
    try {
      const currencies = this.frankfurterClient.getCurrencies();
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
      const currencies: Record<string, string> = await this.getCurrencies();
      const latestOptions: FrankfurterLatestRequest = { amount, base, to: [] };
      const latest = await this.frankfurterClient.getLatest(latestOptions);
      const fullRates: RateDto[] = Object.entries(latest.rates).map(
        ([code, rate]) => {
          const name: string = currencies[code] ?? '';
          return { code, rate, name };
        }
      );
      const total = fullRates.length;
      return { total, amount, base, rates: fullRates };
    } catch (error) {
      this.logger.log(`getRates error=${error}`);
      return { total: 0, amount, base, rates: [] };
    }
  }
}
