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
});
