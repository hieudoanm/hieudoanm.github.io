import {
  DataRow,
  flattenCollection,
  parseCsv,
  parseDataRows,
  runCollection,
  runDataDriven,
  splitCsvLine,
  summarize,
  summaryToHtml,
  summaryToJson,
  toEnvVariables,
} from '@/lib/runner';
import { executeRequest, emptyRequest } from '@/lib/http';
import {
  EnvironmentVariable,
  RequestCollection,
  ResponseMeta,
} from '@/types/api-client';

jest.mock('@/lib/http', () => ({
  executeRequest: jest.fn(),
  emptyRequest: jest.requireActual('@/lib/http').emptyRequest,
}));

const mockExecuteRequest = executeRequest as jest.Mock;

const collection = (): RequestCollection => ({
  id: 'c1',
  name: 'Users API',
  groups: [
    {
      id: 'g1',
      name: 'Users',
      entries: [
        {
          id: 'e1',
          name: 'List users',
          request: {
            ...emptyRequest(),
            method: 'GET',
            url: 'https://{{host}}/users',
            params: [],
            headers: [],
            body: '',
            authType: 'none',
            token: '',
            username: '',
            password: '',
          },
        },
        {
          id: 'e2',
          name: 'Create user',
          request: {
            ...emptyRequest(),
            method: 'POST',
            url: 'https://{{host}}/users',
            params: [],
            headers: [],
            body: '{"name":"{{name}}"}',
            authType: 'none',
            token: '',
            username: '',
            password: '',
          },
        },
      ],
    },
    {
      id: 'g2',
      name: 'Auth',
      entries: [
        {
          id: 'e3',
          name: 'Login',
          request: {
            ...emptyRequest(),
            method: 'POST',
            url: 'https://{{host}}/login',
            params: [],
            headers: [],
            body: '',
            authType: 'none',
            token: '',
            username: '',
            password: '',
          },
        },
      ],
    },
  ],
});

const meta = (overrides: Partial<ResponseMeta> = {}): ResponseMeta => ({
  status: 200,
  statusText: 'OK',
  url: 'https://api.example.com/users',
  headers: {},
  body: '{}',
  timeMs: 5,
  sizeBytes: 2,
  ...overrides,
});

const env: EnvironmentVariable[] = [
  { id: '1', key: 'host', value: 'api.example.com', enabled: true },
];

describe('flattenCollection', () => {
  it('flattens groups into ordered run entries', () => {
    const entries = flattenCollection(collection());
    expect(entries).toHaveLength(3);
    expect(entries[0].name).toBe('List users');
    expect(entries[0].group).toBe('Users');
    expect(entries[2].group).toBe('Auth');
  });

  it('returns an empty list for a collection without groups', () => {
    expect(flattenCollection({ id: 'x', name: 'Empty', groups: [] })).toEqual(
      []
    );
  });
});

describe('splitCsvLine', () => {
  it('splits plain comma-separated values', () => {
    expect(splitCsvLine('a,b,c')).toEqual(['a', 'b', 'c']);
  });

  it('keeps commas inside quoted fields', () => {
    expect(splitCsvLine('a,"b,c",d')).toEqual(['a', 'b,c', 'd']);
  });

  it('unpairs escaped quotes', () => {
    expect(splitCsvLine('"say ""hi"""')).toEqual(['say "hi"']);
  });
});

describe('parseCsv', () => {
  it('parses rows into objects keyed by the header', () => {
    const rows = parseCsv('name,email\nAlice,a@b.co\nBob,b@c.co');
    expect(rows).toEqual([
      { name: 'Alice', email: 'a@b.co' },
      { name: 'Bob', email: 'b@c.co' },
    ]);
  });

  it('returns an empty array for a header-only or blank source', () => {
    expect(parseCsv('name,email')).toEqual([]);
    expect(parseCsv('   ')).toEqual([]);
  });

  it('ignores blank lines', () => {
    const rows = parseCsv('name\n\nAlice\n');
    expect(rows).toEqual([{ name: 'Alice' }]);
  });

  it('fills missing cells with an empty string', () => {
    expect(parseCsv('a,b\n1')).toEqual([{ a: '1', b: '' }]);
  });
});

describe('parseDataRows', () => {
  it('delegates csv sources to the CSV parser', () => {
    expect(parseDataRows('a\n1', 'csv')).toEqual([{ a: '1' }]);
  });

  it('parses a JSON array of objects', () => {
    const rows = parseDataRows('[{"a":1},{"a":2}]', 'json');
    expect(rows).toEqual([{ a: '1' }, { a: '2' }]);
  });

  it('returns an empty array for invalid or non-array JSON', () => {
    expect(parseDataRows('not json', 'json')).toEqual([]);
    expect(parseDataRows('{"a":1}', 'json')).toEqual([]);
  });

  it('stringifies null row values as empty strings', () => {
    expect(parseDataRows('[{"a":null}]', 'json')).toEqual([{ a: '' }]);
  });
});

describe('toEnvVariables', () => {
  it('converts a row into enabled environment variables', () => {
    const vars = toEnvVariables([{ name: 'Alice' }, { name: 'Bob' }], 1);
    expect(vars).toHaveLength(1);
    expect(vars[0].key).toBe('name');
    expect(vars[0].value).toBe('Bob');
    expect(vars[0].enabled).toBe(true);
  });

  it('returns an empty list for an out-of-range iteration', () => {
    expect(toEnvVariables([{ name: 'Alice' }], 5)).toEqual([]);
  });
});

describe('runCollection', () => {
  beforeEach(() => {
    mockExecuteRequest.mockReset();
  });

  it('runs every entry sequentially and counts pass/fail', async () => {
    mockExecuteRequest.mockResolvedValue(meta());
    const summary = await runCollection(
      collection(),
      { env },
      mockExecuteRequest
    );

    expect(mockExecuteRequest).toHaveBeenCalledTimes(3);
    expect(summary.totalRequests).toBe(3);
    expect(summary.passed).toBe(3);
    expect(summary.failed).toBe(0);
    expect(summary.iterations).toBe(1);
    expect(summary.collectionName).toBe('Users API');
    expect(summary.results[0].entryName).toBe('List users');
    expect(summary.results[0].statusCode).toBe(200);
  });

  it('counts failed tests in the summary', async () => {
    mockExecuteRequest.mockResolvedValue(
      meta({
        testResults: [
          { id: 't1', name: 'status is 200', passed: true },
          { id: 't2', name: 'has id', passed: false },
        ],
      })
    );
    const summary = await runCollection(collection(), {}, mockExecuteRequest);
    expect(summary.testPassed).toBe(3);
    expect(summary.testFailed).toBe(3);
  });

  it('stops after a network failure when continueOnFailure is false', async () => {
    mockExecuteRequest
      .mockResolvedValueOnce(meta())
      .mockRejectedValueOnce(new Error('ECONNREFUSED'))
      .mockResolvedValueOnce(meta());
    const summary = await runCollection(
      collection(),
      { continueOnFailure: false },
      mockExecuteRequest
    );
    expect(mockExecuteRequest).toHaveBeenCalledTimes(2);
    expect(summary.failed).toBe(1);
    expect(summary.results[1].ok).toBe(false);
    expect(summary.results[1].error).toBe('ECONNREFUSED');
  });

  it('continues after a network failure when continueOnFailure is true', async () => {
    mockExecuteRequest
      .mockResolvedValueOnce(meta())
      .mockRejectedValueOnce(new Error('boom'))
      .mockResolvedValueOnce(meta());
    const summary = await runCollection(
      collection(),
      { continueOnFailure: true },
      mockExecuteRequest
    );
    expect(mockExecuteRequest).toHaveBeenCalledTimes(3);
    expect(summary.failed).toBe(1);
    expect(summary.passed).toBe(2);
  });

  it('waits between entries when a delay is set', async () => {
    jest.useFakeTimers();
    mockExecuteRequest.mockResolvedValue(meta());
    const runPromise = runCollection(
      collection(),
      { delayMs: 100 },
      mockExecuteRequest
    );
    try {
      await jest.advanceTimersByTimeAsync(0);
      expect(mockExecuteRequest).toHaveBeenCalledTimes(1);
      await jest.advanceTimersByTimeAsync(100);
      expect(mockExecuteRequest).toHaveBeenCalledTimes(2);
      await jest.advanceTimersByTimeAsync(100);
      expect(mockExecuteRequest).toHaveBeenCalledTimes(3);
      await runPromise;
    } finally {
      jest.useRealTimers();
    }
  });

  it('reports progress via onProgress', async () => {
    mockExecuteRequest.mockResolvedValue(meta());
    const seen: string[] = [];
    const summary = await runCollection(
      collection(),
      {
        env,
        onProgress: (done, total, entryName): void => {
          seen.push(`${done}/${total} ${entryName}`);
        },
      },
      mockExecuteRequest
    );
    expect(seen).toEqual(['1/3 List users', '2/3 Create user', '3/3 Login']);
    expect(summary.totalRequests).toBe(3);
  });

  it('runs with default options and the real execute function', async () => {
    mockExecuteRequest.mockResolvedValue(meta());
    const summary = await runCollection(collection());
    expect(mockExecuteRequest).toHaveBeenCalledTimes(3);
    expect(summary.passed).toBe(3);
  });

  it('records string rejections as the run error', async () => {
    mockExecuteRequest.mockRejectedValueOnce('boom');
    const summary = await runCollection(
      collection(),
      { continueOnFailure: false },
      mockExecuteRequest
    );
    expect(summary.results[0].error).toBe('boom');
    expect(summary.results[0].ok).toBe(false);
  });
});

describe('runDataDriven', () => {
  const rows: DataRow[] = [
    { host: 'one.example.com', name: 'A' },
    { host: 'two.example.com', name: 'B' },
  ];

  beforeEach(() => {
    mockExecuteRequest.mockReset();
  });

  it('runs the collection once per row with row variables merged into env', async () => {
    mockExecuteRequest.mockResolvedValue(meta());
    const summary = await runDataDriven(
      collection(),
      rows,
      { env },
      mockExecuteRequest
    );

    expect(mockExecuteRequest).toHaveBeenCalledTimes(6);
    expect(summary.iterations).toBe(2);
    expect(summary.totalRequests).toBe(6);
    const envArg = mockExecuteRequest.mock.calls[0][1] as EnvironmentVariable[];
    expect(envArg).toHaveLength(3);
    expect(envArg[1].key).toBe('host');
    expect(envArg[1].value).toBe('one.example.com');
    expect(envArg[2].value).toBe('A');
    expect(summary.results[3].iteration).toBe(1);
  });

  it('marks iteration results for each row', async () => {
    mockExecuteRequest.mockResolvedValue(meta());
    const summary = await runDataDriven(
      collection(),
      rows,
      {},
      mockExecuteRequest
    );
    expect(summary.results.map((r) => r.iteration)).toEqual([0, 0, 0, 1, 1, 1]);
  });

  it('stops the whole run when a row fails with continueOnFailure false', async () => {
    mockExecuteRequest.mockRejectedValueOnce(new Error('offline'));
    const summary = await runDataDriven(
      collection(),
      rows,
      { continueOnFailure: false },
      mockExecuteRequest
    );
    expect(mockExecuteRequest).toHaveBeenCalledTimes(1);
    expect(summary.failed).toBe(1);
  });

  it('runs nothing when there are no rows', async () => {
    const summary = await runDataDriven(
      collection(),
      [],
      {},
      mockExecuteRequest
    );
    expect(mockExecuteRequest).not.toHaveBeenCalled();
    expect(summary.totalRequests).toBe(0);
  });

  it('runs with default options and the real execute function', async () => {
    mockExecuteRequest.mockResolvedValue(meta());
    const summary = await runDataDriven(collection(), rows);
    expect(mockExecuteRequest).toHaveBeenCalledTimes(6);
    expect(summary.iterations).toBe(2);
  });

  it('waits between data-driven requests when a delay is set', async () => {
    jest.useFakeTimers();
    mockExecuteRequest.mockResolvedValue(meta());
    const runPromise = runDataDriven(
      collection(),
      rows,
      { delayMs: 50 },
      mockExecuteRequest
    );
    try {
      await jest.advanceTimersByTimeAsync(0);
      expect(mockExecuteRequest).toHaveBeenCalledTimes(1);
      await jest.advanceTimersByTimeAsync(300);
      expect(mockExecuteRequest).toHaveBeenCalledTimes(6);
      await runPromise;
    } finally {
      jest.useRealTimers();
    }
  });
});

describe('summarize', () => {
  it('aggregates passed, failed and test totals', () => {
    const summary = summarize(
      collection(),
      1,
      [
        {
          entryId: 'e1',
          entryName: 'List users',
          group: 'Users',
          iteration: 0,
          ok: true,
          statusCode: 200,
          timeMs: 4,
          sizeBytes: 10,
          testPassed: 2,
          testFailed: 1,
          testResults: [],
          logs: [],
        },
        {
          entryId: 'e2',
          entryName: 'Create user',
          group: 'Users',
          iteration: 0,
          ok: false,
          error: 'boom',
          timeMs: 0,
          sizeBytes: 0,
          testPassed: 0,
          testFailed: 0,
          testResults: [],
          logs: [],
        },
      ],
      1000
    );
    expect(summary.passed).toBe(1);
    expect(summary.failed).toBe(1);
    expect(summary.testPassed).toBe(2);
    expect(summary.testFailed).toBe(1);
    expect(summary.durationMs).toBeGreaterThanOrEqual(0);
  });
});

describe('reports', () => {
  const summary = summarize(collection(), 1, [
    {
      entryId: 'e1',
      entryName: 'List users',
      group: 'Users',
      iteration: 0,
      ok: true,
      statusCode: 200,
      timeMs: 4,
      sizeBytes: 10,
      testPassed: 1,
      testFailed: 0,
      testResults: [],
      logs: [],
    },
    {
      entryId: 'e2',
      entryName: 'Create user',
      group: 'Users',
      iteration: 0,
      ok: false,
      error: 'net::ERR',
      timeMs: 0,
      sizeBytes: 0,
      testPassed: 0,
      testFailed: 0,
      testResults: [],
      logs: [],
    },
  ]);

  it('exports the summary as JSON', () => {
    const json = JSON.parse(summaryToJson(summary)) as {
      collectionName: string;
      totalRequests: number;
    };
    expect(json.collectionName).toBe('Users API');
    expect(json.totalRequests).toBe(2);
  });

  it('renders a self-contained HTML report with escaped values', () => {
    const html = summaryToHtml(summary);
    expect(html).toContain('<!doctype html>');
    expect(html).toContain('Users API');
    expect(html).toContain('Users / List users');
    expect(html).toContain('net::ERR');
    expect(html).toContain('Total requests: 2');
  });

  it('escapes HTML special characters in names and errors', () => {
    const html = summaryToHtml(
      summarize(
        {
          id: 'c2',
          name: 'A & B <API> "v1"',
          groups: [],
        },
        1,
        [
          {
            entryId: 'x',
            entryName: "Joe's <request>",
            group: '',
            iteration: 0,
            ok: true,
            timeMs: 1,
            sizeBytes: 1,
            testPassed: 0,
            testFailed: 0,
            testResults: [],
            logs: [],
          },
        ]
      )
    );
    expect(html).toContain('A &amp; B &lt;API&gt; &quot;v1&quot;');
    expect(html).toContain('Joe&#39;s &lt;request&gt;');
  });

  it('renders OK status and failing test counts in the HTML report', () => {
    const html = summaryToHtml(
      summarize({ id: 'c3', name: 'Status', groups: [] }, 1, [
        {
          entryId: 'y',
          entryName: 'No status',
          group: '',
          iteration: 0,
          ok: true,
          timeMs: 1,
          sizeBytes: 1,
          testPassed: 1,
          testFailed: 2,
          testResults: [],
          logs: [],
        },
      ])
    );
    expect(html).toContain('>OK</span>');
    expect(html).toContain('1/3 passed</span>');
  });
});
