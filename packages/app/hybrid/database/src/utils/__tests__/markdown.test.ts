import {
  isTableSep,
  parseMarkdown,
  splitTableRow,
  tokenizeInline,
} from '@/utils/markdown';

describe('tokenizeInline', () => {
  it('returns a single text token for plain text', () => {
    expect(tokenizeInline('hello world')).toEqual([
      { type: 'text', content: 'hello world' },
    ]);
  });

  it('splits inline code spans', () => {
    expect(tokenizeInline('use `UserID` here')).toEqual([
      { type: 'text', content: 'use ' },
      { type: 'code', content: 'UserID' },
      { type: 'text', content: ' here' },
    ]);
  });

  it('splits bold segments', () => {
    expect(tokenizeInline('a **bold** bit')).toEqual([
      { type: 'text', content: 'a ' },
      { type: 'bold', content: 'bold' },
      { type: 'text', content: ' bit' },
    ]);
  });

  it('handles unclosed code backtick as text', () => {
    expect(tokenizeInline('oops `dangling')).toEqual([
      { type: 'text', content: 'oops `dangling' },
    ]);
  });

  it('combines code and bold', () => {
    expect(tokenizeInline('**`id`** key')).toEqual([
      { type: 'bold', content: '`id`' },
      { type: 'text', content: ' key' },
    ]);
  });

  it('keeps unclosed bold markers as text', () => {
    expect(tokenizeInline('still **open')).toEqual([
      { type: 'text', content: 'still **open' },
    ]);
  });

  it('handles a lone backtick at the end', () => {
    expect(tokenizeInline('tail `')).toEqual([
      { type: 'text', content: 'tail `' },
    ]);
  });
});

describe('splitTableRow', () => {
  it('splits a pipe row and trims cells', () => {
    expect(splitTableRow('| a | b |')).toEqual(['a', 'b']);
  });

  it('handles rows without outer pipes', () => {
    expect(splitTableRow('a | b')).toEqual(['a', 'b']);
  });

  it('handles a single leading pipe', () => {
    expect(splitTableRow('| a | b')).toEqual(['a', 'b']);
  });

  it('handles a single trailing pipe', () => {
    expect(splitTableRow('a | b |')).toEqual(['a', 'b']);
  });

  it('preserves empty inner cells', () => {
    expect(splitTableRow('| a |  | c |')).toEqual(['a', '', 'c']);
  });

  it('keeps escaped inline markup intact', () => {
    expect(splitTableRow('| `id` | — |')).toEqual(['`id`', '—']);
  });
});

describe('isTableSep', () => {
  it('matches dashes and aligned variants', () => {
    expect(isTableSep('| --- | :--: | ---: |')).toBe(true);
  });

  it('rejects data rows', () => {
    expect(isTableSep('| a | b |')).toBe(false);
  });

  it('rejects a separator with an empty cell list', () => {
    expect(isTableSep('   ')).toBe(false);
  });

  it('accepts a single-cell separator row', () => {
    expect(isTableSep('---')).toBe(true);
  });
});

describe('parseMarkdown', () => {
  it('parses headings of each level', () => {
    const blocks = parseMarkdown('# One\n## Two\n### Three');
    expect(blocks).toEqual([
      { type: 'heading', level: 1, text: 'One' },
      { type: 'heading', level: 2, text: 'Two' },
      { type: 'heading', level: 3, text: 'Three' },
    ]);
  });

  it('joins consecutive blockquote lines', () => {
    const blocks = parseMarkdown('> line one\n> line two');
    expect(blocks[0]).toEqual({
      type: 'blockquote',
      text: 'line one\nline two',
    });
  });

  it('collects fenced code blocks with language', () => {
    const blocks = parseMarkdown('```sql\nSELECT 1;\n```');
    expect(blocks[0]).toEqual({ type: 'code', lang: 'sql', text: 'SELECT 1;' });
  });

  it('preserves indentation inside fenced code', () => {
    const blocks = parseMarkdown('```\n    indented\n```');
    expect(blocks[0].text).toBe('    indented');
  });

  it('parses pipe tables including header separator', () => {
    const source = '| a | b |\n| --- | --- |\n| 1 | 2 |\n| 3 | 4 |';
    const blocks = parseMarkdown(source);
    expect(blocks).toEqual([
      {
        type: 'table',
        rows: [
          ['a', 'b'],
          ['1', '2'],
          ['3', '4'],
        ],
      },
    ]);
  });

  it('parses bullet lists', () => {
    const blocks = parseMarkdown('- one\n- **two**');
    expect(blocks[0]).toEqual({ type: 'list', items: ['one', '**two**'] });
  });

  it('parses star bullet lists', () => {
    const blocks = parseMarkdown('* alpha\n* beta');
    expect(blocks[0]).toEqual({ type: 'list', items: ['alpha', 'beta'] });
  });

  it('skips blank lines and stops paragraphs at block breaks', () => {
    const blocks = parseMarkdown('text\n\n> quote\n- item');
    expect(blocks.map((b) => b.type)).toEqual([
      'paragraph',
      'blockquote',
      'list',
    ]);
  });

  it('joins wrapped paragraph lines with a space', () => {
    const blocks = parseMarkdown('first part\nsecond part\n\nnext para');
    expect(blocks[0]).toEqual({
      type: 'paragraph',
      text: 'first part second part',
      lines: ['first part', 'second part'],
    });
    expect(blocks[1].type).toBe('paragraph');
    expect(blocks[1].text).toBe('next para');
  });

  it('ends a paragraph at a following heading', () => {
    const blocks = parseMarkdown('text one\ntext two\n# Heading');
    expect(blocks[0]).toEqual({
      type: 'paragraph',
      text: 'text one text two',
      lines: ['text one', 'text two'],
    });
    expect(blocks[1]).toEqual({ type: 'heading', level: 1, text: 'Heading' });
  });

  it('ends a paragraph at a following blockquote', () => {
    const blocks = parseMarkdown('text one\ntext two\n> quoted');
    expect(blocks[0].type).toBe('paragraph');
    expect(blocks[0].text).toBe('text one text two');
    expect(blocks[1].type).toBe('blockquote');
    expect(blocks[1].text).toBe('quoted');
  });

  it('ends a paragraph at a following code fence', () => {
    const blocks = parseMarkdown('text one\ntext two\n```sql\nSELECT 1\n```');
    expect(blocks[0].type).toBe('paragraph');
    expect(blocks[0].text).toBe('text one text two');
    expect(blocks[1]).toEqual({ type: 'code', lang: 'sql', text: 'SELECT 1' });
  });

  it('parses a full post-like document', () => {
    const source = [
      '# Title',
      '',
      '> description here',
      '',
      '## ER Diagram (Mermaid)',
      '',
      '```mermaid',
      'A ||--o{ B : has',
      'A {',
      '  int id PK',
      '  string name',
      '}',
      '```',
      '',
      '## Tables',
      '',
      '| T | PK |',
      '| --- | --- |',
      '| `A` | `id` |',
    ].join('\n');
    const blocks = parseMarkdown(source);
    expect(blocks.map((b) => b.type)).toEqual([
      'heading',
      'blockquote',
      'heading',
      'code',
      'heading',
      'table',
    ]);
    const code = blocks[3];
    expect(code).toMatchObject({ type: 'code', lang: 'mermaid' });
    expect((code.text ?? '').includes('erDiagram')).toBe(false);
    expect((code.text ?? '').includes('A ||--o{ B : has')).toBe(true);
  });
});
