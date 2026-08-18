import { SQL_KEYWORDS } from '@/utils/autocomplete';

const KEYWORDS = Array.from(
  new Set(SQL_KEYWORDS.flatMap((k) => k.split(/\s+/)))
).sort((a, b) => b.length - a.length);

const TOKEN_SOURCE = [
  /--[^\n]*/.source,
  /\/\*[\s\S]*?\*\//.source,
  /'(?:[^']|'')*'/.source,
  /\b\d+(?:\.\d+)?\b/.source,
  `\\b(?:${KEYWORDS.join('|')})\\b`,
].join('|');

const TOKEN_RE = new RegExp(TOKEN_SOURCE, 'gi');

const escapeHtml = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const tokenClass = (token: string): string => {
  if (token.startsWith('--') || token.startsWith('/*'))
    return 'text-base-content/40 italic';
  if (token.startsWith("'")) return 'text-success';
  if (/\d/.test(token[0])) return 'text-warning';
  return 'text-info';
};

export const highlightSql = (sql: string): string => {
  if (!sql) return '';
  let html = '';
  let lastIndex = 0;
  TOKEN_RE.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = TOKEN_RE.exec(sql)) !== null) {
    const token = match[0];
    if (token.length === 0) {
      TOKEN_RE.lastIndex += 1;
      continue;
    }
    html += escapeHtml(sql.slice(lastIndex, match.index));
    html += `<span class="${tokenClass(token)}">${escapeHtml(token)}</span>`;
    lastIndex = match.index + token.length;
  }
  html += escapeHtml(sql.slice(lastIndex));
  return html;
};
