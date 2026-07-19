import type { NoteSection } from './types';

const HEADING_PATTERN = /^## (.+)$/;

export const parseSections = (body: string): NoteSection[] => {
  const sections: NoteSection[] = [];
  let title: string | null = null;
  let lines: string[] = [];

  const flush = (): void => {
    if (title === null) {
      return;
    }

    const content = lines.join('\n').trim();

    if (content === '') {
      throw new TypeError(`note: section "${title}" has no body`);
    }

    sections.push({ title, body: content });
  };

  for (const line of body.split('\n')) {
    const heading = HEADING_PATTERN.exec(line);

    if (heading) {
      flush();
      title = heading[1].trim();
      lines = [];
      continue;
    }

    lines.push(line);
  }

  flush();

  if (sections.length === 0) {
    throw new TypeError('note: expected at least one "## " section');
  }

  return sections;
};
