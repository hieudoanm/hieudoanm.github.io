import {
  DEFAULT_TRANSFORM,
  fitTransform,
  imageToView,
  panBy,
  viewToImage,
  zoomAt,
} from '@/lib/geometry/viewport';

describe('viewport geometry', () => {
  describe('fitTransform', () => {
    it('scales to fit the view while preserving aspect ratio', () => {
      const transform = fitTransform(100, 50, 200, 200);
      expect(transform.scale).toBe(2);
    });

    it('centres the image in the viewport', () => {
      const transform = fitTransform(100, 100, 300, 200);
      expect(transform.scale).toBe(2);
      expect(transform.offsetX).toBe(50);
      expect(transform.offsetY).toBe(0);
    });

    it('returns the default transform for a zero-size view', () => {
      expect(fitTransform(100, 100, 0, 0)).toEqual(DEFAULT_TRANSFORM);
    });

    it('handles an image wider than the view', () => {
      const transform = fitTransform(200, 100, 100, 100);
      expect(transform.scale).toBe(0.5);
      expect(transform.offsetX).toBe(0);
      expect(transform.offsetY).toBe(25);
    });
  });

  describe('zoomAt', () => {
    it('keeps the zoom point stationary under the cursor', () => {
      const transform = { scale: 1, offsetX: 10, offsetY: 20 };
      const point = { x: 50, y: 60 };
      const zoomed = zoomAt(transform, point.x, point.y, 2);
      expect(zoomed.scale).toBe(2);
      expect(imageToView(zoomed, 40, 40)).toEqual(point);
    });

    it('clamps scale to a minimum', () => {
      const transform = { scale: 0.01, offsetX: 0, offsetY: 0 };
      expect(zoomAt(transform, 0, 0, 0.5).scale).toBe(0.01);
    });

    it('clamps scale to a maximum', () => {
      const transform = { scale: 64, offsetX: 0, offsetY: 0 };
      expect(zoomAt(transform, 0, 0, 2).scale).toBe(64);
    });
  });

  describe('panBy', () => {
    it('translates the transform offsets', () => {
      const transform = { scale: 1, offsetX: 10, offsetY: 20 };
      expect(panBy(transform, 5, -3)).toEqual({
        scale: 1,
        offsetX: 15,
        offsetY: 17,
      });
    });
  });

  describe('imageToView / viewToImage', () => {
    it('round-trips a coordinate', () => {
      const transform = { scale: 2, offsetX: 10, offsetY: 20 };
      const view = imageToView(transform, 5, 6);
      expect(viewToImage(transform, view.x, view.y)).toEqual({ x: 5, y: 6 });
    });
  });
});
