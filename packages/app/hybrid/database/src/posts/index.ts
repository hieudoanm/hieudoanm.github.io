import { rawContent } from './content';

export interface Post {
  slug: string;
  title: string;
  description: string;
  source: string;
}

export const parsePostMeta = (
  source: string
): { title: string; description: string } => {
  let title = '';
  const description: string[] = [];
  let inQuote = false;
  for (const line of source.split(/\r?\n/)) {
    if (!title && line.startsWith('# ')) {
      title = line.slice(2).trim();
      continue;
    }
    const trimmed = line.trim();
    if (trimmed.startsWith('>')) {
      inQuote = true;
      description.push(trimmed.replace(/^>\s?/, ''));
      continue;
    }
    if (inQuote) break;
  }
  return { title, description: description.join(' ').trim() };
};

export const posts: Post[] = Object.entries(rawContent).map(
  ([slug, source]) => ({
    slug,
    source,
    ...parsePostMeta(source),
  })
);

export const getPostBySlug = (slug: string): Post | undefined =>
  posts.find((p) => p.slug === slug);
