import axios from 'axios';
import { getLatest, getSymbols } from '../fixer.client';
import { FixerLatestResponse, SymbolsResponse } from '../fixer.dto';

describe('getLatest', () => {
  it('success', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: {} });
    const data = await getLatest();
    expect(data).toEqual({} as FixerLatestResponse);
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
    const data = await getSymbols();
    expect(data).toEqual({} as SymbolsResponse);
  });

  it('error', async () => {
    jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('error'));
    try {
      await getSymbols();
    } catch (error) {
      expect((error as Error).message).toEqual('error');
    }
  });
});
