import axios from 'axios';
import { getCurrencies, getLatest } from './frankfurter.client';
import { FrankfurterLatestResponse } from './frankfurter.dto';

describe('getLatest', () => {
  it('success', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: {} });
    const data = await getLatest();
    expect(data).toEqual({} as FrankfurterLatestResponse);
  });

  it('error', async () => {
    jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('error'));
    try {
      await getLatest();
    } catch (error) {
      expect((error as Error).message).toEqual('error');
    }
  });
});

describe('getSymbols', () => {
  it('success', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: {} });
    const data = await getCurrencies();
    expect(data).toEqual({});
  });

  it('error', async () => {
    jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('error'));
    try {
      await getCurrencies();
    } catch (error) {
      expect((error as Error).message).toEqual('error');
    }
  });
});
