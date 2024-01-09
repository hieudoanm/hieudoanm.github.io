import { handleCallback } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

const callbackHandler = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  try {
    await handleCallback(request, response);
  } catch (error) {
    response.status((error as any).status || 400).end((error as Error).message);
  }
};

export default callbackHandler;
