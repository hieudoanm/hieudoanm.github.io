import {
  BUILTIN_VAR_NAMES,
  expandDynamicVars,
  listDynamicVars,
} from '@/lib/dynamic-vars';

describe('expandDynamicVars', () => {
  it('returns input unchanged without placeholders', () => {
    expect(expandDynamicVars('https://a.com/x', () => undefined)).toBe(
      'https://a.com/x'
    );
  });

  it('resolves values from the resolver', () => {
    const resolve = (name: string): string | undefined =>
      name === 'id' ? '42' : undefined;
    expect(expandDynamicVars('https://a.com/${id}', resolve)).toBe(
      'https://a.com/42'
    );
  });

  it('falls back to builtins', () => {
    expect(expandDynamicVars('${currentYear}', () => undefined)).toBe(
      String(new Date().getFullYear())
    );
  });

  it('leaves unknown variables untouched', () => {
    expect(expandDynamicVars('${nope}', () => undefined)).toBe('${nope}');
  });

  it('replaces multiple occurrences', () => {
    const resolve = (name: string): string | undefined =>
      name === 'a' ? '1' : undefined;
    expect(expandDynamicVars('${a}-${a}', resolve)).toBe('1-1');
  });

  it('generates random ids and guids', () => {
    const resolve = (name: string): string | undefined =>
      name === 'r' ? 'static' : undefined;
    expect(expandDynamicVars('${randomId}', resolve)).not.toBe(
      expandDynamicVars('${randomId}', resolve)
    );
    const guid = expandDynamicVars('${randomGuid}', resolve);
    expect(guid).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
    );
  });

  it('exposes builtin names', () => {
    expect(BUILTIN_VAR_NAMES).toContain('currentYear');
    expect(BUILTIN_VAR_NAMES).toContain('randomId');
  });
});

describe('listDynamicVars', () => {
  it('returns empty array without placeholders', () => {
    expect(listDynamicVars('plain')).toEqual([]);
  });

  it('lists unique variable references', () => {
    expect(listDynamicVars('${a}/${a}/${b}')).toEqual([
      { name: 'a', ref: '${a}' },
      { name: 'b', ref: '${b}' },
    ]);
  });
});
