import { highlightSql } from '@/utils/sqlHighlight';

describe('highlightSql', () => {
  it('returns an empty string for empty input', () => {
    expect(highlightSql('')).toBe('');
  });

  it('highlights keywords', () => {
    expect(highlightSql('SELECT')).toContain(
      '<span class="text-info">SELECT</span>'
    );
  });

  it('highlights keywords case-insensitively', () => {
    expect(highlightSql('select')).toContain(
      '<span class="text-info">select</span>'
    );
  });

  it('highlights strings', () => {
    const html = highlightSql("WHERE name = 'Alice'");
    expect(html).toContain('<span class="text-success">\'Alice\'</span>');
  });

  it('highlights escaped quotes inside strings', () => {
    const html = highlightSql("'it''s'");
    expect(html).toContain("<span class=\"text-success\">'it''s'</span>");
  });

  it('highlights numbers', () => {
    expect(highlightSql('LIMIT 42')).toContain(
      '<span class="text-warning">42</span>'
    );
    expect(highlightSql('1.5')).toContain(
      '<span class="text-warning">1.5</span>'
    );
  });

  it('highlights line comments', () => {
    const html = highlightSql('SELECT 1 -- note');
    expect(html).toContain(
      '<span class="text-base-content/40 italic">-- note</span>'
    );
  });

  it('highlights block comments', () => {
    const html = highlightSql('/* multi\nline */ SELECT');
    expect(html).toContain(
      '<span class="text-base-content/40 italic">/* multi\nline */</span>'
    );
  });

  it('does not highlight keywords inside strings or comments', () => {
    const html = highlightSql("'SELECT' -- WHERE\nFROM");
    expect(html).toContain('<span class="text-success">\'SELECT\'</span>');
    expect(html).toContain(
      '<span class="text-base-content/40 italic">-- WHERE</span>'
    );
    expect(html).toContain('<span class="text-info">FROM</span>');
  });

  it('escapes HTML entities', () => {
    const html = highlightSql("x < 5 & 'y'");
    expect(html).toContain('x &lt; ');
    expect(html).toContain('&amp;');
    expect(html).not.toContain('< 5');
  });

  it('keeps plain text unchanged', () => {
    const html = highlightSql('SELECT * FROM customers');
    expect(html).toContain('* ');
    expect(html).toContain('customers');
  });
});
