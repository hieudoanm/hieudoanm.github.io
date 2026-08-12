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
});
