import { randomLetters, generateChart } from '../chart';

describe('randomLetters', () => {
  it('returns requested count of letters', () => {
    expect(randomLetters(5)).toHaveLength(5);
    expect(randomLetters(0)).toHaveLength(0);
  });

  it('only returns valid letters', () => {
    const result = randomLetters(20);
    expect(result).toMatch(/^[CDEFHKNPRSVZ]+$/);
  });
});

describe('generateChart', () => {
  it('returns lines with letters attached', () => {
    const chart = generateChart();
    expect(chart.length).toBeGreaterThan(0);
    chart.forEach((line) => {
      expect(line).toHaveProperty('letters');
      expect(line.letters).toHaveLength(5);
    });
  });
});
