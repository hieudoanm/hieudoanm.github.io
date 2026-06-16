import type { Route } from '../../types';

const handler: Route['handler'] = (_req, res) => {
  res.status(200).json({
    name: 'hieudoanm',
    version: '0.0.1',
    commit: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || null,
    buildTime: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_DATE || null,
  });
};

export const version: Route = {
  method: 'GET',
  path: '/api/rest/version',
  description: 'Application version info',
  tags: ['System'],
  parameters: [],
  handler,
};
