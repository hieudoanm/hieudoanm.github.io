import type { Database } from 'sql.js';

import type {
  AuthorCount,
  DoiReport,
  GraphEdge,
  GraphNode,
  OverviewStats,
  RankedWork,
  Work,
  YearCount,
} from '@/types/doi';

const EMPTY_STATS: OverviewStats = {
  totalWorks: 0,
  titledWorks: 0,
  stubWorks: 0,
  referenceEdges: 0,
  distinctAuthors: 0,
  avgRefsPerTitled: 0,
  earliestYear: '',
  latestYear: '',
  yearSpan: 0,
};

const likeParams = (query: string): string[] => {
  const like = `%${query}%`;
  return [like, like, like, like];
};

const matchClause =
  ' AND (title LIKE ? OR author LIKE ? OR abstract LIKE ? OR doi LIKE ?)';
const hasYearClause = " AND year GLOB '[0-9][0-9][0-9][0-9]'";

const scalar = (db: Database, sql: string, params: string[]): string => {
  const res = db.exec(sql, params);
  return String(res[0]?.values[0]?.[0] ?? '');
};

const overview = (db: Database, query: string): OverviewStats => {
  const params = query ? likeParams(query) : [];
  const clause = query ? matchClause : '';

  const count = (sql: string, extra: string, p: string[]): number =>
    Number(scalar(db, `${sql} WHERE 1=1${extra}${clause}`, [...p, ...params]));

  const totalWorks = count('SELECT COUNT(*) FROM works', '', []);
  const titledWorks = count(
    'SELECT COUNT(*) FROM works',
    " AND title != ''",
    []
  );
  const stubWorks = totalWorks - titledWorks;

  let referenceEdges = 0;
  if (query) {
    referenceEdges = Number(
      scalar(
        db,
        `SELECT COUNT(*) FROM "references" r
         JOIN works a ON r.workId = a.doi
         JOIN works b ON r.referencedId = b.doi
         WHERE (a.title LIKE ? OR a.author LIKE ? OR a.abstract LIKE ? OR a.doi LIKE ?)
            OR (b.title LIKE ? OR b.author LIKE ? OR b.abstract LIKE ? OR b.doi LIKE ?)`,
        [...params, ...params]
      )
    );
  } else {
    referenceEdges = Number(
      scalar(db, 'SELECT COUNT(*) FROM "references"', [])
    );
  }

  const distinctAuthors = count(
    'SELECT COUNT(DISTINCT author) FROM works',
    " AND author != ''",
    []
  );

  const earliestYear = scalar(
    db,
    `SELECT MIN(year) FROM works WHERE 1=1${hasYearClause}${clause}`,
    params
  );
  const latestYear = scalar(
    db,
    `SELECT MAX(year) FROM works WHERE 1=1${hasYearClause}${clause}`,
    params
  );
  const yearSpan = Math.max(0, _int(latestYear) - _int(earliestYear));

  return {
    totalWorks,
    titledWorks,
    stubWorks,
    referenceEdges,
    distinctAuthors,
    avgRefsPerTitled: titledWorks ? referenceEdges / titledWorks : 0,
    earliestYear,
    latestYear,
    yearSpan,
  };
};

const yearDistribution = (db: Database, query: string): YearCount[] => {
  const params = query ? likeParams(query) : [];
  const clause = query ? matchClause : '';
  const res = db.exec(
    `SELECT year, COUNT(*) FROM works
     WHERE title != ''${hasYearClause}${clause}
     GROUP BY year ORDER BY year`,
    params
  );
  return (res[0]?.values ?? []).map((row) => ({
    year: String(row[0]),
    count: Number(row[1]),
  }));
};

const topRanked = (
  db: Database,
  query: string,
  cited: boolean,
  top: number
): RankedWork[] => {
  const col = cited ? 'r.referencedId' : 'r.workId';
  const params = query ? likeParams(query) : [];
  const where = query
    ? ` WHERE (w.title LIKE ? OR w.author LIKE ? OR w.abstract LIKE ? OR w.doi LIKE ?)`
    : ` WHERE w.title != ''`;
  const res = db.exec(
    `SELECT ${col}, w.title, w.year, COUNT(*) AS times
     FROM "references" r
     JOIN works w ON w.doi = ${col}
     ${where}
     GROUP BY ${col}
     ORDER BY times DESC
     LIMIT ${top}`,
    params
  );
  return (res[0]?.values ?? []).map((row) => ({
    doi: String(row[0]),
    title: String(row[1]),
    year: _year(String(row[2])),
    count: Number(row[3]),
  }));
};

const topAuthors = (
  db: Database,
  query: string,
  top: number
): AuthorCount[] => {
  const params = query ? likeParams(query) : [];
  const clause = query ? matchClause : '';
  const res = db.exec(
    `SELECT author, COUNT(*) AS count FROM works
     WHERE author != ''${clause}
     GROUP BY author ORDER BY count DESC LIMIT ${top}`,
    params
  );
  return (res[0]?.values ?? []).map((row) => ({
    author: String(row[0]),
    count: Number(row[1]),
  }));
};

const search = (db: Database, query: string, limit: number): Work[] => {
  const params = likeParams(query);
  const res = db.exec(
    `SELECT doi, title, author, year, abstract, type FROM works
     WHERE title LIKE ? OR author LIKE ? OR abstract LIKE ? OR doi LIKE ?
     ORDER BY title LIMIT ${limit}`,
    params
  );
  return (res[0]?.values ?? []).map((row) => ({
    doi: String(row[0]),
    title: String(row[1]),
    author: String(row[2]),
    year: _year(String(row[3])),
    abstract: String(row[4]),
    type: String(row[5]),
  }));
};

const graph = (
  db: Database,
  query: string,
  limit: number,
  minDegree = 0
): { nodes: GraphNode[]; edges: GraphEdge[] } => {
  const params = query ? likeParams(query) : [];
  const clause = query ? matchClause : '';
  const nodeRes = db.exec(
    `SELECT doi, title, year, author FROM works WHERE title != ''${clause}`,
    params
  );
  const nodes: GraphNode[] = (nodeRes[0]?.values ?? []).map((row) => ({
    id: String(row[0]),
    doi: String(row[0]),
    title: String(row[1]),
    year: _year(String(row[2])),
    author: String(row[3]),
    inDegree: 0,
  }));

  const nodeSet = new Set(nodes.map((n) => n.doi));
  const edgeRes = db.exec(
    `SELECT r.workId, r.referencedId FROM "references" r
     JOIN works a ON r.workId = a.doi JOIN works b ON r.referencedId = b.doi
     WHERE a.title != '' AND b.title != '' AND r.workId != r.referencedId`
  );
  const degrees = new Map<string, number>();
  const edges: GraphEdge[] = [];
  for (const row of edgeRes[0]?.values ?? []) {
    const source = String(row[0]);
    const target = String(row[1]);
    if (nodeSet.has(source) && nodeSet.has(target)) {
      edges.push({ source, target });
      degrees.set(target, (degrees.get(target) ?? 0) + 1);
    }
  }

  const ranked = nodes
    .map((n) => ({ ...n, inDegree: degrees.get(n.doi) ?? 0 }))
    .filter((n) => n.inDegree >= minDegree)
    .sort((a, b) => b.inDegree - a.inDegree)
    .slice(0, limit);
  const keep = new Set(ranked.map((n) => n.doi));
  return {
    nodes: ranked,
    edges: edges.filter((e) => keep.has(e.source) && keep.has(e.target)),
  };
};

const _int = (value: string): number => {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
};

const _year = (value: string): string => (/^\d{4}$/.test(value) ? value : '');

export const buildReport = (
  db: Database,
  query: string,
  top: number
): DoiReport => ({
  overview: overview(db, query),
  yearDistribution: yearDistribution(db, query),
  mostCited: topRanked(db, query, true, top),
  mostCiting: topRanked(db, query, false, top),
  topAuthors: topAuthors(db, query, top),
});

export { EMPTY_STATS, graph, overview, search };
