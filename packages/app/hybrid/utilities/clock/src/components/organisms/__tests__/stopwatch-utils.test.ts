import { fmtStopwatch } from '@/lib/stopwatch';

describe('Stopwatch utils', () => {
  describe('fmtStopwatch', () => {
    it('formats zero milliseconds', () => {
      expect(fmtStopwatch(0)).toBe('00:00.00');
    });

    it('formats centiseconds', () => {
      expect(fmtStopwatch(500)).toBe('00:00.50');
    });

    it('formats seconds', () => {
      expect(fmtStopwatch(1500)).toBe('00:01.50');
    });

    it('formats minutes and seconds', () => {
      expect(fmtStopwatch(125000)).toBe('02:05.00');
    });

    it('formats large values', () => {
      expect(fmtStopwatch(3661000)).toBe('61:01.00');
    });
  });
});
