import {
  formatMeasure,
  measureAngle,
  measureArea,
  measureDistance,
  type MeasureValue,
} from '@/lib/measure/measure';
import type { Calibration } from '@/types/image';

const UNSCALED: Calibration = { pixelsPerMicron: null };
const TWO_PX_PER_MICRON: Calibration = { pixelsPerMicron: 2 };

describe('measureDistance', () => {
  it('returns zero when fewer than two points are provided', () => {
    expect(measureDistance([{ x: 0, y: 0 }], UNSCALED)).toEqual({
      pixels: 0,
      microns: null,
    });
  });

  it('measures the distance between the last two points', () => {
    const value = measureDistance(
      [
        { x: 0, y: 0 },
        { x: 3, y: 4 },
      ],
      UNSCALED
    );
    expect(value.pixels).toBeCloseTo(5);
    expect(value.microns).toBeNull();
  });

  it('converts pixels to microns when calibrated', () => {
    const value = measureDistance(
      [
        { x: 0, y: 0 },
        { x: 4, y: 0 },
      ],
      TWO_PX_PER_MICRON
    );
    expect(value.pixels).toBe(4);
    expect(value.microns).toBeCloseTo(2);
  });
});

describe('measureArea', () => {
  it('computes the area of a unit square in pixels', () => {
    const value = measureArea(
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 0, y: 1 },
      ],
      UNSCALED
    );
    expect(value.pixels).toBeCloseTo(1);
    expect(value.microns).toBeNull();
  });

  it('converts square pixels to square microns when calibrated', () => {
    const value = measureArea(
      [
        { x: 0, y: 0 },
        { x: 4, y: 0 },
        { x: 4, y: 4 },
        { x: 0, y: 4 },
      ],
      TWO_PX_PER_MICRON
    );
    expect(value.pixels).toBeCloseTo(16);
    expect(value.microns).toBeCloseTo(4);
  });
});

describe('measureAngle', () => {
  it('returns zero with fewer than three points', () => {
    expect(
      measureAngle([
        { x: 0, y: 0 },
        { x: 1, y: 0 },
      ])
    ).toBe(0);
  });

  it('measures a right angle at the middle point', () => {
    expect(
      measureAngle([
        { x: 1, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 1 },
      ])
    ).toBeCloseTo(90);
  });

  it('measures a 45 degree angle', () => {
    expect(
      measureAngle([
        { x: 1, y: 0 },
        { x: 0, y: 0 },
        { x: 1, y: 1 },
      ])
    ).toBeCloseTo(45);
  });

  it('handles a straight line as 180 degrees', () => {
    expect(
      measureAngle([
        { x: -1, y: 0 },
        { x: 0, y: 0 },
        { x: 1, y: 0 },
      ])
    ).toBeCloseTo(180);
  });
});

describe('formatMeasure', () => {
  it('formats a calibrated distance with microns', () => {
    const value: MeasureValue = { pixels: 12.34, microns: 6.17 };
    expect(formatMeasure(value)).toBe('12.3 px · 6.17 µm');
  });

  it('omits microns when uncalibrated', () => {
    const value: MeasureValue = { pixels: 12.34, microns: null };
    expect(formatMeasure(value)).toBe('12.3 px');
  });

  it('formats a squared value for areas', () => {
    const value: MeasureValue = { pixels: 16, microns: 4 };
    expect(formatMeasure(value, true)).toBe('16.0 px² · 4.00 µm²');
  });
});
