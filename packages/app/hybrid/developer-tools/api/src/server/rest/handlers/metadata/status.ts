import type { Route } from '../../types';

interface MemoryInfo {
  rss: string;
  heapTotal: string;
  heapUsed: string;
}

interface StatusResponse {
  status: string;
  uptime: number;
  environment: string;
  memory: MemoryInfo;
  node: string;
  platform: string;
  arch: string;
}

const handler: Route['handler'] = (_req, res) => {
  const mem = process.memoryUsage();

  const body: StatusResponse = {
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
  };
  res.status(200).json(body);
};

export const status: Route = {
  method: 'GET',
  path: '/api/rest/status',
  description: 'Server status and resource usage',
  tags: ['Metadata'],
  parameters: [],
  responseSchema: {
    type: 'object',
    properties: {
      status: { type: 'string' },
      uptime: { type: 'number' },
      environment: { type: 'string' },
      memory: {
        type: 'object',
        properties: {
          rss: { type: 'string' },
          heapTotal: { type: 'string' },
          heapUsed: { type: 'string' },
        },
        required: ['rss', 'heapTotal', 'heapUsed'],
      },
      node: { type: 'string' },
      platform: { type: 'string' },
      arch: { type: 'string' },
    },
    required: [
      'status',
      'uptime',
      'environment',
      'memory',
      'node',
      'platform',
      'arch',
    ],
  },
  handler,
};
