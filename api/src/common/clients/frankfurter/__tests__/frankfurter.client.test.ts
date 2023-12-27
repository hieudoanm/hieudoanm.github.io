import axios from 'axios';
import { FrankfurterClient } from '../frankfurter.client';
import { FrankfurterLatestResponse } from '../frankfurter.dto';

describe('ForexClient', () => {
  const frankfurterClient = new FrankfurterClient();

  describe('getLatest', () => {
    it('success', async () => {
      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: {} });
      const data = await frankfurterClient.getLatest();
      expect(data).toEqual({} as FrankfurterLatestResponse);
    });

    it('error', async () => {
      jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('error'));
      try {
        await frankfurterClient.getLatest();
      } catch (error) {
        expect((error as Error).message).toEqual('error');
      }
    });
  });

  describe('getSymbols', () => {
    it('success', async () => {
      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: {} });
      const data = await frankfurterClient.getCurrencies();
      expect(data).toEqual({});
    });

    it('error', async () => {
      jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('error'));
      try {
        await frankfurterClient.getCurrencies();
      } catch (error) {
        expect((error as Error).message).toEqual('error');
      }
    });
  });
});
