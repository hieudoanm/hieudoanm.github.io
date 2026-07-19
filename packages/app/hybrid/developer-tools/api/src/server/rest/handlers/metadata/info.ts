import type { Route } from '../../types';

interface EndpointMap {
  docs: string;
  health: string;
  status: string;
  version: string;
  proxy: string;
}

interface InfoResponse {
  name: string;
  description: string;
  runtime: string;
  platform: string;
  arch: string;
  endpoints: EndpointMap;
}

const handler: Route['handler'] = (_req, res) => {
  const body: InfoResponse = {
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
  };
  res.status(200).json(body);
};

export const info: Route = {
  method: 'GET',
  path: '/api/rest/info',
  description: 'General server metadata',
  tags: ['Metadata'],
  parameters: [],
  responseSchema: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
      runtime: { type: 'string' },
      platform: { type: 'string' },
      arch: { type: 'string' },
      endpoints: {
        type: 'object',
        properties: {
          docs: { type: 'string' },
          health: { type: 'string' },
          status: { type: 'string' },
          version: { type: 'string' },
          proxy: { type: 'string' },
        },
        required: ['docs', 'health', 'status', 'version', 'proxy'],
      },
    },
    required: [
      'name',
      'description',
      'runtime',
      'platform',
      'arch',
      'endpoints',
    ],
  },
  handler,
};
