export interface MarkdownSegment {
  kind: 'markdown';
  value: string;
}

export interface EmbedSegment {
  kind: 'embed';
  name: string;
}

export type NoteSegment = MarkdownSegment | EmbedSegment;

const EMBED_SOURCE = String.raw`\{\{embed:([A-Za-z][A-Za-z0-9]*)\}\}`;

const createEmbedPattern = (): RegExp => new RegExp(EMBED_SOURCE, 'g');

export const hasEmbed = (markdown: string): boolean =>
  createEmbedPattern().test(markdown);

export const splitSegments = (markdown: string): NoteSegment[] => {
  const segments: NoteSegment[] = [];
  let cursor = 0;

  for (const match of markdown.matchAll(createEmbedPattern())) {
    const start = match.index ?? 0;
    const before = markdown.slice(cursor, start).trim();

    if (before !== '') {
      segments.push({ kind: 'markdown', value: before });
    }

    segments.push({ kind: 'embed', name: match[1] });
    cursor = start + match[0].length;
  }

  const rest = markdown.slice(cursor).trim();

  if (rest !== '') {
    segments.push({ kind: 'markdown', value: rest });
  }

  return segments;
};
