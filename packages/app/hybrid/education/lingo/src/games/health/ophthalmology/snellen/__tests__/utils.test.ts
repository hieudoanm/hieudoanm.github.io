import { LETTERS, SNELLEN_LINES, generateChart, randomLetters } from '../utils';

describe('SNELLEN_LINES', () => {
  it('has ten lines from 20/200 down to 20/10', () => {
    expect(SNELLEN_LINES).toHaveLength(10);
    expect(SNELLEN_LINES[0].label).toBe('20/200');
    expect(SNELLEN_LINES[9].label).toBe('20/10');
  });
});

describe('randomLetters', () => {
  it('returns the requested number of letters from the pool', () => {
    const result = randomLetters(5);
    expect(result).toHaveLength(5);
    result.split('').forEach((letter) => expect(LETTERS).toContain(letter));
  });
});

describe('generateChart', () => {
  it('assigns one letter per line count', () => {
    const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0);
    const chart = generateChart();
    chart.forEach((line, i) => {
      expect(line.letters).toHaveLength(SNELLEN_LINES[i].count);
      expect(line.label).toBe(SNELLEN_LINES[i].label);
    });
    randomSpy.mockRestore();
  });
});
