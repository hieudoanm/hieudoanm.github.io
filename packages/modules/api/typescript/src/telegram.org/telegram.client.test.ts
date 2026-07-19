import {
  sendMessage,
  setWebhook,
  deleteWebhook,
  getWebhookInfo,
  ParseMode,
} from './telegram.client.js';

const mockFetch = jest.fn();
globalThis.fetch = mockFetch;

const TOKEN = '123456:ABC-DEF1234';
const BASE_URL = 'https://api.telegram.org/bot';

beforeEach(() => {
  mockFetch.mockReset();
});

describe('sendMessage', () => {
  const sendMessageResponse = { ok: true, result: true };

  it('sends a message with POST and query params', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => sendMessageResponse,
    });

    await sendMessage(TOKEN, { chatId: 12345, message: 'Hello' });

    expect(mockFetch).toHaveBeenCalledWith(
      `${BASE_URL}${TOKEN}/sendMessage?chat_id=12345&text=Hello&parse_mode=markdown`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: undefined,
      }
    );
  });

  it('accepts custom parse mode', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => sendMessageResponse,
    });

    await sendMessage(TOKEN, {
      chatId: 12345,
      message: 'Hello',
      parseMode: ParseMode.HTML,
    });

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('parse_mode=html'),
      expect.any(Object)
    );
  });

  it('throws on empty token', async () => {
    await expect(
      sendMessage('', { chatId: 12345, message: 'Hello' })
    ).rejects.toThrow('Invalid token');

    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('throws on invalid chatId', async () => {
    await expect(
      sendMessage(TOKEN, { chatId: 0, message: 'Hello' })
    ).rejects.toThrow('Invalid chatId');

    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('throws on empty message', async () => {
    await expect(
      sendMessage(TOKEN, { chatId: 12345, message: '' })
    ).rejects.toThrow('Invalid message');

    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('rejects on fetch failure', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(
      sendMessage(TOKEN, { chatId: 12345, message: 'Hello' })
    ).rejects.toThrow('Network error');
  });
});

describe('setWebhook', () => {
  const webhookResponse = { ok: true, result: true, description: 'ok' };

  it('sets a webhook with POST and JSON body', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => webhookResponse,
    });

    const result = await setWebhook(TOKEN, 'https://example.com/webhook');

    expect(result).toEqual(webhookResponse);
    expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}${TOKEN}/setWebhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: 'https://example.com/webhook' }),
    });
  });

  it('throws on empty token', async () => {
    await expect(setWebhook('', 'https://example.com')).rejects.toThrow(
      'Invalid token'
    );
  });

  it('throws on empty url', async () => {
    await expect(setWebhook(TOKEN, '')).rejects.toThrow('Invalid url');
  });

  it('rejects on fetch failure', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(
      setWebhook(TOKEN, 'https://example.com/webhook')
    ).rejects.toThrow('Network error');
  });
});

describe('deleteWebhook', () => {
  const deleteResponse = { ok: true, result: true, description: 'ok' };

  it('deletes a webhook with POST and JSON body', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => deleteResponse,
    });

    const result = await deleteWebhook(TOKEN, 'https://example.com/webhook');

    expect(result).toEqual(deleteResponse);
    expect(mockFetch).toHaveBeenCalledWith(
      `${BASE_URL}${TOKEN}/deleteWebhook`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: 'https://example.com/webhook' }),
      }
    );
  });

  it('throws on empty token', async () => {
    await expect(deleteWebhook('', 'https://example.com')).rejects.toThrow(
      'Invalid token'
    );
  });
});

describe('getWebhookInfo', () => {
  const webhookInfoResponse = {
    ok: true,
    result: {
      url: 'https://example.com/webhook',
      has_custom_certificate: false,
      pending_update_count: 0,
    },
  };

  it('fetches webhook info with POST', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => webhookInfoResponse,
    });

    const result = await getWebhookInfo(TOKEN);

    expect(result).toEqual(webhookInfoResponse);
    expect(mockFetch).toHaveBeenCalledWith(
      `${BASE_URL}${TOKEN}/getWebhookInfo`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: undefined,
      }
    );
  });

  it('throws on empty token', async () => {
    await expect(getWebhookInfo('')).rejects.toThrow('Invalid token');
  });

  it('rejects on fetch failure', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(getWebhookInfo(TOKEN)).rejects.toThrow('Network error');
  });
});
