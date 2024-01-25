import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { apolloServer } from '@chess/graphql/apollo/server';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = startServerAndCreateNextHandler(apolloServer, {
  context: async (request: NextApiRequest, response: NextApiResponse) => ({
    request,
    response,
  }),
});

export default handler;
