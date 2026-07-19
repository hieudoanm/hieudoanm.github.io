import { fmt, PRESETS } from '@/lib/pomodoro';

describe('Pomodoro utils', () => {
  describe('fmt', () => {
    it('formats zero seconds', () => {
      expect(fmt(0)).toBe('00:00');
    });

    it('formats seconds under a minute', () => {
      expect(fmt(45)).toBe('00:45');
    });

    it('formats exactly one minute', () => {
      expect(fmt(60)).toBe('01:00');
    });

    it('formats minutes and seconds', () => {
      expect(fmt(125)).toBe('02:05');
    });

    it('formats large values', () => {
      expect(fmt(3661)).toBe('61:01');
    });
  });

  describe('PRESETS', () => {
    it('has three presets', () => {
      expect(PRESETS).toHaveLength(3);
    });

    it('has 25/5 as first preset', () => {
      expect(PRESETS[0]).toEqual({ label: '25 / 5', work: 25, break: 5 });
    });

    it('has 50/10 as second preset', () => {
      expect(PRESETS[1]).toEqual({ label: '50 / 10', work: 50, break: 10 });
    });

    it('has 90/20 as third preset', () => {
      expect(PRESETS[2]).toEqual({ label: '90 / 20', work: 90, break: 20 });
    });
  });
});
