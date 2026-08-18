export const formatRelativeTime = (timestamp: number): string => {
  const diff = Date.now() - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (seconds < 60) return 'just now';
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return new Date(timestamp).toLocaleDateString();
};

export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

const CLAUSE_KEYWORDS: string[] = [
  'SELECT',
  'FROM',
  'WHERE',
  'GROUP BY',
  'ORDER BY',
  'HAVING',
  'LIMIT',
  'OFFSET',
  'INNER JOIN',
  'LEFT JOIN',
  'RIGHT JOIN',
  'FULL JOIN',
  'CROSS JOIN',
  'JOIN',
  'ON',
  'AND',
  'OR',
  'UNION ALL',
  'UNION',
  'VALUES',
  'SET',
  'INSERT INTO',
  'UPDATE',
  'DELETE FROM',
  'CREATE TABLE',
  'ALTER TABLE',
  'DROP TABLE',
  'BEGIN',
  'COMMIT',
  'ROLLBACK',
  'RETURNING',
];

const stringPattern = /(['"`])(?:\\.|(?!\1)[^\\\n])*\1/g;

export const maskStringLiterals = (sql: string): string[] => {
  const strings: string[] = [];
  sql.replace(stringPattern, (m) => {
    strings.push(m);
    return m;
  });
  return strings;
};

const unmask = (code: string, strings: string[]): string =>
  code.replace(/§(\d+)§/g, (_, d) => strings[Number(d)]);

export const formatSQL = (sql: string): string => {
  if (!sql.trim()) return '';
  const strings = maskStringLiterals(sql);
  const masked = sql.replace(stringPattern, (m) => `§${strings.indexOf(m)}§`);
  const compact = masked.replace(/\s+/g, ' ').trim();
  if (!compact) return '';

  const lines: string[] = [];
  let depth = 0;
  let buffer = '';
  let i = 0;

  const flush = () => {
    const line = buffer.replace(/\s+/g, ' ').trim();
    if (line) lines.push('  '.repeat(depth) + line);
    buffer = '';
  };

  while (i < compact.length) {
    const ch = compact[i];
    if (ch === '(') {
      depth += 1;
      buffer += ch;
      i += 1;
      continue;
    }
    if (ch === ')') {
      depth = Math.max(0, depth - 1);
      buffer += ch;
      i += 1;
      continue;
    }
    const rest = compact.slice(i);
    const keyword = CLAUSE_KEYWORDS.find(
      (kw) =>
        rest.slice(0, kw.length).toUpperCase() === kw &&
        (!rest[kw.length] || /\s|\(|\)|,|;/.test(rest[kw.length])) &&
        (!i || /\s|\(|\)|,|;/.test(compact[i - 1]))
    );
    if (keyword) {
      flush();
      buffer = keyword + ' ';
      i += keyword.length;
      continue;
    }
    buffer += ch;
    i += 1;
  }
  flush();

  return unmask(lines.join('\n'), strings);
};
