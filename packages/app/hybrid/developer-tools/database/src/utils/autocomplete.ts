export const SQL_KEYWORDS: string[] = [
  'SELECT',
  'FROM',
  'WHERE',
  'AND',
  'OR',
  'NOT',
  'NULL',
  'IN',
  'EXISTS',
  'BETWEEN',
  'LIKE',
  'GLOB',
  'IS',
  'INSERT INTO',
  'VALUES',
  'UPDATE',
  'SET',
  'DELETE FROM',
  'CREATE TABLE',
  'ALTER TABLE',
  'DROP TABLE',
  'PRIMARY KEY',
  'FOREIGN KEY',
  'REFERENCES',
  'UNIQUE',
  'NOT NULL',
  'DEFAULT',
  'JOIN',
  'INNER JOIN',
  'LEFT JOIN',
  'RIGHT JOIN',
  'CROSS JOIN',
  'ON',
  'GROUP BY',
  'ORDER BY',
  'HAVING',
  'LIMIT',
  'OFFSET',
  'ASC',
  'DESC',
  'DISTINCT',
  'COUNT',
  'SUM',
  'AVG',
  'MIN',
  'MAX',
  'CASE',
  'WHEN',
  'THEN',
  'ELSE',
  'END',
  'AS',
  'UNION',
  'UNION ALL',
  'BEGIN',
  'COMMIT',
  'ROLLBACK',
  'RETURNING',
];

export interface CompletionItem {
  label: string;
  type: 'keyword' | 'table' | 'column';
}

export interface SuggestionSource {
  tables: { name: string; columns: string[] }[];
}

export const wordAtCursor = (
  text: string,
  cursor: number
): { start: number; end: number; word: string } => {
  const re = /[A-Za-z0-9_$]+/g;
  let match: RegExpExecArray | null;
  let best: { start: number; end: number; word: string } | null = null;
  while ((match = re.exec(text)) !== null) {
    const start = match.index;
    const end = start + match[0].length;
    if (cursor >= start && cursor <= end) {
      best = { start, end, word: match[0] };
      break;
    }
  }
  return best ?? { start: cursor, end: cursor, word: '' };
};

export const buildSuggestions = (
  text: string,
  cursor: number,
  source: SuggestionSource
): CompletionItem[] => {
  const { word } = wordAtCursor(text, cursor);
  const before = text.slice(0, wordAtCursor(text, cursor).start).trimEnd();
  const inColumnContext = /\.$/.test(before) || /\bfrom\s+\w+$/i.test(before);

  const kw = SQL_KEYWORDS.filter((k) =>
    k.toLowerCase().startsWith(word.toLowerCase())
  ).map((k) => ({ label: k, type: 'keyword' as const }));

  const tables = source.tables
    .filter((t) => t.name.toLowerCase().startsWith(word.toLowerCase()))
    .map((t) => ({ label: t.name, type: 'table' as const }));

  const columns = inColumnContext
    ? source.tables.flatMap((t) =>
        t.columns
          .filter((c) => c.toLowerCase().startsWith(word.toLowerCase()))
          .map((c) => ({ label: c, type: 'column' as const }))
      )
    : [];

  const seen = new Set<string>();
  return [...tables, ...kw, ...columns].filter((item) => {
    if (seen.has(item.label)) return false;
    seen.add(item.label);
    return true;
  });
};

export const replaceWord = (
  text: string,
  start: number,
  end: number,
  replacement: string
): { text: string; cursor: number } => {
  const next = text.slice(0, start) + replacement + text.slice(end);
  return { text: next, cursor: start + replacement.length };
};
