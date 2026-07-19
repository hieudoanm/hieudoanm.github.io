import {
  findNearestVertex,
  snapPoint,
  snapToGrid,
  collectLayerVertices,
} from '@/lib/geometry/snap';
import type { AnnotationLayer } from '@/types/annotation';

describe('snapToGrid', () => {
  it('snaps a point to the nearest grid intersection', () => {
    expect(snapToGrid({ x: 23, y: 47 }, 50)).toEqual({ x: 0, y: 50 });
    expect(snapToGrid({ x: 61, y: 99 }, 50)).toEqual({ x: 50, y: 100 });
  });
});

describe('findNearestVertex', () => {
  const vertices = [
    { x: 0, y: 0 },
    { x: 10, y: 0 },
  ];
  it('returns the nearest vertex within the threshold', () => {
    expect(findNearestVertex({ x: 1, y: 0.5 }, vertices, 2)).toEqual({
      x: 0,
      y: 0,
    });
  });

  it('returns null when no vertex is close enough', () => {
    expect(findNearestVertex({ x: 5, y: 5 }, vertices, 2)).toBeNull();
  });
});

describe('collectLayerVertices', () => {
  const layers: AnnotationLayer[] = [
    {
      id: 'l1',
      name: 'Visible',
      color: '#fff',
      visible: true,
      annotations: [
        {
          id: 'a1',
          kind: 'polygon',
          points: [
            { x: 1, y: 1 },
            { x: 2, y: 2 },
          ],
        },
      ],
    },
    {
      id: 'l2',
      name: 'Hidden',
      color: '#000',
      visible: false,
      annotations: [{ id: 'a2', kind: 'freehand', points: [{ x: 9, y: 9 }] }],
    },
  ];
  it('collects vertices from visible layers only', () => {
    expect(collectLayerVertices(layers)).toEqual([
      { x: 1, y: 1 },
      { x: 2, y: 2 },
    ]);
  });
});

describe('snapPoint', () => {
  const vertices = [{ x: 10, y: 10 }];
  it('prefers an existing vertex over the grid', () => {
    expect(snapPoint({ x: 10.6, y: 10.4 }, vertices, true, 50, 2)).toEqual({
      x: 10,
      y: 10,
    });
  });

  it('falls back to the grid when enabled', () => {
    expect(snapPoint({ x: 23, y: 47 }, [], true, 50, 2)).toEqual({
      x: 0,
      y: 50,
    });
  });

  it('returns the raw point when nothing snaps', () => {
    expect(snapPoint({ x: 23, y: 47 }, [], false, 50, 2)).toEqual({
      x: 23,
      y: 47,
    });
  });
});
