import {
  boundingBox,
  pathLength,
  pointInPolygon,
  polygonArea,
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
