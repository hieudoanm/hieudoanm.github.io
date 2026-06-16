import { getRoutes } from '../..';
import type { Route } from '../../types';
import type { NextApiHandler } from 'next';

function buildOpenApiSpec(routes: Route[]): Record<string, unknown> {
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

    paths[r.path][r.method.toLowerCase()] = {
      summary: r.description,
      tags: r.tags,
      parameters,
      responses: {
        '200': { description: 'Success' },
        '400': { description: 'Bad Request' },
        '404': { description: 'Not Found' },
        '405': { description: 'Method Not Allowed' },
        '500': { description: 'Internal Server Error' },
      },
    };
  }

  const tags = Array.from(tagSet).map((name) => ({ name }));

  return {
    openapi: '3.0.3',
    info: {
      title: 'REST API',
      version: '1.0.0',
      description: "Hieu Doan's personal REST API",
    },
    servers: [{ url: '/api/rest' }],
    tags,
    paths,
  };
}

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
  tags: ['System'],
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
