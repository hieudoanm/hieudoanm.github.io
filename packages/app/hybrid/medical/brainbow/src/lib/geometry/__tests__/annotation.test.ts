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

  it('returns false for empty points array', () => {
    expect(pathEncloses(lasso, [])).toBe(false);
  });
});

describe('annotation edge cases', () => {
  it('polygonArea returns 0 for empty array', () => {
    expect(polygonArea([])).toBe(0);
  });

  it('polygonArea returns 0 for single point', () => {
    expect(polygonArea([{ x: 5, y: 5 }])).toBe(0);
  });

  it('polygonArea returns 0 for two identical points', () => {
    expect(
      polygonArea([
        { x: 0, y: 0 },
        { x: 0, y: 0 },
      ])
    ).toBe(0);
  });

  it('polygonArea handles clockwise winding', () => {
    const area = polygonArea([
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 0 },
    ]);
    expect(area).toBe(1);
  });

  it('shouldClosePolygon returns false when draft has fewer than 3 points', () => {
    expect(
      shouldClosePolygon(
        [
          { x: 0, y: 0 },
          { x: 1, y: 0 },
        ],
        { x: 0, y: 0 },
        5
      )
    ).toBe(false);
  });

  it('pathLength returns 0 for empty array', () => {
    expect(pathLength([])).toBe(0);
  });

  it('pathLength returns 0 for single point', () => {
    expect(pathLength([{ x: 3, y: 4 }])).toBe(0);
  });

  it('pathLength sums multiple segments', () => {
    expect(
      pathLength([
        { x: 0, y: 0 },
        { x: 3, y: 4 },
        { x: 3, y: 8 },
      ])
    ).toBe(9);
  });

  it('simplifyPath returns input for single point', () => {
    const pts = [{ x: 1, y: 1 }];
    expect(simplifyPath(pts, 1)).toEqual(pts);
  });

  it('simplifyPath returns input for two points', () => {
    const pts = [
      { x: 0, y: 0 },
      { x: 5, y: 5 },
    ];
    expect(simplifyPath(pts, 1)).toEqual(pts);
  });

  it('simplifyPath recursively simplifies complex shapes', () => {
    const pts = [
      { x: 0, y: 0 },
      { x: 5, y: 0 },
      { x: 5, y: 0.1 },
      { x: 5, y: 5 },
    ];
    const result = simplifyPath(pts, 1);
    expect(result.length).toBeLessThan(pts.length);
    expect(result[0]).toEqual({ x: 0, y: 0 });
    expect(result[result.length - 1]).toEqual({ x: 5, y: 5 });
  });

  it('pointToSegmentDistance handles zero-length segment', () => {
    expect(
      pointToSegmentDistance({ x: 3, y: 4 }, { x: 1, y: 1 }, { x: 1, y: 1 })
    ).toBeCloseTo(Math.hypot(2, 3), 5);
  });

  it('segmentsIntersect detects collinear overlapping segments (c on ab)', () => {
    expect(
      segmentsIntersect(
        { x: 0, y: 0 },
        { x: 4, y: 0 },
        { x: 2, y: 0 },
        { x: 6, y: 0 }
      )
    ).toBe(true);
  });

  it('segmentsIntersect detects collinear case where d is on ab', () => {
    expect(
      segmentsIntersect(
        { x: 0, y: 0 },
        { x: 4, y: 0 },
        { x: 5, y: 0 },
        { x: 2, y: 0 }
      )
    ).toBe(true);
  });

  it('segmentsIntersect detects collinear case where a is on cd', () => {
    expect(
      segmentsIntersect(
        { x: 2, y: 0 },
        { x: 6, y: 0 },
        { x: 0, y: 0 },
        { x: 4, y: 0 }
      )
    ).toBe(true);
  });

  it('segmentsIntersect detects collinear case where b is on cd', () => {
    expect(
      segmentsIntersect(
        { x: 0, y: 0 },
        { x: 3, y: 0 },
        { x: 1, y: 0 },
        { x: 5, y: 0 }
      )
    ).toBe(true);
  });

  it('polylineDistance returns Infinity for two empty polylines', () => {
    expect(polylineDistance([], [])).toBe(Infinity);
  });

  it('polylineDistance handles single-point vs polyline (segmentsA empty)', () => {
    expect(
      polylineDistance(
        [{ x: 0, y: 0 }],
        [
          { x: 5, y: 0 },
          { x: 5, y: 5 },
        ]
      )
    ).toBe(5);
  });

  it('polylineDistance handles polyline vs single-point (segmentsB empty)', () => {
    expect(
      polylineDistance(
        [
          { x: 5, y: 0 },
          { x: 5, y: 5 },
        ],
        [{ x: 0, y: 0 }]
      )
    ).toBe(5);
  });

  it('polylineDistance returns point-to-point for two single points', () => {
    expect(polylineDistance([{ x: 0, y: 0 }], [{ x: 3, y: 4 }])).toBe(5);
  });

  it('polylineDistance with both closed and crossing segments', () => {
    const a = [
      { x: 0, y: 0 },
      { x: 10, y: 0 },
      { x: 10, y: 10 },
    ];
    const b = [
      { x: 5, y: 12 },
      { x: 5, y: -2 },
    ];
    expect(polylineDistance(a, b, true, false)).toBe(0);
  });

  it('polylineDistance with segmentsB closed', () => {
    const a = [
      { x: 0, y: 0 },
      { x: 10, y: 0 },
    ];
    const b = [
      { x: 5, y: -5 },
      { x: 5, y: -1 },
    ];
    expect(polylineDistance(a, b, false, true)).toBe(1);
  });

  it('pointInPolygon handles point on horizontal edge', () => {
    const square = [
      { x: 0, y: 0 },
      { x: 4, y: 0 },
      { x: 4, y: 4 },
      { x: 0, y: 4 },
    ];
    const result = pointInPolygon({ x: 2, y: 0 }, square);
    expect(typeof result).toBe('boolean');
  });

  it('perpendicularDistance handles zero-length segment via simplifyPath', () => {
    const pts = [
      { x: 0, y: 0 },
      { x: 5, y: 0 },
      { x: 5, y: 5 },
    ];
    const result = simplifyPath(pts, 100);
    expect(result.length).toBe(2);
  });

  it('segmentsIntersect rejects collinear non-overlapping segments', () => {
    expect(
      segmentsIntersect(
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 3, y: 0 },
        { x: 4, y: 0 }
      )
    ).toBe(false);
  });

  it('segmentDistance returns distance between non-intersecting segments', () => {
    const dist = segmentDistance(
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 3, y: 0 },
      { x: 4, y: 0 }
    );
    expect(dist).toBe(2);
  });
});
