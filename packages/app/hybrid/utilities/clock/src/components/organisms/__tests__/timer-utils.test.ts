import { fmtTimer, TIMER_PRESETS } from '@/lib/timer';

describe('Timer utils', () => {
  describe('fmtTimer', () => {
    it('formats zero seconds', () => {
      expect(fmtTimer(0)).toBe('00:00');
    });

    it('formats seconds under a minute', () => {
      expect(fmtTimer(45)).toBe('00:45');
    });

    it('formats exactly one minute', () => {
      expect(fmtTimer(60)).toBe('01:00');
    });

    it('formats hours, minutes, and seconds', () => {
      expect(fmtTimer(3661)).toBe('01:01:01');
    });

    it('formats large values', () => {
      expect(fmtTimer(7200)).toBe('02:00:00');
    });
  });

  describe('TIMER_PRESETS', () => {
    it('has six presets', () => {
      expect(TIMER_PRESETS).toHaveLength(6);
    });

    it('has 1 min as first preset', () => {
      expect(TIMER_PRESETS[0]).toEqual({ label: '1 min', seconds: 60 });
    });

    it('has 60 min as last preset', () => {
      expect(TIMER_PRESETS[5]).toEqual({ label: '60 min', seconds: 3600 });
    });
  });
});
