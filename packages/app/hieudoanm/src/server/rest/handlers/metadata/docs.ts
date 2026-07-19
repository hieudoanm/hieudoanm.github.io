import { getRoutes } from '../..';
import type { Route } from '../../types';
import { errorSchema } from '../../types';
import type { NextApiHandler } from 'next';

const responseForStatus = (
  description: string,
  schema?: Record<string, unknown>
) => {
  const entry: Record<string, unknown> = { description };
  if (schema) entry.content = { 'application/json': { schema } };
  return entry;
};

const tagDescriptions: Record<string, string> = {
  Metadata: 'Server metadata and introspection endpoints',
  Utility: 'Generic utility endpoints (proxy, helpers)',
};

const methodToOpId = (method: string, path: string): string => {
  const parts = path.replace(/^\/api\/rest\//, '').split('/');
  const resource = parts.map((p) => p.replace(/[{}]/g, '')).join('-');
  return (
    method.toLowerCase() + resource.charAt(0).toUpperCase() + resource.slice(1)
  );
};

const buildOpenApiSpec = (routes: Route[]): Record<string, unknown> => {
  const paths: Record<string, Record<string, unknown>> = {};
  const tagSet = new Set<string>();

  for (const r of routes) {
    for (const t of r.tags) tagSet.add(t);

    const parameters = r.parameters.map((p) => ({
      name: p.name,
      in: p.in,
      required: p.required,
      description: p.description,
      schema: { type: p.type },
    }));

    if (!paths[r.path]) paths[r.path] = {};

    const methodEntry: Record<string, unknown> = {
      operationId: methodToOpId(r.method, r.path),
      summary: r.description,
      tags: r.tags,
      parameters,
      responses: {
        '200': responseForStatus('Success', r.responseSchema),
        '400': responseForStatus('Bad Request', {
          $ref: '#/components/schemas/ApiError',
        }),
        '404': responseForStatus('Not Found', {
          $ref: '#/components/schemas/ApiError',
        }),
        '405': responseForStatus('Method Not Allowed', {
          $ref: '#/components/schemas/ApiError',
        }),
        '500': responseForStatus('Internal Server Error', {
          $ref: '#/components/schemas/ApiError',
        }),
      },
    };

    if (r.requestBody) {
      methodEntry.requestBody = {
        content: { 'application/json': { schema: r.requestBody } },
      };
    }

    paths[r.path][r.method.toLowerCase()] = methodEntry;
  }

  const tags = Array.from(tagSet).map((name) => ({
    name,
    description: tagDescriptions[name] ?? '',
  }));

  return {
    openapi: '3.0.3',
    info: {
      title: 'REST API',
      version: '1.0.0',
      description: "Hieu Doan's personal REST API",
      contact: {
        name: 'Hieu Doan',
        url: 'https://hieudoanm.vercel.app',
      },
      license: {
        name: 'GPL-3.0',
        url: 'https://opensource.org/licenses/GPL-3.0',
      },
    },
    servers: [{ url: '/api/rest', description: 'REST API base path' }],
    tags,
    paths,
    components: {
      schemas: {
        ApiError: {
          ...errorSchema,
          description: 'Standard error response for 4xx and 5xx',
        },
      },
    },
    externalDocs: {
      description: 'Project documentation',
      url: 'https://hieudoanm.vercel.app/api/rest/docs',
    },
  };
};

const swaggerUiHtml = (spec: Record<string, unknown>): string => {
  const specJson = JSON.stringify(spec);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>REST API - Swagger UI</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.20.1/swagger-ui.min.css" />
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.20.1/swagger-ui-bundle.min.js"></script>
  <script>
    SwaggerUIBundle({ spec: ${specJson}, dom_id: '#swagger-ui', presets: [SwaggerUIBundle.presets.apis] });
  </script>
</body>
</html>`;
};

const handler: NextApiHandler = (req, res) => {
  const routes = getRoutes();
  const spec = buildOpenApiSpec(routes);

  if (req.query.format === 'json') {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(spec);
    return;
  }

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(swaggerUiHtml(spec));
};

export const docs: Route = {
  method: 'GET',
  path: '/api/rest/docs',
  description: 'OpenAPI Swagger documentation',
  tags: ['Metadata'],
  parameters: [
    {
      name: 'format',
      in: 'query',
      required: false,
      type: 'string',
      description: 'Set to "json" to get raw OpenAPI spec',
    },
  ],
  handler,
};
