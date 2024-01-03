import axios from 'axios';
import { TelegramClient } from '../telegram.client';

describe('TelegramClient', () => {
  const chatId = 'chatId';
  const message = 'message';
  const telegramClient = new TelegramClient({ token: '' });

  describe('sendMessage', () => {
    it('success', async () => {
      jest.spyOn(axios, 'post').mockResolvedValueOnce({ data: {} });
      await telegramClient.sendMessage(chatId, message);
    });

    it('without chatId', async () => {
      jest.spyOn(axios, 'post').mockResolvedValueOnce({ data: {} });
      try {
        await telegramClient.sendMessage('', message);
      } catch (error) {
        expect((error as Error).message).toEqual('Invalid chatId');
      }
    });

    it('without message', async () => {
      jest.spyOn(axios, 'post').mockResolvedValueOnce({ data: {} });
      try {
        await telegramClient.sendMessage(chatId, '');
      } catch (error) {
        expect((error as Error).message).toEqual('Invalid message');
      }
    });

    it('error', async () => {
      jest.spyOn(axios, 'post').mockRejectedValueOnce(new Error('error'));
      try {
        await telegramClient.sendMessage(chatId, message);
      } catch (error) {
        expect((error as Error).message).toEqual('error');
      }
    });
  });
});
