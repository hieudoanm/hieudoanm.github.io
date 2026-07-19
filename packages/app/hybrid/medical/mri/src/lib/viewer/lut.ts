export interface WindowLevel {
  width: number;
  center: number;
}

export const DEFAULT_WIDTH = 256;
export const DEFAULT_CENTER = 128;

export const defaultWindowLevel = (): WindowLevel => ({
  width: DEFAULT_WIDTH,
  center: DEFAULT_CENTER,
});

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

const readVoxel = (
  bytes: DataView,
  offset: number,
  signed: boolean
): number => {
  if (signed) {
    return bytes.getInt16(offset, true);
  }
  return bytes.getUint16(offset, true);
};

/**
 * Apply a linear window/level transform to little-endian 16-bit slice
 * bytes. Voxels below `center - width/2` map to black, voxels above
 * `center + width/2` map to white; the window maps linearly in between.
 */
export const applyWindowLevel = (
  data: ArrayBuffer,
  signed: boolean,
  windowLevel: WindowLevel
): Uint8ClampedArray<ArrayBuffer> => {
  const bytes = new DataView(data);
  const voxelCount = Math.floor(data.byteLength / 2);
  const output = new Uint8ClampedArray(voxelCount * 4);
  const low = windowLevel.center - windowLevel.width / 2;
  const scale = windowLevel.width > 0 ? 255 / windowLevel.width : 0;
  for (let index = 0; index < voxelCount; index += 1) {
    const voxel = readVoxel(bytes, index * 2, signed);
    const gray = clamp(Math.round((voxel - low) * scale), 0, 255);
    const offset = index * 4;
    output[offset] = gray;
    output[offset + 1] = gray;
    output[offset + 2] = gray;
    output[offset + 3] = 255;
  }
  return output;
};

/** Compute a sensible default window for a slice from its voxel range. */
export const autoWindowLevel = (
  data: ArrayBuffer,
  signed: boolean
): WindowLevel => {
  const bytes = new DataView(data);
  const voxelCount = Math.floor(data.byteLength / 2);
  if (voxelCount === 0) {
    return defaultWindowLevel();
  }
  let min = Infinity;
  let max = -Infinity;
  for (let index = 0; index < voxelCount; index += 1) {
    const voxel = readVoxel(bytes, index * 2, signed);
    if (voxel < min) min = voxel;
    if (voxel > max) max = voxel;
  }
  if (min === max) {
    return { width: 1, center: min };
  }
  return { width: max - min, center: (min + max) / 2 };
};
