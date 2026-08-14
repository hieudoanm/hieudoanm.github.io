import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EditorPage from '@/app/edit/page';
import { useData } from '@/providers/DataProvider';
import {
  exportAsSVG,
  downloadFile,
  downloadBlob,
  rasterizeSVG,
  copyToClipboard,
} from '@/utils/format';
import type { ReactNode } from 'react';
import type {
  SVGDocument,
  SVGShape,
  SVGSymbol,
  SVGSettings,
  SVGLayer,
  SVGGradientStop,
} from '@/types';

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
    'FiCheck',
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
    'FiFolder',
    'FiFolderPlus',
    'FiChevronRight',
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
  downloadBlob: jest.fn(),
  copyToClipboard: jest.fn().mockResolvedValue(true),
  rasterizeSVG: jest.fn().mockResolvedValue(new Blob()),
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

const buildFolderDoc = (): SVGDocument => {
  const doc = buildDoc();
  return {
    ...doc,
    layers: [
      {
        id: 'l1',
        name: 'Main',
        visible: true,
        locked: false,
        shapeIds: ['s-rect'],
        blending: 'normal',
      },
      {
        id: 'f1',
        name: 'Folder',
        visible: true,
        locked: false,
        shapeIds: [],
        blending: 'normal',
        isFolder: true,
      },
      {
        id: 'l2',
        name: 'Inside',
        visible: true,
        locked: false,
        shapeIds: [],
        blending: 'normal',
        parentId: 'f1',
      },
    ],
  };
};

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

let rerenderEditor: (() => void) | null = null;

const makeData = (
  symbols: SVGSymbol[] = [buildSymbol()],
  doc: SVGDocument = buildDoc()
) => {
  const data = {
    documents: [doc],
    symbols,
    settings,
    updateDocument: jest.fn(async (d: SVGDocument) => {
      data.documents = [d];
      rerenderEditor?.();
    }),
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
    updateSymbol: jest.fn(),
    removeSymbol: jest.fn(),
    updateSettings: jest.fn(),
    addGradient: jest.fn(),
    updateGradient: jest.fn(),
    removeGradient: jest.fn(),
    saveHistory: jest.fn(),
    undo: jest.fn(),
    redo: jest.fn(),
  };
  return data;
};

const renderEditor = (symbols?: SVGSymbol[], doc?: SVGDocument) => {
  const data = makeData(symbols, doc);
  jest.mocked(useData).mockReturnValue(data as never);
  const utils = render(<EditorPage />);
  rerenderEditor = () => utils.rerender(<EditorPage />);
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
    fireEvent.mouseUp(svg);
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
    fireEvent.mouseUp(svg);
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

  describe('fill and gradient controls', () => {
    const gradientDoc = (
      stops: SVGGradientStop[] = [
        { color: '#3b82f6', offset: 0, opacity: 1 },
        { color: '#8b5cf6', offset: 1, opacity: 1 },
      ]
    ): SVGDocument => {
      const doc = buildDoc();
      return {
        ...doc,
        shapes: doc.shapes.map((s) =>
          s.id === 's-rect'
            ? {
                ...s,
                fill: {
                  type: 'gradient' as const,
                  color: '',
                  gradientId: 'g1',
                  opacity: 1,
                },
              }
            : s
        ),
        gradients: doc.gradients.map((g) =>
          g.id === 'g1' ? { ...g, stops } : g
        ),
      };
    };

    const openProps = async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Props' }));
      await waitFor(() =>
        expect(screen.getByDisplayValue('Rect 1')).toBeInTheDocument()
      );
    };

    it('applies a palette swatch to the selection and records a recent color', async () => {
      const { data } = renderEditor();
      selectShape(60, 40);
      await openProps();
      fireEvent.click(screen.getByTitle('#ef4444'));
      expect(data.updateShape).toHaveBeenCalledWith(
        'doc-1',
        expect.objectContaining({
          fill: expect.objectContaining({ type: 'solid', color: '#ef4444' }),
        })
      );
      expect(screen.getByTitle('Recent #ef4444')).toBeInTheDocument();
    });

    it('dedupes recent colors and keeps the newest first', async () => {
      renderEditor();
      selectShape(60, 40);
      await openProps();
      fireEvent.click(screen.getByTitle('#ef4444'));
      fireEvent.click(screen.getByTitle('#22c55e'));
      fireEvent.click(screen.getByTitle('#ef4444'));
      const recents = screen.getAllByTitle(/^Recent /);
      expect(recents).toHaveLength(2);
      expect(recents[0]).toHaveAttribute('title', 'Recent #ef4444');
    });

    it('switches a solid fill to gradient and creates a shared gradient', async () => {
      const { data } = renderEditor();
      selectShape(60, 40);
      await openProps();
      fireEvent.click(screen.getByRole('button', { name: 'Gradient' }));
      expect(data.addGradient).toHaveBeenCalledWith(
        'doc-1',
        expect.objectContaining({ type: 'linear' })
      );
      const gradientId = data.addGradient.mock.calls[0][1].id;
      expect(data.updateShape).toHaveBeenCalledWith(
        'doc-1',
        expect.objectContaining({
          fill: expect.objectContaining({ type: 'gradient', gradientId }),
        })
      );
    });

    it('removes a fill entirely', async () => {
      const { data } = renderEditor();
      selectShape(60, 40);
      await openProps();
      fireEvent.click(screen.getByTitle('No Fill'));
      expect(data.updateShape).toHaveBeenCalledWith(
        'doc-1',
        expect.objectContaining({
          fill: expect.objectContaining({ type: 'none' }),
        })
      );
    });

    it('edits gradient stop colors and offsets', async () => {
      const { data } = renderEditor(undefined, gradientDoc());
      selectShape(60, 40);
      await openProps();
      const editor = document.querySelector('.space-y-2')!;
      const stopColors = editor.querySelectorAll('input[type="color"]');
      expect(stopColors).toHaveLength(2);
      fireEvent.change(stopColors[0], { target: { value: '#ff0000' } });
      expect(data.updateGradient).toHaveBeenCalledWith(
        'doc-1',
        expect.objectContaining({
          id: 'g1',
          stops: expect.arrayContaining([
            expect.objectContaining({ color: '#ff0000' }),
          ]),
        })
      );
      const ranges = editor.querySelectorAll('input[type="range"]');
      fireEvent.change(ranges[1], { target: { value: '75' } });
      expect(data.updateGradient).toHaveBeenCalledWith(
        'doc-1',
        expect.objectContaining({
          stops: expect.arrayContaining([
            expect.objectContaining({ offset: 0.75 }),
          ]),
        })
      );
    });

    it('adds and removes gradient stops', async () => {
      const { data } = renderEditor(undefined, gradientDoc());
      selectShape(60, 40);
      await openProps();
      fireEvent.click(screen.getByRole('button', { name: 'Add Stop' }));
      let last = data.updateGradient.mock.calls.at(-1)!;
      expect(last[1].stops).toHaveLength(3);
      expect(last[1].stops[1].color).toBe('#636ff6');
    });

    it('removes a gradient stop when there are more than two', async () => {
      const { data } = renderEditor(
        undefined,
        gradientDoc([
          { color: '#3b82f6', offset: 0, opacity: 1 },
          { color: '#636ff6', offset: 0.5, opacity: 1 },
          { color: '#8b5cf6', offset: 1, opacity: 1 },
        ])
      );
      selectShape(60, 40);
      await openProps();
      fireEvent.click(screen.getByTitle('Remove stop 2'));
      const last = data.updateGradient.mock.calls.at(-1)!;
      expect(last[1].stops).toHaveLength(2);
      expect(
        last[1].stops.some((s: SVGGradientStop) => s.color === '#636ff6')
      ).toBe(false);
    });

    it('switches the active gradient between linear and radial', async () => {
      const { data } = renderEditor(undefined, gradientDoc());
      selectShape(60, 40);
      await openProps();
      fireEvent.click(screen.getByRole('button', { name: 'Radial' }));
      expect(data.updateGradient).toHaveBeenCalledWith(
        'doc-1',
        expect.objectContaining({ id: 'g1', type: 'radial', r: 0.5 })
      );
      fireEvent.click(screen.getByRole('button', { name: 'Linear' }));
      expect(data.updateGradient).toHaveBeenCalledWith(
        'doc-1',
        expect.objectContaining({ id: 'g1', type: 'linear' })
      );
    });

    it('renders gradient handles on the canvas and drags them to update the gradient', () => {
      const { data, svg } = renderEditor(undefined, gradientDoc());
      selectShape(60, 40);
      const handles = document.querySelectorAll('circle.cursor-grab');
      expect(handles).toHaveLength(2);
      fireEvent.mouseDown(handles[0], { clientX: 20, clientY: 30 });
      fireEvent.mouseMove(svg, { clientX: 45, clientY: 40 });
      fireEvent.mouseUp(svg);
      expect(data.updateGradient).toHaveBeenCalledWith(
        'doc-1',
        expect.objectContaining({ id: 'g1', x1: 0.25, y1: 0.2 })
      );
    });

    it('samples a color with the eyedropper and applies it to the selection', async () => {
      const { data } = renderEditor();
      selectShape(60, 40);
      fireEvent.click(screen.getByTitle('Eyedropper'));
      fireEvent.mouseDown(document.querySelector('svg')!, {
        clientX: 60,
        clientY: 210,
      });
      expect(data.updateShape).toHaveBeenCalledWith(
        'doc-1',
        expect.objectContaining({
          fill: expect.objectContaining({ type: 'solid', color: '#3b82f6' }),
        })
      );
      fireEvent.click(screen.getByRole('button', { name: 'Props' }));
      await waitFor(() =>
        expect(screen.getByTitle('Recent #3b82f6')).toBeInTheDocument()
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

  it('drags a selected shape to move it', () => {
    const { data, svg } = renderEditor();
    fireEvent.mouseDown(svg, { clientX: 60, clientY: 40 });
    fireEvent.mouseMove(svg, { clientX: 100, clientY: 70 });
    fireEvent.mouseMove(svg, { clientX: 100, clientY: 70 });
    fireEvent.mouseUp(svg);
    expect(data.saveHistory).toHaveBeenCalledWith('doc-1', 'move shape');
    expect(data.moveShape).toHaveBeenCalledWith('doc-1', 's-rect', 60, 60);
  });

  it('snaps to alignment guides while dragging', () => {
    const { data, svg } = renderEditor();
    fireEvent.mouseDown(svg, { clientX: 60, clientY: 40 });
    fireEvent.mouseMove(svg, { clientX: 91, clientY: 300 });
    fireEvent.mouseMove(svg, { clientX: 91, clientY: 300 });
    const alignLines = document.querySelectorAll('line[stroke="#3b82f6"]');
    expect(alignLines).toHaveLength(2);
    fireEvent.mouseUp(svg);
    expect(data.moveShape).toHaveBeenCalledWith('doc-1', 's-rect', 50, 287);
  });

  it('creates a vertical guide by dragging from the top ruler', () => {
    renderEditor();
    const ruler = document.querySelector('.cursor-col-resize') as HTMLElement;
    fireEvent.mouseDown(ruler, { clientX: 10, clientY: 0 });
    fireEvent.mouseMove(window, { clientX: 200, clientY: 150 });
    fireEvent.mouseUp(window, { clientX: 200, clientY: 150 });
    const guides = document.querySelectorAll('line[stroke="#e11d48"]');
    expect(guides).toHaveLength(1);
    expect(guides[0].getAttribute('x1')).toBe('200');
  });

  it('creates a horizontal guide by dragging from the left ruler', () => {
    renderEditor();
    const ruler = document.querySelector('.cursor-row-resize') as HTMLElement;
    fireEvent.mouseDown(ruler, { clientX: 0, clientY: 10 });
    fireEvent.mouseMove(window, { clientX: 300, clientY: 250 });
    fireEvent.mouseUp(window, { clientX: 300, clientY: 250 });
    const guides = document.querySelectorAll('line[stroke="#e11d48"]');
    expect(guides).toHaveLength(1);
    expect(guides[0].getAttribute('y1')).toBe('250');
  });

  it('drops a guide when it is released outside the canvas', () => {
    renderEditor();
    const ruler = document.querySelector('.cursor-col-resize') as HTMLElement;
    fireEvent.mouseDown(ruler, { clientX: 10, clientY: 0 });
    fireEvent.mouseMove(window, { clientX: 850, clientY: 150 });
    fireEvent.mouseUp(window, { clientX: 850, clientY: 150 });
    expect(document.querySelectorAll('line[stroke="#e11d48"]')).toHaveLength(0);
  });

  it('moves an existing guide by dragging it', () => {
    renderEditor();
    const ruler = document.querySelector('.cursor-col-resize') as HTMLElement;
    fireEvent.mouseDown(ruler, { clientX: 10, clientY: 0 });
    fireEvent.mouseMove(window, { clientX: 200, clientY: 150 });
    fireEvent.mouseUp(window, { clientX: 200, clientY: 150 });
    const guide = document.querySelector(
      'line[stroke="#e11d48"]'
    ) as HTMLElement;
    fireEvent.mouseDown(guide, { clientX: 200, clientY: 150 });
    fireEvent.mouseMove(window, { clientX: 400, clientY: 150 });
    fireEvent.mouseUp(window, { clientX: 400, clientY: 150 });
    const guides = document.querySelectorAll('line[stroke="#e11d48"]');
    expect(guides).toHaveLength(1);
    expect(guides[0].getAttribute('x1')).toBe('400');
  });

  it('removes a guide with double click', () => {
    renderEditor();
    const ruler = document.querySelector('.cursor-col-resize') as HTMLElement;
    fireEvent.mouseDown(ruler, { clientX: 10, clientY: 0 });
    fireEvent.mouseMove(window, { clientX: 200, clientY: 150 });
    fireEvent.mouseUp(window, { clientX: 200, clientY: 150 });
    const guide = document.querySelector(
      'line[stroke="#e11d48"]'
    ) as HTMLElement;
    fireEvent.doubleClick(guide);
    expect(document.querySelectorAll('line[stroke="#e11d48"]')).toHaveLength(0);
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
    fireEvent.click(screen.getByTitle('Export'));
    expect(downloadFile).toHaveBeenCalledWith('<svg />', 'My Artwork.svg');
    expect(addToast).toHaveBeenCalledWith('Exported as SVG', 'success');
  });

  it('exports PNG at the requested scale from the export menu', async () => {
    renderEditor();
    fireEvent.click(screen.getByTitle('Export options'));
    expect(screen.getByText('Selection only')).toBeInTheDocument();
    fireEvent.click(screen.getByText('PNG 2x'));
    await waitFor(() => {
      expect(rasterizeSVG).toHaveBeenCalledWith(
        '<svg />',
        expect.objectContaining({ scale: 2, type: 'image/png' })
      );
      expect(downloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'My Artwork.png'
      );
      expect(addToast).toHaveBeenCalledWith('Exported as PNG 2x', 'success');
    });
  });

  it('exports JPEG with the configured quality from the export menu', async () => {
    renderEditor();
    fireEvent.click(screen.getByTitle('Export options'));
    fireEvent.click(screen.getByText('JPEG High'));
    await waitFor(() => {
      expect(rasterizeSVG).toHaveBeenCalledWith(
        '<svg />',
        expect.objectContaining({ scale: 2, type: 'image/jpeg', quality: 0.92 })
      );
      expect(downloadBlob).toHaveBeenCalledWith(
        expect.any(Blob),
        'My Artwork.jpeg'
      );
      expect(addToast).toHaveBeenCalledWith('Exported as JPEG', 'success');
    });
  });

  it('exports only the selected shapes when selection only is on', async () => {
    renderEditor();
    selectShape(60, 40);
    fireEvent.click(screen.getByTitle('Export options'));
    fireEvent.click(screen.getByText('Selection only'));
    fireEvent.click(screen.getByText('SVG'));
    await waitFor(() => {
      expect(exportAsSVG).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'doc-1' }),
        ['s-rect']
      );
      expect(downloadFile).toHaveBeenCalledWith('<svg />', 'My Artwork.svg');
    });
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
    fireEvent.click(screen.getAllByTestId('FiUnlock')[0].closest('button')!);
    expect(data.toggleLayerLock).toHaveBeenCalledWith('doc-1', 'l1');
    fireEvent.click(screen.getAllByTestId('FiTrash2')[0].closest('button')!);
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

  it('enters symbol edit mode and saves the edited symbol', async () => {
    const { data } = renderEditor();
    fireEvent.click(screen.getByRole('button', { name: 'Symbols' }));
    fireEvent.click(screen.getByTitle('Edit Star Symbol'));
    await waitFor(() => {
      expect(data.updateDocument).toHaveBeenLastCalledWith(
        expect.objectContaining({
          shapes: [
            expect.objectContaining({ symbolId: 'sym-1' }),
            expect.objectContaining({ symbolId: 'sym-1' }),
          ],
          layers: [expect.objectContaining({ name: 'Star Symbol master' })],
        })
      );
      expect(addToast).toHaveBeenCalledWith('Editing Star Symbol', 'info');
    });
    expect(screen.getByTitle('Done Editing')).toBeInTheDocument();
    fireEvent.click(screen.getByTitle('Done Editing'));
    await waitFor(() => {
      expect(data.updateSymbol).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'sym-1', name: 'Star Symbol' })
      );
      expect(data.updateDocument).toHaveBeenLastCalledWith(
        expect.objectContaining({
          shapes: expect.arrayContaining([
            expect.objectContaining({ id: 's-rect' }),
          ]),
        })
      );
      expect(addToast).toHaveBeenCalledWith('Symbol updated', 'success');
    });
  });

  it('expands symbol instances to edited shapes on exit', async () => {
    const instance = shape({
      id: 's-instance',
      type: 'rect',
      name: 'Instance',
      x: 10,
      y: 10,
      width: 40,
      height: 40,
      symbolId: 'sym-1',
    });
    const doc = { ...buildDoc(), shapes: [...buildDoc().shapes, instance] };
    const { data } = renderEditor([buildSymbol()], doc);
    fireEvent.click(screen.getByRole('button', { name: 'Symbols' }));
    fireEvent.click(screen.getByTitle('Edit Star Symbol'));
    await waitFor(() =>
      expect(screen.getByTitle('Done Editing')).toBeInTheDocument()
    );
    fireEvent.click(screen.getByTitle('Done Editing'));
    await waitFor(() => {
      expect(data.updateSymbol).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'sym-1', width: 40, height: 40 })
      );
      expect(data.updateDocument).toHaveBeenLastCalledWith(
        expect.objectContaining({
          shapes: expect.arrayContaining([
            expect.objectContaining({ x: 10, y: 10, symbolId: 'sym-1' }),
            expect.objectContaining({ x: 30, y: 30, symbolId: 'sym-1' }),
          ]),
        })
      );
    });
    expect(data.updateDocument).not.toHaveBeenLastCalledWith(
      expect.objectContaining({
        shapes: expect.arrayContaining([
          expect.objectContaining({ id: 's-instance' }),
        ]),
      })
    );
  });

  it('detaches a selected symbol instance', async () => {
    const instance = shape({
      id: 's-instance',
      type: 'rect',
      name: 'Instance',
      x: 10,
      y: 10,
      width: 40,
      height: 40,
      symbolId: 'sym-1',
    });
    const doc = { ...buildDoc(), shapes: [...buildDoc().shapes, instance] };
    const { data } = renderEditor([buildSymbol()], doc);
    selectShape(20, 20);
    fireEvent.click(screen.getByRole('button', { name: 'Props' }));
    fireEvent.click(screen.getByTitle('Detach Symbol'));
    await waitFor(() => {
      expect(data.updateShape).toHaveBeenCalledWith(
        'doc-1',
        expect.objectContaining({
          id: 's-instance',
          symbolId: undefined,
          groupId: expect.any(String),
        })
      );
      expect(addToast).toHaveBeenCalledWith(
        'Symbol instance detached',
        'success'
      );
    });
  });

  it('creates an area text shape by dragging with the text tool', async () => {
    const { data, svg } = renderEditor();
    fireEvent.click(screen.getByTitle('Text (T)'));
    fireEvent.mouseDown(svg, { clientX: 100, clientY: 100 });
    fireEvent.mouseMove(svg, { clientX: 260, clientY: 160 });
    fireEvent.mouseUp(svg);
    await waitFor(() =>
      expect(data.addShape).toHaveBeenCalledWith(
        'doc-1',
        expect.objectContaining({
          type: 'text',
          textArea: true,
          width: 160,
          height: 60,
        })
      )
    );
  });

  it('creates a point text shape on a click without a drag', async () => {
    const { data, svg } = renderEditor();
    fireEvent.click(screen.getByTitle('Text (T)'));
    fireEvent.mouseDown(svg, { clientX: 300, clientY: 300 });
    fireEvent.mouseUp(svg);
    await waitFor(() =>
      expect(data.addShape).toHaveBeenCalledWith(
        'doc-1',
        expect.objectContaining({ type: 'text', textArea: false, width: 200 })
      )
    );
  });

  it('edits letter spacing and line height of a text shape', async () => {
    const { data } = renderEditor();
    selectShape(100, 310);
    fireEvent.click(screen.getByRole('button', { name: 'Props' }));
    await waitFor(() =>
      expect(screen.getByDisplayValue('Hello')).toBeInTheDocument()
    );
    fireEvent.change(screen.getByLabelText('Letter Spacing'), {
      target: { value: '2' },
    });
    fireEvent.change(screen.getByLabelText('Line Height'), {
      target: { value: '1.5' },
    });
    await waitFor(() => {
      expect(data.updateShape).toHaveBeenCalledWith(
        'doc-1',
        expect.objectContaining({ id: 's-text', letterSpacing: 2 })
      );
      expect(data.updateShape).toHaveBeenCalledWith(
        'doc-1',
        expect.objectContaining({ id: 's-text', lineHeight: 1.5 })
      );
    });
  });

  it('enters path edit mode with double click and shows point handles', () => {
    renderEditor();
    const path = document.querySelector(
      'path[data-shape-id="s-path"]'
    ) as SVGGraphicsElement;
    fireEvent.doubleClick(path);
    expect(document.querySelectorAll('svg circle[r="4"]')).toHaveLength(2);
    expect(document.querySelectorAll('svg circle[r="2.5"]')).toHaveLength(1);
  });

  it('drags a path point to reshape the path', () => {
    const { data } = renderEditor();
    const path = document.querySelector(
      'path[data-shape-id="s-path"]'
    ) as SVGGraphicsElement;
    fireEvent.doubleClick(path);
    const vertices = document.querySelectorAll('svg circle[r="4"]');
    fireEvent.mouseDown(vertices[0], { clientX: 50, clientY: 200 });
    fireEvent.mouseMove(window, { clientX: 60, clientY: 220 });
    fireEvent.mouseUp(window);
    expect(data.updateShape).toHaveBeenCalledWith(
      'doc-1',
      expect.objectContaining({ id: 's-path', pathData: 'M10 20 L20 20' })
    );
  });

  it('adds a path point by clicking a segment handle', () => {
    const { data } = renderEditor();
    const path = document.querySelector(
      'path[data-shape-id="s-path"]'
    ) as SVGGraphicsElement;
    fireEvent.doubleClick(path);
    const seg = document.querySelector(
      'svg circle[r="2.5"]'
    ) as SVGGraphicsElement;
    fireEvent.click(seg);
    expect(data.updateShape).toHaveBeenCalledWith(
      'doc-1',
      expect.objectContaining({ id: 's-path', pathData: 'M0 0 L10 10 L20 20' })
    );
  });

  it('converts a path point between corner and smooth', () => {
    const { data } = renderEditor();
    const path = document.querySelector(
      'path[data-shape-id="s-path"]'
    ) as SVGGraphicsElement;
    fireEvent.doubleClick(path);
    const vertices = document.querySelectorAll('svg circle[r="4"]');
    fireEvent.doubleClick(vertices[1]);
    expect(data.updateShape).toHaveBeenCalledWith(
      'doc-1',
      expect.objectContaining({
        id: 's-path',
        pathData: expect.stringContaining('Q'),
      })
    );
  });

  it('removes a path point with alt+click', () => {
    const { data } = renderEditor();
    const path = document.querySelector(
      'path[data-shape-id="s-path"]'
    ) as SVGGraphicsElement;
    fireEvent.doubleClick(path);
    fireEvent.click(document.querySelector('svg circle[r="2.5"]')!);
    const vertices = document.querySelectorAll('svg circle[r="4"]');
    fireEvent.mouseDown(vertices[1], {
      clientX: 60,
      clientY: 210,
      altKey: true,
    });
    expect(data.updateShape).toHaveBeenLastCalledWith(
      'doc-1',
      expect.objectContaining({ id: 's-path', pathData: 'M0 0 L20 20' })
    );
  });

  it('exits path edit mode with Escape', () => {
    renderEditor();
    const path = document.querySelector(
      'path[data-shape-id="s-path"]'
    ) as SVGGraphicsElement;
    fireEvent.doubleClick(path);
    expect(document.querySelectorAll('svg circle[r="4"]')).toHaveLength(2);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(document.querySelectorAll('svg circle[r="4"]')).toHaveLength(0);
  });

  it('applies a mock boolean union to two selected paths', async () => {
    const doc = buildDoc();
    doc.shapes.push(
      shape({
        id: 's-path2',
        type: 'path',
        name: 'Path 2',
        x: 200,
        y: 200,
        width: 40,
        height: 40,
        pathData: 'M0 0 L30 30',
      })
    );
    doc.layers[0].shapeIds.push('s-path2');
    const { data } = renderEditor(undefined, doc);
    fireEvent.mouseDown(document.querySelector('svg')!, {
      clientX: 60,
      clientY: 210,
    });
    fireEvent.mouseDown(document.querySelector('svg')!, {
      clientX: 210,
      clientY: 210,
      shiftKey: true,
    });
    fireEvent.click(screen.getByRole('button', { name: 'Props' }));
    await waitFor(() =>
      expect(screen.getByText('Path Booleans (mock)')).toBeInTheDocument()
    );
    fireEvent.click(screen.getByText('Union'));
    expect(data.updateShape).toHaveBeenCalledWith(
      'doc-1',
      expect.objectContaining({
        id: 's-path',
        pathData: 'M0 0 L20 20 M0 0 L30 30',
      })
    );
    expect(data.removeShape).toHaveBeenCalledWith('doc-1', 's-path2');
    expect(addToast).toHaveBeenCalledWith('Union applied (mock)', 'success');
  });

  it('shows mock toasts for the subtract and intersect booleans', async () => {
    const doc = buildDoc();
    doc.shapes.push(
      shape({
        id: 's-path2',
        type: 'path',
        x: 200,
        y: 200,
        width: 40,
        height: 40,
        pathData: 'M0 0 L30 30',
      })
    );
    doc.layers[0].shapeIds.push('s-path2');
    renderEditor(undefined, doc);
    fireEvent.mouseDown(document.querySelector('svg')!, {
      clientX: 60,
      clientY: 210,
    });
    fireEvent.mouseDown(document.querySelector('svg')!, {
      clientX: 210,
      clientY: 210,
      shiftKey: true,
    });
    fireEvent.click(screen.getByRole('button', { name: 'Props' }));
    await waitFor(() =>
      expect(screen.getByText('Path Booleans (mock)')).toBeInTheDocument()
    );
    fireEvent.click(screen.getByText('Subtract'));
    expect(addToast).toHaveBeenCalledWith(
      'Subtract (mock) — not implemented',
      'info'
    );
    fireEvent.click(screen.getByText('Intersect'));
    expect(addToast).toHaveBeenCalledWith(
      'Intersect (mock) — not implemented',
      'info'
    );
  });

  it('uses letter spacing and line height from the text tool panel', async () => {
    const { data, svg } = renderEditor();
    fireEvent.click(screen.getByTitle('Text (T)'));
    fireEvent.change(screen.getByLabelText('Letter Spacing'), {
      target: { value: '3' },
    });
    fireEvent.change(screen.getByLabelText('Line Height'), {
      target: { value: '1.6' },
    });
    fireEvent.mouseDown(svg, { clientX: 100, clientY: 100 });
    fireEvent.mouseUp(svg);
    await waitFor(() =>
      expect(data.addShape).toHaveBeenCalledWith(
        'doc-1',
        expect.objectContaining({
          type: 'text',
          letterSpacing: 3,
          lineHeight: 1.6,
        })
      )
    );
  });

  describe('organization — grouping, arranging, aligning', () => {
    const selectShapes = (ids: string[]) => {
      const svg = document.querySelector('svg') as SVGSVGElement;
      const coords: Record<string, [number, number]> = {
        's-rect': [60, 40],
        's-ellipse': [240, 80],
        's-line': [350, 65],
      };
      ids.forEach((id, i) => {
        const [x, y] = coords[id];
        fireEvent.mouseDown(svg, { clientX: x, clientY: y, shiftKey: i > 0 });
      });
    };

    const openProps = () =>
      fireEvent.click(screen.getByRole('button', { name: /Props/ }));

    it('groups selected shapes with Ctrl+G', async () => {
      const { data } = renderEditor();
      selectShapes(['s-rect', 's-ellipse']);
      fireEvent.keyDown(window, { key: 'g', ctrlKey: true });
      await waitFor(() => expect(data.updateDocument).toHaveBeenCalled());
      const doc = data.updateDocument.mock.calls[0][0];
      const grouped = doc.shapes.filter(
        (s: SVGShape) => s.id === 's-rect' || s.id === 's-ellipse'
      );
      expect(grouped[0].groupId).toBeTruthy();
      expect(grouped[0].groupId).toBe(grouped[1].groupId);
      expect(
        doc.shapes.find((s: SVGShape) => s.id === 's-line')?.groupId
      ).toBeUndefined();
      expect(addToast).toHaveBeenCalledWith('Grouped 2 shapes', 'success');
    });

    it('ungroups selected shapes with Ctrl+Shift+G', async () => {
      const doc = buildDoc();
      doc.shapes = doc.shapes.map((s, i) =>
        i === 0 || i === 1 ? { ...s, groupId: 'grp' } : s
      );
      const { data } = renderEditor([], doc);
      selectShapes(['s-rect', 's-ellipse']);
      fireEvent.keyDown(window, { key: 'g', ctrlKey: true, shiftKey: true });
      await waitFor(() => expect(data.updateDocument).toHaveBeenCalled());
      const next = data.updateDocument.mock.calls[0][0];
      const ungrouped = next.shapes.filter(
        (s: SVGShape) => s.id === 's-rect' || s.id === 's-ellipse'
      );
      expect(ungrouped.every((s: SVGShape) => !s.groupId)).toBe(true);
      expect(addToast).toHaveBeenCalledWith('Ungrouped shapes', 'success');
    });

    it('groups and ungroups via the props panel', async () => {
      const doc = buildDoc();
      const { data } = renderEditor([], doc);
      data.updateDocument.mockImplementation(async (next: SVGDocument) => {
        Object.assign(doc, next);
      });
      selectShapes(['s-rect', 's-ellipse']);
      openProps();
      fireEvent.click(screen.getByText('Group (Ctrl+G)'));
      await waitFor(() => expect(data.updateDocument).toHaveBeenCalled());
      expect(addToast).toHaveBeenCalledWith('Grouped 2 shapes', 'success');
      fireEvent.click(screen.getByText('Ungroup'));
      await waitFor(() => expect(data.updateDocument).toHaveBeenCalledTimes(2));
      expect(addToast).toHaveBeenCalledWith('Ungrouped shapes', 'success');
    });

    it('brings a shape to front and back via the props panel', async () => {
      const { data } = renderEditor();
      selectShapes(['s-rect']);
      openProps();
      fireEvent.click(screen.getByText('Bring to Front'));
      await waitFor(() => expect(data.updateDocument).toHaveBeenCalled());
      const doc = data.updateDocument.mock.calls[0][0];
      expect(doc.shapes.map((s: SVGShape) => s.id).at(-1)).toBe('s-rect');
      fireEvent.click(screen.getByText('Send to Back'));
      await waitFor(() =>
        expect(data.updateDocument.mock.calls.length).toBe(2)
      );
      const doc2 = data.updateDocument.mock.calls[1][0];
      expect(doc2.shapes.map((s: SVGShape) => s.id)[0]).toBe('s-rect');
    });

    it('aligns selected shapes to the left edge', async () => {
      const { data } = renderEditor();
      selectShapes(['s-rect', 's-ellipse']);
      openProps();
      fireEvent.click(screen.getByText('Left'));
      await waitFor(() => expect(data.updateDocument).toHaveBeenCalled());
      const doc = data.updateDocument.mock.calls[0][0];
      const rect = doc.shapes.find((s: SVGShape) => s.id === 's-rect');
      const ellipse = doc.shapes.find((s: SVGShape) => s.id === 's-ellipse');
      expect(rect?.x).toBe(20);
      expect(ellipse?.x).toBe(20);
      expect(addToast).toHaveBeenCalledWith('Aligned left', 'success');
    });

    it('distributes selected shapes horizontally', async () => {
      const { data } = renderEditor();
      selectShapes(['s-rect', 's-ellipse', 's-line']);
      openProps();
      fireEvent.click(screen.getByText('Horizontal'));
      await waitFor(() => expect(data.updateDocument).toHaveBeenCalled());
      const doc = data.updateDocument.mock.calls[0][0];
      const centers = doc.shapes
        .filter((s: SVGShape) =>
          ['s-rect', 's-ellipse', 's-line'].includes(s.id)
        )
        .map((s: SVGShape) => s.x + s.width / 2)
        .sort((a: number, b: number) => a - b);
      expect(centers[1] - centers[0]).toBeCloseTo(centers[2] - centers[1]);
      expect(addToast).toHaveBeenCalledWith(
        'Distributed horizontal',
        'success'
      );
    });

    it('moves all members of a group together when dragging', () => {
      const doc = buildDoc();
      doc.shapes = [
        shape({
          id: 'ga',
          type: 'rect',
          name: 'A',
          x: 20,
          y: 30,
          width: 40,
          height: 20,
          groupId: 'grp',
        }),
        shape({
          id: 'gb',
          type: 'rect',
          name: 'B',
          x: 200,
          y: 50,
          width: 60,
          height: 30,
          groupId: 'grp',
        }),
      ];
      doc.layers[0].shapeIds = ['ga', 'gb'];
      const { data } = renderEditor([], doc);
      const svg = document.querySelector('svg') as SVGSVGElement;
      fireEvent.mouseDown(svg, { clientX: 30, clientY: 30 });
      fireEvent.mouseMove(svg, { clientX: 40, clientY: 30 });
      fireEvent.mouseMove(svg, { clientX: 60, clientY: 30 });
      fireEvent.mouseUp(svg);
      expect(data.moveShape).toHaveBeenCalledWith('doc-1', 'ga', 50, 30);
      expect(data.moveShape).toHaveBeenCalledWith('doc-1', 'gb', 230, 50);
    });
  });

  describe('organization — layers, folders, reorder, rename', () => {
    it('reorders layers by dragging a row', () => {
      const { data } = renderEditor();
      const main = screen.getByText('Main').closest('[draggable]')!;
      const hidden = screen.getByText('Hidden Layer').closest('[draggable]')!;
      fireEvent.dragStart(main);
      fireEvent.dragOver(hidden);
      fireEvent.drop(hidden);
      expect(data.updateLayers).toHaveBeenCalledWith(
        'doc-1',
        expect.arrayContaining([
          expect.objectContaining({ id: 'l2' }),
          expect.objectContaining({ id: 'l1' }),
        ])
      );
    });

    it('creates a folder from the layers panel', () => {
      const { data } = renderEditor();
      fireEvent.click(screen.getByTestId('FiFolderPlus').closest('button')!);
      expect(data.updateLayers).toHaveBeenCalledWith(
        'doc-1',
        expect.arrayContaining([
          expect.objectContaining({ isFolder: true, shapeIds: [] }),
        ])
      );
    });

    it('drops a layer into a folder', () => {
      const { data } = renderEditor([], buildFolderDoc());
      const main = screen.getByText('Main').closest('[draggable]')!;
      const folder = screen.getByText('Folder').closest('[draggable]')!;
      fireEvent.dragStart(main);
      fireEvent.dragOver(folder);
      fireEvent.drop(folder);
      expect(data.updateLayers).toHaveBeenCalledWith(
        'doc-1',
        expect.arrayContaining([
          expect.objectContaining({ id: 'l1', parentId: 'f1' }),
        ])
      );
    });

    it('collapses a folder to hide its children', () => {
      renderEditor([], buildFolderDoc());
      expect(screen.getByText('Inside')).toBeInTheDocument();
      fireEvent.click(screen.getByTestId('FiChevronRight').closest('button')!);
      expect(screen.queryByText('Inside')).not.toBeInTheDocument();
    });

    it('removes a folder and re-parents its children', () => {
      const { data } = renderEditor([], buildFolderDoc());
      fireEvent.click(screen.getAllByTestId('FiTrash2')[1].closest('button')!);
      const call = data.updateLayers.mock.calls[0];
      expect(call[0]).toBe('doc-1');
      const layers = call[1] as SVGLayer[];
      expect(layers.some((l) => l.id === 'f1')).toBe(false);
      expect(layers.find((l) => l.id === 'l2')?.parentId).toBeUndefined();
    });

    it('renames a layer via inline edit', () => {
      const { data } = renderEditor();
      fireEvent.doubleClick(screen.getByText('Main'));
      const input = screen.getByDisplayValue('Main');
      fireEvent.change(input, { target: { value: 'Renamed' } });
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(data.renameLayer).toHaveBeenCalledWith('doc-1', 'l1', 'Renamed');
    });
  });
});
