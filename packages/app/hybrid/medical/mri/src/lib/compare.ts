import { applyWindowLevel, type WindowLevel } from '@/lib/viewer/lut';

export interface DiffStats {
  meanAbsDiff: number;
  maxDiff: number;
  rmse: number;
}

const readVoxel = (bytes: DataView, offset: number, signed: boolean): number =>
  signed ? bytes.getInt16(offset, true) : bytes.getUint16(offset, true);

/** Element-wise absolute-difference statistics for two same-sized slices. */
export const diffStats = (
  left: ArrayBuffer,
  right: ArrayBuffer,
  signed: boolean
): DiffStats => {
  const leftView = new DataView(left);
  const rightView = new DataView(right);
  const count = Math.min(left.byteLength, right.byteLength) / 2;
  let sumAbs = 0;
  let max = 0;
  let sumSquares = 0;
  for (let index = 0; index < count; index += 1) {
    const delta = Math.abs(
      readVoxel(leftView, index * 2, signed) -
        readVoxel(rightView, index * 2, signed)
    );
    sumAbs += delta;
    sumSquares += delta * delta;
    if (delta > max) max = delta;
  }
  return {
    meanAbsDiff: count > 0 ? sumAbs / count : 0,
    maxDiff: max,
    rmse: count > 0 ? Math.sqrt(sumSquares / count) : 0,
  };
};

/** Render the absolute difference map as greyscale RGBA using a window. */
export const diffToRgba = (
  left: ArrayBuffer,
  right: ArrayBuffer,
  signed: boolean,
  windowLevel: WindowLevel
): Uint8ClampedArray<ArrayBuffer> => {
  const leftView = new DataView(left);
  const rightView = new DataView(right);
  const count = Math.min(left.byteLength, right.byteLength) / 2;
  const diffs = new Uint16Array(count);
  let max = 0;
  for (let index = 0; index < count; index += 1) {
    const delta = Math.abs(
      readVoxel(leftView, index * 2, signed) -
        readVoxel(rightView, index * 2, signed)
    );
    diffs[index] = Math.min(delta, 65535);
    if (delta > max) max = delta;
  }
  const buffer = diffs.buffer.slice(
    diffs.byteOffset,
    diffs.byteOffset + diffs.byteLength
  );
  const effective =
    max > 0 && windowLevel.width <= 0
      ? { center: max / 2, width: max }
      : windowLevel;
  return applyWindowLevel(buffer, false, effective);
};

/** Overlay crosshair lines onto an RGBA buffer (in place). */
export const applyCrosshair = (
  rgba: Uint8ClampedArray,
  width: number,
  height: number,
  x: number,
  y: number
): void => {
  const draw = (px: number, py: number) => {
    const offset = (py * width + px) * 4;
    rgba[offset] = 255 - rgba[offset];
    rgba[offset + 1] = 255 - rgba[offset + 1];
    rgba[offset + 2] = 255 - rgba[offset + 2];
  };
  for (let column = 0; column < width; column += 1) {
    draw(column, Math.min(y, height - 1));
  }
  for (let row = 0; row < height; row += 1) {
    draw(Math.min(x, width - 1), row);
  }
};
