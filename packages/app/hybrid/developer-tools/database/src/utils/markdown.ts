export type MdBlockType =
  'heading' | 'paragraph' | 'blockquote' | 'code' | 'table' | 'list';

export interface MdBlock {
  type: MdBlockType;
  level?: number;
  text?: string;
  lang?: string;
  rows?: string[][];
  items?: string[];
  lines?: string[];
}

export interface InlineToken {
  type: 'text' | 'code' | 'bold';
  content: string;
}

export const tokenizeInline = (text: string): InlineToken[] => {
  const tokens: InlineToken[] = [];
  let buffer = '';
  let i = 0;
  const flush = (): void => {
    if (buffer) {
      tokens.push({ type: 'text', content: buffer });
      buffer = '';
    }
  };
  while (i < text.length) {
    if (text[i] === '`') {
      const end = text.indexOf('`', i + 1);
      if (end === -1) {
        buffer += text.slice(i);
        break;
      }
      flush();
      tokens.push({ type: 'code', content: text.slice(i + 1, end) });
      i = end + 1;
      continue;
    }
    if (text.startsWith('**', i)) {
      const end = text.indexOf('**', i + 2);
      if (end === -1) {
        buffer += '**';
        i += 2;
        continue;
      }
      flush();
      tokens.push({ type: 'bold', content: text.slice(i + 2, end) });
      i = end + 2;
      continue;
    }
    buffer += text[i];
    i += 1;
  }
  flush();
  return tokens;
};

export const splitTableRow = (line: string): string[] => {
  const trimmed = line.trim();
  const body = trimmed.startsWith('|')
    ? trimmed.slice(1)
    : trimmed.endsWith('|')
      ? trimmed.slice(0, -1)
      : trimmed;
  return body
    .split('|')
    .map((c) => c.trim())
    .filter(
      (c, idx, arr) =>
        !(idx === 0 && c === '') && !(idx === arr.length - 1 && c === '')
    );
};

export const isTableSep = (line: string): boolean => {
  const cells = line
    .split('|')
    .map((c) => c.trim())
    .filter(Boolean);
  return cells.length > 0 && cells.every((c) => /^:?-{2,}:?$/.test(c));
};

export const parseMarkdown = (source: string): MdBlock[] => {
  const blocks: MdBlock[] = [];
  const lines = source.split(/\r?\n/);
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed) {
      i += 1;
      continue;
    }
    const heading = /^(#{1,6})\s+(.*)$/.exec(line);
    if (heading) {
      blocks.push({
        type: 'heading',
        level: heading[1].length,
        text: heading[2],
      });
      i += 1;
      continue;
    }
    if (trimmed.startsWith('>')) {
      const quote: string[] = [];
      while (i < lines.length && lines[i].trimStart().startsWith('>')) {
        quote.push(lines[i].trim().replace(/^>\s?/, ''));
        i += 1;
      }
      blocks.push({ type: 'blockquote', text: quote.join('\n') });
      continue;
    }
    if (trimmed.startsWith('```')) {
      const lang = trimmed.slice(3).trim();
      const code: string[] = [];
      i += 1;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        code.push(lines[i]);
        i += 1;
      }
      i += 1;
      blocks.push({ type: 'code', lang, text: code.join('\n') });
      continue;
    }
    if (
      trimmed.includes('|') &&
      i + 1 < lines.length &&
      isTableSep(lines[i + 1].trim())
    ) {
      const rows: string[][] = [splitTableRow(line)];
      i += 2;
      while (i < lines.length && lines[i].includes('|')) {
        rows.push(splitTableRow(lines[i]));
        i += 1;
      }
      blocks.push({ type: 'table', rows });
      continue;
    }
    if (/^\s*[-*] /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*] /.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, ''));
        i += 1;
      }
      blocks.push({ type: 'list', items });
      continue;
    }
    const para: string[] = [];
    while (i < lines.length) {
      const t = lines[i].trim();
      if (!t) break;
      if (/^(#{1,6})\s/.test(lines[i])) break;
      if (t.startsWith('>')) break;
      if (t.startsWith('```')) break;
      if (/^\s*[-*] /.test(lines[i])) break;
      para.push(t);
      i += 1;
    }
    blocks.push({ type: 'paragraph', text: para.join(' '), lines: para });
  }
  return blocks;
};
