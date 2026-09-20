import { parseFrontmatter } from './frontmatter';
import { parseSections } from './sections';
import type { Note } from './types';

const FRONTMATTER_PATTERN =
  /^(?:<!-- prettier-ignore-start -->[ \t]*\r?\n)?---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/;

export const parseNote = (raw: string): Note => {
  const frontmatter = FRONTMATTER_PATTERN.exec(raw);

  if (!frontmatter) {
    throw new SyntaxError('note: missing "---" frontmatter block');
  }

  return {
    ...parseFrontmatter(frontmatter[1]),
    sections: parseSections(raw.slice(frontmatter[0].length)),
  };
};
