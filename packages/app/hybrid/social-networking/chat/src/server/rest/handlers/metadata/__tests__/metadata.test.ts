import { health } from '../health';
import { info } from '../info';
import { status } from '../status';
import { version } from '../version';

const makeRes = () => {
  const res: any = {
    statusCode: 0,
    status: jest.fn(),
    json: jest.fn(),
  };
  res.status.mockImplementation((code: number) => {
    res.statusCode = code;
    return res;
  });
  return res;
};

describe('metadata handlers', () => {
  it('health returns ok with uptime and timestamp', () => {
    const req: any = {};
    const res = makeRes();
    health.handler(req, res);
    expect(res.statusCode).toBe(200);
    const body = res.json.mock.calls[0][0];
    expect(body.status).toBe('ok');
    expect(typeof body.uptime).toBe('number');
    expect(body.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it('info returns name, runtime, and endpoints', () => {
    const req: any = {};
    const res = makeRes();
    info.handler(req, res);
    expect(res.statusCode).toBe(200);
    const body = res.json.mock.calls[0][0];
    expect(body.name).toBe('hieudoanm');
    expect(body.runtime).toContain('node/');
    expect(body.platform).toBe(process.platform);
    expect(body.endpoints.docs).toBe('/api/rest/docs');
  });

  it('status returns resource usage', () => {
    const req: any = {};
    const res = makeRes();
    status.handler(req, res);
    expect(res.statusCode).toBe(200);
    const body = res.json.mock.calls[0][0];
    expect(body.status).toBe('ok');
    expect(body.environment).toBe(process.env.NODE_ENV || 'development');
    expect(body.memory.rss).toMatch(/MB$/);
    expect(body.node).toBe(process.version);
  });

  it('status falls back to development when NODE_ENV is unset', () => {
    const env = process.env as Record<string, string | undefined>;
    const original = env.NODE_ENV;
    delete env.NODE_ENV;
    try {
      const req: any = {};
      const res = makeRes();
      status.handler(req, res);
      const body = res.json.mock.calls[0][0];
      expect(body.environment).toBe('development');
    } finally {
      env.NODE_ENV = original;
    }
  });

  it('version returns commit null when env is unset', () => {
    const req: any = {};
    const res = makeRes();
    version.handler(req, res);
    expect(res.statusCode).toBe(200);
    const body = res.json.mock.calls[0][0];
    expect(body.name).toBe('hieudoanm');
    expect(body.version).toBe('0.0.1');
    expect(body.commit).toBeNull();
    expect(body.buildTime).toBeNull();
  });

  it('version returns commit from the environment', () => {
    const req: any = {};
    const res = makeRes();
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA = 'abc123';
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_DATE = '2026-01-01';
    version.handler(req, res);
    const body = res.json.mock.calls[0][0];
    expect(body.commit).toBe('abc123');
    expect(body.buildTime).toBe('2026-01-01');
    delete process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;
    delete process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_DATE;
  });
});
