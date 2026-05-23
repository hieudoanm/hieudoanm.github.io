import type { NextApiHandler } from 'next';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface Param {
  name: string;
  in: 'query' | 'path' | 'header' | 'body';
  required: boolean;
  type: string;
  description?: string;
  schema?: Record<string, unknown>;
}

export interface Route {
  method: HttpMethod;
  path: string;
  description: string;
  tags: string[];
  parameters: Param[];
  handler: NextApiHandler;
}
