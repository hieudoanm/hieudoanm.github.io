import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EditorPage from '@/app/edit/page';
import { useData } from '@/providers/DataProvider';
import { exportAsSVG, downloadFile, copyToClipboard } from '@/utils/format';
import type { ReactNode } from 'react';
import type { SVGDocument, SVGShape, SVGSymbol, SVGSettings } from '@/types';

const push = jest.fn();
const searchParamsGet = jest.fn();
const addToast = jest.fn();

jest.mock('react-icons/fi', () => {
  const names = [
    'FiArrowLeft',
    'FiSave',
    'FiDownload',
    'FiCopy',
    'FiEye',
    'FiEyeOff',
    'FiGrid',
    'FiLock',
    'FiUnlock',
    'FiTrash2',
    'FiPlus',
    'FiRotateCcw',
    'FiRotateCw',
    'FiChevronUp',
    'FiChevronDown',
    'FiLayers',
    'FiSettings',
    'FiCode',
    'FiMousePointer',
    'FiSquare',
    'FiCircle',
    'FiMinus',
    'FiPenTool',
    'FiEdit3',
    'FiType',
    'FiDroplet',
    'FiMaximize',
    'FiMinimize',
    'FiStar',
    'FiX',
  ];
  return Object.fromEntries(
    names.map((name) => [name, () => <span data-testid={name} />])
  );
});

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
  useSearchParams: () => ({ get: searchParamsGet }),
}));

jest.mock('@/providers/Providers', () => ({
  Providers: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

jest.mock('@/providers/DataProvider', () => ({
  useData: jest.fn(),
}));

jest.mock('@/providers/ToastProvider', () => ({
  useToast: () => ({ addToast }),
}));

jest.mock('@/utils/format', () => ({
  ...jest.requireActual('@/utils/format'),
  exportAsSVG: jest.fn(() => '<svg />'),
  downloadFile: jest.fn(),
  copyToClipboard: jest.fn().mockResolvedValue(true),
}));

const shape = (
  overrides: Partial<SVGShape> & { type: SVGShape['type'] }
): SVGShape => ({
  ...overrides,
  id: overrides.id ?? `s-${overrides.type}-${Math.random()}`,
  name: overrides.name ?? 'Shape',
  x: overrides.x ?? 0,
  y: overrides.y ?? 0,
  width: overrides.width ?? 100,
  height: overrides.height ?? 50,
  rotation: overrides.rotation ?? 0,
  fill: overrides.fill ?? { type: 'solid', color: '#3b82f6', opacity: 1 },
  stroke: overrides.stroke ?? {
    color: '#1e293b',
    width: 2,
    dashArray: '',
    cap: 'round',
    join: 'round',
  },
  opacity: overrides.opacity ?? 1,
  locked: overrides.locked ?? false,
  visible: overrides.visible ?? true,
});

const buildDoc = (): SVGDocument => ({
  id: 'doc-1',
  title: 'My Artwork',
  width: 800,
  height: 600,
  shapes: [
    shape({
      id: 's-rect',
      type: 'rect',
      name: 'Rect 1',
      x: 20,
      y: 30,
      width: 100,
      height: 50,
      rotation: 45,
      rx: 10,
    }),
    shape({
      id: 's-ellipse',
      type: 'ellipse',
      name: 'Ellipse 1',
      x: 200,
      y: 50,
      width: 80,
      height: 60,
      fill: { type: 'none', color: '', opacity: 0 },
    }),
    shape({
      id: 's-line',
      type: 'line',
      name: 'Line 1',
      x: 300,
      y: 50,
      width: 100,
      height: 30,
      stroke: {
        color: '#1e293b',
        width: 0,
        dashArray: '',
        cap: 'round',
        join: 'round',
      },
    }),
    shape({
      id: 's-path',
      type: 'path',
      name: 'Path 1',
      x: 50,
      y: 200,
      width: 80,
      height: 40,
      pathData: 'M0 0 L20 20',
      fill: { type: 'gradient', color: '', gradientId: 'g1', opacity: 1 },
    }),
    shape({
      id: 's-text',
      type: 'text',
      name: 'Text 1',
      x: 50,
      y: 300,
      width: 150,
      height: 24,
      text: 'Hello',
      fontFamily: 'Georgia',
      fontSize: 20,
      fontWeight: 'bold',
      fontStyle: 'italic',
      textDecoration: 'underline',
      textAlign: 'middle',
      fill: { type: 'solid', color: '#1e293b', opacity: 1 },
    }),
    shape({
      id: 's-poly',
      type: 'polygon',
      name: 'Poly 1',
      x: 250,
      y: 300,
      width: 60,
      height: 60,
      points: [
        { x: 0, y: 0 },
        { x: 30, y: 60 },
        { x: 60, y: 0 },
      ],
    }),
    shape({
      id: 's-star',
      type: 'star',
      name: 'Star 1',
      x: 350,
      y: 300,
      width: 60,
      height: 60,
      sides: 5,
      innerRadius: 20,
      outerRadius: 30,
    }),
    shape({
      id: 's-hidden',
      type: 'rect',
      name: 'Hidden',
      x: 500,
      y: 50,
      width: 40,
      height: 40,
    }),
  ],
  layers: [
    {
      id: 'l1',
      name: 'Main',
      visible: true,
      locked: false,
      shapeIds: [
        's-rect',
        's-ellipse',
        's-line',
        's-path',
        's-text',
        's-poly',
        's-star',
      ],
      blending: 'normal',
    },
    {
      id: 'l2',
      name: 'Hidden Layer',
      visible: false,
      locked: false,
      shapeIds: ['s-hidden'],
      blending: 'normal',
    },
  ],
  symbols: [],
  gradients: [
    {
      id: 'g1',
      type: 'linear',
      stops: [
        { color: '#3b82f6', offset: 0, opacity: 1 },
        { color: '#8b5cf6', offset: 1, opacity: 1 },
      ],
      x1: 0,
      y1: 0,
      x2: 1,
      y2: 1,
    },
    {
      id: 'g2',
      type: 'radial',
      stops: [
        { color: '#ffffff', offset: 0, opacity: 1 },
        { color: '#000000', offset: 1, opacity: 1 },
      ],
      cx: 0.5,
      cy: 0.5,
      r: 0.5,
    },
  ],
  createdAt: 1000,
  updatedAt: 2000,
});

const buildSymbol = (): SVGSymbol => ({
  id: 'sym-1',
  name: 'Star Symbol',
  width: 40,
  height: 40,
  shapes: [
    shape({ id: 'sym-a', type: 'rect', x: 0, y: 0, width: 20, height: 20 }),
    shape({
      id: 'sym-b',
      type: 'ellipse',
      x: 20,
      y: 20,
      width: 20,
      height: 20,
    }),
  ],
  createdAt: 1000,
});

const settings: SVGSettings = {
  theme: 'nothing',
  gridSize: 20,
  snapToGrid: false,
  showGrid: false,
  showRulers: true,
  exportFormat: 'svg',
  exportScale: 2,
};

const makeData = (symbols: SVGSymbol[] = [buildSymbol()]) => ({
  documents: [buildDoc()],
  symbols,
  settings,
  updateDocument: jest.fn().mockResolvedValue(undefined),
  addShape: jest.fn(),
  updateShape: jest.fn(),
  removeShape: jest.fn(),
  moveShape: jest.fn(),
  resizeShape: jest.fn(),
  duplicateShape: jest.fn(),
  updateLayers: jest.fn(),
  addLayer: jest.fn(),
  removeLayer: jest.fn(),
  renameLayer: jest.fn(),
  toggleLayerVisibility: jest.fn(),
  toggleLayerLock: jest.fn(),
  addSymbol: jest.fn(),
  removeSymbol: jest.fn(),
  updateSettings: jest.fn(),
  addGradient: jest.fn(),
  removeGradient: jest.fn(),
  saveHistory: jest.fn(),
  undo: jest.fn(),
  redo: jest.fn(),
});

const renderEditor = (symbols?: SVGSymbol[]) => {
  const data = makeData(symbols);
  jest.mocked(useData).mockReturnValue(data as never);
  render(<EditorPage />);
  const svg = document.querySelector('svg');
  return { data, svg: svg!, container: svg?.parentElement as HTMLDivElement };
};

const selectShape = (x: number, y: number) => {
  const svg = document.querySelector('svg') as SVGSVGElement;
  fireEvent.mouseDown(svg, { clientX: x, clientY: y });
};

describe('EditorPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    push.mockReset();
    searchParamsGet.mockReset();
    addToast.mockReset();
    searchParamsGet.mockReturnValue('doc-1');
  });

  it('shows a spinner when no document id is given', () => {
    searchParamsGet.mockReturnValue(null);
    renderEditor();
    expect(
      document.querySelector('.loading.loading-spinner')
    ).toBeInTheDocument();
  });

  it('shows a spinner when the document is not found', () => {
    searchParamsGet.mockReturnValue('missing');
    renderEditor();
    expect(
      document.querySelector('.loading.loading-spinner')
    ).toBeInTheDocument();
  });

  it('renders the header, tools, rulers and shapes', () => {
    const { svg } = renderEditor();
    expect(screen.getByText('My Artwork')).toBeInTheDocument();
    expect(screen.getByTitle('Select (V)')).toBeInTheDocument();
    expect(screen.getByTitle('Rectangle (R)')).toBeInTheDocument();
    expect(screen.getByTitle('Ellipse (E)')).toBeInTheDocument();
    expect(screen.getByTitle('Line (L)')).toBeInTheDocument();
    expect(screen.getByTitle('Pen (P)')).toBeInTheDocument();
    expect(screen.getByTitle('Pencil')).toBeInTheDocument();
    expect(screen.getByTitle('Text (T)')).toBeInTheDocument();
    expect(screen.getByTitle('Eyedropper')).toBeInTheDocument();
    expect(screen.getAllByText('100%')).toHaveLength(2);
    expect(screen.getByText('Fit')).toBeInTheDocument();
    expect(document.querySelectorAll('span.w-20')).toHaveLength(50);
    expect(document.querySelectorAll('linearGradient')).toHaveLength(1);
    expect(document.querySelectorAll('radialGradient')).toHaveLength(1);
    expect(
      document.querySelector('rect[data-shape-id="s-rect"]')
    ).toHaveAttribute('transform', 'rotate(45 70 55)');
    expect(document.querySelector('svg line')).toHaveAttribute(
      'stroke',
      'none'
    );
    const text = document.querySelector('svg text');
    expect(text).toHaveAttribute('font-family', 'Georgia');
    expect(text).toHaveTextContent('Hello');
    expect(
      document.querySelector('polygon[data-shape-id="s-poly"]')
    ).toHaveAttribute('points', '0,0 30,60 60,0');
    expect(
      document.querySelector('polygon[data-shape-id="s-star"]')
    ).toHaveAttribute('points', '');
    expect(
      document.querySelector('[data-shape-id="s-hidden"]')
    ).not.toBeInTheDocument();
    expect(screen.getByText(/8 shapes/)).toBeInTheDocument();
    expect(screen.getByText(/No selection/)).toBeInTheDocument();
  });

  it('draws a rectangle with the mouse', async () => {
    const { data, svg } = renderEditor();
    fireEvent.click(screen.getByTitle('Rectangle (R)'));
    fireEvent.mouseDown(svg, { clientX: 10, clientY: 10 });
    fireEvent.mouseMove(svg, { clientX: 110, clientY: 60 });
    fireEvent.mouseUp(svg);
    await waitFor(() =>
      expect(data.addShape).toHaveBeenCalledWith(
        'doc-1',
        expect.objectContaining({
          type: 'rect',
          x: 10,
          y: 10,
          width: 100,
          height: 50,
        })
      )
    );
  });

  it('does not add a shape smaller than 2px', () => {
    const { data, svg } = renderEditor();
    fireEvent.click(screen.getByTitle('Rectangle (R)'));
    fireEvent.mouseDown(svg, { clientX: 10, clientY: 10 });
    fireEvent.mouseMove(svg, { clientX: 11, clientY: 11 });
    fireEvent.mouseUp(svg);
    expect(data.addShape).not.toHaveBeenCalled();
  });

  it('draws an ellipse and a line', async () => {
    const { data, svg } = renderEditor();
    fireEvent.click(screen.getByTitle('Ellipse (E)'));
    fireEvent.mouseDown(svg, { clientX: 10, clientY: 10 });
    fireEvent.mouseMove(svg, { clientX: 60, clientY: 40 });
    fireEvent.mouseUp(svg);
    fireEvent.click(screen.getByTitle('Line (L)'));
    fireEvent.mouseDown(svg, { clientX: 10, clientY: 100 });
    fireEvent.mouseMove(svg, { clientX: 40, clientY: 120 });
    fireEvent.mouseUp(svg);
    await waitFor(() => {
      expect(data.addShape).toHaveBeenCalledWith(
        'doc-1',
        expect.objectContaining({ type: 'ellipse' })
      );
      expect(data.addShape).toHaveBeenCalledWith(
        'doc-1',
        expect.objectContaining({ type: 'line' })
      );
    });
  });

  it('snaps drawing coordinates to the grid when snap is enabled', async () => {
    const { data, svg } = renderEditor();
    fireEvent.click(screen.getByTitle('Snap to Grid'));
    fireEvent.click(screen.getByTitle('Rectangle (R)'));
    fireEvent.mouseDown(svg, { clientX: 10, clientY: 10 });
    fireEvent.mouseMove(svg, { clientX: 37, clientY: 42 });
    fireEvent.mouseUp(svg);
    await waitFor(() =>
      expect(data.addShape).toHaveBeenCalledWith(
        'doc-1',
        expect.objectContaining({ x: 10, y: 10, width: 30, height: 30 })
      )
    );
  });

  it('adds a text shape with the configured content', async () => {
    const { data, svg } = renderEditor();
    fireEvent.click(screen.getByTitle('Text (T)'));
    fireEvent.change(screen.getByDisplayValue('Text'), {
      target: { value: 'Hello SVG' },
    });
    fireEvent.change(screen.getByDisplayValue('Arial'), {
      target: { value: 'Courier' },
    });
    fireEvent.change(screen.getByDisplayValue('24'), {
      target: { value: '32' },
    });
    fireEvent.mouseDown(svg, { clientX: 400, clientY: 400 });
    await waitFor(() =>
      expect(data.addShape).toHaveBeenCalledWith(
        'doc-1',
        expect.objectContaining({
          type: 'text',
          text: 'Hello SVG',
          fontFamily: 'Courier',
          fontSize: 32,
        })
      )
    );
  });

  it('adds default text when no content is configured', async () => {
    const { data, svg } = renderEditor();
    fireEvent.click(screen.getByTitle('Text (T)'));
    fireEvent.mouseDown(svg, { clientX: 300, clientY: 300 });
    await waitFor(() =>
      expect(data.addShape).toHaveBeenCalledWith(
        'doc-1',
        expect.objectContaining({ type: 'text', text: 'Text', name: 'Text' })
      )
    );
  });

  it('closes a pen path by clicking the first point', async () => {
    const { data, svg } = renderEditor();
    fireEvent.click(screen.getByTitle('Pen (P)'));
    fireEvent.mouseDown(svg, { clientX: 100, clientY: 100 });
    fireEvent.mouseDown(svg, { clientX: 150, clientY: 140 });
    fireEvent.mouseDown(svg, { clientX: 120, clientY: 180 });
    expect(document.querySelectorAll('svg circle')).toHaveLength(3);
    fireEvent.click(document.querySelectorAll('svg circle')[0]);
    await waitFor(() =>
      expect(data.addShape).toHaveBeenCalledWith(
        'doc-1',
        expect.objectContaining({
          type: 'path',
          pathData: expect.stringContaining('Z'),
        })
      )
    );
  });

  it('clears pen points with Escape', () => {
    const { svg } = renderEditor();
    fireEvent.click(screen.getByTitle('Pen (P)'));
    fireEvent.mouseDown(svg, { clientX: 100, clientY: 100 });
    fireEvent.mouseDown(svg, { clientX: 150, clientY: 140 });
    expect(document.querySelector('svg polyline')).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(document.querySelector('svg polyline')).not.toBeInTheDocument();
  });

  it('commits a pencil path on mouse up', async () => {
    const { data, svg } = renderEditor();
    fireEvent.click(screen.getByTitle('Pencil'));
    fireEvent.mouseDown(svg, { clientX: 50, clientY: 50 });
    fireEvent.mouseMove(svg, { clientX: 60, clientY: 60 });
    fireEvent.mouseMove(svg, { clientX: 70, clientY: 70 });
    fireEvent.mouseUp(svg);
    await waitFor(() =>
      expect(data.addShape).toHaveBeenCalledWith(
        'doc-1',
        expect.objectContaining({ type: 'path', name: 'Pencil Path' })
      )
    );
  });

  it('selects a shape and shows its properties', async () => {
    renderEditor();
    selectShape(60, 40);
    await waitFor(() =>
      expect(screen.getByText(/1 selected/)).toBeInTheDocument()
    );
    fireEvent.click(screen.getByRole('button', { name: 'Props' }));
    await waitFor(() =>
      expect(screen.getByDisplayValue('Rect 1')).toBeInTheDocument()
    );
    expect(screen.getByDisplayValue('20')).toBeInTheDocument();
    expect(screen.getByDisplayValue('30')).toBeInTheDocument();
    expect(screen.getByDisplayValue('100')).toBeInTheDocument();
    expect(screen.getByDisplayValue('50')).toBeInTheDocument();
    expect(screen.getByDisplayValue('45')).toBeInTheDocument();
    expect(screen.getAllByDisplayValue('#3b82f6')).toHaveLength(2);
    expect(screen.getAllByDisplayValue('#1e293b')).toHaveLength(2);
    expect(screen.getByDisplayValue('10')).toBeInTheDocument();
    expect(screen.getAllByRole('combobox')).toHaveLength(2);
  });

  it('deselects when clicking empty canvas', async () => {
    renderEditor();
    selectShape(60, 40);
    fireEvent.click(screen.getByRole('button', { name: 'Props' }));
    await waitFor(() =>
      expect(screen.getByDisplayValue('Rect 1')).toBeInTheDocument()
    );
    selectShape(700, 500);
    await waitFor(() =>
      expect(screen.getByText(/No selection/)).toBeInTheDocument()
    );
  });

  it('multi-selects with shift and shows the count', async () => {
    renderEditor();
    selectShape(60, 40);
    await waitFor(() =>
      expect(screen.getByText(/1 selected/)).toBeInTheDocument()
    );
    fireEvent.mouseDown(document.querySelector('svg')!, {
      clientX: 240,
      clientY: 80,
      shiftKey: true,
    });
    await waitFor(() =>
      expect(screen.getByText(/2 selected/)).toBeInTheDocument()
    );
  });

  it('shows the empty properties panel without a selection', () => {
    renderEditor();
    fireEvent.click(screen.getByRole('button', { name: 'Props' }));
    expect(
      screen.getByText('Select a shape to edit properties')
    ).toBeInTheDocument();
  });

  it('edits the selected shape properties', async () => {
    const { data } = renderEditor();
    selectShape(60, 40);
    fireEvent.click(screen.getByRole('button', { name: 'Props' }));
    await waitFor(() =>
      expect(screen.getByDisplayValue('Rect 1')).toBeInTheDocument()
    );
    fireEvent.change(screen.getByDisplayValue('Rect 1'), {
      target: { value: 'Renamed Rect' },
    });
    fireEvent.change(screen.getByDisplayValue('20'), {
      target: { value: '40' },
    });
    fireEvent.change(screen.getByDisplayValue('100'), {
      target: { value: '120' },
    });
    fireEvent.change(screen.getByDisplayValue('45'), {
      target: { value: '90' },
    });
    fireEvent.change(document.querySelector('input[type="range"]')!, {
      target: { value: '0.5' },
    });
    fireEvent.change(screen.getAllByDisplayValue('#3b82f6')[1], {
      target: { value: '#ff0000' },
    });
    fireEvent.click(screen.getByTitle('No Fill'));
    fireEvent.change(screen.getAllByDisplayValue('#1e293b')[1], {
      target: { value: '#00ff00' },
    });
    fireEvent.change(screen.getByDisplayValue('2'), {
      target: { value: '5' },
    });
    const [capSelect, joinSelect] = screen.getAllByRole('combobox');
    fireEvent.change(capSelect, { target: { value: 'square' } });
    fireEvent.change(joinSelect, { target: { value: 'bevel' } });
    fireEvent.change(screen.getByPlaceholderText('e.g. 5 5'), {
      target: { value: '5 5' },
    });
    fireEvent.change(screen.getByDisplayValue('10'), {
      target: { value: '15' },
    });
    await waitFor(() => {
      expect(data.updateShape).toHaveBeenCalledWith(
        'doc-1',
        expect.objectContaining({ id: 's-rect', name: 'Renamed Rect' })
      );
      expect(data.moveShape).toHaveBeenCalledWith('doc-1', 's-rect', 40, 30);
      expect(data.resizeShape).toHaveBeenCalledWith('doc-1', 's-rect', 120, 50);
      expect(data.updateShape).toHaveBeenCalledWith(
        'doc-1',
        expect.objectContaining({ id: 's-rect', rotation: 90 })
      );
      expect(data.updateShape).toHaveBeenCalledWith(
        'doc-1',
        expect.objectContaining({ id: 's-rect', opacity: 0.5 })
      );
      expect(data.updateShape).toHaveBeenCalledWith(
        'doc-1',
        expect.objectContaining({
          fill: expect.objectContaining({ type: 'solid', color: '#ff0000' }),
        })
      );
      expect(data.updateShape).toHaveBeenCalledWith(
        'doc-1',
        expect.objectContaining({
          fill: expect.objectContaining({ type: 'none' }),
        })
      );
      expect(data.updateShape).toHaveBeenCalledWith(
        'doc-1',
        expect.objectContaining({
          stroke: expect.objectContaining({ color: '#00ff00' }),
        })
      );
      expect(data.updateShape).toHaveBeenCalledWith(
        'doc-1',
        expect.objectContaining({
          stroke: expect.objectContaining({ width: 5 }),
        })
      );
      expect(data.updateShape).toHaveBeenCalledWith(
        'doc-1',
        expect.objectContaining({
          stroke: expect.objectContaining({ cap: 'square' }),
        })
      );
      expect(data.updateShape).toHaveBeenCalledWith(
        'doc-1',
        expect.objectContaining({
          stroke: expect.objectContaining({ join: 'bevel' }),
        })
      );
      expect(data.updateShape).toHaveBeenCalledWith(
        'doc-1',
        expect.objectContaining({
          stroke: expect.objectContaining({ dashArray: '5 5' }),
        })
      );
      expect(data.updateShape).toHaveBeenCalledWith(
        'doc-1',
        expect.objectContaining({ id: 's-rect', rx: 15 })
      );
    });
  });

  it('edits the y, height and color inputs from the props panel', async () => {
    const { data } = renderEditor();
    selectShape(60, 40);
    fireEvent.click(screen.getByRole('button', { name: 'Props' }));
    await waitFor(() =>
      expect(screen.getByDisplayValue('Rect 1')).toBeInTheDocument()
    );
    fireEvent.change(screen.getByDisplayValue('30'), {
      target: { value: '55' },
    });
    expect(data.moveShape).toHaveBeenCalledWith('doc-1', 's-rect', 20, 55);
    fireEvent.change(screen.getByDisplayValue('50'), {
      target: { value: '60' },
    });
    expect(data.resizeShape).toHaveBeenCalledWith('doc-1', 's-rect', 100, 60);
    const colorInputs = document.querySelectorAll('input[type="color"]');
    fireEvent.change(colorInputs[0], { target: { value: '#ff0000' } });
    fireEvent.change(colorInputs[1], { target: { value: '#00ff00' } });
    await waitFor(() => {
      expect(data.updateShape).toHaveBeenCalledWith(
        'doc-1',
        expect.objectContaining({
          fill: expect.objectContaining({ color: '#ff0000' }),
        })
      );
      expect(data.updateShape).toHaveBeenCalledWith(
        'doc-1',
        expect.objectContaining({
          stroke: expect.objectContaining({ color: '#00ff00' }),
        })
      );
    });
  });

  it('toggles a shape out of the selection with shift+click', () => {
    renderEditor();
    selectShape(60, 40);
    expect(screen.getByText(/1 selected/)).toBeInTheDocument();
    fireEvent.mouseDown(document.querySelector('svg')!, {
      clientX: 60,
      clientY: 40,
      shiftKey: true,
    });
    expect(screen.getByText(/No selection/)).toBeInTheDocument();
  });

  it('resizes a shape with snapping enabled', () => {
    const { data, svg } = renderEditor();
    fireEvent.click(screen.getByTitle('Snap to Grid'));
    selectShape(60, 40);
    fireEvent.click(screen.getByRole('button', { name: 'Props' }));
    const handles = document.querySelectorAll('svg rect.cursor-pointer');
    fireEvent.mouseDown(handles[2], { clientX: 120, clientY: 80 });
    fireEvent.mouseMove(svg, { clientX: 133, clientY: 93 });
    fireEvent.mouseUp(svg);
    expect(data.resizeShape).toHaveBeenCalledWith('doc-1', 's-rect', 120, 60);
  });

  it('renders symbol previews for every shape type', () => {
    const sym: SVGSymbol = {
      id: 'sym-all',
      name: 'All Shapes Symbol',
      width: 40,
      height: 40,
      shapes: [
        shape({ type: 'path', id: 'p1', pathData: 'M0 0 L10 10' }),
        shape({ type: 'line', id: 'l1', x: 0, y: 0, width: 10, height: 10 }),
        shape({ type: 'star', id: 'st1', x: 0, y: 0, width: 10, height: 10 }),
        shape({
          type: 'polygon',
          id: 'pl1',
          x: 0,
          y: 0,
          width: 10,
          height: 10,
          points: [{ x: 0, y: 0 }],
        }),
      ],
      createdAt: 1000,
    };
    renderEditor([sym]);
    fireEvent.click(screen.getByRole('button', { name: 'Symbols' }));
    expect(screen.getByText('All Shapes Symbol')).toBeInTheDocument();
  });

  it('edits text shape properties', async () => {
    const { data } = renderEditor();
    selectShape(100, 310);
    fireEvent.click(screen.getByRole('button', { name: 'Props' }));
    await waitFor(() =>
      expect(screen.getByDisplayValue('Hello')).toBeInTheDocument()
    );
    fireEvent.change(screen.getByDisplayValue('Hello'), {
      target: { value: 'World' },
    });
    const combos = screen.getAllByRole('combobox');
    fireEvent.change(combos[2], { target: { value: 'Courier' } });
    fireEvent.change(screen.getByDisplayValue('20'), {
      target: { value: '24' },
    });
    await waitFor(() => {
      expect(data.updateShape).toHaveBeenCalledWith(
        'doc-1',
        expect.objectContaining({ id: 's-text', text: 'World' })
      );
      expect(data.updateShape).toHaveBeenCalledWith(
        'doc-1',
        expect.objectContaining({ id: 's-text', fontFamily: 'Courier' })
      );
      expect(data.updateShape).toHaveBeenCalledWith(
        'doc-1',
        expect.objectContaining({ id: 's-text', fontSize: 24 })
      );
    });
  });

  it('duplicates and deletes the selected shape', async () => {
    const { data } = renderEditor();
    selectShape(60, 40);
    fireEvent.click(screen.getByRole('button', { name: 'Props' }));
    await waitFor(() =>
      expect(screen.getByDisplayValue('Rect 1')).toBeInTheDocument()
    );
    fireEvent.click(screen.getByText('Duplicate'));
    expect(data.duplicateShape).toHaveBeenCalledWith('doc-1', 's-rect');
    expect(addToast).toHaveBeenCalledWith('Shape duplicated', 'success');
    fireEvent.click(screen.getByText('Delete'));
    expect(data.removeShape).toHaveBeenCalledWith('doc-1', 's-rect');
    expect(addToast).toHaveBeenCalledWith('Shape deleted', 'success');
    await waitFor(() =>
      expect(screen.getByText(/No selection/)).toBeInTheDocument()
    );
  });

  it('resizes a shape with the se handle', async () => {
    const { data, svg } = renderEditor();
    selectShape(60, 40);
    fireEvent.click(screen.getByRole('button', { name: 'Props' }));
    await waitFor(() =>
      expect(screen.getByDisplayValue('Rect 1')).toBeInTheDocument()
    );
    const handles = document.querySelectorAll('svg rect.cursor-pointer');
    expect(handles).toHaveLength(4);
    fireEvent.mouseDown(handles[2], { clientX: 120, clientY: 80 });
    fireEvent.mouseMove(svg, { clientX: 130, clientY: 90 });
    fireEvent.mouseUp(svg);
    expect(data.moveShape).toHaveBeenCalledWith('doc-1', 's-rect', 20, 30);
    expect(data.resizeShape).toHaveBeenCalledWith('doc-1', 's-rect', 110, 60);
  });

  it('resizes a shape with the nw handle', () => {
    const { data, svg } = renderEditor();
    selectShape(60, 40);
    const handles = document.querySelectorAll('svg rect.cursor-pointer');
    fireEvent.mouseDown(handles[0], { clientX: 20, clientY: 30 });
    fireEvent.mouseMove(svg, { clientX: 10, clientY: 15 });
    fireEvent.mouseUp(svg);
    expect(data.moveShape).toHaveBeenCalledWith('doc-1', 's-rect', 10, 15);
    expect(data.resizeShape).toHaveBeenCalledWith('doc-1', 's-rect', 110, 65);
  });

  it('handles keyboard tool shortcuts', async () => {
    const { data, svg } = renderEditor();
    fireEvent.keyDown(window, { key: 'v' });
    fireEvent.keyDown(window, { key: 'r' });
    fireEvent.mouseDown(svg, { clientX: 10, clientY: 10 });
    fireEvent.mouseMove(svg, { clientX: 60, clientY: 40 });
    fireEvent.mouseUp(svg);
    fireEvent.keyDown(window, { key: 'e' });
    fireEvent.keyDown(window, { key: 'l' });
    fireEvent.keyDown(window, { key: 'p' });
    fireEvent.keyDown(window, { key: 't' });
    await waitFor(() =>
      expect(data.addShape).toHaveBeenCalledWith(
        'doc-1',
        expect.objectContaining({ type: 'rect' })
      )
    );
  });

  it('selects all with ctrl+a and deletes with Delete', () => {
    const { data } = renderEditor();
    fireEvent.keyDown(window, { key: 'a', ctrlKey: true });
    expect(screen.getByText(/8 selected/)).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'Delete' });
    expect(data.removeShape).toHaveBeenCalledTimes(8);
    expect(screen.getByText(/No selection/)).toBeInTheDocument();
  });

  it('does not delete when nothing is selected', () => {
    const { data } = renderEditor();
    fireEvent.keyDown(window, { key: 'Backspace' });
    expect(data.removeShape).not.toHaveBeenCalled();
  });

  it('handles undo, redo and duplicate keyboard shortcuts', () => {
    const { data } = renderEditor();
    selectShape(60, 40);
    fireEvent.keyDown(window, { key: 'z', ctrlKey: true });
    expect(data.undo).toHaveBeenCalledWith('doc-1');
    fireEvent.keyDown(window, { key: 'z', ctrlKey: true, shiftKey: true });
    expect(data.redo).toHaveBeenCalledWith('doc-1');
    fireEvent.keyDown(window, { key: 'd', ctrlKey: true });
    expect(data.duplicateShape).toHaveBeenCalledWith('doc-1', 's-rect');
  });

  it('copies the svg with ctrl+c', async () => {
    renderEditor();
    fireEvent.keyDown(window, { key: 'c', ctrlKey: true });
    await waitFor(() =>
      expect(addToast).toHaveBeenCalledWith(
        'SVG copied to clipboard',
        'success'
      )
    );
    expect(copyToClipboard).toHaveBeenCalled();
  });

  it('toggles panning with the space bar', () => {
    const { svg, container } = renderEditor();
    fireEvent.keyDown(window, { key: ' ', code: 'Space' });
    fireEvent.mouseDown(container, { clientX: 100, clientY: 100 });
    fireEvent.mouseMove(window, { clientX: 120, clientY: 130 });
    fireEvent.mouseUp(window);
    fireEvent.keyUp(window, { key: ' ', code: 'Space' });
    expect(svg.getAttribute('viewBox')).toBe('-20 -30 800 600');
  });

  it('returns early from selection when panning', () => {
    const { container } = renderEditor();
    fireEvent.keyDown(window, { key: ' ', code: 'Space' });
    fireEvent.mouseDown(container, { clientX: 100, clientY: 100 });
    selectShape(60, 40);
    expect(screen.getByText(/No selection/)).toBeInTheDocument();
  });

  it('zooms with the wheel and resets zoom', () => {
    const { svg } = renderEditor();
    fireEvent.wheel(svg, { deltaY: 100 });
    expect(screen.getByText('90%')).toBeInTheDocument();
    fireEvent.click(screen.getByText('100%'));
    expect(screen.getAllByText('100%')).toHaveLength(2);
    fireEvent.wheel(svg, { deltaY: -100 });
    fireEvent.click(screen.getByText('Fit'));
    expect(screen.getAllByText('100%')).toHaveLength(2);
  });

  it('toggles grid and updates settings', async () => {
    const { data } = renderEditor();
    expect(document.querySelector('#grid')).not.toBeInTheDocument();
    fireEvent.click(screen.getByTitle('Toggle Grid'));
    await waitFor(() =>
      expect(data.updateSettings).toHaveBeenCalledWith({ showGrid: true })
    );
    expect(document.querySelector('#grid')).toBeInTheDocument();
    expect(
      document.querySelector('rect[fill="url(#grid)"]')
    ).toBeInTheDocument();
  });

  it('toggles preview mode', () => {
    renderEditor();
    expect(document.querySelectorAll('span.w-20')).toHaveLength(50);
    fireEvent.click(screen.getByTitle('Preview Mode'));
    expect(document.querySelectorAll('span.w-20')).toHaveLength(0);
    expect(
      document.querySelector('[data-shape-id="s-hidden"]')
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Props' })
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByTitle('Preview Mode'));
    expect(document.querySelectorAll('span.w-20')).toHaveLength(50);
  });

  it('copies and exports the svg from the header', async () => {
    renderEditor();
    fireEvent.click(screen.getByTitle('Copy SVG'));
    await waitFor(() =>
      expect(addToast).toHaveBeenCalledWith(
        'SVG copied to clipboard',
        'success'
      )
    );
    fireEvent.click(screen.getByTitle('Export SVG'));
    expect(downloadFile).toHaveBeenCalledWith('<svg />', 'My Artwork.svg');
    expect(addToast).toHaveBeenCalledWith('Exported as SVG', 'success');
  });

  it('navigates back and to the code editor', () => {
    renderEditor();
    fireEvent.click(screen.getByTitle('SVG Code'));
    expect(push).toHaveBeenCalledWith('/edit/code?id=doc-1');
    fireEvent.click(screen.getByTestId('FiArrowLeft').closest('button')!);
    expect(push).toHaveBeenCalledWith('/');
  });

  it('uses undo and redo buttons', () => {
    const { data } = renderEditor();
    fireEvent.click(screen.getByTitle('Undo (Ctrl+Z)'));
    expect(data.undo).toHaveBeenCalledWith('doc-1');
    fireEvent.click(screen.getByTitle('Redo (Ctrl+Shift+Z)'));
    expect(data.redo).toHaveBeenCalledWith('doc-1');
  });

  it('manages layers from the layers panel', async () => {
    const { data } = renderEditor();
    expect(screen.getByText('Main')).toBeInTheDocument();
    expect(screen.getByText('Hidden Layer')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('FiPlus').closest('button')!);
    expect(data.addLayer).toHaveBeenCalledWith('doc-1', 'Layer 3');
    fireEvent.click(screen.getAllByTestId('FiEye')[1].closest('button')!);
    expect(data.toggleLayerVisibility).toHaveBeenCalledWith('doc-1', 'l1');
    fireEvent.click(screen.getAllByTestId('FiUnlock')[1].closest('button')!);
    expect(data.toggleLayerLock).toHaveBeenCalledWith('doc-1', 'l1');
    fireEvent.click(screen.getAllByTestId('FiTrash2')[1].closest('button')!);
    expect(data.removeLayer).toHaveBeenCalledWith('doc-1', 'l1');
  });

  it('shows the empty symbols library', () => {
    renderEditor([]);
    fireEvent.click(screen.getByRole('button', { name: 'Symbols' }));
    expect(
      screen.getByText('No symbols yet. Create one from a selection.')
    ).toBeInTheDocument();
  });

  it('renders symbols and creates one from a selection', async () => {
    const { data } = renderEditor();
    selectShape(60, 40);
    fireEvent.click(screen.getByRole('button', { name: 'Props' }));
    await waitFor(() =>
      expect(screen.getByDisplayValue('Rect 1')).toBeInTheDocument()
    );
    fireEvent.click(screen.getByRole('button', { name: 'Symbols' }));
    expect(screen.getByText('Star Symbol')).toBeInTheDocument();
    const dt = { setData: jest.fn() };
    fireEvent.dragStart(screen.getByText('Drag'), { dataTransfer: dt });
    expect(dt.setData).toHaveBeenCalledWith('symbolId', 'sym-1');
    fireEvent.click(screen.getByText('Create Symbol from Selection'));
    await waitFor(() => {
      expect(data.addSymbol).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'Symbol 2' })
      );
      expect(addToast).toHaveBeenCalledWith('Symbol created', 'success');
    });
  });

  it('drops a symbol onto the canvas', async () => {
    const { data, container } = renderEditor();
    fireEvent.dragOver(container);
    fireEvent.drop(container, {
      dataTransfer: {
        getData: (t: string) => (t === 'symbolId' ? 'sym-1' : ''),
      },
    });
    await waitFor(() => expect(data.addShape).toHaveBeenCalledTimes(2));
    expect(data.addShape).toHaveBeenCalledWith(
      'doc-1',
      expect.objectContaining({ symbolId: 'sym-1' })
    );
  });
});
