import { handleLogin } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

const loginHandler = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  try {
    await handleLogin(request, response, {
      authorizationParams: {
        screen_hint: 'login',
      },
    });
  } catch (error) {
    response.status((error as any).status || 400).end((error as Error).message);
  }
};

export default loginHandler;
