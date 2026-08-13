import {
  buildSnippet,
  buildSvg,
  downloadDiagram,
  downloadPng,
  downloadSvg,
  pageSize,
  rasterizeSvg,
  svgDimensions,
} from '@/lib/export';
import { computeLayout } from '@/lib/layout';
import { parseDiagram } from '@/lib/parser';

jest.mock('file-saver', () => ({ saveAs: jest.fn() }));
import { saveAs } from 'file-saver';

const mockSaveAs = saveAs as unknown as jest.Mock;

beforeAll(() => {
  URL.createObjectURL = jest.fn(() => 'blob:mock');
  URL.revokeObjectURL = jest.fn();
});

beforeEach(() => {
  mockSaveAs.mockClear();
});

const ALL_SHAPES = `title: Shapes
node a: A
node r: R [round]
node e: E [ellipse]
node d: D [diamond]
node c: C [cylinder]
node h: H [hexagon]
node p: P [parallelogram]
node cl: CL [cloud]
node n: N [note]
node ac: AC [actor]`;

const layoutOf = (text: string) => computeLayout(parseDiagram(text).diagram);

const readBlob = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsText(blob);
  });

interface FakeImage {
  onload: (() => void) | null;
  onerror: (() => void) | null;
  src: string;
}

interface CanvasLike {
  width: number;
  height: number;
  getContext: () => { drawImage: jest.Mock; toBlob?: jest.Mock } | null;
  toBlob?: (callback: (blob: Blob | null) => void) => void;
}

const stubRasterEnvironment = (canvas: CanvasLike): FakeImage[] => {
  const instances: FakeImage[] = [];
  class FakeImage {
    onload: (() => void) | null = null;
    onerror: (() => void) | null = null;
    src = '';
    constructor() {
      instances.push(this);
    }
  }
  global.Image = FakeImage as unknown as typeof Image;
  const createElementImpl = document.createElement.bind(document);
  document.createElement = jest.fn(
    (tag: string, options?: ElementCreationOptions) => {
      if (tag === 'canvas') return canvas as unknown as HTMLElement;
      return createElementImpl(tag, options);
    }
  ) as typeof document.createElement;
  return instances;
};

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
    expect(mockSaveAs).toHaveBeenCalledTimes(1);
    expect(mockSaveAs.mock.calls[0][1]).toBe('diagram.diagram');
  });
});

describe('pageSize', () => {
  it('returns portrait and landscape A4 dimensions', () => {
    expect(pageSize('a4-portrait')).toEqual({ width: 794, height: 1123 });
    expect(pageSize('a4-landscape')).toEqual({ width: 1123, height: 794 });
  });
});

describe('svgDimensions', () => {
  it('returns the layout dimensions by default', () => {
    const layout = layoutOf('node a: Alpha');
    expect(svgDimensions(layout)).toEqual({
      width: layout.width,
      height: layout.height,
    });
  });

  it('returns the page size when one is requested', () => {
    const layout = layoutOf('node a: Alpha');
    expect(svgDimensions(layout, { page: 'a4-portrait' })).toEqual({
      width: 794,
      height: 1123,
    });
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
    const layout = computeLayout(parseDiagram(ALL_SHAPES).diagram);
    const svg = buildSvg(layout, 'Shapes');
    expect(svg).toContain('rx="6"');
    expect(svg).toContain('rx="24"');
    expect(svg).toContain('<ellipse');
    expect(svg).toContain('<polygon');
    expect(svg).toContain('M 0 -0.9');
    expect(svg).toContain('M -1 1 L -1 -1');
    expect(svg).toContain('<circle');
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

  it('embeds a custom glyph as a raw path', () => {
    const text = 'node g: G [icon=glyph:M 10 20 L 20 5]';
    const layout = computeLayout(parseDiagram(text).diagram);
    const svg = buildSvg(layout, '');
    expect(svg).toContain('data-icon="glyph"');
    expect(svg).toContain('<path d="M 10 20 L 20 5"/>');
  });

  it('omits icon markup when no node has an icon', () => {
    const layout = computeLayout(parseDiagram('node a: A').diagram);
    const svg = buildSvg(layout, '');
    expect(svg).not.toContain('data-icon');
  });

  it('omits the arrow marker for undirected edges', () => {
    const layout = computeLayout(
      parseDiagram('node a: A\nnode b: B\nedge a -- b: linked').diagram
    );
    const svg = buildSvg(layout, '');
    expect(svg).not.toContain('marker-end');
    expect(svg).toContain('>linked<');
  });

  it('uses light colors and a white background in print mode', () => {
    const layout = computeLayout(diagram);
    const svg = buildSvg(layout, 'Flow', { print: true });
    expect(svg).toContain('fill="#ffffff"');
    expect(svg).toContain('stroke="#111827"');
    expect(svg).not.toContain('fill="#0b0f14"');
  });

  it('scales content to an A4 page when requested', () => {
    const layout = computeLayout(diagram);
    const svg = buildSvg(layout, 'Flow', { page: 'a4-landscape' });
    expect(svg).toContain('width="1123"');
    expect(svg).toContain('height="794"');
    expect(svg).toContain(' transform="');
    expect(svg).toContain('scale(');
  });

  it('renders lifelines and message arrows for a sequence diagram', () => {
    const sequence = layoutOf(
      'kind: sequence\nnode a: Client\nnode b: Server\nedge a -> b: request'
    );
    const svg = buildSvg(sequence, 'Login', { print: true });
    expect(svg).toContain('stroke-dasharray="4 4"');
    expect(svg).toContain('marker-end');
    expect(svg).toContain('>request<');
    expect(svg).toContain('rx="10"');
  });

  it('renders subgraph boxes with their labels', () => {
    const layout = layoutOf(`subgraph web: Web Tier [color=blue]
node a: API
node b: Web
end
node db: DB
edge a -> db`);
    const svg = buildSvg(layout, '');
    expect(svg).toContain('Web Tier');
    expect(svg).toContain('rx="12"');
    expect(svg).toContain('#3b82f6');
  });

  it('fills nodes with their color attribute', () => {
    const layout = layoutOf('node a: API [color=green]');
    const svg = buildSvg(layout, '');
    expect(svg).toContain('fill="rgba(34,197,94,0.16)"');
    expect(svg).toContain('stroke="#22c55e"');
  });

  it('applies dashed, dotted, width and color to edges', () => {
    const layout = layoutOf(
      'node a: A\nnode b: B\nnode c: C\nedge a -> b [dashed, color=red]\nedge b -> c [dotted]\nedge a -> c [width=3]'
    );
    const svg = buildSvg(layout, '');
    expect(svg).toContain('stroke-dasharray="6 4"');
    expect(svg).toContain('stroke-dasharray="2 4"');
    expect(svg).toContain('stroke-width="3"');
    expect(svg).toContain('stroke="#ef4444"');
  });

  it('emits a marker per edge color and omits markers for arrow=no', () => {
    const layout = layoutOf(
      'node a: A\nnode b: B\nnode c: C\nedge a -> b [color=red]\nedge b -> c [arrow=no]'
    );
    const svg = buildSvg(layout, '');
    const markerCount = svg.match(/<marker id=/g)?.length ?? 0;
    const markerEndCount = svg.match(/marker-end=/g)?.length ?? 0;
    expect(markerCount).toBe(1);
    expect(markerEndCount).toBe(1);
  });

  it('keeps undirected edges free of markers', () => {
    const layout = layoutOf('node a: A\nnode b: B\nedge a -- b [dashed]');
    const svg = buildSvg(layout, '');
    expect(svg).toContain('stroke-dasharray="6 4"');
    expect(svg).not.toContain('marker-end');
  });

  it('uses a distinct marker id for a colored directed edge', () => {
    const layout = layoutOf('node a: A\nnode b: B\nedge a -> b [color=blue]');
    const svg = buildSvg(layout, '');
    expect(svg).toContain('marker-end="url(#diagram-arrow-0)"');
    expect(svg).toContain('fill="#3b82f6"');
  });

  it('renders timeline date columns and bars', () => {
    const layout = layoutOf(`kind: timeline
node design: Design [start=2024-01-01, end=2024-01-10]
node build: Build [start=2024-01-08, end=2024-01-12]`);
    const svg = buildSvg(layout, '');
    expect(svg).toContain('>Jan 1<');
    expect(svg).toContain('>Design<');
    expect(svg).toContain('>Build<');
    expect(svg).toContain('rx="4"');
    expect(svg).toContain('stroke-opacity="0.25"');
  });

  it('renders venn nodes as circles', () => {
    const layout = layoutOf('kind: venn\nnode a: Alpha\nnode b: Beta');
    const svg = buildSvg(layout, '');
    const circles = svg.match(/<circle /g)?.length ?? 0;
    expect(circles).toBe(2);
    expect(svg).toContain('>Alpha<');
    expect(svg).toContain('>Beta<');
  });

  it('renders sequence fragments, activations and notes', () => {
    const layout = layoutOf(`kind: sequence
node a: Client
node b: Server
fragment alt: authorized
activate b
edge a -> b: attempt
divider else: denied
edge b -> a: reject
deactivate b
end
note over a: timed out`);
    const svg = buildSvg(layout, '');
    expect(svg).toContain('stroke-dasharray="5 4"');
    expect(svg).toContain('>alt authorized<');
    expect(svg).toContain('>else: denied<');
    expect(svg).toContain('width="10"');
    expect(svg).toContain('>timed out<');
  });
});

describe('downloadSvg', () => {
  it('saves the built svg with an .svg filename', () => {
    const diagram = parseDiagram('node a: A').diagram;
    const layout = computeLayout(diagram);
    downloadSvg(layout, 'Flow', 'My Diagram');
    expect(mockSaveAs).toHaveBeenCalledTimes(1);
    const [blob, filename] = mockSaveAs.mock.calls[0];
    expect(blob).toBeInstanceOf(Blob);
    expect(filename).toBe('my_diagram.svg');
  });

  it('passes print and page options through to the svg builder', async () => {
    const layout = computeLayout(parseDiagram('node a: A').diagram);
    downloadSvg(layout, 'Flow', 'My Diagram', {
      print: true,
      page: 'a4-portrait',
    });
    const [blob] = mockSaveAs.mock.calls[0];
    const svg = await readBlob(blob as Blob);
    expect(svg).toContain('fill="#ffffff"');
    expect(svg).toContain('width="794"');
  });
});

describe('rasterizeSvg', () => {
  let createElementImpl: typeof document.createElement;
  let ImageCtor: typeof Image;

  beforeEach(() => {
    createElementImpl = document.createElement.bind(document);
    ImageCtor = global.Image;
  });

  afterEach(() => {
    document.createElement = createElementImpl;
    global.Image = ImageCtor;
  });

  it('rejects when a 2d context is unavailable', async () => {
    const instances = stubRasterEnvironment({
      width: 0,
      height: 0,
      getContext: () => null,
    });
    const promise = rasterizeSvg('<svg/>', 10, 10);
    instances[0].onload?.();
    await expect(promise).rejects.toThrow('Canvas 2D is not available');
  });

  it('rejects when the image fails to load', async () => {
    const instances = stubRasterEnvironment({
      width: 0,
      height: 0,
      getContext: () => ({ drawImage: jest.fn() }),
    });
    const promise = rasterizeSvg('<svg/>', 10, 10);
    instances[0].onerror?.();
    await expect(promise).rejects.toThrow('SVG rasterization failed');
  });

  it('resolves to a png blob drawn from the svg', async () => {
    const instances = stubRasterEnvironment({
      width: 0,
      height: 0,
      getContext: () => ({ drawImage: jest.fn() }),
      toBlob: (callback) => callback(new Blob(['png'], { type: 'image/png' })),
    });
    const promise = rasterizeSvg('<svg/>', 10, 10);
    instances[0].onload?.();
    await expect(promise).resolves.toBeInstanceOf(Blob);
  });
});

describe('downloadPng', () => {
  let createElementImpl: typeof document.createElement;
  let ImageCtor: typeof Image;

  beforeEach(() => {
    createElementImpl = document.createElement.bind(document);
    ImageCtor = global.Image;
  });

  afterEach(() => {
    document.createElement = createElementImpl;
    global.Image = ImageCtor;
  });

  it('rasterizes and saves a png file', async () => {
    const instances = stubRasterEnvironment({
      width: 0,
      height: 0,
      getContext: () => ({ drawImage: jest.fn() }),
      toBlob: (callback) => callback(new Blob(['png'], { type: 'image/png' })),
    });
    const layout = computeLayout(parseDiagram('node a: A').diagram);
    const promise = downloadPng(layout, 'Flow', 'My Diagram');
    instances[0].onload?.();
    await expect(promise).resolves.toBeUndefined();
    expect(mockSaveAs).toHaveBeenCalledTimes(1);
    const [blob, filename] = mockSaveAs.mock.calls[0];
    expect(blob).toBeInstanceOf(Blob);
    expect(filename).toBe('my_diagram.png');
  });

  it('scales up the raster when no page size is requested', async () => {
    const canvas: CanvasLike = {
      width: 0,
      height: 0,
      getContext: () => ({ drawImage: jest.fn() }),
      toBlob: (callback) => callback(new Blob(['png'], { type: 'image/png' })),
    };
    const instances = stubRasterEnvironment(canvas);
    const layout = computeLayout(parseDiagram('node a: A').diagram);
    const promise = downloadPng(layout, '', 'd');
    instances[0].onload?.();
    await promise;
    expect(canvas.width).toBeGreaterThan(0);
  });
});

describe('buildSnippet', () => {
  const flow = parseDiagram(`title: Flow
node a: Alpha [round]
node d: Decision [diamond]
node db: Database [cylinder, icon=database]
edge a -> d: pick
edge d -> db: store
edge a -- db: linked`).diagram;

  it('builds a markdown fenced mermaid block', () => {
    const snippet = buildSnippet(flow, 'markdown');
    expect(snippet).toContain('```mermaid');
    expect(snippet).toContain('flowchart LR');
    expect(snippet).toContain('a -->|pick| d');
    expect(snippet).toContain('a ---|linked| db');
  });

  it('builds a plain mermaid snippet', () => {
    const snippet = buildSnippet(flow, 'mermaid');
    expect(snippet).toContain('flowchart LR');
    expect(snippet).not.toContain('```');
  });

  it('builds a plantuml snippet', () => {
    const snippet = buildSnippet(flow, 'plantuml');
    expect(snippet).toContain('@startuml');
    expect(snippet).toContain('@enduml');
    expect(snippet).toContain('rectangle');
    expect(snippet).toContain('diamond');
    expect(snippet).toContain('database');
  });

  it('maps every shape for mermaid and plantuml', () => {
    const diagram = parseDiagram(ALL_SHAPES).diagram;
    const mermaid = buildSnippet(diagram, 'mermaid');
    const plantuml = buildSnippet(diagram, 'plantuml');
    expect(mermaid).toContain('(("E"))');
    expect(mermaid).toContain('{"D"}');
    expect(mermaid).toContain('[("C")]');
    expect(mermaid).toContain('{{"H"}}');
    expect(mermaid).toContain('[/"P"/]');
    expect(plantuml).toContain('hexagon');
    expect(plantuml).toContain('parallelogram');
    expect(plantuml).toContain('cloud');
    expect(plantuml).toContain('actor');
  });

  it('builds a sequence snippet for sequence diagrams', () => {
    const sequence = parseDiagram(
      'kind: sequence\nnode a: Client\nnode b: Server\nedge a -> b: ping'
    ).diagram;
    const mermaid = buildSnippet(sequence, 'mermaid');
    expect(mermaid).toContain('sequenceDiagram');
    expect(mermaid).toContain('participant a as Client');
    expect(mermaid).toContain('a->>b: ping');
    const plantuml = buildSnippet(sequence, 'plantuml');
    expect(plantuml).toContain('participant "Client" as a');
  });

  it('sanitizes quotes and newlines in labels', () => {
    const diagram = parseDiagram('node a: "quoted"\nedge a -> a').diagram;
    const snippet = buildSnippet(diagram, 'mermaid');
    expect(snippet).toContain('"quoted"');
  });
});
