import { diffLines, diffStats } from '@/lib/diff';

describe('diffLines', () => {
  it('returns identical lines as unchanged', () => {
    const lines = diffLines('a\nb\nc', 'a\nb\nc');
    expect(lines).toEqual([
      { type: 'same', text: 'a' },
      { type: 'same', text: 'b' },
      { type: 'same', text: 'c' },
    ]);
  });

  it('marks added and removed lines', () => {
    const lines = diffLines('a\nb\nc', 'a\nx\nc');
    expect(lines.filter((line) => line.type === 'added')).toEqual([
      { type: 'added', text: 'x' },
    ]);
    expect(lines.filter((line) => line.type === 'removed')).toEqual([
      { type: 'removed', text: 'b' },
    ]);
  });

  it('handles empty before string', () => {
    const lines = diffLines('', 'hello\nworld');
    expect(lines).toEqual([
      { type: 'added', text: 'hello' },
      { type: 'added', text: 'world' },
    ]);
  });

  it('handles empty after string', () => {
    const lines = diffLines('hello\nworld', '');
    expect(lines).toEqual([
      { type: 'removed', text: 'hello' },
      { type: 'removed', text: 'world' },
    ]);
  });
});

describe('diffStats', () => {
  it('counts added and removed lines', () => {
    const stats = diffStats('a\nb\nc', 'a\nx\nc\nz');
    expect(stats).toEqual({ added: 2, removed: 1 });
  });

  it('reports no changes for identical input', () => {
    expect(diffStats('a', 'a')).toEqual({ added: 0, removed: 0 });
  });
});
