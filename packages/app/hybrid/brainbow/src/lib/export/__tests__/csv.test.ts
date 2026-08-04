import { toCsv } from '@/lib/export/csv';

describe('toCsv', () => {
  it('writes headers and rows', () => {
    const csv = toCsv([
      { cluster: 1, regions: 2 },
      { cluster: 2, regions: 5 },
    ]);
    expect(csv).toBe('cluster,regions\n1,2\n2,5');
  });

  it('escapes commas, quotes and newlines', () => {
    const csv = toCsv([{ name: 'a,"b"', note: 'line\nbreak' }]);
    expect(csv).toBe('name,note\n"a,""b""","line\nbreak"');
  });

  it('returns an empty string for no rows', () => {
    expect(toCsv([])).toBe('');
  });
});
