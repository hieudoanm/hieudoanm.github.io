import {
  applyManualPositions,
  computeLayout,
  nodeIconCenterX,
  nodeLabelCenterX,
} from '@/lib/layout';
import { parseDiagram } from '@/lib/parser';

describe('computeLayout', () => {
  it('returns a minimal empty layout for no nodes', () => {
    const layout = computeLayout({
      title: '',
      nodes: [],
      edges: [],
      kind: 'flow',
    });
    expect(layout.nodes).toEqual([]);
    expect(layout.edges).toEqual([]);
    expect(layout.width).toBeGreaterThan(0);
    expect(layout.height).toBeGreaterThan(0);
  });

  it('places a single node centered in the canvas', () => {
    const diagram = parseDiagram('node a: Alpha').diagram;
    const layout = computeLayout(diagram);
    expect(layout.nodes).toHaveLength(1);
    expect(layout.width).toBeGreaterThan(layout.nodes[0].width);
    expect(layout.height).toBeGreaterThan(layout.nodes[0].height);
    expect(layout.edges).toHaveLength(0);
  });

  it('lays out a forward edge right-to-left across ranks', () => {
    const diagram = parseDiagram('node a: A\nnode b: B\nedge a -> b').diagram;
    const layout = computeLayout(diagram);
    const a = layout.nodes.find((n) => n.id === 'a');
    const b = layout.nodes.find((n) => n.id === 'b');
    expect(a && b).toBeTruthy();
    expect(b!.x).toBeGreaterThan(a!.x);
    expect(layout.edges).toHaveLength(1);
    expect(layout.edges[0].path.startsWith('M ')).toBe(true);
  });

  it('assigns deterministic ranks and centers columns', () => {
    const diagram = parseDiagram(
      'node root: Root\nnode left: Left\nnode right: Right\nedge root -> left\nedge root -> right'
    ).diagram;
    const layout = computeLayout(diagram);
    const root = layout.nodes.find((n) => n.id === 'root');
    const left = layout.nodes.find((n) => n.id === 'left');
    const right = layout.nodes.find((n) => n.id === 'right');
    expect(left!.x).toBeGreaterThan(root!.x);
    expect(right!.x).toBeGreaterThan(root!.x);
    expect(Math.abs(left!.x - right!.x)).toBeLessThan(1);
  });

  it('routes back edges through a downward curve', () => {
    const diagram = parseDiagram(
      'node a: A\nnode b: B\nedge a -> b\nedge b -> a'
    ).diagram;
    const layout = computeLayout(diagram);
    expect(layout.edges).toHaveLength(2);
    const forward = layout.edges.find((e) => e.edge.source === 'a');
    const backward = layout.edges.find((e) => e.edge.source === 'b');
    expect(forward).toBeTruthy();
    expect(backward).toBeTruthy();
    expect(backward!.path).toContain('C');
  });

  it('drops edges whose target is missing from the diagram', () => {
    const diagram = parseDiagram('node a: A').diagram;
    const layout = computeLayout({
      ...diagram,
      edges: [
        {
          id: 'a->missing',
          source: 'a',
          target: 'missing',
          label: '',
          directed: true,
          line: 2,
        },
      ],
    });
    expect(layout.nodes).toHaveLength(1);
    expect(layout.edges).toHaveLength(0);
  });

  it('drops edges whose source is missing from the diagram', () => {
    const diagram = parseDiagram('node a: A').diagram;
    const layout = computeLayout({
      ...diagram,
      edges: [
        {
          id: 'missing->a',
          source: 'missing',
          target: 'a',
          label: '',
          directed: true,
          line: 2,
        },
      ],
    });
    expect(layout.edges).toHaveLength(0);
  });

  it('sizes nodes from label length', () => {
    const diagram = parseDiagram(
      'node a: A\nnode b: A much longer label'
    ).diagram;
    const layout = computeLayout(diagram);
    const a = layout.nodes.find((n) => n.id === 'a');
    const b = layout.nodes.find((n) => n.id === 'b');
    expect(b!.width).toBeGreaterThan(a!.width);
  });

  it('gives tall shapes extra height', () => {
    const diagram = parseDiagram(
      'node a: A\nnode b: B [diamond]\nnode c: C [ellipse]\nnode d: D [cylinder]\nnode e: E [round]'
    ).diagram;
    const layout = computeLayout(diagram);
    const byId = new Map(layout.nodes.map((n) => [n.id, n]));
    expect(byId.get('b')!.height).toBeGreaterThan(byId.get('a')!.height);
    expect(byId.get('c')!.height).toBe(byId.get('b')!.height);
    expect(byId.get('d')!.height).toBe(byId.get('b')!.height);
    expect(byId.get('e')!.height).toBe(byId.get('a')!.height);
  });

  it('widens nodes that carry an icon', () => {
    const diagram = parseDiagram(
      'node a: A very long label here\nnode b: A very long label here [icon=database]'
    ).diagram;
    const layout = computeLayout(diagram);
    const a = layout.nodes.find((n) => n.id === 'a');
    const b = layout.nodes.find((n) => n.id === 'b');
    expect(b!.width).toBeGreaterThan(a!.width);
  });

  it('places the label to the right of the icon', () => {
    const diagram = parseDiagram('node b: Alpha [icon=database]').diagram;
    const layout = computeLayout(diagram);
    const node = layout.nodes[0];
    expect(nodeLabelCenterX(node)).toBeGreaterThan(nodeIconCenterX(node));
  });

  it('keeps layout deterministic with icons present', () => {
    const text = 'node a: Alpha [icon=browser]\nnode b: Beta [icon=server]';
    const first = computeLayout(parseDiagram(text).diagram);
    const second = computeLayout(parseDiagram(text).diagram);
    expect(first.nodes).toEqual(second.nodes);
    expect(first.width).toBe(second.width);
    expect(first.height).toBe(second.height);
  });

  it('lays a sequence diagram out with headers and lifelines', () => {
    const diagram = parseDiagram(
      'kind: sequence\nnode a: Client\nnode b: Server\nedge a -> b: request\nedge b -> a: response'
    ).diagram;
    const layout = computeLayout(diagram);
    expect(layout.kind).toBe('sequence');
    expect(layout.lifelines).toHaveLength(2);
    expect(layout.nodes).toHaveLength(2);
    expect(layout.nodes[0].y).toBe(layout.nodes[1].y);
    expect(layout.edges).toHaveLength(2);
  });

  it('swaps rows and columns for a vertical flow layout', () => {
    const diagram = parseDiagram(
      'node a: A\nnode b: B\nnode c: C\nedge a -> b\nedge b -> c'
    ).diagram;
    const horizontal = computeLayout(diagram, 'horizontal');
    const vertical = computeLayout(diagram, 'vertical');
    const hA = horizontal.nodes.find((n) => n.id === 'a')!;
    const vA = vertical.nodes.find((n) => n.id === 'a')!;
    const vC = vertical.nodes.find((n) => n.id === 'c')!;
    expect(horizontal.direction).toBe('horizontal');
    expect(vertical.direction).toBe('vertical');
    expect(vC.y).toBeGreaterThan(vA.y);
    expect(Math.abs(vA.x - vC.x)).toBeLessThan(1);
  });

  it('gives the new curved and actor shapes the tall height', () => {
    const diagram = parseDiagram(
      'node h: H [hexagon]\nnode c: C [cloud]\nnode n: N [note]\nnode a: A [actor]'
    ).diagram;
    const layout = computeLayout(diagram);
    const heights = new Set(layout.nodes.map((node) => node.height));
    expect(heights.size).toBe(1);
  });

  it('keeps the parallelogram at the standard height', () => {
    const diagram = parseDiagram(
      'node p: P [parallelogram]\nnode r: R'
    ).diagram;
    const layout = computeLayout(diagram);
    const p = layout.nodes.find((n) => n.id === 'p')!;
    const r = layout.nodes.find((n) => n.id === 'r')!;
    expect(p.height).toBe(r.height);
  });

  it('applies manual node positions and re-routes edges', () => {
    const diagram = parseDiagram(
      'node a: Alpha\nnode b: Beta\nedge a -> b: step'
    ).diagram;
    const layout = computeLayout(diagram);
    const moved = applyManualPositions(layout, {
      a: { x: layout.nodes[0].x + 200, y: layout.nodes[0].y },
    });
    const node = moved.nodes.find((candidate) => candidate.id === 'a')!;
    expect(node.x).toBe(layout.nodes[0].x + 200);
    expect(moved.edges).toHaveLength(1);
  });

  it('keeps sequence layout when manual positions are applied', () => {
    const diagram = parseDiagram(
      'kind: sequence\nnode a: A\nnode b: B\nedge a -> b: ping'
    ).diagram;
    const layout = computeLayout(diagram);
    const moved = applyManualPositions(layout, {
      a: { x: 999, y: 999 },
    });
    expect(moved.nodes.find((n) => n.id === 'a')!.x).not.toBe(999);
  });

  it('shifts the whole diagram back inside the padding when a node is dragged out', () => {
    const diagram = parseDiagram('node a: A\nnode b: B\nedge a -> b').diagram;
    const layout = computeLayout(diagram);
    const moved = applyManualPositions(layout, {
      a: { x: -200, y: -200 },
    });
    for (const node of moved.nodes) {
      expect(node.x - node.width / 2).toBeGreaterThanOrEqual(48);
      expect(node.y - node.height / 2).toBeGreaterThanOrEqual(48);
    }
  });

  it('honors rank hints when computing flow ranks', () => {
    const diagram = parseDiagram(
      'node a: A [rank=0]\nnode b: B [rank=3]\nedge a -> b: step'
    ).diagram;
    const layout = computeLayout(diagram);
    const a = layout.nodes.find((n) => n.id === 'a')!;
    const b = layout.nodes.find((n) => n.id === 'b')!;
    expect(b.x).toBeGreaterThan(a.x);
    expect(layout.nodes[0].rank).toBe(0);
  });

  it('lays out an empty sequence diagram', () => {
    const layout = computeLayout({
      title: '',
      nodes: [],
      edges: [],
      kind: 'sequence',
    });
    expect(layout.kind).toBe('sequence');
    expect(layout.nodes).toEqual([]);
    expect(layout.edges).toEqual([]);
    expect(layout.lifelines).toEqual([]);
  });

  it('lays out a sequence diagram with no edges', () => {
    const diagram = parseDiagram(
      'kind: sequence\nnode a: Client\nnode b: Server'
    ).diagram;
    const layout = computeLayout(diagram);
    expect(layout.edges).toHaveLength(0);
    expect(layout.lifelines).toHaveLength(2);
    expect(layout.height).toBeGreaterThan(0);
  });

  it('routes a sequence self-loop message', () => {
    const diagram = parseDiagram(
      'kind: sequence\nnode a: Client\nedge a -> a: retry'
    ).diagram;
    const layout = computeLayout(diagram);
    expect(layout.edges).toHaveLength(1);
    expect(layout.edges[0].path).toContain('A ');
  });

  it('routes a vertical self-loop', () => {
    const diagram = parseDiagram('node a: A\nedge a -> a: retry').diagram;
    const layout = computeLayout(diagram, 'vertical');
    expect(layout.edges).toHaveLength(1);
    expect(layout.edges[0].path).toContain('A ');
  });
});
