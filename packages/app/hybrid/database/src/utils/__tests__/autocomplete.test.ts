import {
  SQL_KEYWORDS,
  wordAtCursor,
  buildSuggestions,
  replaceWord,
} from '@/utils/autocomplete';

const source = {
  tables: [
    { name: 'customers', columns: ['id', 'name', 'email'] },
    { name: 'orders', columns: ['order_id', 'customer_id'] },
  ],
};

describe('wordAtCursor', () => {
  it('finds the word under the cursor', () => {
    expect(wordAtCursor('SELECT * FROM cust', 16)).toEqual({
      start: 14,
      end: 18,
      word: 'cust',
    });
  });
  it('returns empty word when not on a word', () => {
    expect(wordAtCursor('SELECT * ', 7)).toEqual({
      start: 7,
      end: 7,
      word: '',
    });
  });
});

describe('buildSuggestions', () => {
  it('suggests tables and keywords from prefix', () => {
    const items = buildSuggestions('FROM cus', 7, source);
    expect(items.some((i) => i.label === 'customers')).toBe(true);
    expect(items.some((i) => i.type === 'table')).toBe(true);
  });

  it('suggests keywords matching prefix', () => {
    const items = buildSuggestions('WH', 2, source);
    expect(items.some((i) => i.label === 'WHERE' && i.type === 'keyword')).toBe(
      true
    );
  });

  it('suggests columns after a dot', () => {
    const items = buildSuggestions('o.cus', 5, source);
    expect(items.some((i) => i.label === 'customer_id')).toBe(true);
  });

  it('returns no suggestions for unknown prefix', () => {
    expect(buildSuggestions('xyzzy', 5, source)).toEqual([]);
  });

  it('returns empty for empty source and unmatched prefix', () => {
    expect(buildSuggestions('xyz', 3, { tables: [] })).toEqual([]);
  });
});

describe('replaceWord', () => {
  it('replaces word at cursor and returns new cursor', () => {
    const { text, cursor } = replaceWord('SELECT cus', 7, 10, 'customers');
    expect(text).toBe('SELECT customers');
    expect(cursor).toBe(16);
  });
});

describe('SQL_KEYWORDS', () => {
  it('contains core keywords', () => {
    expect(SQL_KEYWORDS).toContain('SELECT');
    expect(SQL_KEYWORDS).toContain('CREATE TABLE');
  });
});
