import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { apolloServer } from '@sunil/graphql/apollo/server';
import { StatusDataSource } from '@sunil/graphql/schema/status/status.data';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = startServerAndCreateNextHandler(apolloServer, {
  context: async (request: NextApiRequest, response: NextApiResponse) => ({
    request,
    response,
    statusDataSource: new StatusDataSource(),
  }),
});

export { handler as GET, handler as POST };
