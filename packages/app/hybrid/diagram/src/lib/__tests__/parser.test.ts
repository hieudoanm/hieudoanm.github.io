import { SHAPES, diagramToText, parseDiagram } from '@/lib/parser';

describe('parseDiagram', () => {
  it('parses a title, nodes and edges', () => {
    const result = parseDiagram(`title: Flow
node a: Alpha [round]
node b: Beta
edge a -> b: step`);
    expect(result.errors).toEqual([]);
    expect(result.diagram.title).toBe('Flow');
    expect(result.diagram.nodes).toHaveLength(2);
    expect(result.diagram.nodes[0]).toMatchObject({
      id: 'a',
      label: 'Alpha',
      shape: 'round',
      line: 2,
    });
    expect(result.diagram.edges).toHaveLength(1);
    expect(result.diagram.edges[0]).toMatchObject({
      source: 'a',
      target: 'b',
      label: 'step',
      line: 4,
    });
  });

  it('accepts the optional colon after the edge keyword', () => {
    const result = parseDiagram('edge: a -> b');
    expect(result.errors).toEqual([]);
    expect(result.diagram.edges).toHaveLength(1);
    expect(result.diagram.edges[0].source).toBe('a');
  });

  it('ignores blank lines and comments', () => {
    const result = parseDiagram('# heading\n\nnode a: A\n\n# trailing');
    expect(result.errors).toEqual([]);
    expect(result.diagram.nodes).toHaveLength(1);
    expect(result.diagram.nodes[0].id).toBe('a');
  });

  it('creates implicit nodes for edge endpoints', () => {
    const result = parseDiagram('edge x -> y');
    expect(result.diagram.nodes).toHaveLength(2);
    expect(result.diagram.nodes[0]).toMatchObject({ id: 'x', label: 'x' });
    expect(result.diagram.nodes[1]).toMatchObject({ id: 'y', label: 'y' });
  });

  it('defaults node shape to rect', () => {
    const result = parseDiagram('node a: A');
    expect(result.diagram.nodes[0].shape).toBe('rect');
  });

  it('reports duplicate node ids', () => {
    const result = parseDiagram('node a: One\nnode a: Two');
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toMatchObject({
      line: 2,
      message: 'Duplicate node "a"',
    });
    expect(result.diagram.nodes).toHaveLength(1);
  });

  it('rejects an unknown shape', () => {
    const result = parseDiagram('node a: A [star]');
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].message).toContain('Unknown shape');
  });

  it('parses a node icon attribute', () => {
    const result = parseDiagram(
      'node db: PostgreSQL [cylinder, icon=database]'
    );
    expect(result.errors).toEqual([]);
    expect(result.diagram.nodes[0]).toMatchObject({
      shape: 'cylinder',
      icon: 'database',
    });
  });

  it('parses an icon without an explicit shape', () => {
    const result = parseDiagram('node api: API Server [icon=server]');
    expect(result.errors).toEqual([]);
    expect(result.diagram.nodes[0]).toMatchObject({
      shape: 'rect',
      icon: 'server',
    });
  });

  it('rejects an unknown icon name', () => {
    const result = parseDiagram('node a: A [icon=rocket]');
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].message).toContain('Unknown icon "rocket"');
    expect(result.errors[0].message).toContain('database');
  });

  it('rejects an unknown attribute inside node brackets', () => {
    const result = parseDiagram('node a: A [wobble]');
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].message).toContain('Unknown shape "wobble"');
  });

  it('rejects a missing node id', () => {
    const result = parseDiagram('node : Only label');
    expect(result.errors[0].message).toContain('Node id is required');
  });

  it('rejects an invalid node id', () => {
    const result = parseDiagram('node "bad id": Label');
    expect(result.errors[0].message).toContain('Invalid node id');
  });

  it('rejects a node without a label', () => {
    const result = parseDiagram('node a:');
    expect(result.errors[0].message).toContain('needs a label');
  });

  it('rejects a malformed node line', () => {
    const result = parseDiagram('node justanid');
    expect(result.errors[0].message).toContain('Expected "node <id>: <label>"');
  });

  it('rejects an edge without an arrow', () => {
    const result = parseDiagram('edge a b');
    expect(result.errors[0].message).toContain('Expected "edge');
  });

  it('rejects an edge missing endpoints', () => {
    const result = parseDiagram('edge a -> : label');
    expect(result.errors[0].message).toContain('needs both');
  });

  it('accepts a self-loop edge', () => {
    const result = parseDiagram('edge a -> a: retry');
    expect(result.errors).toEqual([]);
    expect(result.diagram.edges).toHaveLength(1);
    expect(result.diagram.edges[0]).toMatchObject({
      source: 'a',
      target: 'a',
      label: 'retry',
      directed: true,
    });
  });

  it('parses an undirected edge with --', () => {
    const result = parseDiagram('edge a -- b: linked');
    expect(result.errors).toEqual([]);
    expect(result.diagram.edges[0]).toMatchObject({
      source: 'a',
      target: 'b',
      label: 'linked',
      directed: false,
    });
  });

  it('parses the sequence kind', () => {
    const result = parseDiagram('kind: sequence\nnode a: A\nedge a -> b: ping');
    expect(result.errors).toEqual([]);
    expect(result.diagram.kind).toBe('sequence');
  });

  it('rejects an unknown kind', () => {
    const result = parseDiagram('kind: er');
    expect(result.errors[0].message).toContain('Unknown kind');
  });

  it('rejects unknown lines', () => {
    const result = parseDiagram('garbage line');
    expect(result.errors[0].message).toContain('Unrecognized line');
  });

  it('generates unique edge ids for parallel edges', () => {
    const result = parseDiagram('edge a -> b\nedge a -> b');
    expect(result.diagram.edges[0].id).not.toBe(result.diagram.edges[1].id);
  });

  it('supports all shapes', () => {
    const lines = SHAPES.map(
      (shape, index) => `node n${index}: Node [${shape}]`
    );
    const result = parseDiagram(lines.join('\n'));
    expect(result.errors).toEqual([]);
    SHAPES.forEach((shape, index) => {
      expect(result.diagram.nodes[index].shape).toBe(shape);
    });
  });

  it('parses a node color attribute', () => {
    const result = parseDiagram('node db: DB [cylinder, color=blue]');
    expect(result.errors).toEqual([]);
    expect(result.diagram.nodes[0]).toMatchObject({
      shape: 'cylinder',
      color: 'blue',
    });
  });

  it('rejects an unknown node color', () => {
    const result = parseDiagram('node a: A [color=neon]');
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].message).toContain('Unknown color "neon"');
    expect(result.errors[0].message).toContain('blue');
  });
});

describe('parseDiagram subgraphs', () => {
  it('groups nodes into a subgraph', () => {
    const result = parseDiagram(`subgraph web: Web Tier [color=blue]
node a: API
node b: Web
end
node db: DB`);
    expect(result.errors).toEqual([]);
    expect(result.diagram.subgraphs).toHaveLength(1);
    expect(result.diagram.subgraphs[0]).toMatchObject({
      id: 'web',
      label: 'Web Tier',
      color: 'blue',
    });
    expect(result.diagram.nodes.find((n) => n.id === 'a')!.group).toBe('web');
    expect(result.diagram.nodes.find((n) => n.id === 'b')!.group).toBe('web');
    expect(
      result.diagram.nodes.find((n) => n.id === 'db')!.group
    ).toBeUndefined();
  });

  it('nests subgraphs and tracks the parent', () => {
    const result = parseDiagram(`subgraph cloud: Cloud
subgraph zone: Zone
node a: A
end
end`);
    expect(result.errors).toEqual([]);
    const cloud = result.diagram.subgraphs.find((s) => s.id === 'cloud')!;
    const zone = result.diagram.subgraphs.find((s) => s.id === 'zone')!;
    expect(cloud.parent).toBeUndefined();
    expect(zone.parent).toBe('cloud');
    expect(result.diagram.nodes[0].group).toBe('zone');
  });

  it('rejects duplicate subgraph ids', () => {
    const result = parseDiagram('subgraph a: One\nend\nsubgraph a: Two\nend');
    expect(result.errors[0].message).toContain('Duplicate subgraph "a"');
    expect(result.errors[1].message).toContain('Unexpected');
  });

  it('rejects an unclosed subgraph', () => {
    const result = parseDiagram('subgraph a: One\nnode x: X');
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].message).toContain('Unclosed subgraph "a"');
  });

  it('rejects an unexpected end', () => {
    const result = parseDiagram('end');
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].message).toContain(
      "Unexpected 'end' without an open subgraph"
    );
  });

  it('rejects an unknown subgraph attribute', () => {
    const result = parseDiagram('subgraph a: A [bold]');
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].message).toContain('Unknown subgraph attribute');
  });

  it('defaults a subgraph label to its id', () => {
    const result = parseDiagram('subgraph svc:\nend');
    expect(result.errors).toEqual([]);
    expect(result.diagram.subgraphs[0].label).toBe('svc');
  });
});

describe('parseDiagram timeline and venn', () => {
  it('parses the timeline kind and start/end dates', () => {
    const result = parseDiagram(`kind: timeline
node design: Design [start=2024-01-01, end=2024-01-15]
node build: Build [start=2024-01-10]`);
    expect(result.errors).toEqual([]);
    expect(result.diagram.kind).toBe('timeline');
    expect(result.diagram.nodes[0]).toMatchObject({
      start: '2024-01-01',
      end: '2024-01-15',
    });
    expect(result.diagram.nodes[1].start).toBe('2024-01-10');
  });

  it('rejects an invalid timeline date', () => {
    const result = parseDiagram('node a: A [start=01/01/2024]');
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].message).toContain('Invalid start date');
  });

  it('rejects an impossible timeline date', () => {
    const result = parseDiagram('node a: A [end=2024-13-45]');
    expect(result.errors).toHaveLength(1);
  });

  it('parses the venn kind', () => {
    const result = parseDiagram('kind: venn\nnode a: Alpha\nnode b: Beta');
    expect(result.errors).toEqual([]);
    expect(result.diagram.kind).toBe('venn');
  });

  it('parses a force layout mode directive', () => {
    const result = parseDiagram('layout-mode: force\nnode a: A\nedge a -> b');
    expect(result.errors).toEqual([]);
    expect(result.diagram.layoutMode).toBe('force');
  });

  it('rejects an unknown layout mode', () => {
    const result = parseDiagram('layout-mode: spring');
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].message).toContain('Valid modes');
  });

  it('parses multi-line labels via the newline escape', () => {
    const result = parseDiagram('node a: Alpha\\nBeta\\nGamma');
    expect(result.errors).toEqual([]);
    expect(result.diagram.nodes[0].label).toBe('Alpha\nBeta\nGamma');
  });
});

describe('parseDiagram sequence fragments, activations and notes', () => {
  it('parses a fragment with a divider around edges', () => {
    const result = parseDiagram(`kind: sequence
node a: Client
node b: Server
fragment alt: authorized
edge a -> b: attempt
divider else: denied
edge b -> a: reject
end`);
    expect(result.errors).toEqual([]);
    expect(result.diagram.fragments).toHaveLength(1);
    expect(result.diagram.fragments![0]).toMatchObject({
      type: 'alt',
      label: 'authorized',
      edgeStart: 0,
      edgeEnd: 1,
    });
    expect(result.diagram.dividers).toHaveLength(1);
    expect(result.diagram.dividers![0]).toMatchObject({
      fragmentId: result.diagram.fragments![0].id,
      edgeIndex: 1,
      label: 'else: denied',
    });
  });

  it('nests fragments and tracks the parent', () => {
    const result = parseDiagram(`kind: sequence
node a: A
fragment loop: retry
edge a -> a: attempt
fragment opt: clean up
edge a -> a: release
end
end`);
    expect(result.errors).toEqual([]);
    const outer = result.diagram.fragments!.find(
      (fragment) => fragment.type === 'loop'
    )!;
    const inner = result.diagram.fragments!.find(
      (fragment) => fragment.type === 'opt'
    )!;
    expect(inner.parent).toBe(outer.id);
  });

  it('rejects an unknown fragment type', () => {
    const result = parseDiagram('fragment unknown: x');
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].message).toContain('Unknown fragment type');
  });

  it('rejects an unclosed fragment', () => {
    const result = parseDiagram(
      'kind: sequence\nnode a: A\nfragment alt: x\nedge a -> a: ping'
    );
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].message).toContain('Unclosed fragment');
  });

  it('rejects a divider outside a fragment', () => {
    const result = parseDiagram('divider else: denied');
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].message).toContain("'divider' outside a fragment");
  });

  it('parses activate/deactivate pairs into activations', () => {
    const result = parseDiagram(`kind: sequence
node a: A
node b: B
activate b
edge a -> b: call
deactivate b`);
    expect(result.errors).toEqual([]);
    expect(result.diagram.activations).toHaveLength(1);
    expect(result.diagram.activations![0]).toMatchObject({
      participant: 'b',
      edgeStart: 0,
      edgeEnd: 0,
    });
  });

  it('reports a dangling activate as an error', () => {
    const result = parseDiagram('kind: sequence\nnode a: A\nactivate a');
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].message).toContain('Unclosed activation "a"');
  });

  it('rejects a deactivate without an open activation', () => {
    const result = parseDiagram('kind: sequence\ndeactivate a');
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].message).toContain('No open activation "a"');
  });

  it('parses notes over a participant and standalone notes', () => {
    const result = parseDiagram(`kind: sequence
node a: A
note over a: first check
note: standalone remark`);
    expect(result.errors).toEqual([]);
    expect(result.diagram.notes).toHaveLength(2);
    expect(result.diagram.notes![0]).toMatchObject({
      text: 'first check',
      over: 'a',
    });
    expect(result.diagram.notes![1]).toMatchObject({
      text: 'standalone remark',
    });
    expect(result.diagram.notes![1].over).toBeUndefined();
  });

  it('rejects an empty note', () => {
    const result = parseDiagram('note:');
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].message).toContain('Note needs text');
  });
});

describe('parseDiagram edge styles', () => {
  it('parses dashed, dotted, color, width and arrow attributes', () => {
    const result = parseDiagram(
      'node a: A\nnode b: B\nedge a -> b [dashed, color=red, width=3]'
    );
    expect(result.errors).toEqual([]);
    expect(result.diagram.edges[0].style).toMatchObject({
      dashed: true,
      color: 'red',
      width: 3,
    });
  });

  it('parses dotted edges and arrow=no', () => {
    const result = parseDiagram(
      'node a: A\nnode b: B\nedge a -> b [dotted, arrow=no]'
    );
    expect(result.errors).toEqual([]);
    expect(result.diagram.edges[0].style).toMatchObject({
      dotted: true,
      arrow: false,
    });
  });

  it('rejects an unknown edge attribute', () => {
    const result = parseDiagram('node a: A\nnode b: B\nedge a -> b [glow]');
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].message).toContain('Unknown edge attribute "glow"');
  });

  it('rejects an invalid width', () => {
    const result = parseDiagram(
      'node a: A\nnode b: B\nedge a -> b [width=thick]'
    );
    expect(result.errors).toHaveLength(1);
  });
});

describe('diagramToText', () => {
  it('serializes a title, shapes, and labeled edges', () => {
    const diagram = parseDiagram(`title: Flow
node a: Alpha [round]
node b: Beta
edge a -> b: step`).diagram;
    expect(diagramToText(diagram)).toBe(`title: Flow

node a: Alpha [round]
node b: Beta

edge a -> b: step`);
  });

  it('round-trips shape and icon attributes', () => {
    const diagram = parseDiagram(
      'node db: PostgreSQL [cylinder, icon=database]'
    ).diagram;
    expect(diagramToText(diagram)).toBe(
      'node db: PostgreSQL [cylinder, icon=database]'
    );
  });

  it('serializes an icon on a default-shape node', () => {
    const diagram = parseDiagram('node api: API Server [icon=server]').diagram;
    expect(diagramToText(diagram)).toBe('node api: API Server [icon=server]');
  });

  it('omits title and edge label sections when absent', () => {
    const diagram = parseDiagram('node a: A\nnode b: B\nedge a -> b').diagram;
    expect(diagramToText(diagram)).toBe('node a: A\nnode b: B\n\nedge a -> b');
  });

  it('serializes the sequence kind, undirected edges and self-loops', () => {
    const diagram = parseDiagram(
      'kind: sequence\nnode a: A\nedge a -- b: linked\nedge a -> a: retry'
    ).diagram;
    const text = diagramToText(diagram);
    expect(text).toContain('kind: sequence');
    expect(text).toContain('edge a -- b: linked');
    expect(text).toContain('edge a -> a: retry');
    expect(parseDiagram(text).errors).toEqual([]);
  });

  it('round-trips subgraphs, node colors and edge styles', () => {
    const diagram = parseDiagram(`subgraph web: Web Tier [color=blue]
node api: API [color=green]
end
node db: DB
edge api -> db [dashed, color=red, width=2]`).diagram;
    const text = diagramToText(diagram);
    expect(text).toContain('subgraph web: Web Tier [color=blue]');
    expect(text).toContain('node api: API [color=green]');
    expect(text).toContain('edge api -> db [dashed, color=red, width=2]');
    const roundTripped = parseDiagram(text);
    expect(roundTripped.errors).toEqual([]);
    expect(roundTripped.diagram.subgraphs).toEqual(diagram.subgraphs);
    expect(roundTripped.diagram.nodes.find((n) => n.id === 'api')!.group).toBe(
      'web'
    );
  });

  it('round-trips timeline dates, venn kind and force layout mode', () => {
    const diagram = parseDiagram(`kind: timeline
layout-mode: force
node design: Design [start=2024-01-01, end=2024-01-15]
node build: Build [start=2024-01-10]`).diagram;
    const text = diagramToText(diagram);
    expect(text).toContain('kind: timeline');
    expect(text).toContain('layout-mode: force');
    expect(text).toContain(
      'node design: Design [start=2024-01-01, end=2024-01-15]'
    );
    const roundTripped = parseDiagram(text);
    expect(roundTripped.errors).toEqual([]);
    expect(roundTripped.diagram.kind).toBe('timeline');
    expect(roundTripped.diagram.layoutMode).toBe('force');
    const stripLines = <T extends { line: number }>(nodes: T[]): T[] =>
      nodes.map(({ line: _line, ...node }) => node as T);
    expect(stripLines(roundTripped.diagram.nodes)).toEqual(
      stripLines(diagram.nodes)
    );
  });

  it('round-trips venn kind', () => {
    const diagram = parseDiagram(
      'kind: venn\nnode a: Alpha\nnode b: Beta'
    ).diagram;
    const text = diagramToText(diagram);
    expect(text).toContain('kind: venn');
    expect(parseDiagram(text).errors).toEqual([]);
  });

  it('escapes and restores multi-line labels', () => {
    const diagram = parseDiagram('node a: Alpha\\nBeta [round]').diagram;
    const text = diagramToText(diagram);
    expect(text).toBe('node a: Alpha\\nBeta [round]');
    expect(parseDiagram(text).errors).toEqual([]);
    expect(parseDiagram(text).diagram.nodes[0].label).toBe('Alpha\nBeta');
  });

  it('round-trips sequence fragments, dividers, activations and notes', () => {
    const diagram = parseDiagram(`kind: sequence
node a: Client
node b: Server
fragment alt: authorized
activate b
edge a -> b: attempt
divider else: denied
edge b -> a: reject
deactivate b
end
note over a: timed out`).diagram;
    const text = diagramToText(diagram);
    const roundTripped = parseDiagram(text);
    expect(roundTripped.errors).toEqual([]);
    const stripLines = (items: unknown[]): unknown[] =>
      items.map((item) => {
        const { line: _line, ...rest } = item as { line?: number };
        return rest;
      });
    expect(stripLines(roundTripped.diagram.fragments ?? [])).toEqual(
      stripLines(diagram.fragments ?? [])
    );
    expect(stripLines(roundTripped.diagram.dividers ?? [])).toEqual(
      stripLines(diagram.dividers ?? [])
    );
    expect(roundTripped.diagram.activations).toEqual(diagram.activations);
    expect(stripLines(roundTripped.diagram.notes ?? [])).toEqual(
      stripLines(diagram.notes ?? [])
    );
    expect(text).toContain('fragment alt: authorized');
    expect(text).toContain('divider else: denied');
    expect(text).toContain('activate b');
    expect(text).toContain('deactivate b');
    expect(text).toContain('note over a: timed out');
  });

  it('round-trips nested fragments', () => {
    const diagram = parseDiagram(`kind: sequence
node a: A
fragment loop: retry
edge a -> a: attempt
fragment opt: clean up
edge a -> a: release
end
end`).diagram;
    const text = diagramToText(diagram);
    const roundTripped = parseDiagram(text);
    expect(roundTripped.errors).toEqual([]);
    const stripLines = (items: unknown[]): unknown[] =>
      items.map((item) => {
        const { line: _line, ...rest } = item as { line?: number };
        return rest;
      });
    expect(stripLines(roundTripped.diagram.fragments ?? [])).toEqual(
      stripLines(diagram.fragments ?? [])
    );
  });
});
