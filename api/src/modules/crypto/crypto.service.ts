import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import {
  CoinDto,
  CoinRankingResponseDto,
  CoinsResponseDto,
} from './crypto.dto';

@Injectable()
export class CryptoService {
  private readonly logger = new Logger(CryptoService.name);

  constructor(private readonly httpService: HttpService) {}

  async getCoins({
    limit = 100,
  }: {
    limit: number;
  }): Promise<CoinsResponseDto> {
    try {
      const url: string = `https://api.coinranking.com/v2/coins?limit=${limit}`;
      this.logger.log(`getCoins url=${url}`);
      const response =
        await this.httpService.axiosRef.get<CoinRankingResponseDto>(url);
      const coins: CoinDto[] = response.data.data.coins;
      const total: number = coins.length;
      return { total, coins };
    } catch (error) {
      this.logger.log(`getCoins error=${error}`);
      return { total: 0, coins: [] };
    }
  }
}
