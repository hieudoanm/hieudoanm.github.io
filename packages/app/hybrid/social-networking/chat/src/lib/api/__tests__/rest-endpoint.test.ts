import handler from '@/pages/api/rest/[endpoint]';

jest.mock('@/server/rest', () => ({
  getHandler: jest.fn(),
}));

const { getHandler } = jest.requireMock('@/server/rest');

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

describe('[endpoint].ts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches to the handler for a known endpoint', async () => {
    const inner = jest.fn();
    getHandler.mockReturnValue(inner);
    const req: any = { query: { endpoint: 'health' } };
    const res = makeRes();
    await handler(req, res);
    expect(getHandler).toHaveBeenCalledWith('health');
    expect(inner).toHaveBeenCalledWith(req, res);
  });

  it('returns 404 for an unknown endpoint', async () => {
    getHandler.mockReturnValue(undefined);
    const req: any = { query: { endpoint: 'nope' } };
    const res = makeRes();
    await handler(req, res);
    expect(res.statusCode).toBe(404);
    expect(res.json).toHaveBeenCalledWith({
      error: "Unknown endpoint 'nope'",
    });
  });
});
