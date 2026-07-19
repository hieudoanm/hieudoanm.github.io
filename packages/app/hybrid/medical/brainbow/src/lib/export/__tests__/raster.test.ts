import { flattenAnnotations } from '@/lib/export/raster';
import type { AnnotationLayer } from '@/types/annotation';
import type { ImageRaster } from '@/types/image';

const makeRaster = (): ImageRaster => ({
  width: 4,
  height: 4,
  data: new Uint8ClampedArray(4 * 4 * 4),
});

const squareLayer = (): AnnotationLayer => ({
  id: 'layer-1',
  name: 'Neurons',
  color: '#ff0000',
  visible: true,
  annotations: [
    {
      id: 'a-1',
      kind: 'polygon',
      points: [
        { x: 1, y: 1 },
        { x: 3, y: 1 },
        { x: 3, y: 3 },
        { x: 1, y: 3 },
      ],
    },
  ],
});

describe('flattenAnnotations', () => {
  it('blends annotation color into enclosed pixels', () => {
    const base = makeRaster();
    const flattened = flattenAnnotations(base, [squareLayer()]);
    const insideOffset = (2 * 4 + 2) * 4;
    const outsideOffset = 0;
    expect(flattened.data[insideOffset]).toBeGreaterThan(0);
    expect(flattened.data[outsideOffset]).toBe(0);
    expect(flattened.width).toBe(4);
  });

  it('keeps the raster unchanged when the layer is hidden', () => {
    const base = makeRaster();
    const hidden = { ...squareLayer(), visible: false };
    const flattened = flattenAnnotations(base, [hidden]);
    expect(Array.from(flattened.data)).toEqual(Array.from(base.data));
  });

  it('ignores annotations with fewer than three points', () => {
    const base = makeRaster();
    const layer: AnnotationLayer = {
      ...squareLayer(),
      annotations: [{ id: 'a-2', kind: 'polygon', points: [{ x: 0, y: 0 }] }],
    };
    expect(flattenAnnotations(base, [layer]).data).toEqual(base.data);
  });
});
