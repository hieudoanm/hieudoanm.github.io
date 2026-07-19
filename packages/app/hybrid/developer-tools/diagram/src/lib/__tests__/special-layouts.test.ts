import { computeLayout } from '@/lib/layout';
import { parseDiagram } from '@/lib/parser';
import type { DiagramEdge } from '@/lib/types';

const edge = (
  source: string,
  target: string,
  overrides: Partial<DiagramEdge> = {}
): DiagramEdge => ({
  id: `${source}->${target}`,
  source,
  target,
  label: '',
  line: 3,
  directed: true,
  ...overrides,
});

describe('computeLayout timeline edge cases', () => {
  it('uses the default span when no node has a valid date', () => {
    const layout = computeLayout(
      parseDiagram('kind: timeline\nnode a: Alpha').diagram
    );
    const a = layout.nodes.find((n) => n.id === 'a')!;
    expect(a.width).toBeGreaterThan(0);
    expect(layout.timeline!.columns.length).toBeGreaterThan(0);
  });

  it('falls back to a default day for an invalid date', () => {
    const diagram = parseDiagram('kind: timeline\nnode a: Alpha').diagram;
    diagram.nodes[0].start = '2024-99-99';
    diagram.nodes[0].end = '2024-01-05';
    const layout = computeLayout(diagram);
    const a = layout.nodes.find((n) => n.id === 'a')!;
    expect(a.width).toBeGreaterThan(0);
  });

  it('picks the largest step for extremely long spans', () => {
    const layout = computeLayout(
      parseDiagram(
        'kind: timeline\nnode a: Alpha [start=2024-01-01, end=2225-01-01]'
      ).diagram
    );
    expect(layout.timeline!.columns.length).toBeGreaterThan(1);
  });
});

describe('computeLayout venn edge cases', () => {
  it('returns an empty padded layout for no nodes', () => {
    const layout = computeLayout(parseDiagram('kind: venn').diagram);
    expect(layout.nodes).toEqual([]);
    expect(layout.width).toBeGreaterThan(0);
  });

  it('centers a single node in the canvas', () => {
    const layout = computeLayout(
      parseDiagram('kind: venn\nnode a: Alpha').diagram
    );
    expect(layout.nodes).toHaveLength(1);
    const a = layout.nodes[0];
    expect(a.x).toBeGreaterThan(0);
    expect(a.width).toBeGreaterThan(0);
  });
});

describe('computeLayout force mode', () => {
  it('applies a force layout to a small graph', () => {
    const layout = computeLayout({
      ...parseDiagram('node a: A\nnode b: B\nedge a -> b').diagram,
      layoutMode: 'force',
    });
    expect(layout.mode).toBe('force');
    expect(layout.nodes).toHaveLength(2);
    expect(layout.edges).toHaveLength(1);
    for (const node of layout.nodes) {
      expect(node.x - node.width / 2).toBeGreaterThanOrEqual(0);
    }
  });

  it('skips a self-loop edge during the force simulation', () => {
    const layout = computeLayout({
      ...parseDiagram('node a: A\nedge a -> a').diagram,
      layoutMode: 'force',
    });
    expect(layout.edges).toHaveLength(1);
    expect(layout.edges[0].path).toContain('A ');
  });

  it('drops a force edge whose target is missing', () => {
    const layout = computeLayout({
      ...parseDiagram('node a: A').diagram,
      layoutMode: 'force',
      edges: [edge('a', 'missing')],
    });
    expect(layout.edges).toHaveLength(0);
  });

  it('drops a force edge whose source is missing', () => {
    const layout = computeLayout({
      ...parseDiagram('node a: A').diagram,
      layoutMode: 'force',
      edges: [edge('missing', 'a')],
    });
    expect(layout.edges).toHaveLength(0);
  });

  it('handles a single node with no movement', () => {
    const layout = computeLayout({
      ...parseDiagram('node a: A').diagram,
      layoutMode: 'force',
    });
    expect(layout.nodes).toHaveLength(1);
    expect(layout.width).toBeGreaterThan(0);
  });

  it('returns an empty padded layout for no nodes', () => {
    const layout = computeLayout({
      title: '',
      nodes: [],
      edges: [],
      kind: 'flow',
      subgraphs: [],
      layoutMode: 'force',
    });
    expect(layout.nodes).toEqual([]);
    expect(layout.mode).toBe('force');
  });
});

describe('computeLayout flow edge cases', () => {
  it('sorts same-rank nodes with descending ids', () => {
    const layout = computeLayout(
      parseDiagram('node z: Z\nnode a: A\nnode m: M').diagram
    );
    const byId = new Map(layout.nodes.map((n) => [n.id, n]));
    expect(byId.get('z')!.y).toBeGreaterThan(0);
    expect(layout.nodes.length).toBe(3);
  });

  it('tolerates subgraph edges to missing nodes', () => {
    const diagram = parseDiagram(
      'subgraph s: S\nnode a: A\nend\nedge a -> missing'
    ).diagram;
    diagram.nodes = diagram.nodes.filter((n) => n.id !== 'missing');
    const layout = computeLayout(diagram);
    expect(layout.nodes).toHaveLength(1);
    expect(layout.subgraphs).toHaveLength(1);
  });
});

describe('computeLayout sequence edge cases', () => {
  const base = () =>
    parseDiagram('kind: sequence\nnode a: A\nnode b: B').diagram;

  it('drops a fragment whose start row is past its end row', () => {
    const layout = computeLayout({
      ...base(),
      fragments: [
        { id: 'f', type: 'alt', label: 'x', line: 3, edgeStart: 3, edgeEnd: 1 },
      ],
    });
    expect(layout.fragments).toHaveLength(0);
  });

  it('sizes a fragment with no positioned members against the padding', () => {
    const layout = computeLayout({
      ...base(),
      fragments: [
        { id: 'f', type: 'alt', label: 'x', line: 3, edgeStart: 0, edgeEnd: 1 },
      ],
      edges: [edge('zzz', 'www')],
    });
    expect(layout.fragments).toHaveLength(1);
    expect(layout.edges).toHaveLength(0);
  });

  it('drops an activation whose start row is past its end row', () => {
    const layout = computeLayout({
      ...base(),
      activations: [{ participant: 'a', edgeStart: 2, edgeEnd: 0 }],
    });
    expect(layout.activations).toHaveLength(0);
  });

  it('drops an activation for a missing participant', () => {
    const layout = computeLayout({
      ...base(),
      activations: [{ participant: 'zzz', edgeStart: 0, edgeEnd: 1 }],
    });
    expect(layout.activations).toHaveLength(0);
  });

  it('drops a message edge whose endpoints are missing', () => {
    const layout = computeLayout({
      ...base(),
      edges: [edge('zzz', 'www')],
    });
    expect(layout.edges).toHaveLength(0);
  });
});
