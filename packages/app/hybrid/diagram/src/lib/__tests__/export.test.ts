import { buildSvg, downloadDiagram, downloadSvg } from '@/lib/export';
import { computeLayout } from '@/lib/layout';
import { parseDiagram } from '@/lib/parser';

jest.mock('file-saver', () => ({ saveAs: jest.fn() }));
import { saveAs } from 'file-saver';

const mockSaveAs = saveAs as unknown as jest.Mock;

describe('downloadDiagram', () => {
  it('saves the text as a .diagram file', () => {
    downloadDiagram('node a: A', 'My Diagram');
    expect(mockSaveAs).toHaveBeenCalledTimes(1);
    const [blob, filename] = mockSaveAs.mock.calls[0];
    expect(blob).toBeInstanceOf(Blob);
    expect(filename).toBe('my_diagram.diagram');
  });

  it('falls back to a safe default filename', () => {
    downloadDiagram('', '');
    const [, filename] = mockSaveAs.mock.calls[1];
    expect(filename).toBe('diagram.diagram');
  });
});

describe('buildSvg', () => {
  const diagram = parseDiagram(`title: Flow
node a: Alpha [round]
node b: Beta [diamond]
node c: Gamma [ellipse]
node d: Delta [cylinder]
edge a -> b: step`).diagram;

  it('renders an svg with title, nodes and edges', () => {
    const layout = computeLayout(diagram);
    const svg = buildSvg(layout, 'Flow');
    expect(svg).toContain('<svg');
    expect(svg).toContain('</svg>');
    expect(svg).toContain('Flow');
    expect(svg).toContain('Alpha');
    expect(svg).toContain('Beta');
    expect(svg).toContain('>step<');
    expect(svg).toContain('diagram-arrow');
    expect(svg).toContain('rx="24"');
    expect(svg).toContain('<polygon');
    expect(svg).toContain('<ellipse');
  });

  it('renders every node shape', () => {
    const layout = computeLayout(diagram);
    const svg = buildSvg(layout, '');
    expect(svg).toContain('>step<');
  });

  it('renders an unlabeled edge without a label text', () => {
    const text = 'node a: A\nnode b: B\nedge a -> b';
    const layout = computeLayout(parseDiagram(text).diagram);
    const svg = buildSvg(layout, '');
    expect(svg).toContain('<path d="M ');
    expect(svg).not.toContain('font-size="12"');
  });

  it('escapes xml special characters in labels', () => {
    const text = 'node a: Tom & Jerry <3';
    const layout = computeLayout(parseDiagram(text).diagram);
    const svg = buildSvg(layout, '');
    expect(svg).toContain('Tom &amp; Jerry &lt;3');
  });

  it('embeds a node icon as a nested svg', () => {
    const text = 'node db: PostgreSQL [cylinder, icon=database]';
    const layout = computeLayout(parseDiagram(text).diagram);
    const svg = buildSvg(layout, '');
    expect(svg).toContain('data-icon="database"');
    expect(svg).toContain('viewBox="0 0 24 24"');
    expect(svg).toContain('<ellipse cx="12" cy="5" rx="9" ry="3"/>');
  });

  it('omits icon markup when no node has an icon', () => {
    const layout = computeLayout(parseDiagram('node a: A').diagram);
    const svg = buildSvg(layout, '');
    expect(svg).not.toContain('data-icon');
  });
});

describe('downloadSvg', () => {
  it('saves the built svg with an .svg filename', () => {
    const diagram = parseDiagram('node a: A').diagram;
    const layout = computeLayout(diagram);
    downloadSvg(layout, 'Flow', 'My Diagram');
    expect(mockSaveAs).toHaveBeenCalledTimes(3);
    const [blob, filename] = mockSaveAs.mock.calls[2];
    expect(blob).toBeInstanceOf(Blob);
    expect(filename).toBe('my_diagram.svg');
  });
});
