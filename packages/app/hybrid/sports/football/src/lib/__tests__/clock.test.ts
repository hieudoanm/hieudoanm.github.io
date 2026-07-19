import {
  formatMatchTime,
  fullMatchSeconds,
  matchPhase,
  phaseLabel,
} from '@/lib/clock';

describe('clock', () => {
  describe('formatMatchTime', () => {
    it('formats zero as 00:00', () => {
      expect(formatMatchTime(0)).toBe('00:00');
    });

    it('pads minutes and seconds', () => {
      expect(formatMatchTime(5)).toBe('00:05');
      expect(formatMatchTime(60)).toBe('01:00');
      expect(formatMatchTime(90)).toBe('01:30');
      expect(formatMatchTime(600)).toBe('10:00');
      expect(formatMatchTime(2700)).toBe('45:00');
    });

    it('formats the full match length', () => {
      expect(formatMatchTime(fullMatchSeconds())).toBe('105:00');
    });
  });

  describe('matchPhase', () => {
    it('reports the first half', () => {
      expect(matchPhase(0)).toBe('first-half');
      expect(matchPhase(44 * 60 + 59)).toBe('first-half');
      expect(matchPhase(45 * 60 - 1)).toBe('first-half');
    });

    it('reports half-time', () => {
      expect(matchPhase(45 * 60)).toBe('half-time');
      expect(matchPhase(60 * 60 - 1)).toBe('half-time');
    });

    it('reports the second half', () => {
      expect(matchPhase(60 * 60)).toBe('second-half');
      expect(matchPhase(105 * 60 - 1)).toBe('second-half');
    });

    it('reports full time', () => {
      expect(matchPhase(105 * 60)).toBe('full-time');
      expect(matchPhase(99999)).toBe('full-time');
    });
  });

  describe('phaseLabel', () => {
    it('labels every phase', () => {
      expect(phaseLabel('first-half')).toBe('1st half');
      expect(phaseLabel('half-time')).toBe('Half-time');
      expect(phaseLabel('second-half')).toBe('2nd half');
      expect(phaseLabel('full-time')).toBe('Full time');
    });
  });

  it('computes the full match length', () => {
    expect(fullMatchSeconds()).toBe(105 * 60);
  });
});
