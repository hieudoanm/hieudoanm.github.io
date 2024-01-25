import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { apolloServer } from '@chess/graphql/apollo/server';
import { ChessDataSource } from '@chess/graphql/data/chess.data';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = startServerAndCreateNextHandler(apolloServer, {
  context: async (request: NextApiRequest, response: NextApiResponse) => ({
    request,
    response,
    chessDataSource: new ChessDataSource(),
  }),
});

export default handler;
