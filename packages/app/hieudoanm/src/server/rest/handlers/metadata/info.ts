import type { Route } from '../../types';

const handler: Route['handler'] = (_req, res) => {
  res.status(200).json({
    name: 'hieudoanm',
    description: "Hieu Doan's personal REST API",
    runtime: 'node/' + process.version,
    platform: process.platform,
    arch: process.arch,
    endpoints: {
      docs: '/api/rest/docs',
      health: '/api/rest/health',
      status: '/api/rest/status',
      version: '/api/rest/version',
      proxy: '/api/rest/proxy?url=',
    },
  });
};

export const info: Route = {
  method: 'GET',
  path: '/api/rest/info',
  description: 'General server metadata',
  tags: ['System'],
  parameters: [],
  handler,
};
