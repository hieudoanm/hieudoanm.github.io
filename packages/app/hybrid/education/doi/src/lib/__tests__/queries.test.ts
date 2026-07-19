import { readFileSync } from 'node:fs';
import path from 'node:path';
import initSqlJs from 'sql.js';
import type { Database } from 'sql.js';
import { buildReport, graph, overview, search } from '@/lib/queries';

let SQL: Awaited<ReturnType<typeof initSqlJs>>;

const WASM_BINARY = readFileSync(
  path.resolve(process.cwd(), 'node_modules/sql.js/dist/sql-wasm.wasm')
) as Buffer;

const WASM_ARRAY_BUFFER = WASM_BINARY.buffer.slice(
  WASM_BINARY.byteOffset,
  WASM_BINARY.byteOffset + WASM_BINARY.byteLength
) as ArrayBuffer;

const setupDb = async (): Promise<Database> => {
  const db = new SQL.Database();
  db.run(`CREATE TABLE works (
    doi TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    year TEXT NOT NULL,
    abstract TEXT NOT NULL,
    type TEXT NOT NULL
  )`);
  db.run(`CREATE TABLE "references" (
    workId TEXT NOT NULL,
    referencedId TEXT NOT NULL
  )`);

  const insert = db.prepare(
    'INSERT INTO works (doi, title, author, year, abstract, type) VALUES (?, ?, ?, ?, ?, ?)'
  );
  const works: [string, string, string, string, string, string][] = [
    [
      '10.1/a',
      'Thermal transport',
      'Alice',
      '2015',
      'About heat flow',
      'journal-article',
    ],
    [
      '10.1/b',
      'Nano-thermometry',
      'Bob',
      '2016',
      'Measuring temperature',
      'journal-article',
    ],
    [
      '10.1/c',
      'Quantum dots',
      'Alice',
      '2017',
      'Optical properties',
      'book-chapter',
    ],
    ['10.1/d', '', '', '2018', '', ''],
    ['10.1/e', 'Thermal aging', 'Carol', 'None', '', 'dataset'],
  ];
  for (const w of works) insert.run(w);
  insert.free();

  const ref = db.prepare(
    'INSERT INTO "references" (workId, referencedId) VALUES (?, ?)'
  );
  ref.run(['10.1/b', '10.1/a']);
  ref.run(['10.1/c', '10.1/a']);
  ref.run(['10.1/c', '10.1/b']);
  ref.run(['10.1/e', '10.1/c']);
  ref.free();

  return db;
};

beforeAll(async () => {
  SQL = await initSqlJs({ wasmBinary: WASM_ARRAY_BUFFER });
});

describe('overview', () => {
  it('reports counts from the citation network', async () => {
    const db = await setupDb();
    const stats = overview(db, '');

    expect(stats.totalWorks).toBe(5);
    expect(stats.titledWorks).toBe(4);
    expect(stats.stubWorks).toBe(1);
    expect(stats.referenceEdges).toBe(4);
    expect(stats.distinctAuthors).toBe(3);
    expect(stats.earliestYear).toBe('2015');
    expect(stats.latestYear).toBe('2018');
    expect(stats.yearSpan).toBe(3);
    expect(stats.avgRefsPerTitled).toBe(1);
  });

  it('treats non-four-digit years as absent', async () => {
    const db = await setupDb();
    const stats = overview(db, '');

    expect(stats.latestYear).toBe('2018');
    expect(stats.totalWorks).toBe(5);
  });

  it('filters every stat by the search query', async () => {
    const db = await setupDb();
    const stats = overview(db, 'thermal');

    expect(stats.totalWorks).toBe(2);
    expect(stats.titledWorks).toBe(2);
    expect(stats.referenceEdges).toBe(3);
    expect(stats.distinctAuthors).toBe(2);
    expect(stats.earliestYear).toBe('2015');
    expect(stats.latestYear).toBe('2015');
  });
});

describe('search', () => {
  it('matches across title, author, abstract and doi', async () => {
    const db = await setupDb();

    expect(search(db, 'thermal', 10).map((w) => w.doi)).toEqual([
      '10.1/e',
      '10.1/a',
    ]);
    expect(search(db, 'Alice', 10).map((w) => w.doi)).toEqual([
      '10.1/c',
      '10.1/a',
    ]);
    expect(search(db, 'temperature', 10).map((w) => w.doi)).toEqual(['10.1/b']);
    expect(search(db, '10.1/d', 10).map((w) => w.doi)).toEqual(['10.1/d']);
  });

  it('breaks a query into words and requires every word to match', async () => {
    const db = await setupDb();

    expect(search(db, 'thermal transport', 10).map((w) => w.doi)).toEqual([
      '10.1/a',
    ]);
    expect(search(db, 'thermal  aging', 10).map((w) => w.doi)).toEqual([
      '10.1/e',
    ]);
    expect(search(db, 'alice thermal', 10).map((w) => w.doi)).toEqual([
      '10.1/a',
    ]);
  });

  it('returns no matches for an unknown query', async () => {
    const db = await setupDb();
    expect(search(db, 'zzz', 10)).toEqual([]);
  });

  it('includes the work type in results', async () => {
    const db = await setupDb();
    const results = search(db, 'quantum', 10);
    expect(results).toHaveLength(1);
    expect(results[0].type).toBe('book-chapter');
  });
});

describe('graph', () => {
  it('excludes stubs and self-references', async () => {
    const db = await setupDb();
    const { nodes, edges } = graph(db, '', 10);

    expect(nodes.map((n) => n.doi)).toEqual(
      expect.not.arrayContaining(['10.1/d'])
    );
    expect(new Set(edges.map((e) => `${e.source}:${e.target}`)).size).toBe(
      edges.length
    );
    expect(nodes.find((n) => n.doi === '10.1/a')?.inDegree).toBe(2);
  });

  it('caps nodes by limit', async () => {
    const db = await setupDb();
    const { nodes, edges } = graph(db, '', 2);

    expect(nodes).toHaveLength(2);
    expect(nodes.map((n) => n.doi)).toEqual(['10.1/a', '10.1/b']);
    expect(edges.every((e) => e.source !== e.target)).toBe(true);
  });

  it('filters nodes below a minimum in-degree', async () => {
    const db = await setupDb();
    const { nodes, edges } = graph(db, '', 10, 2);

    expect(nodes.map((n) => n.doi)).toEqual(['10.1/a']);
    expect(nodes[0].inDegree).toBe(2);
    expect(edges.every((e) => e.source !== e.target)).toBe(true);
  });
});

describe('buildReport', () => {
  it('assembles the full report', async () => {
    const db = await setupDb();
    const report = buildReport(db, '', 3);

    expect(report.overview.totalWorks).toBe(5);
    expect(report.yearDistribution.map((y) => y.year)).toEqual([
      '2015',
      '2016',
      '2017',
    ]);
    expect(report.mostCited[0].doi).toBe('10.1/a');
    expect(report.mostCiting[0].doi).toBe('10.1/c');
    expect(report.topAuthors[0].author).toBe('Alice');
  });

  it('honours the search query in top lists', async () => {
    const db = await setupDb();
    const report = buildReport(db, 'thermal', 3);

    expect(report.mostCited.map((w) => w.doi)).toEqual(['10.1/a']);
    expect(report.mostCiting.map((w) => w.doi)).toEqual(['10.1/e']);
    expect(report.yearDistribution).toEqual([{ year: '2015', count: 1 }]);
  });
});
