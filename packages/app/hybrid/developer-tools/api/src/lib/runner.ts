import {
  EnvironmentVariable,
  RequestCollection,
  RequestConfig,
  ResponseMeta,
  ScriptLog,
  StoredCookie,
  TestResult,
} from '@/types/api-client';
import { ExecuteOptions, executeRequest } from '@/lib/http';
import { FormFiles } from '@/lib/body';

const uid = (): string => Math.random().toString(36).slice(2, 10);

export interface RunEntry {
  id: string;
  name: string;
  group: string;
  request: RequestConfig;
}

export interface RunResult {
  entryId: string;
  entryName: string;
  group: string;
  iteration: number;
  ok: boolean;
  statusCode?: number;
  error?: string;
  timeMs: number;
  sizeBytes: number;
  testPassed: number;
  testFailed: number;
  testResults: TestResult[];
  logs: ScriptLog[];
}

export interface RunOptions {
  delayMs?: number;
  continueOnFailure?: boolean;
  env?: EnvironmentVariable[];
  cookies?: StoredCookie[];
  files?: FormFiles;
  onProgress?: (done: number, total: number, entryName: string) => void;
}

export interface RunSummary {
  id: string;
  collectionId: string;
  collectionName: string;
  startedAt: number;
  finishedAt: number;
  durationMs: number;
  iterations: number;
  totalRequests: number;
  passed: number;
  failed: number;
  testPassed: number;
  testFailed: number;
  results: RunResult[];
}

export type DataRow = Record<string, string>;

type Execute = (
  config: RequestConfig,
  env: EnvironmentVariable[],
  executeOptions: ExecuteOptions
) => Promise<ResponseMeta>;

export const flattenCollection = (collection: RequestCollection): RunEntry[] =>
  collection.groups.flatMap((group) =>
    group.entries.map((entry) => ({
      id: entry.id,
      name: entry.name,
      group: group.name,
      request: entry.request,
    }))
  );

export const parseCsv = (source: string): DataRow[] => {
  const lines = source
    .trim()
    .split(/\r?\n/)
    .filter((line) => line.trim() !== '');
  if (lines.length < 2) return [];
  const headers = splitCsvLine(lines[0]).map((header) => header.trim());
  return lines.slice(1).map((line) => {
    const cells = splitCsvLine(line);
    const row: DataRow = {};
    headers.forEach((header, index) => {
      row[header] = (cells[index] ?? '').trim();
    });
    return row;
  });
};

export const splitCsvLine = (line: string): string[] => {
  const cells: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (inQuotes) {
      if (char === '"') {
        if (line[index + 1] === '"') {
          current += '"';
          index += 1;
        } else {
          inQuotes = false;
        }
      } else {
        current += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ',') {
      cells.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  cells.push(current);
  return cells;
};

export const parseDataRows = (
  source: string,
  type: 'csv' | 'json'
): DataRow[] => {
  if (type === 'csv') return parseCsv(source);
  try {
    const parsed: unknown = JSON.parse(source);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (row): row is Record<string, unknown> =>
          typeof row === 'object' && row !== null && !Array.isArray(row)
      )
      .map((row) =>
        Object.fromEntries(
          Object.entries(row).map(([key, value]) => [
            key,
            value === null || value === undefined ? '' : String(value),
          ])
        )
      );
  } catch {
    return [];
  }
};

export const toEnvVariables = (
  rows: DataRow[],
  iteration: number
): EnvironmentVariable[] =>
  Object.entries(rows[iteration] ?? {}).map(([key, value]) => ({
    id: uid(),
    key,
    value,
    enabled: true,
  }));

export const runCollection = async (
  collection: RequestCollection,
  options: RunOptions = {},
  execute: Execute = executeRequest
): Promise<RunSummary> => {
  const entries = flattenCollection(collection);
  const startedAt = Date.now();
  const results: RunResult[] = [];
  let aborted = false;
  for (let index = 0; index < entries.length && !aborted; index += 1) {
    const entry = entries[index];
    options.onProgress?.(index + 1, entries.length, entry.name);
    const result = await runEntry(entry, 0, options, execute);
    results.push(result);
    if (!result.ok && !options.continueOnFailure) aborted = true;
    if (options.delayMs && !aborted && index < entries.length - 1) {
      await wait(options.delayMs);
    }
  }
  return summarize(collection, 1, results, startedAt);
};

export const runDataDriven = async (
  collection: RequestCollection,
  rows: DataRow[],
  options: RunOptions = {},
  execute: Execute = executeRequest
): Promise<RunSummary> => {
  const entries = flattenCollection(collection);
  const startedAt = Date.now();
  const results: RunResult[] = [];
  let aborted = false;
  for (let rowIndex = 0; rowIndex < rows.length && !aborted; rowIndex += 1) {
    const rowVars = toEnvVariables(rows, rowIndex);
    const env = [...(options.env ?? []), ...rowVars];
    for (let index = 0; index < entries.length; index += 1) {
      const entry = entries[index];
      const total = rows.length * entries.length;
      const done = rowIndex * entries.length + index + 1;
      options.onProgress?.(done, total, `${entry.name} (row ${rowIndex + 1})`);
      const result = await runEntry(
        entry,
        rowIndex,
        { ...options, env },
        execute
      );
      results.push(result);
      if (!result.ok && !options.continueOnFailure) {
        aborted = true;
        break;
      }
      if (options.delayMs && !aborted) await wait(options.delayMs);
    }
  }
  return summarize(collection, rows.length, results, startedAt);
};

const runEntry = async (
  entry: RunEntry,
  iteration: number,
  options: RunOptions,
  execute: Execute
): Promise<RunResult> => {
  try {
    const meta = await execute(entry.request, options.env ?? [], {
      cookies: options.cookies,
      files: options.files,
    });
    const testResults = meta.testResults ?? [];
    return {
      entryId: entry.id,
      entryName: entry.name,
      group: entry.group,
      iteration,
      ok: true,
      statusCode: meta.status,
      timeMs: meta.timeMs,
      sizeBytes: meta.sizeBytes,
      testPassed: testResults.filter((test) => test.passed).length,
      testFailed: testResults.filter((test) => !test.passed).length,
      testResults,
      logs: meta.scriptLogs ?? [],
    };
  } catch (error) {
    return {
      entryId: entry.id,
      entryName: entry.name,
      group: entry.group,
      iteration,
      ok: false,
      error: error instanceof Error ? error.message : String(error),
      timeMs: 0,
      sizeBytes: 0,
      testPassed: 0,
      testFailed: 0,
      testResults: [],
      logs: [],
    };
  }
};

export const summarize = (
  collection: RequestCollection,
  iterations: number,
  results: RunResult[],
  startedAt = Date.now()
): RunSummary => {
  const finishedAt = Date.now();
  return {
    id: uid(),
    collectionId: collection.id,
    collectionName: collection.name,
    startedAt,
    finishedAt,
    durationMs: Math.max(0, finishedAt - startedAt),
    iterations,
    totalRequests: results.length,
    passed: results.filter((result) => result.ok).length,
    failed: results.filter((result) => !result.ok).length,
    testPassed: results.reduce((sum, result) => sum + result.testPassed, 0),
    testFailed: results.reduce((sum, result) => sum + result.testFailed, 0),
    results,
  };
};

const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const summaryToJson = (summary: RunSummary): string =>
  JSON.stringify(summary, null, 2);

export const summaryToHtml = (summary: RunSummary): string => {
  const rows = summary.results
    .map((result) => {
      const status = result.ok
        ? `<span class="ok">${result.statusCode ?? 'OK'}</span>`
        : `<span class="err">FAIL</span>`;
      const tests = result.testFailed
        ? `<span class="err">${result.testPassed}/${result.testPassed + result.testFailed} passed</span>`
        : `<span class="ok">${result.testPassed} passed</span>`;
      const name = escapeHtml(
        `${result.group ? `${result.group} / ` : ''}${result.entryName}`
      );
      const error = result.error
        ? `<div class="err">${escapeHtml(result.error)}</div>`
        : '';
      return `<tr><td>${name}</td><td>${result.iteration + 1}</td><td>${status}</td><td>${result.timeMs}ms</td><td>${tests}${error}</td></tr>`;
    })
    .join('');
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>Run report — ${escapeHtml(summary.collectionName)}</title>
<style>
body { font-family: system-ui, sans-serif; margin: 2rem; color: #0f172a; }
h1 { font-size: 1.25rem; }
.summary { display: flex; gap: 1.5rem; margin-bottom: 1rem; flex-wrap: wrap; }
.summary .item { background: #f1f5f9; border-radius: 0.5rem; padding: 0.5rem 1rem; }
table { border-collapse: collapse; width: 100%; }
th, td { border: 1px solid #e2e8f0; padding: 0.5rem; text-align: left; }
th { background: #f8fafc; }
.ok { color: #16a34a; font-weight: 600; }
.err { color: #dc2626; font-weight: 600; }
</style>
</head>
<body>
<h1>${escapeHtml(summary.collectionName)} — run report</h1>
<div class="summary">
<div class="item">Total requests: ${summary.totalRequests}</div>
<div class="item">Passed: ${summary.passed}</div>
<div class="item">Failed: ${summary.failed}</div>
<div class="item">Tests passed: ${summary.testPassed}</div>
<div class="item">Tests failed: ${summary.testFailed}</div>
<div class="item">Duration: ${summary.durationMs}ms</div>
</div>
<table>
<thead><tr><th>Request</th><th>Iteration</th><th>Status</th><th>Time</th><th>Tests</th></tr></thead>
<tbody>${rows}</tbody>
</table>
</body>
</html>`;
};

const escapeHtml = (value: string): string =>
  value.replace(/[&<>"']/g, (char) =>
    char === '&'
      ? '&amp;'
      : char === '<'
        ? '&lt;'
        : char === '>'
          ? '&gt;'
          : char === '"'
            ? '&quot;'
            : '&#39;'
  );
