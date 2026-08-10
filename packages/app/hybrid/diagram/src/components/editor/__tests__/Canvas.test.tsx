import { render, screen } from '@testing-library/react';
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
        layout={{ nodes: [], edges: [], width: 96, height: 96 }}
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
});
