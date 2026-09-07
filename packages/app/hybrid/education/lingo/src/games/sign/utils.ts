export interface Landmark {
  x: number;
  y: number;
  z: number;
}

export { MODEL_URI } from '@/lib/publicPaths';
export const FEATURE_SIZE = 126;

/** Mirror x-axis so webcam input matches training data parity. */
export const mirrorLandmarks = (landmarks: Landmark[]): Landmark[] =>
  landmarks.map((lm) => ({ x: 1 - lm.x, y: lm.y, z: lm.z }));

/** Wrist → middle-MCP distance used to scale-normalise the hand pose. */
export const normalizeScale = (mirrored: Landmark[]): number =>
  Math.sqrt(
    (mirrored[0].x - mirrored[9].x) ** 2 +
      (mirrored[0].y - mirrored[9].y) ** 2 +
      (mirrored[0].z - mirrored[9].z) ** 2
  );

/**
 * Python-aligned feature vector:
 * 63 normalised landmark offsets + 60 bone vectors = 126 floats.
 */
export const extractFeatures = (
  mirrored: Landmark[],
  connections: [number, number][]
): number[] | null => {
  const normScale = normalizeScale(mirrored);
  if (normScale === 0) return null;

  const wrist = mirrored[0];
  const features: number[] = [];

  for (const lm of mirrored) {
    features.push(
      (lm.x - wrist.x) / normScale,
      (lm.y - wrist.y) / normScale,
      (lm.z - wrist.z) / normScale
    );
  }

  for (const [a, b] of connections) {
    const lmA = mirrored[a];
    const lmB = mirrored[b];
    features.push(lmB.x - lmA.x, lmB.y - lmA.y, lmB.z - lmA.z);
  }

  if (features.length !== FEATURE_SIZE) return null;
  return features;
};

/** Read the detected label from an ONNX string tensor output. */
export const readLabelTensor = (tensor: unknown): string => {
  const cpuData = (tensor as { cpuData?: string[] } | undefined)?.cpuData;
  return cpuData && cpuData.length > 0 ? cpuData[0] : '';
};
