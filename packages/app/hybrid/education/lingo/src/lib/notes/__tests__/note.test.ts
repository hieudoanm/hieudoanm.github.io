import { hasEmbed, splitSegments } from '../markdown-segments';
import { parseNote } from '../note';
import { parseSections } from '../sections';
import { renderMarkdown } from '../markdown';

const frontmatter = (fields: Record<string, unknown>): string =>
  `---\n${JSON.stringify(fields, null, 2)}\n---\n\n## Only\n\nBody text.\n`;

const minimal = { title: 'T', subtitle: 'S' };

describe('parseNote frontmatter', () => {
  it('reads title, subtitle and sections from a note', () => {
    const note = parseNote(frontmatter(minimal));

    expect(note.title).toBe('T');
    expect(note.subtitle).toBe('S');
    expect(note.sections).toEqual([{ title: 'Only', body: 'Body text.' }]);
  });

  it('keeps parentLink, links and references when present', () => {
    const note = parseNote(
      frontmatter({
        ...minimal,
        parentLink: { href: '/engineering', label: 'Engineering' },
        links: [
          { href: '/a', label: 'A', description: 'first' },
          { href: '/b', label: 'B', description: 'second' },
        ],
        references: [{ href: 'https://x', label: 'X', description: 'ref' }],
      })
    );

    expect(note.parentLink).toEqual({
      href: '/engineering',
      label: 'Engineering',
    });
    expect(note.links).toHaveLength(2);
    expect(note.references).toHaveLength(1);
  });

  it('throws when the frontmatter block is missing', () => {
    expect(() => parseNote('## Only\n\nBody.\n')).toThrow(
      'note: missing "---" frontmatter block'
    );
  });

  it('throws when frontmatter is not valid JSON', () => {
    expect(() => parseNote('---\nnot json\n---\n\n## A\n\nB\n')).toThrow(
      'note: frontmatter is not valid JSON'
    );
  });

  it('throws when frontmatter is not an object', () => {
    expect(() => parseNote('---\n[1,2]\n---\n\n## A\n\nB\n')).toThrow(
      'note: frontmatter must be a JSON object'
    );
  });

  it('throws on an unknown frontmatter key', () => {
    expect(() => parseNote(frontmatter({ ...minimal, titel: 'typo' }))).toThrow(
      'unknown frontmatter key(s): titel'
    );
  });

  it.each([
    ['title', { subtitle: 'S' }, 'expected non-empty string at "title"'],
    [
      'title blank',
      { title: '   ', subtitle: 'S' },
      'expected non-empty string at "title"',
    ],
  ])('throws when %s is missing or blank', (_name, fields, message) => {
    expect(() => parseNote(frontmatter(fields))).toThrow(message);
  });

  it('treats a missing or blank subtitle as empty, as the pages do', () => {
    expect(parseNote(frontmatter({ title: 'T' })).subtitle).toBe('');
    expect(
      parseNote(frontmatter({ title: 'T', subtitle: '  ' })).subtitle
    ).toBe('  ');
  });

  it.each([
    ['links', 'note: expected array at "links"'],
    ['references', 'note: expected array at "references"'],
  ])('throws when %s is not an array', (key, message) => {
    expect(() => parseNote(frontmatter({ ...minimal, [key]: {} }))).toThrow(
      message
    );
  });

  it('names the offending index when a link entry is malformed', () => {
    expect(() =>
      parseNote(
        frontmatter({
          ...minimal,
          links: [
            { href: '/a', label: 'A', description: 'ok' },
            { href: '/b', label: 'B' },
          ],
        })
      )
    ).toThrow('note: expected non-empty string at "links[1].description"');
  });

  it('throws when parentLink is not an object', () => {
    expect(() =>
      parseNote(frontmatter({ ...minimal, parentLink: 'nope' }))
    ).toThrow('note: expected object at "parentLink"');
  });
});

describe('parseSections', () => {
  it('splits the body on level-two headings', () => {
    const sections = parseSections('## A\n\nfirst\n\n## B\n\nsecond\n');

    expect(sections).toEqual([
      { title: 'A', body: 'first' },
      { title: 'B', body: 'second' },
    ]);
  });

  it('throws when a section has no body', () => {
    expect(() => parseSections('## A\n\n## B\n\ntext\n')).toThrow(
      'note: section "A" has no body'
    );
  });

  it('throws when the body has no sections', () => {
    expect(() => parseSections('just prose\n')).toThrow(
      'note: expected at least one "## " section'
    );
  });

  it('ignores prose that precedes the first section heading', () => {
    const sections = parseSections('stray\n\n## A\n\ntext\n');

    expect(sections).toEqual([{ title: 'A', body: 'text' }]);
  });
});

describe('splitSegments', () => {
  it('returns a single markdown segment when no embed is present', () => {
    expect(splitSegments('plain text')).toEqual([
      { kind: 'markdown', value: 'plain text' },
    ]);
  });

  it('keeps markdown on both sides of an embed', () => {
    expect(splitSegments('before\n\n{{embed:PayoffMatrix}}\n\nafter')).toEqual([
      { kind: 'markdown', value: 'before' },
      { kind: 'embed', name: 'PayoffMatrix' },
      { kind: 'markdown', value: 'after' },
    ]);
  });

  it('drops whitespace-only fragments around the embed', () => {
    expect(splitSegments('{{embed:PayoffMatrix}}')).toEqual([
      { kind: 'embed', name: 'PayoffMatrix' },
    ]);
  });

  it('splits several embeds in one body', () => {
    const segments = splitSegments('a {{embed:One}} b {{embed:Two}} c');

    expect(segments.filter((s) => s.kind === 'embed')).toHaveLength(2);
  });

  it('leaves a malformed embed marker as markdown', () => {
    expect(splitSegments('{{embed:}}')).toEqual([
      { kind: 'markdown', value: '{{embed:}}' },
    ]);
  });

  it('is not affected by prior calls, unlike a shared global regex', () => {
    expect(hasEmbed('{{embed:One}}')).toBe(true);
    expect(hasEmbed('{{embed:One}}')).toBe(true);
    expect(hasEmbed('no embed')).toBe(false);
  });
});

describe('renderMarkdown', () => {
  it('renders emphasis, lists and inline code', () => {
    const html = renderMarkdown('a **b** and `c`\n\n- one\n- two\n');

    expect(html).toContain('<strong>b</strong>');
    expect(html).toContain('<code>c</code>');
    expect(html).toContain('<li>one</li>');
  });

  it('renders a markdown link to an anchor', () => {
    expect(renderMarkdown('[text](https://example.com)')).toContain(
      '<a href="https://example.com">text</a>'
    );
  });
});
