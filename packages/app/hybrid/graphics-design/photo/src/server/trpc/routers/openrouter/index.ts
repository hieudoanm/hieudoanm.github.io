import { procedure, router } from '../../trpc';
import { z } from 'zod';

export const openrouterRouter = router({
  generate: procedure
    .input(
      z.object({
        messages: z
          .object({
            role: z.enum(['ai', 'user']).default('user'),
            text: z.string().default(''),
          })
          .array()
          .default([]),
        model: z.string().default(''),
      })
    )
    .mutation(async (options): Promise<{ text: string }> => {
      const { messages = [], model = '' } = options.input;
      console.info(`model=${model}`);
      console.info(`message=${messages.at(0)?.text ?? 'empty'}`);
      return { text: 'No response generated.' };
    }),
});
