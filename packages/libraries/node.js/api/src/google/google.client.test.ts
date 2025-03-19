import axios from 'axios';
import { getTrends } from '.';

describe('GoogleClient', () => {
  describe('getTrends', () => {
    it('success', async () => {
      jest
        .spyOn(axios, 'get')
        .mockResolvedValueOnce({ data: { key: ['value'] } });
      const data = await getTrends();
      expect(data).toEqual({ key: ['value'] });
    });

    it('error', async () => {
      jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('error'));
      try {
        await getTrends();
      } catch (error) {
        expect((error as Error).message).toEqual('error');
      }
    });
  });
});
