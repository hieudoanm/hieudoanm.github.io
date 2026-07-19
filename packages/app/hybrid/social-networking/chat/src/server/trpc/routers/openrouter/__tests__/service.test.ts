import { generate } from '../service';
import { complete, OpenRouterRole } from '../client';

jest.mock('../client', () => ({
  complete: jest.fn(),
  OpenRouterRole: { User: 'user', Assistant: 'assistant' },
}));

const { complete: mockComplete } = jest.requireMock('../client');

describe('openrouter service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('maps user/ai roles to OpenRouter roles', async () => {
    mockComplete.mockResolvedValue({
      choices: [{ message: { content: 'out' } }],
    });
    const result = await generate({
      messages: [
        { role: 'user', text: 'question' },
        { role: 'ai', text: 'answer' },
      ],
      model: 'deepseek/deepseek-r1:free',
    });
    expect(mockComplete).toHaveBeenCalledWith({
      messages: [
        { role: OpenRouterRole.User, content: 'question' },
        { role: OpenRouterRole.Assistant, content: 'answer' },
      ],
      model: 'deepseek/deepseek-r1:free',
    });
    expect(result).toEqual({
      model: 'deepseek/deepseek-r1:free',
      output: 'out',
    });
  });

  it('defaults to empty messages', async () => {
    mockComplete.mockResolvedValue({
      choices: [{ message: { content: 'out' } }],
    });
    const result = await generate({
      model: 'm',
    } as Parameters<typeof generate>[0]);
    expect(result.output).toBe('out');
  });

  it('returns an error output when completion fails', async () => {
    mockComplete.mockRejectedValue(new Error('fail'));
    const result = await generate({ messages: [], model: 'm' });
    expect(result).toEqual({
      model: 'm',
      output: 'An error occurred while generating content.',
    });
  });

  it('falls back when the completion content is missing', async () => {
    mockComplete.mockResolvedValue({ choices: [] });
    const result = await generate({ messages: [], model: 'm' });
    expect(result.output).toBe('No response generated.');
  });
});
