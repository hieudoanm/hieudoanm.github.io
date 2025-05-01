import { convert } from '@web/utils/openapi-to-postmanv2';
import { tryCatch } from '@web/utils/try-catch';
import { ConvertResult } from 'openapi-to-postmanv2';
import { z } from 'zod';
import { procedure, router } from '../trpc';

export const appRouter = router({
  health: procedure.query(() => {
    return { status: 'OK' };
  }),
  openapi: {
    postman: procedure
      .input(z.object({ openapi: z.string().default('') }))
      .mutation(async (options) => {
        const { openapi } = options.input;
        const { data: postman, error } = await tryCatch(convert(openapi));
        if (error) {
          console.error('error', error);
          return {} as ConvertResult;
        }
        return postman;
      }),
  },
});

export type AppRouter = typeof appRouter;
