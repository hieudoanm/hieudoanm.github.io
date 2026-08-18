import { getPostBySlug, parsePostMeta, posts } from '@/posts';

describe('posts', () => {
  it('exposes the expected slugs', () => {
    expect(posts.map((p) => p.slug).sort()).toEqual([
      'blog-cms',
      'chinook',
      'classicmodels',
      'e-commerce',
      'hr',
      'music-streaming',
      'northwind',
      'project-management',
      'sakila',
      'social-media',
    ]);
  });

  it('parses title and description from the front matter', () => {
    const source = [
      '# Northwind Traders',
      '',
      '> The classic sample for order management',
      '> second line of description.',
      '',
      '## Body',
    ].join('\n');
    const meta = parsePostMeta(source);
    expect(meta).toEqual({
      title: 'Northwind Traders',
      description:
        'The classic sample for order management second line of description.',
    });
  });

  it('finds a post by slug with parsed front matter', () => {
    const post = getPostBySlug('northwind');
    expect(post).toBeDefined();
    expect(post?.title).toBe('Northwind Traders');
    expect(post?.description).toContain('Northwind');
    expect(post?.source).toContain('```mermaid');
  });

  it('returns undefined for unknown slug', () => {
    expect(getPostBySlug('missing')).toBeUndefined();
  });
});
