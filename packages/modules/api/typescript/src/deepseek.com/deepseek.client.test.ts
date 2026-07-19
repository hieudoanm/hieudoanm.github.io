import { getChatCompletions } from './deepseek.client.js';
import { Model } from './deepseek.dto.js';

const mockFetch = jest.fn();
globalThis.fetch = mockFetch;

const API_KEY = 'sk-test-key';

beforeEach(() => {
  mockFetch.mockReset();
});

describe('getChatCompletions', () => {
  const chatResponse: Record<string, unknown> = {
    id: 'chatcmpl-123',
    object: 'chat.completion',
    created: 1700000000,
    model: 'deepseek-chat',
    choices: [
      {
        index: 0,
        message: { role: 'assistant', content: 'Hello!' },
        finish_reason: 'stop',
      },
    ],
    usage: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
  };

  it('sends chat completion with default model', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => chatResponse,
    });

    const result = await getChatCompletions(API_KEY, { content: 'Hi' });

    expect(result).toEqual(chatResponse);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.deepseek.com/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer sk-test-key',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [{ role: 'user', content: 'Hi' }],
          stream: false,
        }),
      }
    );
  });

  it('accepts custom model', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => chatResponse,
    });

    await getChatCompletions(API_KEY, {
      model: Model.DEEPSEEK_REASONER,
      content: 'Think step by step',
    });

    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: JSON.stringify({
          model: 'deepseek-reasoner',
          messages: [{ role: 'user', content: 'Think step by step' }],
          stream: false,
        }),
      })
    );
  });

  it('rejects on fetch failure', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(
      getChatCompletions(API_KEY, { content: 'Hi' })
    ).rejects.toThrow('Network error');
  });
});
