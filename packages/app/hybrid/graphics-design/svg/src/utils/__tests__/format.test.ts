import {
  formatRelativeTime,
  formatFileSize,
  generateId,
  snapToGrid,
  getAlignment,
  applyAlignment,
  generateShapeSVG,
  exportAsSVG,
  downloadFile,
  downloadBlob,
  copyToClipboard,
  exportAsPNG,
  rasterizeSVG,
  measureTextWidth,
  wrapText,
  parsePath,
  serializePath,
  mockBooleanUnion,
  alignShapes,
  distributeShapes,
  moveLayer,
  hexToRgb,
  rgbToHex,
  mixHexColors,
} from '@/utils/format';
import type { SVGDocument, SVGShape, SVGLayer } from '@/types';

const shape = (overrides: Partial<SVGShape> = {}): SVGShape => ({
  id: 's1',
  type: 'rect',
  name: 'Rect',
  x: 10,
  y: 20,
  width: 100,
  height: 50,
  rotation: 0,
  fill: { type: 'solid', color: '#3b82f6', opacity: 1 },
  stroke: {
    color: '#1e293b',
    width: 2,
    dashArray: '',
    cap: 'round',
    join: 'round',
  },
  opacity: 1,
  locked: false,
  visible: true,
  ...overrides,
});

describe('formatRelativeTime', () => {
  it('returns "just now" for less than a minute', () => {
    expect(formatRelativeTime(Date.now() - 1000)).toBe('just now');
  });

  it('returns minutes ago', () => {
    expect(formatRelativeTime(Date.now() - 60000 * 5)).toBe('5 min ago');
  });

  it('returns hours ago', () => {
    expect(formatRelativeTime(Date.now() - 3600000 * 3)).toBe('3h ago');
  });

  it('returns days ago', () => {
    expect(formatRelativeTime(Date.now() - 86400000 * 4)).toBe('4d ago');
  });

  it('returns a locale date string for a week or more', () => {
    const ts = Date.now() - 86400000 * 10;
    expect(formatRelativeTime(ts)).toBe(new Date(ts).toLocaleDateString());
  });
});

describe('formatFileSize', () => {
  it('formats bytes', () => {
    expect(formatFileSize(512)).toBe('512 B');
  });

  it('formats kilobytes', () => {
    expect(formatFileSize(2048)).toBe('2.0 KB');
  });

  it('formats megabytes', () => {
    expect(formatFileSize(2097152)).toBe('2.0 MB');
  });
});

describe('generateId', () => {
  it('generates unique timestamp-prefixed ids', () => {
    const a = generateId();
    const b = generateId();
    expect(a).toContain('-');
    expect(a).not.toBe(b);
  });
});

describe('snapToGrid', () => {
  it('snaps a value to the nearest grid multiple', () => {
    expect(snapToGrid(23, 10)).toBe(20);
    expect(snapToGrid(25, 10)).toBe(30);
  });
});

describe('hexToRgb', () => {
  it('parses a 6-digit hex color', () => {
    expect(hexToRgb('#ff0000')).toEqual({ r: 255, g: 0, b: 0 });
    expect(hexToRgb('#3b82f6')).toEqual({ r: 59, g: 130, b: 246 });
  });

  it('parses a 3-digit hex color', () => {
    expect(hexToRgb('#fff')).toEqual({ r: 255, g: 255, b: 255 });
    expect(hexToRgb('#0af')).toEqual({ r: 0, g: 170, b: 255 });
  });

  it('returns null for invalid input', () => {
    expect(hexToRgb('nope')).toBeNull();
    expect(hexToRgb('#ff00')).toBeNull();
  });

  it('returns null when a 6-digit hex contains non-hex characters', () => {
    expect(hexToRgb('#gggggg')).toBeNull();
  });
});

describe('rgbToHex', () => {
  it('converts rgb values to a hex string', () => {
    expect(rgbToHex(255, 0, 0)).toBe('#ff0000');
    expect(rgbToHex(59, 130, 246)).toBe('#3b82f6');
  });

  it('clamps values outside 0-255', () => {
    expect(rgbToHex(-10, 300, 128)).toBe('#00ff80');
  });
});

describe('mixHexColors', () => {
  it('interpolates between two colors', () => {
    expect(mixHexColors('#000000', '#ffffff', 0)).toBe('#000000');
    expect(mixHexColors('#000000', '#ffffff', 1)).toBe('#ffffff');
    expect(mixHexColors('#000000', '#ffffff', 0.5)).toBe('#808080');
    expect(mixHexColors('#ff0000', '#0000ff', 0.5)).toBe('#800080');
  });

  it('returns the second color when the first is invalid', () => {
    expect(mixHexColors('nope', '#ffffff', 0.5)).toBe('#ffffff');
  });
});

describe('wrapText', () => {
  const measure = (value: string) => value.length * 10;

  it('wraps text into lines that fit the max width', () => {
    expect(wrapText('hello world', 100, 16, 0, measure)).toEqual([
      'hello',
      'world',
    ]);
  });

  it('keeps a short phrase on one line', () => {
    expect(wrapText('hello', 100, 16, 0, measure)).toEqual(['hello']);
  });

  it('returns an empty line for empty text', () => {
    expect(wrapText('', 100, 16, 0, measure)).toEqual(['']);
  });

  it('returns the whole text when the max width is zero', () => {
    expect(wrapText('hello world', 0, 16, 0, measure)).toEqual(['hello world']);
  });

  it('uses the default measure and letter spacing', () => {
    expect(wrapText('hi', 50, 16)).toEqual(['hi']);
  });

  it('overflows a single word that exceeds the width', () => {
    expect(wrapText('supercalifragilistic', 50, 16, 0, measure)).toEqual([
      'supercalifragilistic',
    ]);
  });

  it('measures text width with the canvas when available', () => {
    expect(measureTextWidth('hello', 20)).toBeGreaterThan(0);
  });

  it('falls back to an estimate when the canvas is unavailable', () => {
    const originalCreateElement = document.createElement.bind(document);
    jest
      .spyOn(document, 'createElement')
      .mockImplementation((tagName: string) => {
        const el = originalCreateElement(tagName);
        if (tagName === 'canvas') {
          (el as HTMLCanvasElement).getContext = jest.fn(
            () => null
          ) as unknown as HTMLCanvasElement['getContext'];
        }
        return el;
      });
    expect(measureTextWidth('hello', 20)).toBe(55);
    jest.restoreAllMocks();
  });
});

describe('parsePath', () => {
  it('parses an open polyline', () => {
    const path = parsePath('M0 0 L20 20 L30 10');
    expect(path.closed).toBe(false);
    expect(path.points).toEqual([
      { x: 0, y: 0, smooth: false },
      { x: 20, y: 20, smooth: false },
      { x: 30, y: 10, smooth: false },
    ]);
  });

  it('marks curve endpoints as smooth', () => {
    const path = parsePath('M0 0 Q5 5 10 10 C15 15 20 20 25 25');
    expect(path.points.map((p) => p.smooth)).toEqual([false, true, true]);
  });

  it('detects a closed path', () => {
    expect(parsePath('M0 0 L10 10 L5 5 Z').closed).toBe(true);
  });

  it('returns no points for empty data', () => {
    const path = parsePath('');
    expect(path.points).toEqual([]);
    expect(path.closed).toBe(false);
  });

  it('uses the default empty path data', () => {
    expect(parsePath().points).toEqual([]);
  });

  it('tolerates a command without arguments', () => {
    expect(parsePath('M').points).toEqual([]);
  });

  it('does not treat a short quadratic as smooth', () => {
    const path = parsePath('Q1 2');
    expect(path.points).toEqual([]);
    expect(path.closed).toBe(false);
  });
});

describe('serializePath', () => {
  it('serializes points back to M/L commands', () => {
    expect(
      serializePath({
        points: [
          { x: 0, y: 0, smooth: false },
          { x: 10, y: 10, smooth: false },
        ],
        closed: false,
      })
    ).toBe('M0 0 L10 10');
  });

  it('serializes smooth points as Q commands', () => {
    expect(
      serializePath({
        points: [
          { x: 0, y: 0, smooth: false },
          { x: 10, y: 10, smooth: true },
          { x: 20, y: 0, smooth: false },
        ],
        closed: false,
      })
    ).toBe('M0 0 Q15 5 10 10 L20 0');
  });

  it('appends Z for closed paths', () => {
    expect(
      serializePath({
        points: [
          { x: 0, y: 0, smooth: false },
          { x: 10, y: 10, smooth: false },
        ],
        closed: true,
      })
    ).toBe('M0 0 L10 10 Z');
  });

  it('round trips through parse and serialize', () => {
    const original = 'M0 0 L10 10 L5 15 Z';
    expect(serializePath(parsePath(original))).toBe(original);
  });

  it('returns an empty string for no points', () => {
    expect(serializePath({ points: [], closed: false })).toBe('');
  });
});

describe('mockBooleanUnion', () => {
  it('concatenates the path data of selected paths', () => {
    const a = shape({ type: 'path', pathData: 'M0 0 L10 10' });
    const b = shape({ type: 'path', pathData: 'M20 20 L30 30' });
    expect(mockBooleanUnion([a, b])).toBe('M0 0 L10 10 M20 20 L30 30');
  });

  it('ignores non-path shapes', () => {
    const shapes = [
      shape({ type: 'rect' }),
      shape({ type: 'path', pathData: 'M0 0 L1 1' }),
    ];
    expect(mockBooleanUnion(shapes)).toBe('M0 0 L1 1');
  });

  it('omits paths without path data', () => {
    expect(mockBooleanUnion([shape({ type: 'path' })])).toBe('');
  });
});

describe('alignShapes', () => {
  const a = shape({ id: 'a', x: 0, y: 0, width: 40, height: 20 });
  const b = shape({ id: 'b', x: 100, y: 60, width: 60, height: 30 });
  const c = shape({ id: 'c', x: 40, y: 100, width: 20, height: 10 });

  it('aligns left edges to the minimum x', () => {
    const result = alignShapes([a, b, c], 'left');
    expect(result.every((s) => s.x === 0)).toBe(true);
  });

  it('aligns right edges to the maximum right edge', () => {
    const result = alignShapes([a, b, c], 'right');
    const maxRight = Math.max(a.x + a.width, b.x + b.width, c.x + c.width);
    expect(result.every((s) => s.x + s.width === maxRight)).toBe(true);
  });

  it('aligns centers to the selection midpoint', () => {
    const result = alignShapes([a, b, c], 'center');
    const minX = Math.min(a.x, b.x, c.x);
    const maxX = Math.max(a.x + a.width, b.x + b.width, c.x + c.width);
    const cx = (minX + maxX) / 2;
    expect(result.every((s) => s.x + s.width / 2 === cx)).toBe(true);
  });

  it('aligns top, middle and bottom on the y axis', () => {
    const top = alignShapes([a, b, c], 'top');
    expect(top.every((s) => s.y === 0)).toBe(true);
    const middle = alignShapes([a, b, c], 'middle');
    const minY = Math.min(a.y, b.y, c.y);
    const maxY = Math.max(a.y + a.height, b.y + b.height, c.y + c.height);
    const cy = (minY + maxY) / 2;
    expect(middle.every((s) => s.y + s.height / 2 === cy)).toBe(true);
    const bottom = alignShapes([a, b, c], 'bottom');
    const maxBottom = Math.max(a.y + a.height, b.y + b.height, c.y + c.height);
    expect(bottom.every((s) => s.y + s.height === maxBottom)).toBe(true);
  });

  it('leaves single selections unchanged', () => {
    expect(alignShapes([a], 'left')).toEqual([a]);
  });
});

describe('distributeShapes', () => {
  it('spreads centers evenly on the horizontal axis', () => {
    const shapes = [
      shape({ id: 'a', x: 0, y: 0, width: 20, height: 20 }),
      shape({ id: 'b', x: 100, y: 0, width: 20, height: 20 }),
      shape({ id: 'c', x: 200, y: 0, width: 20, height: 20 }),
    ];
    const result = distributeShapes(shapes, 'horizontal');
    const centers = result
      .slice()
      .sort((m, n) => m.x - n.x)
      .map((s) => s.x + s.width / 2);
    expect(centers[0]).toBe(10);
    expect(centers[1]).toBe(110);
    expect(centers[2]).toBe(210);
  });

  it('spreads centers evenly on the vertical axis', () => {
    const shapes = [
      shape({ id: 'a', x: 0, y: 0, width: 20, height: 20 }),
      shape({ id: 'b', x: 0, y: 100, width: 20, height: 20 }),
      shape({ id: 'c', x: 0, y: 200, width: 20, height: 20 }),
    ];
    const result = distributeShapes(shapes, 'vertical');
    const centers = result
      .slice()
      .sort((m, n) => m.y - n.y)
      .map((s) => s.y + s.height / 2);
    expect(centers[0]).toBe(10);
    expect(centers[1]).toBe(110);
    expect(centers[2]).toBe(210);
  });

  it('keeps fewer than three shapes unchanged', () => {
    const two = [shape({ id: 'a' }), shape({ id: 'b', x: 50 })];
    expect(distributeShapes(two, 'horizontal')).toEqual(two);
  });
});

describe('moveLayer', () => {
  const layers: SVGLayer[] = [
    {
      id: 'l1',
      name: 'A',
      visible: true,
      locked: false,
      shapeIds: [],
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
      name: 'B',
      visible: true,
      locked: false,
      shapeIds: [],
      blending: 'normal',
      parentId: 'f1',
    },
    {
      id: 'l3',
      name: 'C',
      visible: true,
      locked: false,
      shapeIds: [],
      blending: 'normal',
    },
  ];

  it('moves a layer after its target', () => {
    const next = moveLayer(layers, 'l1', 'l3');
    expect(next.map((l) => l.id)).toEqual(['f1', 'l2', 'l3', 'l1']);
  });

  it('drops a layer into a folder and adopts its parent id', () => {
    const next = moveLayer(layers, 'l3', 'f1');
    expect(next.find((l) => l.id === 'l3')?.parentId).toBe('f1');
    expect(next.map((l) => l.id)).toEqual(['l1', 'f1', 'l2', 'l3']);
  });

  it('adopts the parent id of a folder child target', () => {
    const next = moveLayer(layers, 'l3', 'l2');
    expect(next.find((l) => l.id === 'l3')?.parentId).toBe('f1');
  });

  it('returns the same array for an unknown or self target', () => {
    expect(moveLayer(layers, 'missing', 'l1')).toBe(layers);
    expect(moveLayer(layers, 'l1', 'l1')).toBe(layers);
  });

  it('drops a layer into a folder with no children', () => {
    const next = moveLayer(
      [
        { ...layers[0] },
        { ...layers[1] },
        { ...layers[3], parentId: undefined },
      ],
      'l1',
      'f1'
    );
    expect(next.find((l) => l.id === 'l1')?.parentId).toBe('f1');
  });
});

describe('getAlignment', () => {
  it('returns no match when shapes are far apart', () => {
    const result = getAlignment({ x: 0, y: 0, width: 100, height: 50 }, [
      { x: 300, y: 300, width: 100, height: 50 },
    ]);
    expect(result.vertical).toBeUndefined();
    expect(result.horizontal).toBeUndefined();
  });

  it('matches an edge within tolerance', () => {
    const result = getAlignment({ x: 0, y: 0, width: 100, height: 50 }, [
      { x: 90, y: 200, width: 10, height: 50 },
    ]);
    expect(result.vertical).toEqual({
      matchedEdge: 'end',
      position: 100,
      delta: 0,
    });
  });

  it('matches a center within tolerance', () => {
    const result = getAlignment({ x: 0, y: 0, width: 100, height: 50 }, [
      { x: 45, y: 100, width: 10, height: 50 },
    ]);
    expect(result.vertical).toEqual({
      matchedEdge: 'center',
      position: 50,
      delta: 0,
    });
  });

  it('prefers the closest match on each axis', () => {
    const result = getAlignment({ x: 100, y: 0, width: 200, height: 50 }, [
      { x: 97, y: 50, width: 100, height: 50 },
      { x: 98, y: 50, width: 100, height: 50 },
    ]);
    expect(result.vertical).toEqual({
      matchedEdge: 'start',
      position: 98,
      delta: -2,
    });
  });

  it('matches both axes independently', () => {
    const result = getAlignment({ x: 10, y: 10, width: 100, height: 50 }, [
      { x: 100, y: 60, width: 10, height: 10 },
    ]);
    expect(result.vertical?.position).toBe(110);
    expect(result.horizontal?.position).toBe(60);
  });

  it('ignores matches beyond tolerance', () => {
    const result = getAlignment({ x: 0, y: 0, width: 100, height: 50 }, [
      { x: 105, y: 0, width: 10, height: 10 },
    ]);
    expect(result.vertical).toBeUndefined();
  });
});

describe('applyAlignment', () => {
  it('shifts the whole shape during a move', () => {
    const result = applyAlignment(
      { x: 100, y: 50, width: 50, height: 30 },
      { vertical: { matchedEdge: 'end', position: 80, delta: -20 } }
    );
    expect(result).toEqual({ x: 80, y: 50, width: 50, height: 30 });
  });

  it('grows the width when the right edge aligns during an e resize', () => {
    const result = applyAlignment(
      { x: 100, y: 50, width: 50, height: 30 },
      { vertical: { matchedEdge: 'end', position: 160, delta: 10 } },
      'se'
    );
    expect(result).toEqual({ x: 100, y: 50, width: 60, height: 30 });
  });

  it('moves the left edge when it aligns during a w resize', () => {
    const result = applyAlignment(
      { x: 100, y: 50, width: 50, height: 30 },
      { vertical: { matchedEdge: 'start', position: 90, delta: -10 } },
      'nw'
    );
    expect(result).toEqual({ x: 90, y: 50, width: 60, height: 30 });
  });

  it('shifts the whole shape when a non-free edge aligns', () => {
    const result = applyAlignment(
      { x: 100, y: 50, width: 50, height: 30 },
      { vertical: { matchedEdge: 'start', position: 90, delta: -10 } },
      'ne'
    );
    expect(result).toEqual({ x: 90, y: 50, width: 50, height: 30 });
  });

  it('applies horizontal alignment to height', () => {
    const result = applyAlignment(
      { x: 100, y: 50, width: 50, height: 30 },
      { horizontal: { matchedEdge: 'end', position: 40, delta: -10 } },
      'se'
    );
    expect(result).toEqual({ x: 100, y: 50, width: 50, height: 20 });
  });

  it('adjusts both axes at once', () => {
    const result = applyAlignment(
      { x: 100, y: 100, width: 50, height: 30 },
      {
        vertical: { matchedEdge: 'start', position: 90, delta: -10 },
        horizontal: { matchedEdge: 'end', position: 120, delta: -10 },
      },
      'se'
    );
    expect(result).toEqual({ x: 90, y: 100, width: 50, height: 20 });
  });

  it('moves the top edge when it aligns during an n resize', () => {
    const result = applyAlignment(
      { x: 100, y: 50, width: 50, height: 30 },
      { horizontal: { matchedEdge: 'start', position: 40, delta: -10 } },
      'nw'
    );
    expect(result).toEqual({ x: 100, y: 40, width: 50, height: 40 });
  });
});

describe('generateShapeSVG', () => {
  it('renders a rect with rotation and rx', () => {
    const svg = generateShapeSVG(shape({ rotation: 15, rx: 8 }));
    expect(svg).toContain('<rect');
    expect(svg).toContain('rx="8"');
    expect(svg).toContain('rotate(15 60 45)');
    expect(svg).toContain('stroke-width="2"');
  });

  it('renders an ellipse', () => {
    const svg = generateShapeSVG(shape({ type: 'ellipse' }));
    expect(svg).toContain('<ellipse');
    expect(svg).toContain('cx="60"');
  });

  it('renders a line', () => {
    const svg = generateShapeSVG(shape({ type: 'line' }));
    expect(svg).toContain('<line');
    expect(svg).toContain('x1="10"');
  });

  it('renders a path with pathData', () => {
    const svg = generateShapeSVG(
      shape({ type: 'path', pathData: 'M0 0 L10 10' })
    );
    expect(svg).toContain('<path');
    expect(svg).toContain('d="M0 0 L10 10"');
  });

  it('renders text with font properties', () => {
    const svg = generateShapeSVG(
      shape({
        type: 'text',
        text: 'Hello',
        fontFamily: 'Georgia',
        fontSize: 20,
      })
    );
    expect(svg).toContain('<text');
    expect(svg).toContain('font-family="Georgia"');
    expect(svg).toContain('>Hello</text>');
  });

  it('falls back to defaults for a path without pathData', () => {
    const svg = generateShapeSVG(shape({ type: 'path' }));
    expect(svg).toContain('d=""');
  });

  it('falls back to defaults for text without font and content', () => {
    const svg = generateShapeSVG(shape({ type: 'text' }));
    expect(svg).toContain('font-family="Arial"');
    expect(svg).toContain('font-size="16"');
    expect(svg).toContain('></text>');
  });

  it('uses defaults when wrapping area text without text or spacing', () => {
    const svg = generateShapeSVG(
      shape({ type: 'text', textArea: true, width: 60, height: 20 })
    );
    expect(svg).toContain('font-size="16"');
    expect(svg).not.toContain('letter-spacing');
    expect(svg).not.toContain('<tspan');
  });

  it('renders point text without tspans', () => {
    const svg = generateShapeSVG(
      shape({ type: 'text', text: 'Hello', textArea: false })
    );
    expect(svg).not.toContain('<tspan');
  });

  it('omits letter-spacing when it is zero', () => {
    const svg = generateShapeSVG(shape({ type: 'text', text: 'Hi' }));
    expect(svg).not.toContain('letter-spacing');
  });

  it('renders wrapped area text with tspans, spacing and line height', () => {
    const svg = generateShapeSVG(
      shape({
        type: 'text',
        text: 'Hello World',
        width: 60,
        height: 20,
        fontSize: 16,
        textArea: true,
        letterSpacing: 2,
        lineHeight: 1.5,
      })
    );
    expect(svg).toContain('letter-spacing="2"');
    expect(svg).toContain('<tspan x="10" dy="24">World</tspan>');
  });

  it('uses none, gradient url, and no-stroke variants', () => {
    expect(
      generateShapeSVG(shape({ fill: { type: 'none', color: '', opacity: 0 } }))
    ).toContain('fill="none"');
    expect(
      generateShapeSVG(
        shape({
          fill: { type: 'gradient', color: '', gradientId: 'g1', opacity: 1 },
        })
      )
    ).toContain('fill="url(#g1)"');
    expect(
      generateShapeSVG(shape({ stroke: { ...shape().stroke, width: 0 } }))
    ).toContain('stroke="none"');
  });

  it('omits the transform when rotation is zero', () => {
    expect(generateShapeSVG(shape())).not.toContain('transform');
  });

  it('returns an empty string for unsupported shape types', () => {
    expect(generateShapeSVG(shape({ type: 'star' }))).toBe('');
  });
});

describe('exportAsSVG', () => {
  it('serializes shapes into an svg document', () => {
    const doc: SVGDocument = {
      id: 'doc-1',
      title: 'Doc',
      width: 200,
      height: 100,
      shapes: [shape()],
      layers: [],
      symbols: [],
      gradients: [],
      createdAt: 0,
      updatedAt: 0,
    };
    const svg = exportAsSVG(doc);
    expect(svg).toContain('<svg xmlns="http://www.w3.org/2000/svg"');
    expect(svg).toContain('viewBox="0 0 200 100"');
    expect(svg).toContain('<rect');
  });

  it('wraps grouped shapes in a <g> element', () => {
    const doc: SVGDocument = {
      id: 'doc-1',
      title: 'Doc',
      width: 200,
      height: 100,
      shapes: [
        shape({ id: 's1', groupId: 'g1' }),
        shape({ id: 's2', x: 20, groupId: 'g1' }),
        shape({ id: 's3', x: 40, type: 'ellipse' }),
      ],
      layers: [],
      symbols: [],
      gradients: [],
      createdAt: 0,
      updatedAt: 0,
    };
    const svg = exportAsSVG(doc);
    expect(svg).toContain('<g id="g1">');
    expect(svg).toContain('</g>');
    expect(svg).toContain('<rect');
    expect(svg).toContain('<ellipse');
    const groupIndex = svg.indexOf('<g id="g1">');
    const ellipseIndex = svg.indexOf('<ellipse');
    expect(groupIndex).toBeGreaterThan(-1);
    expect(groupIndex).toBeLessThan(ellipseIndex);
  });
});

describe('downloadFile', () => {
  it('creates a link and clicks it', () => {
    const clickSpy = jest.fn();
    const originalCreateElement = document.createElement.bind(document);
    jest.spyOn(document, 'createElement').mockImplementation((tag: string) => {
      if (tag === 'a') {
        return {
          href: '',
          download: '',
          click: clickSpy,
        } as unknown as HTMLElement;
      }
      return originalCreateElement(tag);
    });
    URL.createObjectURL = jest.fn(() => 'blob:url');
    URL.revokeObjectURL = jest.fn();
    downloadFile('<svg/>', 'doc.svg');
    expect(clickSpy).toHaveBeenCalled();
    expect(URL.createObjectURL).toHaveBeenCalled();
    jest.restoreAllMocks();
  });
});

describe('copyToClipboard', () => {
  const writeText = jest.fn();

  beforeEach(() => {
    writeText.mockReset();
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
  });

  it('returns true when the write succeeds', async () => {
    writeText.mockResolvedValue(undefined);
    await expect(copyToClipboard('hello')).resolves.toBe(true);
    expect(writeText).toHaveBeenCalledWith('hello');
  });

  it('returns false when the write fails', async () => {
    writeText.mockRejectedValue(new Error('denied'));
    await expect(copyToClipboard('hello')).resolves.toBe(false);
  });
});

describe('exportAsPNG', () => {
  const originalCreateElement = document.createElement;
  const originalImage = global.Image;

  afterEach(() => {
    jest.restoreAllMocks();
    document.createElement = originalCreateElement;
    global.Image = originalImage;
  });

  const mockCanvas = () => {
    jest
      .spyOn(document, 'createElement')
      .mockImplementation(
        (tagName: string, options?: ElementCreationOptions) => {
          const el = originalCreateElement.call(document, tagName, options);
          if (tagName === 'canvas') {
            (el as HTMLCanvasElement).getContext = jest.fn(() => ({
              scale: jest.fn(),
              drawImage: jest.fn(),
            })) as unknown as HTMLCanvasElement['getContext'];
            (el as HTMLCanvasElement).toBlob = jest.fn(
              (cb: (b: Blob | null) => void) => cb(new Blob())
            );
          }
          return el;
        }
      );
  };

  const mockImage = () => {
    global.Image = class {
      width = 50;
      height = 40;
      onload: (() => void) | null = null;
      set src(_url: string) {
        setTimeout(() => this.onload?.(), 0);
      }
      get src() {
        return '';
      }
    } as unknown as typeof Image;
  };

  it('resolves with a blob after the image loads', async () => {
    mockCanvas();
    mockImage();
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const blob = await exportAsPNG(svg as unknown as SVGSVGElement, 2);
    expect(blob).toBeInstanceOf(Blob);
  });

  it('resolves null when the 2d context is unavailable', async () => {
    jest
      .spyOn(document, 'createElement')
      .mockImplementation(
        (tagName: string, options?: ElementCreationOptions) => {
          const el = originalCreateElement.call(document, tagName, options);
          if (tagName === 'canvas') {
            (el as HTMLCanvasElement).getContext = jest.fn(
              () => null
            ) as unknown as HTMLCanvasElement['getContext'];
          }
          return el;
        }
      );
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    await expect(
      exportAsPNG(svg as unknown as SVGSVGElement)
    ).resolves.toBeNull();
  });
});

describe('exportAsSVG with selection', () => {
  const gradientDoc = (): SVGDocument => {
    const doc: SVGDocument = {
      id: 'doc-1',
      title: 'Doc',
      width: 200,
      height: 100,
      shapes: [
        shape({ id: 's1' }),
        shape({ id: 's2', x: 20, type: 'ellipse' }),
        shape({
          id: 's3',
          x: 40,
          fill: { type: 'gradient', color: '', gradientId: 'g1', opacity: 1 },
        }),
      ],
      layers: [],
      symbols: [],
      gradients: [
        {
          id: 'g1',
          type: 'linear',
          stops: [
            { color: '#ff0000', offset: 0, opacity: 1 },
            { color: '#0000ff', offset: 1, opacity: 1 },
          ],
          x1: 0,
          y1: 0,
          x2: 1,
          y2: 1,
        },
      ],
      createdAt: 0,
      updatedAt: 0,
    };
    return doc;
  };

  it('exports only the requested shapes', () => {
    const svg = exportAsSVG(gradientDoc(), ['s1']);
    expect(svg).toContain('<rect');
    expect(svg).not.toContain('<ellipse');
    expect(svg).not.toContain('g1');
  });

  it('emits gradient defs for gradient-filled shapes', () => {
    const svg = exportAsSVG(gradientDoc());
    expect(svg).toContain('<defs>');
    expect(svg).toContain('linearGradient');
    expect(svg).toContain('url(#g1)');
    expect(svg).toContain('stop-color="#ff0000"');
  });

  it('uses explicit linear gradient coordinates', () => {
    const svg = exportAsSVG({
      ...gradientDoc(),
      gradients: [
        {
          ...gradientDoc().gradients[0],
          x1: 0.25,
          y1: 0.75,
          x2: 0.5,
          y2: 0.5,
        },
      ],
    });
    expect(svg).toContain('x1="0.25" y1="0.75" x2="0.5" y2="0.5"');
  });

  it('defaults missing linear gradient coordinates', () => {
    const svg = exportAsSVG({
      ...gradientDoc(),
      gradients: [
        { id: 'g1', type: 'linear', stops: gradientDoc().gradients[0].stops },
      ],
    });
    expect(svg).toContain('x1="0" y1="0" x2="1" y2="1"');
  });

  it('omits defs when no gradient shapes are exported', () => {
    const svg = exportAsSVG(gradientDoc(), ['s1', 's2']);
    expect(svg).not.toContain('<defs>');
  });

  it('omits a gradient whose definition is missing', () => {
    const svg = exportAsSVG({
      ...gradientDoc(),
      gradients: [],
    });
    expect(svg).toContain('<defs>');
    expect(svg).not.toContain('linearGradient');
  });

  it('emits radial gradient defs', () => {
    const doc: SVGDocument = {
      ...gradientDoc(),
      gradients: [
        {
          id: 'g1',
          type: 'radial',
          stops: [{ color: '#ff0000', offset: 0, opacity: 1 }],
        },
      ],
    };
    const svg = exportAsSVG(doc);
    expect(svg).toContain('radialGradient');
    expect(svg).toContain('cx="0.5"');
    expect(svg).not.toContain('linearGradient');
  });
});

describe('rasterizeSVG', () => {
  const originalCreateElement = document.createElement;
  const originalImage = global.Image;

  beforeAll(() => {
    URL.createObjectURL = jest.fn(() => 'blob:url');
    URL.revokeObjectURL = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    document.createElement = originalCreateElement;
    global.Image = originalImage;
  });

  const mockCanvas = (): (() => HTMLCanvasElement) => {
    let created: HTMLCanvasElement | null = null;
    jest
      .spyOn(document, 'createElement')
      .mockImplementation(
        (tagName: string, options?: ElementCreationOptions) => {
          const el = originalCreateElement.call(document, tagName, options);
          if (tagName === 'canvas') {
            (el as HTMLCanvasElement).getContext = jest.fn(() => ({
              scale: jest.fn(),
              drawImage: jest.fn(),
            })) as unknown as HTMLCanvasElement['getContext'];
            (el as HTMLCanvasElement).toBlob = jest.fn(
              (cb: (b: Blob | null) => void) => cb(new Blob())
            );
            created = el as HTMLCanvasElement;
          }
          return el;
        }
      );
    return () => created!;
  };

  const mockImage = () => {
    global.Image = class {
      width = 50;
      height = 40;
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      set src(_url: string) {
        setTimeout(() => this.onload?.(), 0);
      }
      get src() {
        return '';
      }
    } as unknown as typeof Image;
  };

  it('resolves with a blob and scales the canvas', async () => {
    const getCanvas = mockCanvas();
    mockImage();
    const blob = await rasterizeSVG('<svg />', { scale: 2 });
    const canvas = getCanvas();
    expect(blob).toBeInstanceOf(Blob);
    expect(canvas.width).toBe(100);
    expect(canvas.height).toBe(80);
  });

  it('passes the mime type and quality to toBlob', async () => {
    const getCanvas = mockCanvas();
    mockImage();
    await rasterizeSVG('<svg />', {
      scale: 1,
      type: 'image/jpeg',
      quality: 0.8,
    });
    const toBlob = getCanvas().toBlob as jest.Mock;
    expect(toBlob.mock.calls[0][1]).toBe('image/jpeg');
    expect(toBlob.mock.calls[0][2]).toBe(0.8);
  });

  it('resolves null when the 2d context is unavailable', async () => {
    jest
      .spyOn(document, 'createElement')
      .mockImplementation(
        (tagName: string, options?: ElementCreationOptions) => {
          const el = originalCreateElement.call(document, tagName, options);
          if (tagName === 'canvas') {
            (el as HTMLCanvasElement).getContext = jest.fn(
              () => null
            ) as unknown as HTMLCanvasElement['getContext'];
          }
          return el;
        }
      );
    await expect(rasterizeSVG('<svg />')).resolves.toBeNull();
  });

  it('resolves null when the image fails to load', async () => {
    mockCanvas();
    global.Image = class {
      width = 0;
      height = 0;
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      set src(_url: string) {
        setTimeout(() => this.onerror?.(), 0);
      }
      get src() {
        return '';
      }
    } as unknown as typeof Image;
    await expect(rasterizeSVG('<svg />')).resolves.toBeNull();
  });
});

describe('downloadBlob', () => {
  it('creates a link with the blob url and clicks it', () => {
    const clickSpy = jest.fn();
    const originalCreateElement = document.createElement.bind(document);
    jest.spyOn(document, 'createElement').mockImplementation((tag: string) => {
      if (tag === 'a') {
        return {
          href: '',
          download: '',
          click: clickSpy,
        } as unknown as HTMLElement;
      }
      return originalCreateElement(tag);
    });
    URL.createObjectURL = jest.fn(() => 'blob:url');
    URL.revokeObjectURL = jest.fn();
    downloadBlob(new Blob(['x']), 'img.png');
    expect(clickSpy).toHaveBeenCalled();
    expect(URL.createObjectURL).toHaveBeenCalled();
    jest.restoreAllMocks();
  });
});
