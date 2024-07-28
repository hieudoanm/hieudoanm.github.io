import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ChessDataSource } from '@chess/graphql/apollo/chess/chess.data';
import { apolloServer } from '@chess/graphql/apollo/server';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = startServerAndCreateNextHandler(apolloServer, {
  context: async (request: NextApiRequest, response: NextApiResponse) => ({
    request,
    response,
    chessDataSource: new ChessDataSource(),
  }),
});

export { handler as GET, handler as POST };
