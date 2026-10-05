import {
  formatBytes,
  formatDuration,
  formatNumber,
  formatPercent,
} from '@/lib/format/numbers';
import { formatClock, formatTimestamp } from '@/lib/format/dates';

describe('number formatting', () => {
  test('formats to a fixed precision', () => {
    expect(formatNumber(0.8123)).toBe('0.812');
    expect(formatNumber(0.8123, 1)).toBe('0.8');
    expect(formatNumber(12, 0)).toBe('12');
  });

  test('shows a dash for a missing value', () => {
    expect(formatNumber(null)).toBe('—');
    expect(formatNumber(undefined)).toBe('—');
    expect(formatNumber(Number.NaN)).toBe('—');
  });

  test('formats percentages', () => {
    expect(formatPercent(0.2)).toBe('20.0%');
    expect(formatPercent(null)).toBe('—');
  });

  test('formats durations at the right scale', () => {
    expect(formatDuration(45)).toBe('45s');
    expect(formatDuration(90)).toBe('1m 30s');
    expect(formatDuration(3700)).toBe('1h 1m');
    expect(formatDuration(null)).toBe('—');
    expect(formatDuration(-5)).toBe('0s');
  });

  test('formats file sizes', () => {
    expect(formatBytes(512)).toBe('512 B');
    expect(formatBytes(2048)).toBe('2.0 KB');
    expect(formatBytes(5 * 1024 * 1024)).toBe('5.0 MB');
    expect(formatBytes(null)).toBe('—');
  });
});

describe('date formatting', () => {
  test('shows a dash when there is no timestamp', () => {
    expect(formatTimestamp(null)).toBe('—');
    expect(formatClock(undefined)).toBe('—');
  });

  test('passes an unparsable value through unchanged', () => {
    expect(formatTimestamp('not a date')).toBe('not a date');
  });

  test('formats a valid timestamp', () => {
    expect(formatTimestamp('2026-10-05T10:00:00Z')).not.toBe(
      '2026-10-05T10:00:00Z'
    );
  });
});
