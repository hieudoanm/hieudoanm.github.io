import { sanitizeAbstract } from '@/lib/abstract';

describe('sanitizeAbstract', () => {
  it('returns an empty string for empty input', () => {
    expect(sanitizeAbstract('')).toBe('');
    expect(sanitizeAbstract(null as unknown as string)).toBe('');
  });

  it('strips JATS block and inline tags', () => {
    const raw =
      '<jats:title>Abstract</jats:title><jats:p>Pain in <jats:italic toggle="yes">ICD-11</jats:italic>.</jats:p>';
    expect(sanitizeAbstract(raw)).toBe('Abstract Pain in ICD-11 .');
  });

  it('renders plain text unchanged', () => {
    expect(sanitizeAbstract('A simple abstract.')).toBe('A simple abstract.');
  });

  it('decodes common entities', () => {
    expect(
      sanitizeAbstract('A &amp; B &lt; C &gt; D &quot;E&quot; &#39;F&#39;')
    ).toBe('A & B < C > D "E" \'F\'');
    expect(sanitizeAbstract('x&nbsp;y')).toBe('x y');
  });

  it('collapses whitespace around stripped tags', () => {
    const raw =
      '  <jats:p>  Lead   text   </jats:p>\n\n  <jats:sec>Tail</jats:sec>  ';
    expect(sanitizeAbstract(raw)).toBe('Lead text Tail');
  });
});
