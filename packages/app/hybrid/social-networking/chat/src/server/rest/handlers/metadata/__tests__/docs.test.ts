import '@/server/rest';
import { docs } from '../docs';

const makeRes = () => {
  const res: any = {
    statusCode: 0,
    status: jest.fn(),
    json: jest.fn(),
    send: jest.fn(),
    setHeader: jest.fn(),
  };
  res.status.mockImplementation((code: number) => {
    res.statusCode = code;
    return res;
  });
  return res;
};

describe('docs handler', () => {
  it('returns the OpenAPI spec as JSON when format=json', () => {
    const req: any = { query: { format: 'json' } };
    const res = makeRes();
    docs.handler(req, res);
    expect(res.statusCode).toBe(200);
    expect(res.setHeader).toHaveBeenCalledWith(
      'Content-Type',
      'application/json'
    );
    const spec = res.json.mock.calls[0][0];
    expect(spec.openapi).toBe('3.0.3');
    expect(spec.info.title).toBe('REST API');
    expect(spec.tags).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Metadata' }),
        expect.objectContaining({ name: 'Utility' }),
      ])
    );
    expect(spec.paths['/api/rest/proxy']).toBeDefined();
    expect(spec.paths['/api/rest/proxy'].get.operationId).toBe('getProxy');
    expect(spec.paths['/api/rest/health'].get.tags).toEqual(['Metadata']);
    expect(spec.components.schemas.ApiError).toBeDefined();
  });

  it('includes parameter schemas in the spec', () => {
    const req: any = { query: { format: 'json' } };
    const res = makeRes();
    docs.handler(req, res);
    const spec = res.json.mock.calls[0][0];
    const params = spec.paths['/api/rest/proxy'].get.parameters;
    expect(params).toContainEqual(
      expect.objectContaining({ name: 'url', in: 'query', required: true })
    );
  });

  it('returns the Swagger UI HTML by default', () => {
    const req: any = { query: {} };
    const res = makeRes();
    docs.handler(req, res);
    expect(res.statusCode).toBe(200);
    expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'text/html');
    const html = res.send.mock.calls[0][0];
    expect(html).toContain('swagger-ui');
    expect(html).toContain('REST API');
  });
});
