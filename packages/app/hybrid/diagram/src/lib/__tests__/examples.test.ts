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

  it('includes a sequence example that parses cleanly', () => {
    const example = findExample('login-flow');
    expect(example).toBeDefined();
    const result = parseDiagram(example!.text);
    expect(result.errors).toEqual([]);
    expect(result.diagram.kind).toBe('sequence');
    expect(result.diagram.nodes.length).toBeGreaterThan(3);
  });

  it('includes a state machine example with round/ellipse states', () => {
    const example = findExample('order-state-machine');
    expect(example).toBeDefined();
    const diagram = parseDiagram(example!.text).diagram;
    expect(diagram.nodes.some((node) => node.shape === 'ellipse')).toBe(true);
    expect(diagram.edges.length).toBeGreaterThan(3);
    expect(parseDiagram(example!.text).errors).toEqual([]);
  });

  it('includes a flowchart example with diamond decisions', () => {
    const example = findExample('checkout-flowchart');
    expect(example).toBeDefined();
    const diagram = parseDiagram(example!.text).diagram;
    expect(diagram.nodes.some((node) => node.shape === 'diamond')).toBe(true);
    expect(parseDiagram(example!.text).errors).toEqual([]);
  });

  it('includes an ER example with cylinder tables and undirected edges', () => {
    const example = findExample('user-data-model');
    expect(example).toBeDefined();
    const diagram = parseDiagram(example!.text).diagram;
    expect(diagram.nodes.every((node) => node.shape === 'cylinder')).toBe(true);
    expect(diagram.edges.length).toBeGreaterThan(2);
    expect(diagram.edges.every((edge) => !edge.directed)).toBe(true);
    expect(parseDiagram(example!.text).errors).toEqual([]);
  });
});
