import {
  PHQ_ITEMS,
  PHQ_MAX,
  computePhqScore,
  hasPhqSelfHarmThoughts,
  interpretPhqScore,
} from '../utils';

describe('PHQ_ITEMS', () => {
  it('has 9 items', () => {
    expect(PHQ_ITEMS).toHaveLength(9);
  });
});

describe('computePhqScore', () => {
  it('sums the responses up to the max', () => {
    expect(computePhqScore([3, 3, 3, 3, 3, 3, 3, 3, 3])).toBe(PHQ_MAX);
  });

  it('treats unanswered items as zero', () => {
    expect(computePhqScore([-1, 2, -1, 1])).toBe(3);
  });
});

describe('interpretPhqScore', () => {
  it.each([
    [0, 'None–minimal depression'],
    [4, 'None–minimal depression'],
    [5, 'Mild depression'],
    [9, 'Mild depression'],
    [10, 'Moderate depression'],
    [14, 'Moderate depression'],
    [15, 'Moderately severe depression'],
    [19, 'Moderately severe depression'],
    [20, 'Severe depression'],
    [27, 'Severe depression'],
  ])('classifies %d as %s', (score, label) => {
    expect(interpretPhqScore(score).label).toBe(label);
  });
});

describe('hasPhqSelfHarmThoughts', () => {
  it('flags item 9 when rated above zero', () => {
    const responses = PHQ_ITEMS.map(() => 0);
    responses[8] = 2;
    expect(hasPhqSelfHarmThoughts(responses)).toBe(true);
  });

  it('does not flag item 9 when unrated', () => {
    const responses = PHQ_ITEMS.map(() => 0);
    expect(hasPhqSelfHarmThoughts(responses)).toBe(false);
  });
});
