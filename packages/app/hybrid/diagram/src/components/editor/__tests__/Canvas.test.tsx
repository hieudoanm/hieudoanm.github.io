import { fireEvent, render, screen } from '@testing-library/react';
import Canvas from '@/components/editor/Canvas';
import { computeLayout } from '@/lib/layout';
import { parseDiagram } from '@/lib/parser';
import type { Layout } from '@/lib/types';

describe('Canvas', () => {
  const layout: Layout = computeLayout(
    parseDiagram(`title: Flow
node a: Alpha [round]
node b: Beta
edge a -> b: step`).diagram
  );

  it('renders the title, nodes, edges and labels', () => {
    render(<Canvas layout={layout} title="Flow" zoom={1} />);
    expect(screen.getByLabelText('Diagram canvas')).toBeInTheDocument();
    expect(screen.getByText('Flow')).toBeInTheDocument();
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();
    expect(screen.getByText('step')).toBeInTheDocument();
    const svg = document.querySelector('svg')!;
    expect(svg.querySelector('path[d]')).not.toBeNull();
    expect(svg.querySelector('marker')).not.toBeNull();
  });

  it('scales the svg by the zoom factor', () => {
    render(<Canvas layout={layout} title="" zoom={2} />);
    const svg = document.querySelector('svg')!;
    expect(svg.style.width).toBe(`${layout.width * 2}px`);
    expect(svg.style.height).toBe(`${layout.height * 2}px`);
  });

  it('renders all node shapes', () => {
    const all = computeLayout(
      parseDiagram(
        'node r: R\nnode e: E [ellipse]\nnode d: D [diamond]\nnode c: C [cylinder]'
      ).diagram
    );
    render(<Canvas layout={all} title="" zoom={1} />);
    const svg = document.querySelector('svg')!;
    expect(svg.querySelectorAll('ellipse').length).toBeGreaterThanOrEqual(2);
    expect(svg.querySelector('polygon')).not.toBeNull();
  });

  it('renders an empty layout without crashing', () => {
    render(
      <Canvas
        layout={{
          kind: 'flow',
          direction: 'horizontal',
          nodes: [],
          edges: [],
          width: 96,
          height: 96,
        }}
        title=""
        zoom={1}
      />
    );
    expect(screen.getByLabelText('Diagram canvas')).toBeInTheDocument();
  });

  it('renders a node icon as a nested svg with the icon body', () => {
    const iconLayout = computeLayout(
      parseDiagram('node db: PostgreSQL [cylinder, icon=database]').diagram
    );
    render(<Canvas layout={iconLayout} title="" zoom={1} />);
    const svg = document.querySelector('svg')!;
    const icon = svg.querySelector('svg[data-icon="database"]');
    expect(icon).not.toBeNull();
    expect(icon!.getAttribute('viewBox')).toBe('0 0 24 24');
    expect(icon!.querySelector('ellipse')).not.toBeNull();
  });

  it('does not render icons for plain nodes', () => {
    const iconLayout = computeLayout(parseDiagram('node a: Alpha').diagram);
    render(<Canvas layout={iconLayout} title="" zoom={1} />);
    const svg = document.querySelector('svg')!;
    expect(svg.querySelector('svg[data-icon]')).toBeNull();
  });

  it('renders lifelines and headers for a sequence diagram', () => {
    const sequence = computeLayout(
      parseDiagram(
        'kind: sequence\nnode a: Client\nnode b: Server\nedge a -> b: request'
      ).diagram
    );
    render(<Canvas layout={sequence} title="Seq" zoom={1} />);
    const svg = document.querySelector('svg')!;
    expect(svg.querySelectorAll('line').length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText('request')).toBeInTheDocument();
  });

  it('omits the arrow marker for undirected edges', () => {
    const layout = computeLayout(
      parseDiagram('node a: Alpha\nnode b: Beta\nedge a -- b: linked').diagram
    );
    render(<Canvas layout={layout} title="" zoom={1} />);
    const svg = document.querySelector('svg')!;
    const plain = svg.querySelector('path:not([marker-end])');
    expect(plain).not.toBeNull();
    expect(svg.querySelector('path[marker-end]')).toBeNull();
  });

  it('renders a self-loop edge path', () => {
    const layout = computeLayout(
      parseDiagram('node a: Alpha\nedge a -> a: retry').diagram
    );
    render(<Canvas layout={layout} title="" zoom={1} />);
    const svg = document.querySelector('svg')!;
    const selfLoop = svg.querySelector('path[d*="A "]');
    expect(selfLoop).not.toBeNull();
    expect(selfLoop!.getAttribute('marker-end')).not.toBeNull();
  });

  it('renders the new node shapes', () => {
    const all = computeLayout(
      parseDiagram(
        'node h: H [hexagon]\nnode p: P [parallelogram]\nnode c: C [cloud]\nnode n: N [note]\nnode a: A [actor]'
      ).diagram
    );
    render(<Canvas layout={all} title="" zoom={1} />);
    const svg = document.querySelector('svg')!;
    expect(svg.querySelectorAll('polygon').length).toBeGreaterThanOrEqual(2);
    expect(svg.querySelectorAll('path[d]').length).toBeGreaterThanOrEqual(2);
    expect(svg.querySelectorAll('circle').length).toBeGreaterThanOrEqual(1);
  });

  it('shows a selection outline around the selected node', () => {
    render(<Canvas layout={layout} title="" zoom={1} selectedId="a" />);
    const svg = document.querySelector('svg')!;
    expect(svg.querySelector('rect[stroke-dasharray]')).not.toBeNull();
  });

  it('reports node selection from a pointer down', () => {
    const onSelectNode = jest.fn();
    render(
      <Canvas layout={layout} title="" zoom={1} onSelectNode={onSelectNode} />
    );
    const svg = document.querySelector('svg')!;
    fireEvent.pointerDown(svg.querySelector('rect')!, {
      pointerId: 1,
      clientX: 0,
      clientY: 0,
    });
    expect(onSelectNode).toHaveBeenCalledWith('a');
  });

  it('renders a custom glyph icon as a raw path', () => {
    const glyphLayout = computeLayout(
      parseDiagram('node g: G [icon=glyph:M 10 20 L 20 5]').diagram
    );
    render(<Canvas layout={glyphLayout} title="" zoom={1} />);
    const svg = document.querySelector('svg')!;
    const icon = svg.querySelector('svg[data-icon="glyph"] path');
    expect(icon).not.toBeNull();
    expect(icon!.getAttribute('d')).toBe('M 10 20 L 20 5');
  });

  it('clears the selection when the background is clicked', () => {
    const onSelectNode = jest.fn();
    render(
      <Canvas layout={layout} title="" zoom={1} onSelectNode={onSelectNode} />
    );
    const svg = document.querySelector('svg')!;
    fireEvent.pointerDown(svg, { pointerId: 1, clientX: 0, clientY: 0 });
    expect(onSelectNode).toHaveBeenCalledWith(null);
  });

  it('drags a node by the pointer delta divided by zoom', () => {
    const onDragNode = jest.fn();
    render(
      <Canvas layout={layout} title="" zoom={2} onDragNode={onDragNode} />
    );
    const svg = document.querySelector('svg')!;
    const group = svg.querySelector('g.cursor-move')!;
    fireEvent.pointerDown(group, {
      pointerId: 1,
      clientX: 100,
      clientY: 100,
    });
    fireEvent.pointerMove(group, { clientX: 120, clientY: 130 });
    fireEvent.pointerUp(group);
    expect(onDragNode).toHaveBeenCalledWith('a', 10, 15);
  });

  it('renders a subgraph box with its label', () => {
    const clustered = computeLayout(
      parseDiagram(`subgraph web: Web Tier [color=blue]
node a: API
node b: Web
end
node db: DB
edge a -> db`).diagram
    );
    render(<Canvas layout={clustered} title="" zoom={1} />);
    expect(screen.getByText('Web Tier')).toBeInTheDocument();
    const svg = document.querySelector('svg')!;
    const box = svg.querySelector('g[pointer-events="none"] rect');
    expect(box).not.toBeNull();
    expect(box!.getAttribute('stroke')).toBe('#3b82f6');
  });

  it('fills a node with its color attribute', () => {
    const colored = computeLayout(
      parseDiagram('node a: API [color=green]').diagram
    );
    render(<Canvas layout={colored} title="" zoom={1} />);
    const svg = document.querySelector('svg')!;
    const node = svg.querySelector('rect')!;
    expect(node.getAttribute('fill')).toBe('rgba(34,197,94,0.16)');
    expect(node.getAttribute('stroke')).toBe('#22c55e');
  });

  it('applies dashed, dotted, width and color to edges', () => {
    const styled = computeLayout(
      parseDiagram(
        'node a: A\nnode b: B\nnode c: C\nedge a -> b [dashed, color=red]\nedge b -> c [dotted]\nedge a -> c [width=3]'
      ).diagram
    );
    render(<Canvas layout={styled} title="" zoom={1} />);
    const svg = document.querySelector('svg')!;
    const paths = Array.from(svg.querySelectorAll('path[stroke]'));
    const attrs = paths.map((path) => path.getAttribute('stroke-dasharray'));
    expect(attrs).toContain('6 4');
    expect(attrs).toContain('2 4');
    expect(
      paths.some((path) => path.getAttribute('stroke') === '#ef4444')
    ).toBe(true);
    expect(
      paths.some((path) => path.getAttribute('stroke-width') === '3')
    ).toBe(true);
  });

  it('omits the arrow marker for arrow=no edges', () => {
    const styled = computeLayout(
      parseDiagram('node a: A\nnode b: B\nedge a -> b [arrow=no]').diagram
    );
    render(<Canvas layout={styled} title="" zoom={1} />);
    const svg = document.querySelector('svg')!;
    expect(svg.querySelector('path[marker-end]')).toBeNull();
  });

  it('gives a colored directed edge a matching marker', () => {
    const styled = computeLayout(
      parseDiagram('node a: A\nnode b: B\nedge a -> b [color=blue]').diagram
    );
    render(<Canvas layout={styled} title="" zoom={1} />);
    const svg = document.querySelector('svg')!;
    const path = svg.querySelector('path[marker-end]')!;
    const markerId = path
      .getAttribute('marker-end')!
      .replace('url(#', '')
      .replace(')', '');
    const marker = svg.querySelector(`marker[id="${markerId}"] path`);
    expect(marker).not.toBeNull();
    expect(marker!.getAttribute('fill')).toBe('#3b82f6');
  });

  it('styles a sequence message edge', () => {
    const sequence = computeLayout(
      parseDiagram(
        'kind: sequence\nnode a: Client\nnode b: Server\nedge a -> b [dotted]'
      ).diagram
    );
    render(<Canvas layout={sequence} title="" zoom={1} />);
    const svg = document.querySelector('svg')!;
    const path = svg.querySelector('path[stroke-dasharray]');
    expect(path).not.toBeNull();
    expect(path!.getAttribute('stroke-dasharray')).toBe('2 4');
  });

  it('renders a subgraph without a color attribute', () => {
    const clustered = computeLayout(
      parseDiagram(`subgraph web: Web Tier
node a: API
end`).diagram
    );
    render(<Canvas layout={clustered} title="" zoom={1} />);
    const svg = document.querySelector('svg')!;
    const box = svg.querySelector('g[pointer-events="none"] rect')!;
    expect(box.getAttribute('stroke')).toBe('var(--color-neutral)');
  });

  it('tolerates a glyph node without path data', () => {
    const glyphless: Layout = {
      kind: 'flow',
      direction: 'horizontal',
      nodes: [
        {
          id: 'g',
          label: 'G',
          shape: 'rect',
          icon: 'glyph',
          line: 1,
          x: 100,
          y: 50,
          width: 120,
          height: 52,
        },
      ],
      edges: [],
      width: 200,
      height: 100,
    };
    render(<Canvas layout={glyphless} title="" zoom={1} />);
    const svg = document.querySelector('svg')!;
    expect(svg.querySelector('svg[data-icon="glyph"]')).toBeNull();
    expect(screen.getByText('G')).toBeInTheDocument();
  });

  it('ignores pointer moves when no drag is active', () => {
    render(<Canvas layout={layout} title="" zoom={1} />);
    const svg = document.querySelector('svg')!;
    fireEvent.pointerMove(svg, { clientX: 120, clientY: 130 });
    expect(document.body).toBeInTheDocument();
  });

  it('ignores pointer moves with no delta during a drag', () => {
    const onDragNode = jest.fn();
    render(
      <Canvas layout={layout} title="" zoom={1} onDragNode={onDragNode} />
    );
    const group = document.querySelector('g.cursor-move')!;
    fireEvent.pointerDown(group, { pointerId: 1, clientX: 100, clientY: 100 });
    fireEvent.pointerMove(group, { clientX: 100, clientY: 100 });
    expect(onDragNode).not.toHaveBeenCalled();
  });

  it('renders timeline date columns and bars', () => {
    const timeline = computeLayout(
      parseDiagram(`kind: timeline
node design: Design [start=2024-01-01, end=2024-01-10]
node build: Build [start=2024-01-08, end=2024-01-12]`).diagram
    );
    render(<Canvas layout={timeline} title="" zoom={1} />);
    const svg = document.querySelector('svg')!;
    expect(
      svg.querySelector('line[x1="' + timeline.timeline!.startX + '"]')
    ).not.toBeNull();
    expect(screen.getByText('Jan 1')).toBeInTheDocument();
    expect(screen.getByText('Design')).toBeInTheDocument();
    expect(screen.getByText('Build')).toBeInTheDocument();
    const barWidths = Array.from(svg.querySelectorAll('rect[width]')).map(
      (bar) => Number(bar.getAttribute('width'))
    );
    expect(barWidths.some((width) => width >= 160)).toBe(true);
  });

  it('applies a custom color to a timeline bar', () => {
    const timeline = computeLayout(
      parseDiagram(
        'kind: timeline\nnode a: Alpha [start=2024-01-01, end=2024-01-05, color=red]'
      ).diagram
    );
    render(<Canvas layout={timeline} title="" zoom={1} />);
    const svg = document.querySelector('svg')!;
    const bar = svg.querySelector('rect[fill="rgba(239,68,68,0.16)"]')!;
    expect(bar).not.toBeNull();
    expect(bar.getAttribute('stroke')).toBe('#ef4444');
  });

  it('renders venn nodes as overlapping circles', () => {
    const venn = computeLayout(
      parseDiagram('kind: venn\nnode a: Alpha\nnode b: Beta\nnode c: Gamma')
        .diagram
    );
    render(<Canvas layout={venn} title="" zoom={1} />);
    const svg = document.querySelector('svg')!;
    const circles = Array.from(svg.querySelectorAll('circle'));
    expect(circles).toHaveLength(3);
    expect(circles.every((circle) => circle.getAttribute('r') !== null)).toBe(
      true
    );
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();
  });

  it('renders a sequence fragment with label and dividers', () => {
    const sequence = computeLayout(
      parseDiagram(`kind: sequence
node a: Client
node b: Server
fragment alt: authorized
edge a -> b: attempt
divider else: denied
edge b -> a: reject
end`).diagram
    );
    render(<Canvas layout={sequence} title="" zoom={1} />);
    const svg = document.querySelector('svg')!;
    const box = svg.querySelector('rect[stroke-dasharray="5 4"]')!;
    expect(box).not.toBeNull();
    expect(screen.getByText('alt authorized')).toBeInTheDocument();
    expect(screen.getByText('else: denied')).toBeInTheDocument();
  });

  it('renders sequence activation bars and notes', () => {
    const sequence = computeLayout(
      parseDiagram(`kind: sequence
node a: Client
node b: Server
activate b
edge a -> b: attempt
deactivate b
note over b: timed out`).diagram
    );
    render(<Canvas layout={sequence} title="" zoom={1} />);
    const svg = document.querySelector('svg')!;
    const activation = svg.querySelector('rect[width="10"]')!;
    expect(activation).not.toBeNull();
    expect(screen.getByText('timed out')).toBeInTheDocument();
  });
});
