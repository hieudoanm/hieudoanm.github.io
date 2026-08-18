import {
  autoMatchColumns,
  buildImportRows,
  parseDelimitedSource,
  parseJsonSource,
  validateImport,
} from '@/utils/import';

describe('parseDelimitedSource', () => {
  it('parses header + data rows', () => {
    const src = parseDelimitedSource('id,name\n1,Alice\n2,Bob', ',', true);
    expect(src.columns).toEqual(['id', 'name']);
    expect(src.rows).toEqual([
      ['1', 'Alice'],
      ['2', 'Bob'],
    ]);
  });

  it('handles quoted fields containing the delimiter', () => {
    const src = parseDelimitedSource(
      'name,note\n"Smith, John","said ""hi"""',
      ',',
      true
    );
    expect(src.rows).toEqual([['Smith, John', 'said "hi"']]);
  });

  it('generates columnN names when there is no header', () => {
    const src = parseDelimitedSource('1,Alice\n2,Bob', ',', false);
    expect(src.columns).toEqual(['column1', 'column2']);
    expect(src.rows).toHaveLength(2);
  });

  it('filters out blank lines and blank columns get fallback names', () => {
    const src = parseDelimitedSource('id,\n\n1,Alice', ',', true);
    expect(src.columns).toEqual(['id', 'column2']);
    expect(src.rows).toEqual([['1', 'Alice']]);
  });

  it('returns empty source for blank text', () => {
    const src = parseDelimitedSource('  ', ',', true);
    expect(src.columns).toEqual([]);
    expect(src.rows).toEqual([]);
  });
});

describe('parseJsonSource', () => {
  it('parses an array of objects into columns and rows', () => {
    const src = parseJsonSource(
      '[{"id": 1, "name": "Alice"}, {"id": 2, "name": "Bob"}]'
    );
    expect(src.columns).toEqual(['id', 'name']);
    expect(src.rows).toEqual([
      ['1', 'Alice'],
      ['2', 'Bob'],
    ]);
  });

  it('collects a union of keys across objects', () => {
    const src = parseJsonSource('[{"a": 1}, {"a": 2, "b": "x"}]');
    expect(src.columns).toEqual(['a', 'b']);
    expect(src.rows[1]).toEqual(['2', 'x']);
  });

  it('supports { columns, rows } shape', () => {
    const src = parseJsonSource(
      '{"columns": ["id", "name"], "rows": [[1, "Alice"]]}'
    );
    expect(src.columns).toEqual(['id', 'name']);
    expect(src.rows).toEqual([['1', 'Alice']]);
  });

  it('supports an array of arrays', () => {
    const src = parseJsonSource('[[1, "Alice"], [2, "Bob"]]');
    expect(src.columns).toEqual(['column1', 'column2']);
    expect(src.rows).toHaveLength(2);
  });

  it('converts null and nested objects to strings', () => {
    const src = parseJsonSource('[{"a": null, "b": {"x": 1}}]');
    expect(src.rows).toEqual([['', '{"x":1}']]);
  });

  it('throws on invalid JSON', () => {
    expect(() => parseJsonSource('{nope')).toThrow();
  });

  it('throws on non-array JSON', () => {
    expect(() => parseJsonSource('"hello"')).toThrow(/array of objects/);
  });
});

describe('autoMatchColumns', () => {
  it('matches columns case-insensitively by name', () => {
    const idx = autoMatchColumns(['ID', 'name'], ['name', 'id', 'other']);
    expect(idx).toEqual([1, 0, -1]);
  });

  it('returns -1 when no match exists', () => {
    expect(autoMatchColumns(['a', 'b'], ['c', 'd'])).toEqual([-1, -1]);
  });
});

describe('buildImportRows', () => {
  const source = {
    columns: ['id', 'name', 'note'],
    rows: [
      ['1', 'Alice', ''],
      ['2', 'Bob', 'skip me'],
    ],
  };

  it('orders cells by the mapping and skips unmapped columns', () => {
    const rows = buildImportRows(source, [
      { targetColumn: 'name', sourceIndex: 1 },
      { targetColumn: 'id', sourceIndex: 0 },
      { targetColumn: 'extra', sourceIndex: -1 },
    ]);
    expect(rows).toEqual([
      ['Alice', '1', null],
      ['Bob', '2', null],
    ]);
  });

  it('drops empty source rows and turns blank cells into null', () => {
    const src = {
      columns: ['a', 'b'],
      rows: [
        ['', ''],
        ['x', 'y'],
      ],
    };
    const rows = buildImportRows(src, [
      { targetColumn: 'a', sourceIndex: 0 },
      { targetColumn: 'b', sourceIndex: 1 },
    ]);
    expect(rows).toEqual([['x', 'y']]);
  });
});

describe('validateImport', () => {
  const source = { columns: ['id'], rows: [['1']] };

  it('reports no errors for a valid import', () => {
    expect(
      validateImport(source, [{ targetColumn: 'id', sourceIndex: 0 }], ['id'])
    ).toEqual([]);
  });

  it('rejects a missing source', () => {
    expect(validateImport(null, [], ['id'])).toContain(
      'Add CSV or JSON data first.'
    );
  });

  it('rejects an empty source', () => {
    expect(validateImport({ columns: [], rows: [] }, [], ['id'])).toContain(
      'The source contains no data rows.'
    );
  });

  it('rejects a table without columns', () => {
    expect(
      validateImport(source, [{ targetColumn: 'id', sourceIndex: 0 }], [])
    ).toContain('The target table has no columns.');
  });

  it('rejects when every column is skipped', () => {
    expect(
      validateImport(source, [{ targetColumn: 'id', sourceIndex: -1 }], ['id'])
    ).toContain('Select at least one column to import.');
  });
});
