import { getChatCompletions } from './openai.client.js';
import { Model } from './openai.dto.js';

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
    model: 'gpt-4',
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
      'https://api.openai.com/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer sk-test-key',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [{ role: 'user', content: 'Hi' }],
        }),
      }
    );
  });

  it('accepts custom model', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => chatResponse,
    });

    await getChatCompletions(API_KEY, {
      model: Model.GPT_4_TURBO,
      content: 'Summarize this',
    });

    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: JSON.stringify({
          model: 'gpt-4-turbo',
          messages: [{ role: 'user', content: 'Summarize this' }],
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
