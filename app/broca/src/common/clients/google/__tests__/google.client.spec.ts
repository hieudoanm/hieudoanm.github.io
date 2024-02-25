import axios from 'axios';
import { getTrends } from '../google.client';

describe('getTrends', () => {
  it('success', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: {} });
    const data = await getTrends();
    expect(data).toEqual({});
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
