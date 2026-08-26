import {
  GRID_SIZE,
  TOTAL_STIMULI,
  STIMULUS_DURATION,
  INTERVAL_DURATION,
  DEFAULT_N,
  GRID_POSITIONS,
} from '../constants';

describe('NBack constants', () => {
  it('GRID_SIZE is 3', () => {
    expect(GRID_SIZE).toBe(3);
  });

  it('TOTAL_STIMULI is 20', () => {
    expect(TOTAL_STIMULI).toBe(20);
  });

  it('STIMULUS_DURATION is 1500', () => {
    expect(STIMULUS_DURATION).toBe(1500);
  });

  it('INTERVAL_DURATION is 500', () => {
    expect(INTERVAL_DURATION).toBe(500);
  });

  it('DEFAULT_N is 2', () => {
    expect(DEFAULT_N).toBe(2);
  });

  it('GRID_POSITIONS has GRID_SIZE * GRID_SIZE items', () => {
    expect(GRID_POSITIONS).toHaveLength(GRID_SIZE * GRID_SIZE);
  });

  it('GRID_POSITIONS contains 0..8', () => {
    expect(GRID_POSITIONS).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  });
});
