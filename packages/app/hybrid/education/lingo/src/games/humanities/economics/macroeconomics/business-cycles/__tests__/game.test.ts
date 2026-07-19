import { GROWTH } from '../constants';
import {
  phaseFor,
  peakIndex,
  recessionCount,
  scorePrediction,
  troughIndex,
} from '../game';

describe('phaseFor', () => {
  it('classifies a falling quarter as a recession', () => {
    expect(phaseFor(2, -1)).toBe('recession');
    expect(phaseFor(-2, -3)).toBe('recession');
  });

  it('classifies a rebound from negative growth as a trough', () => {
    expect(phaseFor(-1, 2)).toBe('trough');
  });

  it('classifies a slowdown above zero as a peak', () => {
    expect(phaseFor(2, 1)).toBe('peak');
  });

  it('classifies rising growth as an expansion', () => {
    expect(phaseFor(1, 2)).toBe('expansion');
  });
});

describe('peakIndex', () => {
  it('finds the index of the highest growth value', () => {
    expect(peakIndex(GROWTH)).toBe(3);
  });
});

describe('troughIndex', () => {
  it('finds the index of the lowest growth value', () => {
    expect(troughIndex(GROWTH)).toBe(5);
  });
});

describe('scorePrediction', () => {
  it('rewards a close forecast near the perfect score', () => {
    expect(scorePrediction(3.0, 3.1)).toBe(4.8);
  });

  it('never returns a negative score', () => {
    expect(scorePrediction(10, 3.1)).toBe(0);
  });

  it('gives an exact match the perfect score', () => {
    expect(scorePrediction(5.4, 5.4)).toBe(5);
  });
});

describe('recessionCount', () => {
  it('counts negative quarters in the series', () => {
    expect(recessionCount(GROWTH)).toBe(2);
  });
});
