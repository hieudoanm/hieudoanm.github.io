import type { Point } from '@/types/annotation';
import type { ImageRaster } from '@/types/image';
import {
  DEFAULT_ORIENTATION,
  invertPoint,
  nextOrientation,
  orientChannelRaster,
  orientPoint,
  orientRaster,
  orientedSize,
  remapPoints,
} from '@/lib/image/orientation';
import type { ChannelRaster, Orientation } from '@/types/image';

const makeRaster = (width: number, height: number): ImageRaster => {
  const data = new Uint8ClampedArray(width * height * 4);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const offset = (y * width + x) * 4;
      data[offset] = x;
      data[offset + 1] = y;
      data[offset + 2] = x + y;
      data[offset + 3] = 255;
    }
  }
  return { width, height, data };
};

const makeChannelRaster = (width: number, height: number): ChannelRaster => ({
  width,
  height,
  planes: [
    {
      id: 'c0',
      name: 'Ch 0',
      data: new Uint8ClampedArray(
        Array.from({ length: width * height }, (_, i) => i)
      ),
    },
  ],
});

describe('image orientation', () => {
  describe('orientedSize', () => {
    it('swaps dimensions for quarter-turn rotations', () => {
      expect(
        orientedSize({ rotation: 90, flipX: false, flipY: false }, 4, 3)
      ).toEqual({
        width: 3,
        height: 4,
      });
    });

    it('keeps dimensions for full turns', () => {
      expect(
        orientedSize({ rotation: 180, flipX: true, flipY: true }, 4, 3)
      ).toEqual({
        width: 4,
        height: 3,
      });
    });
  });

  describe('orientPoint / invertPoint', () => {
    const clockwise: Orientation = { rotation: 90, flipX: false, flipY: false };

    it('rotates a corner clockwise', () => {
      expect(orientPoint({ x: 2, y: 0 }, clockwise, 3, 2)).toEqual({
        x: 1,
        y: 2,
      });
    });

    it('inverts a clockwise rotation back to the source', () => {
      const rotated = orientPoint({ x: 2, y: 0 }, clockwise, 3, 2);
      expect(invertPoint(rotated, clockwise, 2, 3)).toEqual({ x: 2, y: 0 });
    });

    it('flips horizontally', () => {
      const flipX: Orientation = { rotation: 0, flipX: true, flipY: false };
      expect(orientPoint({ x: 1, y: 0 }, flipX, 4, 2)).toEqual({ x: 2, y: 0 });
    });

    it('flips vertically', () => {
      const flipY: Orientation = { rotation: 0, flipX: false, flipY: true };
      expect(orientPoint({ x: 0, y: 1 }, flipY, 4, 2)).toEqual({ x: 0, y: 0 });
    });

    it('round-trips an arbitrary point through all actions', () => {
      const original = { x: 7, y: 4 };
      let orientation = DEFAULT_ORIENTATION;
      let dims = { width: 10, height: 8 };
      const originalDims = { width: 10, height: 8 };
      for (const action of [
        'rotateCW',
        'rotateCW',
        'flipX',
        'rotateCCW',
        'flipY',
      ]) {
        orientation = nextOrientation(orientation, action as 'rotateCW');
        dims = orientedSize(
          orientation,
          originalDims.width,
          originalDims.height
        );
        const mapped = orientPoint(original, orientation, 10, 8);
        expect(
          invertPoint(mapped, orientation, dims.width, dims.height)
        ).toEqual(original);
      }
    });
  });

  describe('remapPoints', () => {
    it('remaps points between two orientations via original coordinates', () => {
      const points: Point[] = [
        { x: 0, y: 0 },
        { x: 4, y: 0 },
        { x: 4, y: 4 },
      ];
      const from = DEFAULT_ORIENTATION;
      const to = nextOrientation(from, 'rotateCW');
      const remapped = remapPoints(points, from, to, 5, 5);
      expect(remapped[0]).toEqual({ x: 4, y: 0 });
      expect(remapped[1]).toEqual({ x: 4, y: 4 });
      expect(remapped[2]).toEqual({ x: 0, y: 4 });
    });

    it('returns the input unchanged for identical orientations', () => {
      const points: Point[] = [{ x: 1, y: 2 }];
      expect(
        remapPoints(points, DEFAULT_ORIENTATION, DEFAULT_ORIENTATION, 5, 5)
      ).toBe(points);
    });
  });

  describe('orientRaster', () => {
    it('rotates the raster and remaps pixels', () => {
      const raster = makeRaster(2, 1);
      const rotated = orientRaster(raster, {
        rotation: 90,
        flipX: false,
        flipY: false,
      });
      expect(rotated.width).toBe(1);
      expect(rotated.height).toBe(2);
      expect(rotated.data[0]).toBe(0);
      expect(rotated.data[4]).toBe(1);
    });

    it('returns the same raster for the default orientation', () => {
      const raster = makeRaster(2, 1);
      expect(orientRaster(raster, DEFAULT_ORIENTATION)).toBe(raster);
    });

    it('flips the raster horizontally', () => {
      const raster = makeRaster(3, 1);
      const flipped = orientRaster(raster, {
        rotation: 0,
        flipX: true,
        flipY: false,
      });
      expect(flipped.data[0]).toBe(2);
      expect(flipped.data[4]).toBe(1);
      expect(flipped.data[8]).toBe(0);
    });
  });

  describe('orientChannelRaster', () => {
    it('applies orientation to every plane', () => {
      const raster = makeChannelRaster(2, 1);
      const rotated = orientChannelRaster(raster, {
        rotation: 90,
        flipX: false,
        flipY: false,
      });
      expect(rotated.width).toBe(1);
      expect(rotated.height).toBe(2);
      expect(rotated.planes[0].data[0]).toBe(0);
      expect(rotated.planes[0].data[1]).toBe(1);
    });
  });

  describe('nextOrientation', () => {
    it('accumulates quarter turns', () => {
      let orientation = nextOrientation(DEFAULT_ORIENTATION, 'rotateCW');
      orientation = nextOrientation(orientation, 'rotateCW');
      expect(orientation.rotation).toBe(180);
    });

    it('toggles flips', () => {
      expect(nextOrientation(DEFAULT_ORIENTATION, 'flipX').flipX).toBe(true);
      expect(nextOrientation(DEFAULT_ORIENTATION, 'flipY').flipY).toBe(true);
    });
  });
});
