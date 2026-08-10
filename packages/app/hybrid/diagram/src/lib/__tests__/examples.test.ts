import { EXAMPLES, findExample } from '@/lib/examples';
import { parseDiagram } from '@/lib/parser';

describe('EXAMPLES', () => {
  it('has unique ids and meaningful names', () => {
    const ids = EXAMPLES.map((example) => example.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const example of EXAMPLES) {
      expect(example.name.length).toBeGreaterThan(0);
      expect(example.description.length).toBeGreaterThan(0);
    }
  });

  it('parses every example cleanly', () => {
    for (const example of EXAMPLES) {
      const result = parseDiagram(example.text);
      expect(result.errors).toEqual([]);
      expect(result.diagram.nodes.length).toBeGreaterThan(3);
    }
  });

  it('uses at least one icon in every example', () => {
    for (const example of EXAMPLES) {
      const diagram = parseDiagram(example.text).diagram;
      expect(diagram.nodes.some((node) => node.icon !== undefined)).toBe(true);
    }
  });

  it('finds an example by id', () => {
    expect(findExample('uber')?.name).toBe('Uber — Ride Hailing');
    expect(findExample('nope')).toBeUndefined();
  });
});
