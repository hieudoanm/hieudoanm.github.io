import type { Route } from '../../types';

const handler: Route['handler'] = (_req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
};

export const health: Route = {
  method: 'GET',
  path: '/api/rest/health',
  description: 'Health check',
  tags: ['System'],
  parameters: [],
  handler,
};
