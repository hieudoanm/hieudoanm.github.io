import { generate } from '@hieudoanm.github.io/services/openrouter/openrouter.service';
import {
  getTranscript,
  summariseTranscript,
} from '@hieudoanm.github.io/services/youtube/youtube.service';
import { tryCatch } from '@lodashx/ts';
import { z } from 'zod';
import { procedure, router } from '../trpc';

export const appRouter = router({
  openrouter: {
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
  },
  youtube: {
    transcript: {
      get: procedure
        .input(z.object({ videoId: z.string().default('') }))
        .query(async (options) => {
          const { videoId } = options.input;
          const { data, error } = await tryCatch(getTranscript({ videoId }));
          if (error) {
            return { transcript: error.message };
          }
          if (!data) {
            return { transcript: 'No transcript.' };
          }
          return { transcript: data.transcript ?? 'No transcript.' };
        }),
      summarise: procedure
        .input(z.object({ videoId: z.string().default('') }))
        .mutation(async (options) => {
          const { videoId } = options.input;
          const { data, error } = await tryCatch(
            summariseTranscript({ videoId })
          );
          if (error) {
            return { summary: error.message };
          }
          if (!data) {
            return { summary: 'No Summary.' };
          }
          return { summary: data.summary ?? 'No Summary.' };
        }),
    },
  },
});
// export type definition of API
export type AppRouter = typeof appRouter;
