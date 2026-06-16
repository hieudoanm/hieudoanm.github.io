import type { Route } from '../../types';

const handler: Route['handler'] = (_req, res) => {
  const mem = process.memoryUsage();

  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    memory: {
      rss: Math.round(mem.rss / 1024 / 1024) + 'MB',
      heapTotal: Math.round(mem.heapTotal / 1024 / 1024) + 'MB',
      heapUsed: Math.round(mem.heapUsed / 1024 / 1024) + 'MB',
    },
    node: process.version,
    platform: process.platform,
    arch: process.arch,
  });
};

export const status: Route = {
  method: 'GET',
  path: '/api/rest/status',
  description: 'Server status and resource usage',
  tags: ['System'],
  parameters: [],
  handler,
};
