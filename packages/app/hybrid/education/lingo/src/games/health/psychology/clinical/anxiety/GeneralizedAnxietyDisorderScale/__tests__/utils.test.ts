import {
  GAD_ITEMS,
  GAD_MAX,
  computeGadScore,
  interpretGadScore,
} from '../utils';

describe('GAD_ITEMS', () => {
  it('has 7 items', () => {
    expect(GAD_ITEMS).toHaveLength(7);
  });
});

describe('computeGadScore', () => {
  it('sums the responses', () => {
    expect(computeGadScore([3, 3, 3, 3, 3, 3, 3])).toBe(GAD_MAX);
  });

  it('treats unanswered items as zero', () => {
    expect(computeGadScore([-1, 2, -1, 1])).toBe(3);
  });
});

describe('interpretGadScore', () => {
  it.each([
    [0, 'Minimal anxiety'],
    [4, 'Minimal anxiety'],
    [5, 'Mild anxiety'],
    [9, 'Mild anxiety'],
    [10, 'Moderate anxiety'],
    [14, 'Moderate anxiety'],
    [15, 'Severe anxiety'],
    [21, 'Severe anxiety'],
  ])('classifies %d as %s', (score, label) => {
    expect(interpretGadScore(score).label).toBe(label);
  });
});
