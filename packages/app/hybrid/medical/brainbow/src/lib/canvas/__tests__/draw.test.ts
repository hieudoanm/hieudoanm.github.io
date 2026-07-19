import { drawRasterToCanvas, drawRasterToContext } from '@/lib/canvas/draw';
import type { ImageRaster, ViewTransform } from '@/types/image';

if (typeof globalThis.ImageData === 'undefined') {
  class ImageDataMock {
    readonly width: number;
    readonly height: number;
    readonly data: Uint8ClampedArray;

    constructor(data: Uint8ClampedArray, width: number, height: number) {
      this.data = data;
      this.width = width;
      this.height = height;
    }
  }

  globalThis.ImageData = ImageDataMock as unknown as typeof ImageData;
}

const makeCtx = (): {
  ctx: Record<string, jest.Mock>;
  calls: { putImageData: unknown[] };
} => {
  const calls: { putImageData: unknown[] } = { putImageData: [] };
  const ctx: Record<string, jest.Mock> = {
    fillRect: jest.fn(),
    putImageData: jest.fn((data) => calls.putImageData.push(data)),
    setTransform: jest.fn(),
    drawImage: jest.fn(),
    beginPath: jest.fn(),
    closePath: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    stroke: jest.fn(),
    fill: jest.fn(),
    arc: jest.fn(),
    save: jest.fn(),
    restore: jest.fn(),
    measureText: jest.fn(() => ({ width: 30 })),
    fillText: jest.fn(),
    strokeRect: jest.fn(),
    clearRect: jest.fn(),
  };
  return { ctx, calls };
};

const raster: ImageRaster = {
  width: 2,
  height: 1,
  data: new Uint8ClampedArray([255, 0, 0, 255, 0, 255, 0, 255]),
};

const transform: ViewTransform = { scale: 2, offsetX: 5, offsetY: 6 };

const createCanvas = (getContext: jest.Mock): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  Object.defineProperty(canvas, 'clientWidth', {
    value: 100,
    configurable: true,
  });
  Object.defineProperty(canvas, 'clientHeight', {
    value: 50,
    configurable: true,
  });
  canvas.getContext = getContext;
  return canvas;
};

describe('drawRasterToContext', () => {
  it('fills the background and draws the raster', () => {
    const { ctx, calls } = makeCtx();
    const originalCreateElement = document.createElement;
    const offscreen = document.createElement('canvas');
    offscreen.getContext = jest.fn(
      () => ctx
    ) as unknown as typeof offscreen.getContext;
    document.createElement = jest.fn((tag: string) =>
      tag === 'canvas' ? offscreen : originalCreateElement(tag)
    ) as typeof document.createElement;
    try {
      drawRasterToContext(
        ctx as unknown as CanvasRenderingContext2D,
        raster,
        transform,
        100,
        50
      );
    } finally {
      document.createElement = originalCreateElement;
    }
    expect(ctx.fillStyle).toBe('#05080f');
    expect(ctx.fillRect).toHaveBeenCalledWith(0, 0, 100, 50);
    expect(calls.putImageData).toHaveLength(1);
    const imageData = calls.putImageData[0] as ImageData;
    expect(imageData.width).toBe(2);
    expect(imageData.height).toBe(1);
    expect(ctx.drawImage).toHaveBeenCalledWith(expect.anything(), 5, 6, 4, 2);
  });

  it('stops when the offscreen context is unavailable', () => {
    const { ctx } = makeCtx();
    const canvas = createCanvas(jest.fn(() => null));
    const originalCreateElement = document.createElement;
    document.createElement = jest.fn(
      () => canvas
    ) as unknown as typeof document.createElement;
    try {
      drawRasterToContext(
        ctx as unknown as CanvasRenderingContext2D,
        raster,
        transform,
        10,
        10
      );
      expect(ctx.drawImage).not.toHaveBeenCalled();
    } finally {
      document.createElement = originalCreateElement;
    }
  });
});

describe('drawRasterToCanvas', () => {
  it('sizes the backing store and applies the device pixel ratio', () => {
    const { ctx } = makeCtx();
    const canvas = createCanvas(jest.fn(() => ctx));
    drawRasterToCanvas(canvas, raster, transform, 2);
    expect(canvas.width).toBe(200);
    expect(canvas.height).toBe(100);
    expect(ctx.setTransform).toHaveBeenCalledWith(2, 0, 0, 2, 0, 0);
    expect(ctx.fillRect).toHaveBeenCalled();
  });

  it('stops when the 2d context is unavailable', () => {
    const canvas = createCanvas(jest.fn(() => null));
    expect(() =>
      drawRasterToCanvas(canvas, raster, transform, 1)
    ).not.toThrow();
  });
});
