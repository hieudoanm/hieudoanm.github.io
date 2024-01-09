import { handleLogout } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

const logoutHandler = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  try {
    await handleLogout(request, response);
  } catch (error) {
    response.status((error as any).status || 400).end((error as Error).message);
  }
};

export default logoutHandler;
