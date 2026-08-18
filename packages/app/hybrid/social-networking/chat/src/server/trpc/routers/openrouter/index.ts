import { generate } from './service';
import { tryCatch } from '@lodashx/ts';
import { z } from 'zod';
import { procedure, router } from '../../trpc';

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
      const { data, error } = await tryCatch(generate({ messages, model }));
      if (error) {
        console.error('Error generating content:', error);
        return { text: 'An error occurred while generating content.' };
      }
      if (!data) {
        return { text: 'No response generated.' };
      }
      const output: string = data.output ?? 'No response generated.';
      return { text: output };
    }),
});
