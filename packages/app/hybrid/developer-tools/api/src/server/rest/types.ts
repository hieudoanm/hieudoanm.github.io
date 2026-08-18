import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/** Converts a TypeScript interface to an OpenAPI-compatible JSON Schema object. */
export type AsSchema<T> = { [K in keyof T]: T[K] };

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
  requestBody?: Record<string, unknown>;
  responseSchema?: Record<string, unknown>;
  handler: NextApiHandler;
}

export type TypedHandler<TReq, TRes> = (
  req: NextApiRequest & { body: TReq },
  res: NextApiResponse<TRes | ApiErrorResponse>
) => void | Promise<void>;

export interface ApiErrorResponse {
  error: string;
  message?: string;
  details?: string;
  statusCode?: number;
}

export const errorSchema: Record<string, unknown> = {
  type: 'object',
  properties: {
    error: { type: 'string', description: 'Short error code / title' },
    message: { type: 'string', description: 'Human-readable error message' },
    details: { type: 'string', description: 'Debug details (usually for 5xx)' },
    statusCode: { type: 'integer', description: 'Echoed HTTP status code' },
  },
  required: ['error'],
};
