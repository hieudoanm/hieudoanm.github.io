import type { Route } from '../../types';

interface HealthResponse {
  status: string;
  timestamp: string;
  uptime: number;
}

const handler: Route['handler'] = (_req, res) => {
  const body: HealthResponse = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  };
  res.status(200).json(body);
};

export const health: Route = {
  method: 'GET',
  path: '/api/rest/health',
  description: 'Health check',
  tags: ['Metadata'],
  parameters: [],
  responseSchema: {
    type: 'object',
    properties: {
      status: { type: 'string' },
      timestamp: { type: 'string', format: 'date-time' },
      uptime: { type: 'number' },
    },
    required: ['status', 'timestamp', 'uptime'],
  },
  handler,
};
