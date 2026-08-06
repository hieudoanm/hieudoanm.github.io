import { openrouterRouter } from '../index';

jest.mock('../service', () => ({
  generate: jest.fn(),
}));

const { generate } = jest.requireMock('../service');

describe('openrouter router', () => {
  let caller: ReturnType<typeof openrouterRouter.createCaller>;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'info').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
    caller = openrouterRouter.createCaller({});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns generated text', async () => {
    generate.mockResolvedValue({ output: 'hello', model: 'm' });
    const result = await caller.generate({
      messages: [{ role: 'user', text: 'hi' }],
      model: 'm',
    });
    expect(generate).toHaveBeenCalledWith({
      messages: [{ role: 'user', text: 'hi' }],
      model: 'm',
    });
    expect(result).toEqual({ text: 'hello' });
  });

  it('applies input defaults', async () => {
    generate.mockResolvedValue({ output: 'hello', model: '' });
    const result = await caller.generate({});
    expect(generate).toHaveBeenCalledWith({ messages: [], model: '' });
    expect(result).toEqual({ text: 'hello' });
  });

  it('returns an error text when generation fails', async () => {
    generate.mockRejectedValue(new Error('boom'));
    const result = await caller.generate({});
    expect(result).toEqual({
      text: 'An error occurred while generating content.',
    });
  });

  it('returns no-response when data is null', async () => {
    generate.mockResolvedValue(null);
    const result = await caller.generate({});
    expect(result).toEqual({ text: 'No response generated.' });
  });

  it('returns no-response when output is undefined', async () => {
    generate.mockResolvedValue({ output: undefined, model: 'm' });
    const result = await caller.generate({});
    expect(result).toEqual({ text: 'No response generated.' });
  });
});
