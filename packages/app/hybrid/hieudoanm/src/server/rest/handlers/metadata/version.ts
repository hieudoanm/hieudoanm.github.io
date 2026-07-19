import type { Route } from '../../types';

interface VersionResponse {
  name: string;
  version: string;
  commit: string | null;
  buildTime: string | null;
}

const handler: Route['handler'] = (_req, res) => {
  const body: VersionResponse = {
    name: 'hieudoanm',
    version: '0.0.1',
    commit: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || null,
    buildTime: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_DATE || null,
  };
  res.status(200).json(body);
};

export const version: Route = {
  method: 'GET',
  path: '/api/rest/version',
  description: 'Application version info',
  tags: ['Metadata'],
  parameters: [],
  responseSchema: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      version: { type: 'string' },
      commit: { type: 'string', nullable: true },
      buildTime: { type: 'string', nullable: true },
    },
    required: ['name', 'version', 'commit', 'buildTime'],
  },
  handler,
};
