import {
  extractFeatures,
  FEATURE_SIZE,
  mirrorLandmarks,
  normalizeScale,
  readLabelTensor,
} from '../utils';

const CONNECTIONS: [number, number][] = Array.from({ length: 21 }, (_, i) => [
  i,
  (i + 1) % 21,
]);

const makeLandmarks = (): { x: number; y: number; z: number }[] =>
  Array.from({ length: 21 }, (_, i) => ({
    x: 0.1 + i * 0.01,
    y: 0.2 + i * 0.01,
    z: 0.3,
  }));

describe('mirrorLandmarks', () => {
  it('mirrors x and keeps y/z', () => {
    const mirrored = mirrorLandmarks([{ x: 0.25, y: 0.5, z: 0.75 }]);
    expect(mirrored[0]).toEqual({ x: 0.75, y: 0.5, z: 0.75 });
  });
});

describe('normalizeScale', () => {
  it('measures wrist to middle-MCP distance', () => {
    const landmarks = makeLandmarks();
    landmarks[9] = { x: 0.6, y: 0.2, z: 0.3 };
    expect(normalizeScale(landmarks)).toBeCloseTo(0.5, 5);
  });
});

describe('extractFeatures', () => {
  it('returns a feature vector of exactly 126 floats', () => {
    const features = extractFeatures(makeLandmarks(), CONNECTIONS);
    expect(features).not.toBeNull();
    expect(features).toHaveLength(FEATURE_SIZE);
    features!.forEach((value) => expect(Number.isFinite(value)).toBe(true));
  });

  it('returns null when scale is zero', () => {
    const collapsed = Array.from({ length: 21 }, () => ({
      x: 0.5,
      y: 0.5,
      z: 0.5,
    }));
    expect(extractFeatures(collapsed, CONNECTIONS)).toBeNull();
  });

  it('returns null when connection count mismatches', () => {
    expect(extractFeatures(makeLandmarks(), [[0, 1]])).toBeNull();
  });
});

describe('readLabelTensor', () => {
  it('reads the first label from cpuData', () => {
    expect(readLabelTensor({ cpuData: ['A'] })).toBe('A');
  });

  it('returns empty string when missing or empty', () => {
    expect(readLabelTensor(undefined)).toBe('');
    expect(readLabelTensor({})).toBe('');
    expect(readLabelTensor({ cpuData: [] })).toBe('');
  });
});
