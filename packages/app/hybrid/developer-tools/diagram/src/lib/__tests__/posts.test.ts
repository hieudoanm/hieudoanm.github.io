import { getPost, listPosts, listPostSummaries, parsePost } from '@/lib/posts';
import { existsSync, readdirSync, readFileSync } from 'node:fs';

jest.mock('node:fs');

const mockReaddirSync = readdirSync as jest.Mock;
const mockReadFileSync = readFileSync as jest.Mock;
const mockExistsSync = existsSync as jest.Mock;

const SOURCE = `---
title: Uber — Ride Hailing
difficulty: medium
category: travel
author: Hieu Doan
tags: delivery, payments
---

# Uber — Ride Hailing

Rider/driver apps, ride matching, dispatch, surge pricing, payments.

## Interview Questions

- Design Uber / Lyft ride matching and dispatch
- How do you run geospatial queries at scale?

## Answers

### Q1. Design Uber / Lyft ride matching and dispatch

Riders send requests through the API gateway; drivers report location
periodically to a geo-index. The matching service queries nearby candidates
and scores them by ETA.

The trip service owns state transitions (accepted, en route, completed).

### Q2. How do you run geospatial queries at scale?

Use geohash cells and query the cell plus neighbors, then filter by distance.
Keep driver locations in memory in a cache cluster sharded by region.

## Source

\`\`\`text
title: Uber Ride Hailing
node rider: Rider App [round, icon=browser]
node api: API Gateway [icon=server]

edge rider -> api: request ride
\`\`\`
`;

describe('parsePost', () => {
  it('parses metadata, description, questions, answers, and diagram source', () => {
    const post = parsePost(SOURCE, 'uber');

    expect(post.slug).toBe('uber');
    expect(post.title).toBe('Uber — Ride Hailing');
    expect(post.difficulty).toBe('medium');
    expect(post.category).toBe('travel');
    expect(post.author).toBe('Hieu Doan');
    expect(post.tags).toEqual(['delivery', 'payments']);
    expect(post.description).toBe(
      'Rider/driver apps, ride matching, dispatch, surge pricing, payments.'
    );
    expect(post.questions).toEqual([
      'Design Uber / Lyft ride matching and dispatch',
      'How do you run geospatial queries at scale?',
    ]);
    expect(post.answers).toHaveLength(2);
    expect(post.answers[0].question).toBe(
      'Design Uber / Lyft ride matching and dispatch'
    );
    expect(post.answers[0].blocks).toHaveLength(2);
    expect(post.answers[0].blocks[0]).toEqual({
      type: 'paragraph',
      text: expect.stringContaining('geo-index'),
    });
    expect(post.answers[1].blocks).toHaveLength(1);
    expect(post.diagramText).toContain('node rider: Rider App');
    expect(post.diagramText).not.toContain('```');
  });

  it('falls back to default title and metadata when they are absent', () => {
    const post = parsePost('## Answers\n\n### Q1. Any\n\nText.', 'x');
    expect(post.title).toBe('Untitled');
    expect(post.difficulty).toBe('medium');
    expect(post.category).toBe('system-design');
    expect(post.author).toBe('Hieu Doan');
  });

  it('groups bullet lines into a list block', () => {
    const post = parsePost(
      [
        '## Answers',
        '',
        '### Q1. Design a thing',
        '',
        'Lead-in sentence.',
        '',
        '- First point',
        '  continued on the next line',
        '- Second point',
        '',
        'Trailing paragraph.',
      ].join('\n'),
      'bullets'
    );
    expect(post.answers[0].blocks).toEqual([
      { type: 'paragraph', text: 'Lead-in sentence.' },
      {
        type: 'list',
        items: ['First point continued on the next line', 'Second point'],
      },
      { type: 'paragraph', text: 'Trailing paragraph.' },
    ]);
  });

  it('uses the heading as the title when frontmatter has none', () => {
    const post = parsePost('# Lone Post\n\nJust a description.', 'lone');
    expect(post.title).toBe('Lone Post');
    expect(post.description).toBe('Just a description.');
    expect(post.questions).toEqual([]);
    expect(post.answers).toEqual([]);
    expect(post.diagramText).toBe('');
  });

  it('prefers frontmatter metadata over the heading', () => {
    const post = parsePost(
      `---
tags: cache, cdn, analytics
title: CDN — Content Delivery
difficulty: hard
category: infrastructure
author: Jane Doe
---

# Content Delivery Network

Edge routing, caching, invalidation, purge, analytics.`,
      'cdn'
    );
    expect(post.title).toBe('CDN — Content Delivery');
    expect(post.difficulty).toBe('hard');
    expect(post.category).toBe('infrastructure');
    expect(post.author).toBe('Jane Doe');
    expect(post.tags).toEqual(['cache', 'cdn', 'analytics']);
    expect(post.description).toBe(
      'Edge routing, caching, invalidation, purge, analytics.'
    );
  });

  it('ignores an unknown difficulty value', () => {
    const post = parsePost(
      '---\ndifficulty: impossible\n---\n\n# Simple\n\nJust text.',
      'simple'
    );
    expect(post.difficulty).toBe('medium');
  });

  it('treats a file without frontmatter as tagless', () => {
    const post = parsePost('# Simple\n\nJust text.', 'simple');
    expect(post.tags).toEqual([]);
  });
});

describe('listPosts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockReaddirSync.mockReturnValue([
      'amazon.md',
      'uber.md',
      'notes.txt',
    ] as string[]);
    mockReadFileSync.mockReturnValue(SOURCE);
  });

  it('lists only markdown files sorted by name', () => {
    const posts = listPosts();
    expect(mockReaddirSync).toHaveBeenCalled();
    expect(posts.map((post) => post.slug)).toEqual(['amazon', 'uber']);
  });
});

describe('listPostSummaries', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockReaddirSync.mockReturnValue(['cdn.md', 'uber.md'] as string[]);
    mockReadFileSync.mockReturnValue(
      '---\ntags: cache\n---\n\n# Uber — Ride Hailing\n\nRide matching.\n'
    );
  });

  it('returns only the fields the index page needs', () => {
    const summaries = listPostSummaries();
    expect(summaries).toEqual([
      {
        slug: 'cdn',
        title: 'Uber — Ride Hailing',
        description: 'Ride matching.',
        difficulty: 'medium',
        category: 'system-design',
        tags: ['cache'],
      },
      {
        slug: 'uber',
        title: 'Uber — Ride Hailing',
        description: 'Ride matching.',
        difficulty: 'medium',
        category: 'system-design',
        tags: ['cache'],
      },
    ]);
  });
});

describe('getPost', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns the post for an existing slug', () => {
    mockExistsSync.mockReturnValue(true);
    mockReadFileSync.mockReturnValue(SOURCE);
    const post = getPost('uber');
    expect(post?.slug).toBe('uber');
  });

  it('returns undefined for a missing file', () => {
    mockExistsSync.mockReturnValue(false);
    expect(getPost('missing')).toBeUndefined();
  });

  it('returns undefined for an unsafe slug', () => {
    expect(getPost('../etc/passwd')).toBeUndefined();
    expect(mockExistsSync).not.toHaveBeenCalled();
  });
});
