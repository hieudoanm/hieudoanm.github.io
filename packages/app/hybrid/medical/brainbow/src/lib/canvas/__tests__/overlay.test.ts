import { drawAnnotationOverlay } from '@/lib/canvas/overlay';
import type { AnnotationLayer, MeasureKind, Point } from '@/types/annotation';
import type { ViewTransform } from '@/types/image';

const makeCtx = (): Record<string, jest.Mock> => ({
  setTransform: jest.fn(),
  clearRect: jest.fn(),
  beginPath: jest.fn(),
  closePath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  stroke: jest.fn(),
  fill: jest.fn(),
  arc: jest.fn(),
  fillRect: jest.fn(),
  strokeRect: jest.fn(),
  save: jest.fn(),
  restore: jest.fn(),
  setLineDash: jest.fn(),
  measureText: jest.fn(() => ({ width: 30 })),
  fillText: jest.fn(),
});

const canvasWith = (ctx: unknown): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  Object.defineProperty(canvas, 'clientWidth', {
    value: 200,
    configurable: true,
  });
  Object.defineProperty(canvas, 'clientHeight', {
    value: 120,
    configurable: true,
  });
  canvas.getContext = jest.fn(() => ctx) as unknown as typeof canvas.getContext;
  return canvas;
};

const layer = (overrides: Partial<AnnotationLayer> = {}): AnnotationLayer => ({
  id: 'l1',
  name: 'Neurons',
  color: '#ff0000',
  visible: true,
  annotations: [
    {
      id: 'a1',
      kind: 'polygon',
      points: [
        { x: 0, y: 0 },
        { x: 10, y: 0 },
        { x: 5, y: 10 },
      ],
    },
  ],
  ...overrides,
});

const transform: ViewTransform = { scale: 1, offsetX: 0, offsetY: 0 };

const points = (...values: number[]): Point[] =>
  values.map((value, index) => ({ x: value, y: index * 5 }));

describe('drawAnnotationOverlay', () => {
  it('does nothing without a 2d context', () => {
    const canvas = canvasWith(null);
    expect(() =>
      drawAnnotationOverlay(canvas, [], transform, null, 1)
    ).not.toThrow();
  });

  it('clears and strokes visible layers', () => {
    const ctx = makeCtx();
    drawAnnotationOverlay(canvasWith(ctx), [layer()], transform, null, 1);
    expect(ctx.clearRect).toHaveBeenCalledWith(0, 0, 200, 120);
    expect(ctx.stroke).toHaveBeenCalled();
    expect(ctx.closePath).toHaveBeenCalled();
  });

  it('skips hidden layers and short freehand paths', () => {
    const ctx = makeCtx();
    const hidden = layer({ id: 'l2', name: 'Hidden', visible: false });
    const sparse = layer({
      id: 'l3',
      name: 'Sparse',
      annotations: [{ id: 'a1', kind: 'freehand', points: points(0, 1) }],
    });
    drawAnnotationOverlay(
      canvasWith(ctx),
      [hidden, sparse],
      transform,
      null,
      1
    );
    expect(ctx.moveTo).toHaveBeenCalledTimes(1);
    expect(ctx.closePath).not.toHaveBeenCalled();
  });

  it('draws a dashed draft path with anchor dots', () => {
    const ctx = makeCtx();
    const draft = { points: points(0, 1, 2), color: '#ff0000' };
    drawAnnotationOverlay(canvasWith(ctx), [], transform, draft, 1);
    expect(ctx.setLineDash).toHaveBeenCalledWith([4, 4]);
    expect(ctx.arc).toHaveBeenCalledTimes(3);
    expect(ctx.fill).toHaveBeenCalled();
  });

  it('renders the guides grid when visible', () => {
    const ctx = makeCtx();
    drawAnnotationOverlay(canvasWith(ctx), [], transform, null, 1, null, null, {
      visible: true,
      spacing: 10,
    });
    expect(ctx.moveTo).toHaveBeenCalled();
  });

  it('skips the grid when spacing is invalid', () => {
    const ctx = makeCtx();
    drawAnnotationOverlay(canvasWith(ctx), [], transform, null, 1, null, null, {
      visible: true,
      spacing: 0,
    });
    expect(ctx.moveTo).not.toHaveBeenCalled();
    expect(ctx.stroke).not.toHaveBeenCalled();
  });

  it('draws the scale bar when a spec is provided', () => {
    const ctx = makeCtx();
    drawAnnotationOverlay(
      canvasWith(ctx),
      [],
      transform,
      null,
      1,
      { lengthPx: 50, lengthMicrons: 10, label: '10 µm' },
      null,
      null
    );
    expect(ctx.fillText).toHaveBeenCalledWith(
      '10 µm',
      expect.any(Number),
      expect.any(Number)
    );
  });

  it.each<MeasureKind>(['distance', 'angle', 'area'])(
    'skips an empty %s measure',
    (kind) => {
      const ctx = makeCtx();
      const measure = {
        kind,
        points: [] as Point[],
        calibration: { pixelsPerMicron: null },
      };
      drawAnnotationOverlay(
        canvasWith(ctx),
        [],
        transform,
        null,
        1,
        null,
        measure,
        null
      );
      expect(ctx.moveTo).not.toHaveBeenCalled();
      expect(ctx.fillText).not.toHaveBeenCalled();
    }
  );

  it('draws a distance label at the segment midpoint', () => {
    const ctx = makeCtx();
    const measure = {
      kind: 'distance' as const,
      points: points(0, 20),
      calibration: { pixelsPerMicron: 10 },
    };
    drawAnnotationOverlay(
      canvasWith(ctx),
      [],
      transform,
      null,
      1,
      null,
      measure,
      null
    );
    expect(ctx.fillText).toHaveBeenCalled();
  });

  it('draws an angle label once three points are placed', () => {
    const ctx = makeCtx();
    const measure = {
      kind: 'angle' as const,
      points: points(0, 10, 10, 0),
      calibration: { pixelsPerMicron: null },
    };
    drawAnnotationOverlay(
      canvasWith(ctx),
      [],
      transform,
      null,
      1,
      null,
      measure,
      null
    );
    expect(ctx.fillText).toHaveBeenCalledWith(
      expect.stringContaining('°'),
      expect.any(Number),
      expect.any(Number)
    );
  });

  it('draws an area label once three points are placed', () => {
    const ctx = makeCtx();
    const measure = {
      kind: 'area' as const,
      points: points(0, 10, 10, 0),
      calibration: { pixelsPerMicron: null },
    };
    drawAnnotationOverlay(
      canvasWith(ctx),
      [],
      transform,
      null,
      1,
      null,
      measure,
      null
    );
    expect(ctx.fillText).toHaveBeenCalled();
    expect(ctx.closePath).toHaveBeenCalled();
  });
});
