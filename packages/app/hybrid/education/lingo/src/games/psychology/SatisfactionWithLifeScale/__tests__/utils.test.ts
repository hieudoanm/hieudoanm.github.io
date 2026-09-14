import { SWLS_ITEMS, computeSwlsScore, interpretSwlsScore } from '../utils';

describe('SWLS_ITEMS', () => {
  it('has 5 statements', () => {
    expect(SWLS_ITEMS).toHaveLength(5);
  });
});

describe('computeSwlsScore', () => {
  it('sums the ratings', () => {
    expect(computeSwlsScore([7, 7, 7, 7, 7])).toBe(35);
    expect(computeSwlsScore([1, 1, 1, 1, 1])).toBe(5);
  });

  it('treats unanswered items as zero', () => {
    expect(computeSwlsScore([5, 5])).toBe(10);
  });
});

describe('interpretSwlsScore', () => {
  it.each([
    [35, 'Extremely satisfied'],
    [31, 'Extremely satisfied'],
    [30, 'Satisfied'],
    [26, 'Satisfied'],
    [25, 'Slightly satisfied'],
    [21, 'Slightly satisfied'],
    [20, 'Neutral'],
    [19, 'Slightly dissatisfied'],
    [15, 'Slightly dissatisfied'],
    [14, 'Dissatisfied'],
    [10, 'Dissatisfied'],
    [9, 'Extremely dissatisfied'],
    [5, 'Extremely dissatisfied'],
  ])('classifies %d as %s', (score, label) => {
    expect(interpretSwlsScore(score).label).toBe(label);
  });
});
