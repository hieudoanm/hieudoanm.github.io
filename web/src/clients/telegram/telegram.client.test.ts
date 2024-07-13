import axios from 'axios';
import { sendMessage } from './telegram.client';

describe('TelegramClient', () => {
  const chatId = 123;
  const message = 'message';

  describe('sendMessage', () => {
    it('success', async () => {
      jest.spyOn(axios, 'post').mockResolvedValueOnce({ data: {} });
      await sendMessage('token', { chatId, message });
    });

    it('without chatId', async () => {
      jest.spyOn(axios, 'post').mockResolvedValueOnce({ data: {} });
      try {
        await sendMessage('token', { chatId: 0, message });
      } catch (error) {
        expect((error as Error).message).toEqual('Invalid chatId');
      }
    });

    it('without message', async () => {
      jest.spyOn(axios, 'post').mockResolvedValueOnce({ data: {} });
      try {
        await sendMessage('token', { chatId, message: '' });
      } catch (error) {
        expect((error as Error).message).toEqual('Invalid message');
      }
    });

    it('error', async () => {
      jest.spyOn(axios, 'post').mockRejectedValueOnce(new Error('error'));
      try {
        await sendMessage('token', { chatId, message });
      } catch (error) {
        expect((error as Error).message).toEqual('error');
      }
    });
  });
});
