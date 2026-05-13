import { CoinRankingResponse } from './coin-ranking.dto';

const BASE_URL = 'https://api.coinranking.com';

export enum Tag {
  DEFI = 'defi',
  STABLE_COIN = 'stablecoin',
  NFT = 'nft',
  DEX = 'dex',
  EXCHANGE = 'exchange',
  STAKING = 'staking',
  DAO = 'dao',
  MEME = 'meme',
  PRIVACY = 'privacy',
  METAVERSE = 'metaverse',
  GAMING = 'gaming',
  WRAPPED = 'wrapped',
  LAYER_1 = 'layer-1',
  LAYER_2 = 'layer-2',
  FAN_TOKEN = 'fan-token',
  FOOTBALL_CLUB = 'football-club',
  WEB_3 = 'web3',
  SOCIAL = 'social',
}

export const getCoins = async ({
  tag,
}: {
  tag?: Tag;
}): Promise<CoinRankingResponse> => {
  try {
    const urlSearchParams = new URLSearchParams();
    if (tag) urlSearchParams.append('tags', tag);
    const url = `${BASE_URL}/v2/coins?${urlSearchParams.toString()}`;
    return await fetch(url).then((response) => response.json());
  } catch {
    return {
      status: 'error',
      data: {
        stats: {
          total: 0,
          totalCoins: 0,
          totalMarkets: 0,
          totalExchanges: 0,
          totalMarketCap: '0',
          total24hVolume: '0',
        },
        coins: [],
      },
    };
  }
};
