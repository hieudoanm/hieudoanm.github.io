import axios from 'axios';
import { getCoins, Tag } from './coinranking.client';
import { CoinRankingResponse } from './coinranking.dto';

describe('getCoins', () => {
  it('success', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: {} });
    const data = await getCoins({ tag: Tag.STABLE_COIN });
    expect(data).toEqual({} as CoinRankingResponse);
  });

  it('error', async () => {
    jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('error'));
    try {
      await getCoins({ tag: Tag.STABLE_COIN });
    } catch (error) {
      expect((error as Error).message).toEqual('error');
    }
  });
});
