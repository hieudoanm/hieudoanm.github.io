import { weatherCodeToText } from '../weather';

describe('weather', () => {
  describe('weatherCodeToText', () => {
    it('returns Clear sky for code 0', () => {
      expect(weatherCodeToText(0)).toBe('Clear sky');
    });

    it('returns Mainly clear for code 1', () => {
      expect(weatherCodeToText(1)).toBe('Mainly clear');
    });

    it('returns Partly cloudy for code 2', () => {
      expect(weatherCodeToText(2)).toBe('Partly cloudy');
    });

    it('returns Overcast for code 3', () => {
      expect(weatherCodeToText(3)).toBe('Overcast');
    });

    it('returns Fog for code 45', () => {
      expect(weatherCodeToText(45)).toBe('Fog');
    });

    it('returns Light rain for code 61', () => {
      expect(weatherCodeToText(61)).toBe('Light rain');
    });

    it('returns Thunderstorm for code 95', () => {
      expect(weatherCodeToText(95)).toBe('Thunderstorm');
    });

    it('returns Unknown for unrecognized code', () => {
      expect(weatherCodeToText(999)).toBe('Unknown');
    });
  });
});
