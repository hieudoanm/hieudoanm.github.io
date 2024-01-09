import { handleLogin } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

const signupHandler = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  try {
    await handleLogin(request, response, {
      authorizationParams: {
        screen_hint: 'signup',
      },
    });
  } catch (error) {
    response.status((error as any).status || 400).end((error as Error).message);
  }
};

export default signupHandler;
