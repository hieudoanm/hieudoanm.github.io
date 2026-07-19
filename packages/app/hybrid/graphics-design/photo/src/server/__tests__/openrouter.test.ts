import { openrouterRouter } from '@/server/trpc/routers/openrouter';
import { appRouter } from '@/server/trpc/routers/_app';

describe('openrouterRouter', () => {
  it('generates a response with default input', async () => {
    const caller = openrouterRouter.createCaller({});
    await expect(caller.generate({})).resolves.toEqual({
      text: 'No response generated.',
    });
  });

  it('accepts messages and a model', async () => {
    const caller = openrouterRouter.createCaller({});
    await expect(
      caller.generate({
        model: 'gpt-4o',
        messages: [{ role: 'ai', text: 'Hello' }],
      })
    ).resolves.toEqual({ text: 'No response generated.' });
  });

  it('defaults roles and text for message entries', async () => {
    const caller = openrouterRouter.createCaller({});
    await expect(caller.generate({ messages: [{}] })).resolves.toEqual({
      text: 'No response generated.',
    });
  });

  it('rejects an invalid role', async () => {
    const caller = openrouterRouter.createCaller({});
    await expect(
      caller.generate({ messages: [{ role: 'system' as 'ai' }] })
    ).rejects.toThrow();
  });
});

describe('appRouter', () => {
  it('exposes the openrouter router', () => {
    const caller = appRouter.createCaller({});
    expect(typeof caller.openrouter.generate).toBe('function');
  });
});
