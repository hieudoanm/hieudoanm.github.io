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
      subgraphs: [],
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
      subgraphs: [],
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

  it('wraps grouped nodes in a subgraph box', () => {
    const diagram = parseDiagram(`subgraph web: Web Tier [color=blue]
node a: API
node b: Web
end
node db: DB
edge a -> db`).diagram;
    const layout = computeLayout(diagram);
    expect(layout.subgraphs).toHaveLength(1);
    const box = layout.subgraphs![0];
    expect(box.id).toBe('web');
    expect(box.color).toBe('blue');
    const a = layout.nodes.find((n) => n.id === 'a')!;
    const b = layout.nodes.find((n) => n.id === 'b')!;
    expect(box.x - box.width / 2).toBeLessThanOrEqual(a.x - a.width / 2);
    expect(box.x + box.width / 2).toBeGreaterThanOrEqual(b.x + b.width / 2);
    expect(box.y - box.height / 2).toBeLessThanOrEqual(a.y - a.height / 2);
    expect(box.y + box.height / 2).toBeGreaterThanOrEqual(b.y + b.height / 2);
  });

  it('computes nested subgraph boxes around their members', () => {
    const diagram = parseDiagram(`subgraph cloud: Cloud
subgraph zone: Zone
node a: A
end
end
node b: B
edge a -> b`).diagram;
    const layout = computeLayout(diagram);
    expect(layout.subgraphs).toHaveLength(2);
    const zone = layout.subgraphs!.find((s) => s.id === 'zone')!;
    const cloud = layout.subgraphs!.find((s) => s.id === 'cloud')!;
    expect(cloud.width).toBeGreaterThan(zone.width);
    expect(cloud.height).toBeGreaterThan(zone.height);
    expect(cloud.x - cloud.width / 2).toBeLessThan(zone.x - zone.width / 2);
  });

  it('clusters nodes into subgraph columns by longest path', () => {
    const diagram = parseDiagram(`subgraph s1: One
node a: A
end
subgraph s2: Two
node b: B
node c: C
end
edge a -> b
edge a -> c`).diagram;
    const layout = computeLayout(diagram);
    const a = layout.nodes.find((n) => n.id === 'a')!;
    const b = layout.nodes.find((n) => n.id === 'b')!;
    expect(b.x).toBeGreaterThan(a.x);
    expect(layout.edges).toHaveLength(2);
  });

  it('keeps subgraph boxes when nodes are dragged', () => {
    const diagram = parseDiagram(`subgraph web: Web
node a: A
node b: B
end
edge a -> b`).diagram;
    const layout = computeLayout(diagram);
    const moved = applyManualPositions(layout, {
      a: { x: layout.nodes[0].x + 100, y: layout.nodes[0].y },
    });
    const box = moved.subgraphs!.find((s) => s.id === 'web')!;
    const a = moved.nodes.find((n) => n.id === 'a')!;
    expect(box.x - box.width / 2).toBeLessThanOrEqual(a.x);
  });
});

describe('computeLayout sequence', () => {
  it('positions lifelines below their headers and routes messages', () => {
    const layout = computeLayout(
      parseDiagram(
        'kind: sequence\nnode a: Client\nnode b: Server\nedge a -> b: ping'
      ).diagram
    );
    const a = layout.nodes.find((n) => n.id === 'a')!;
    const b = layout.nodes.find((n) => n.id === 'b')!;
    expect(layout.lifelines).toHaveLength(2);
    expect(layout.lifelines![0].x).toBe(a.x);
    expect(layout.lifelines![0].top).toBeGreaterThan(a.y);
    expect(layout.edges).toHaveLength(1);
    expect(layout.edges[0].path).toBe(`M ${a.x} 116 L ${b.x} 116`);
  });

  it('lays out activations between their open and close edges', () => {
    const layout = computeLayout(
      parseDiagram(`kind: sequence
node a: Client
node b: Server
activate b
edge a -> b: call
deactivate b`).diagram
    );
    const b = layout.nodes.find((n) => n.id === 'b')!;
    expect(layout.activations).toHaveLength(1);
    const activation = layout.activations![0];
    expect(activation.participant).toBe('b');
    expect(activation.x).toBe(b.x);
    expect(activation.bottom).toBeGreaterThan(activation.top);
  });

  it('places a fragment box spanning its message rows with dividers', () => {
    const layout = computeLayout(
      parseDiagram(`kind: sequence
node a: Client
node b: Server
fragment alt: authorized
edge a -> b: attempt
divider else: denied
edge b -> a: reject
end`).diagram
    );
    expect(layout.fragments).toHaveLength(1);
    const fragment = layout.fragments![0];
    expect(fragment.type).toBe('alt');
    expect(fragment.dividers).toHaveLength(1);
    expect(fragment.dividers[0].label).toBe('else: denied');
    expect(fragment.height).toBeGreaterThan(40);
  });

  it('places notes at a participant or beside the right edge', () => {
    const layout = computeLayout(
      parseDiagram(`kind: sequence
node a: Client
node b: Server
note over a: over client
note: standalone remark`).diagram
    );
    expect(layout.notes).toHaveLength(2);
    const over = layout.notes!.find((note) => note.text === 'over client')!;
    const a = layout.nodes.find((n) => n.id === 'a')!;
    expect(over.x).toBe(a.x);
    const standalone = layout.notes!.find(
      (note) => note.text === 'standalone remark'
    )!;
    expect(standalone.x).toBeGreaterThan(a.x);
  });
});

describe('computeLayout timeline', () => {
  it('positions date columns and bars across the time span', () => {
    const layout = computeLayout(
      parseDiagram(`kind: timeline
node a: Alpha [start=2024-01-01, end=2024-01-05]
node b: Beta [start=2024-01-06, end=2024-01-08]`).diagram
    );
    expect(layout.kind).toBe('timeline');
    const timeline = layout.timeline!;
    expect(timeline.columns.length).toBeGreaterThan(1);
    expect(timeline.columns[0].label).toBe('Jan 1');
    const a = layout.nodes.find((n) => n.id === 'a')!;
    const b = layout.nodes.find((n) => n.id === 'b')!;
    expect(a.width).toBeGreaterThan(10);
    expect(b.x).toBeGreaterThan(a.x);
    expect(b.y).toBeGreaterThan(a.y);
  });

  it('returns an empty padded layout when there are no nodes', () => {
    const layout = computeLayout(parseDiagram('kind: timeline').diagram);
    expect(layout.nodes).toEqual([]);
    expect(layout.width).toBeGreaterThan(0);
  });
});

describe('computeLayout venn', () => {
  it('places circles around a ring with overlapping centers', () => {
    const layout = computeLayout(
      parseDiagram('kind: venn\nnode a: Alpha\nnode b: Beta\nnode c: Gamma')
        .diagram
    );
    expect(layout.kind).toBe('venn');
    expect(layout.nodes).toHaveLength(3);
    const centers = new Set(layout.nodes.map((node) => `${node.x},${node.y}`));
    expect(centers.size).toBe(3);
    const a = layout.nodes.find((n) => n.id === 'a')!;
    const b = layout.nodes.find((n) => n.id === 'b')!;
    const distance = Math.hypot(b.x - a.x, b.y - a.y);
    expect(distance).toBeLessThan(a.width / 2 + b.width / 2);
  });
});
