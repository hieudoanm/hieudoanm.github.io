import {
  boundingBox,
  pathEncloses,
  pathLength,
  pointInPolygon,
  pointToSegmentDistance,
  polygonArea,
  polylineDistance,
  segmentDistance,
  segmentsIntersect,
  shouldClosePolygon,
  simplifyPath,
} from '@/lib/geometry/annotation';

describe('polygonArea', () => {
  it('computes the area of a unit square', () => {
    expect(
      polygonArea([
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 0, y: 1 },
      ])
    ).toBe(1);
  });
});

describe('pointInPolygon', () => {
  const square = [
    { x: 0, y: 0 },
    { x: 2, y: 0 },
    { x: 2, y: 2 },
    { x: 0, y: 2 },
  ];
  it('detects an interior point', () => {
    expect(pointInPolygon({ x: 1, y: 1 }, square)).toBe(true);
  });
  it('rejects an exterior point', () => {
    expect(pointInPolygon({ x: 5, y: 5 }, square)).toBe(false);
  });
});

describe('boundingBox', () => {
  it('computes min and max extents', () => {
    expect(
      boundingBox([
        { x: 3, y: 7 },
        { x: -1, y: 2 },
        { x: 4, y: -3 },
      ])
    ).toEqual({ minX: -1, minY: -3, maxX: 4, maxY: 7 });
  });
});

describe('shouldClosePolygon', () => {
  const draft = [
    { x: 0, y: 0 },
    { x: 5, y: 0 },
    { x: 5, y: 5 },
  ];
  it('closes when the cursor returns near the start', () => {
    expect(shouldClosePolygon(draft, { x: 1, y: 0 }, 3)).toBe(true);
  });
  it('stays open when the cursor is far from the start', () => {
    expect(shouldClosePolygon(draft, { x: 5, y: 5 }, 3)).toBe(false);
  });
});

describe('pathLength', () => {
  it('sums segment distances', () => {
    expect(
      pathLength([
        { x: 0, y: 0 },
        { x: 3, y: 4 },
      ])
    ).toBe(5);
  });
});

describe('simplifyPath', () => {
  it('removes collinear points', () => {
    expect(
      simplifyPath(
        [
          { x: 0, y: 0 },
          { x: 1, y: 1 },
          { x: 2, y: 2 },
        ],
        1
      )
    ).toEqual([
      { x: 0, y: 0 },
      { x: 2, y: 2 },
    ]);
  });
});

describe('pointToSegmentDistance', () => {
  it('measures the perpendicular distance to a segment', () => {
    expect(
      pointToSegmentDistance({ x: 1, y: 1 }, { x: 0, y: 0 }, { x: 0, y: 10 })
    ).toBeCloseTo(1, 5);
  });

  it('returns zero for points on the segment', () => {
    expect(
      pointToSegmentDistance({ x: 0, y: 1 }, { x: 0, y: 0 }, { x: 0, y: 10 })
    ).toBeCloseTo(0, 5);
  });

  it('clamps to the nearest endpoint', () => {
    expect(
      pointToSegmentDistance({ x: 3, y: 4 }, { x: 0, y: 0 }, { x: 1, y: 0 })
    ).toBeCloseTo(Math.hypot(2, 4), 5);
  });
});

describe('segmentsIntersect', () => {
  it('detects crossing segments', () => {
    expect(
      segmentsIntersect(
        { x: 0, y: 0 },
        { x: 2, y: 2 },
        { x: 0, y: 2 },
        { x: 2, y: 0 }
      )
    ).toBe(true);
  });

  it('rejects disjoint segments', () => {
    expect(
      segmentsIntersect(
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 3, y: 3 },
        { x: 4, y: 3 }
      )
    ).toBe(false);
  });
});

describe('segmentDistance', () => {
  it('returns zero for intersecting segments', () => {
    expect(
      segmentDistance(
        { x: 0, y: 0 },
        { x: 2, y: 2 },
        { x: 0, y: 2 },
        { x: 2, y: 0 }
      )
    ).toBe(0);
  });

  it('returns the closest endpoint distance for parallel segments', () => {
    expect(
      segmentDistance(
        { x: 0, y: 0 },
        { x: 10, y: 0 },
        { x: 0, y: 2 },
        { x: 10, y: 2 }
      )
    ).toBe(2);
  });
});

describe('polylineDistance', () => {
  it('detects an erase stroke crossing a trace', () => {
    const trace = [
      { x: 0, y: 0 },
      { x: 10, y: 0 },
    ];
    const stroke = [
      { x: 4, y: -2 },
      { x: 4, y: 2 },
    ];
    expect(polylineDistance(trace, stroke)).toBeLessThanOrEqual(2);
  });

  it('includes the closing segment for closed annotations', () => {
    const triangle = [
      { x: 0, y: 0 },
      { x: 10, y: 0 },
      { x: 4, y: 10 },
    ];
    const stroke = [{ x: 2.93, y: 4.63 }];
    expect(polylineDistance(triangle, stroke, true)).toBeCloseTo(1, 2);
    expect(polylineDistance(triangle, stroke, false)).toBeGreaterThan(2);
  });

  it('measures point-to-path for degenerate annotations', () => {
    expect(
      polylineDistance(
        [{ x: 0, y: 0 }],
        [
          { x: 5, y: 0 },
          { x: 5, y: 10 },
        ]
      )
    ).toBe(5);
  });
});

describe('pathEncloses', () => {
  const lasso = [
    { x: 0, y: 0 },
    { x: 10, y: 0 },
    { x: 10, y: 10 },
    { x: 0, y: 10 },
  ];
  it('returns true when every point lies inside the polygon', () => {
    expect(
      pathEncloses(lasso, [
        { x: 2, y: 2 },
        { x: 4, y: 4 },
      ])
    ).toBe(true);
  });

  it('returns false when a point falls outside', () => {
    expect(
      pathEncloses(lasso, [
        { x: 2, y: 2 },
        { x: 12, y: 2 },
      ])
    ).toBe(false);
  });
});
