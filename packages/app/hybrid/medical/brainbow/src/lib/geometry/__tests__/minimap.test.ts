import {
  minimapRect,
  minimapToImage,
  visibleImageBounds,
} from '@/lib/geometry/minimap';
import type { ViewTransform } from '@/types/image';

describe('visibleImageBounds', () => {
  it('maps the viewport corners into image coordinates', () => {
    const transform: ViewTransform = { scale: 2, offsetX: 10, offsetY: 20 };
    const bounds = visibleImageBounds(transform, 100, 50);
    expect(bounds.minX).toBe(-5);
    expect(bounds.minY).toBe(-10);
    expect(bounds.maxX).toBe(45);
    expect(bounds.maxY).toBe(15);
  });
});

describe('minimapRect', () => {
  it('projects image bounds through the minimap fit transform', () => {
    const fit: ViewTransform = { scale: 0.5, offsetX: 5, offsetY: 5 };
    const rect = minimapRect({ minX: 0, minY: 0, maxX: 20, maxY: 10 }, fit);
    expect(rect).toEqual({ x: 5, y: 5, width: 10, height: 5 });
  });
});

describe('minimapToImage', () => {
  it('converts a minimap pixel into image coordinates', () => {
    const fit: ViewTransform = { scale: 0.5, offsetX: 5, offsetY: 5 };
    expect(minimapToImage({ x: 15, y: 5 }, fit)).toEqual({ x: 20, y: 0 });
  });
});
