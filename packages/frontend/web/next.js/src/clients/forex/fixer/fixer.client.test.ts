import axios from 'axios';
import { FixerClient, FixerLatestResponse, SymbolsResponse } from '.';

const key: string = 'key';
const fixerClient = FixerClient(key);

describe('getLatest', () => {
  it('success', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: {} });
    const data = await fixerClient.getLatest();
    expect(data).toEqual({} as FixerLatestResponse);
  });

  it('error', async () => {
    jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('error'));
    try {
      await fixerClient.getLatest();
    } catch (error) {
      expect((error as Error).message).toEqual('error');
    }
  });
});

describe('getSymbols', () => {
  it('success', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: {} });
    const data = await fixerClient.getSymbols();
    expect(data).toEqual({} as SymbolsResponse);
  });

  it('error', async () => {
    jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('error'));
    try {
      await fixerClient.getSymbols();
    } catch (error) {
      expect((error as Error).message).toEqual('error');
    }
  });
});
