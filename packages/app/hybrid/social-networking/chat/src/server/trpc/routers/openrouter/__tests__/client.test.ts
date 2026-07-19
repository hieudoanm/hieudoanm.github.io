import { complete, OpenRouterRole } from '../client';
import { OpenRouterModel } from '../enums';

const mockCreate = jest.fn();
const mockInstance = {
  chat: { completions: { create: mockCreate } },
};

jest.mock('openai', () => jest.fn(() => mockInstance));

describe('openrouter client', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('completes with the given messages and model', async () => {
    mockCreate.mockResolvedValue({ choices: [{ message: { content: 'hi' } }] });
    const result = await complete({
      messages: [{ role: OpenRouterRole.User, content: 'hello' }],
      model: OpenRouterModel.Deepseek_R1,
    });
    expect(mockCreate).toHaveBeenCalledWith(
      {
        model: 'deepseek/deepseek-r1:free',
        messages: [{ role: 'user', content: 'hello' }],
      },
      { timeout: 60000 }
    );
    expect(result).toEqual({ choices: [{ message: { content: 'hi' } }] });
  });

  it('uses defaults when no messages or model are provided', async () => {
    mockCreate.mockResolvedValue({ choices: [] });
    const result = await complete({} as Parameters<typeof complete>[0]);
    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({ model: 'deepseek/deepseek-r1:free' }),
      { timeout: 60000 }
    );
    expect(result).toEqual({ choices: [] });
  });

  it('reuses a single OpenAI instance across calls', async () => {
    jest.resetModules();
    const openaiMock = jest.requireMock('openai');
    const fresh = require('../client');
    mockCreate.mockResolvedValue({ choices: [] });
    await fresh.complete({});
    await fresh.complete({});
    expect(openaiMock).toHaveBeenCalledTimes(1);
  });

  it('returns an error message when the request fails', async () => {
    mockCreate.mockRejectedValue(new Error('api down'));
    const result = await complete({} as Parameters<typeof complete>[0]);
    expect(result).toEqual({
      choices: [
        { message: { content: 'An error occurred while generating content.' } },
      ],
    });
  });
});
