import { render, screen, fireEvent } from '@testing-library/react';
import EditorPage from '@/app/edit/page';
import { useData } from '@/providers/DataProvider';
import type { ReactNode } from 'react';
import type { SVGDocument, SVGShape, SVGSymbol, SVGSettings } from '@/types';

const searchParamsGet = jest.fn();
const push = jest.fn();
const addToast = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
  useSearchParams: () => ({ get: searchParamsGet }),
}));

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
    'FiFolder',
    'FiFolderPlus',
    'FiChevronRight',
    'FiMaximize',
    'FiMinimize',
    'FiStar',
    'FiX',
  ];
  return Object.fromEntries(
    names.map((n) => [n, () => <span data-testid={n} />])
  );
});

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
  o: Partial<SVGShape> & { type: SVGShape['type'] }
): SVGShape => ({
  ...o,
  id: o.id ?? `s-${o.type}-${Math.random()}`,
  name: o.name ?? 'Shape',
  x: o.x ?? 0,
  y: o.y ?? 0,
  width: o.width ?? 100,
  height: o.height ?? 50,
  rotation: o.rotation ?? 0,
  fill: o.fill ?? { type: 'solid', color: '#3b82f6', opacity: 1 },
  stroke: o.stroke ?? {
    color: '#1e293b',
    width: 2,
    dashArray: '',
    cap: 'round',
    join: 'round',
  },
  opacity: o.opacity ?? 1,
  locked: o.locked ?? false,
  visible: o.visible ?? true,
});

const doc: SVGDocument = {
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
};

const settings: SVGSettings = {
  theme: 'nothing',
  gridSize: 20,
  snapToGrid: false,
  showGrid: false,
  showRulers: true,
  exportFormat: 'svg',
  exportScale: 2,
};

it('debug selection', async () => {
  searchParamsGet.mockReturnValue('doc-1');
  const data = {
    documents: [doc],
    symbols: [] as SVGSymbol[],
    settings,
    updateDocument: jest.fn(),
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
  jest.mocked(useData).mockReturnValue(data as never);
  render(<EditorPage />);
  const svg = document.querySelector('svg')!;
  console.log('svg rect: ', JSON.stringify(svg.getBoundingClientRect()));
  console.log('svg tag:', svg.tagName, 'classes:', svg.getAttribute('class'));
  fireEvent.mouseDown(svg, { clientX: 60, clientY: 40 });
  console.log(
    'footer text:',
    document.body.textContent?.includes('1 selected')
  );
  console.log(
    'handles:',
    document.querySelectorAll('svg rect.cursor-pointer').length
  );
});
