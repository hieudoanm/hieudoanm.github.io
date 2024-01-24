import { ApiProperty } from '@nestjs/swagger';

export class CoinRankingStatsDto {
  total: number;
  totalCoins: number;
  totalMarkets: number;
  totalExchanges: number;
  totalMarketCap: string;
  total24hVolume: string;
}

export class CoinDto {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  symbol: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  color: string;

  @ApiProperty()
  iconUrl: string;

  @ApiProperty()
  marketCap: string;

  @ApiProperty()
  price: string;

  @ApiProperty()
  listedAt: number;

  @ApiProperty()
  tier: number;

  @ApiProperty()
  change: string;

  @ApiProperty()
  rank: number;

  @ApiProperty()
  sparkline: string[];

  @ApiProperty({ default: false })
  lowVolume: boolean;

  @ApiProperty()
  coinrankingUrl: string;

  @ApiProperty()
  '24hVolume': string;

  @ApiProperty()
  btcPrice: number;
}

export class CoinRankingDataDto {
  stats: CoinRankingStatsDto;

  coins: CoinDto[];
}

export class CoinRankingResponseDto {
  status: string;

  data: CoinRankingDataDto;
}

export class CoinsResponseDto {
  @ApiProperty({ default: 0 })
  total: number;

  @ApiProperty({ type: [CoinDto], default: [] })
  coins: CoinDto[];
}
