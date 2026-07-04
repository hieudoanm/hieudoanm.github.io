import { getTranscript, summariseTranscript } from './service';
import { tryCatch } from '@lodashx/ts';
import { z } from 'zod';
import { procedure, router } from '../../trpc';

export const youtubeRouter = router({
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
});
