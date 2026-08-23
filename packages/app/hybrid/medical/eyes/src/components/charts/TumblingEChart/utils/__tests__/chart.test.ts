import { randomDirections, generateChart } from '../chart';

describe('randomDirections', () => {
  it('returns requested count of directions', () => {
    expect(randomDirections(3)).toHaveLength(3);
    expect(randomDirections(0)).toHaveLength(0);
  });

  it('only returns valid directions', () => {
    const dirs = randomDirections(10);
    dirs.forEach((d) => {
      expect(['right', 'down', 'left', 'up']).toContain(d);
    });
  });
});

describe('generateChart', () => {
  it('returns lines with directions attached', () => {
    const chart = generateChart();
    expect(chart.length).toBeGreaterThan(0);
    chart.forEach((line) => {
      expect(line).toHaveProperty('directions');
      expect(line.directions).toHaveLength(line.count);
    });
  });
});
