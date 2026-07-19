import { ECR_ITEMS, attachmentStyle, computeEcrScores } from '../utils';

describe('ECR_ITEMS', () => {
  it('has 36 items split into anxiety and avoidance subscales', () => {
    expect(ECR_ITEMS).toHaveLength(36);
    expect(
      ECR_ITEMS.filter((item) => item.subscale === 'anxiety')
    ).toHaveLength(18);
    expect(
      ECR_ITEMS.filter((item) => item.subscale === 'avoidance')
    ).toHaveLength(18);
  });
});

describe('computeEcrScores', () => {
  it('returns the midpoint for neutral responses', () => {
    const scores = computeEcrScores(ECR_ITEMS.map(() => 4));
    expect(scores.anxiety).toBe(4);
    expect(scores.avoidance).toBe(4);
  });

  it('reverse-keys reverse items before averaging', () => {
    // Baseline: every item at the neutral midpoint 4 (reverse: 8 - 4 = 4)
    // gives a subscale mean of exactly 4.
    const responses = ECR_ITEMS.map(() => 4);
    expect(computeEcrScores(responses).anxiety).toBe(4);

    // A reverse-keyed anxiety item rated 1 is scored 8 - 1 = 7 (+3 over the
    // midpoint), raising the anxiety mean to (4 * 18 + 3) / 18.
    const reverseIndex = ECR_ITEMS.findIndex(
      (item) => item.subscale === 'anxiety' && item.reverse
    );
    expect(reverseIndex).toBeGreaterThan(-1);
    responses[reverseIndex] = 1;
    expect(computeEcrScores(responses).anxiety).toBeCloseTo(75 / 18, 5);
  });
});

describe('attachmentStyle', () => {
  it.each([
    [3, 3, 'secure'],
    [5, 3, 'preoccupied'],
    [3, 5, 'dismissive'],
    [5, 5, 'fearful'],
  ])('classifies (%p, %p) as %p', (anxiety, avoidance, style) => {
    expect(attachmentStyle(anxiety, avoidance)).toBe(style);
  });
});
