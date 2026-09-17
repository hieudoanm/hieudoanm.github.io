import {
  BDI_ITEMS,
  computeBdiScore,
  hasBdiSuicidalThoughts,
  interpretBdiScore,
} from '../utils';

describe('BDI_ITEMS', () => {
  it('has 21 items each with options', () => {
    expect(BDI_ITEMS).toHaveLength(21);
    BDI_ITEMS.forEach((item) => expect(item.options.length).toBeGreaterThan(0));
  });
});

describe('computeBdiScore', () => {
  it('returns 0 when the first option of every item is selected', () => {
    const selected = BDI_ITEMS.map(() => 0);
    expect(computeBdiScore(selected)).toBe(0);
  });

  it('sums option values across items up to the maximum', () => {
    const selected = BDI_ITEMS.map(
      (item) =>
        item.options.reduce(
          (best, option, index) =>
            option.value > best.value ? { value: option.value, index } : best,
          { value: -1, index: 0 }
        ).index
    );
    expect(computeBdiScore(selected)).toBe(63);
  });

  it('treats missing responses as zero', () => {
    const selected = BDI_ITEMS.map(() => -1);
    expect(computeBdiScore(selected)).toBe(0);
  });
});

describe('interpretBdiScore', () => {
  it.each([
    [0, 'Minimal depression'],
    [13, 'Minimal depression'],
    [14, 'Mild depression'],
    [19, 'Mild depression'],
    [20, 'Moderate depression'],
    [28, 'Moderate depression'],
    [29, 'Severe depression'],
    [63, 'Severe depression'],
  ])('classifies %d as %s', (score, label) => {
    expect(interpretBdiScore(score).label).toBe(label);
  });
});

describe('hasBdiSuicidalThoughts', () => {
  it('flags item 9 when its value is positive', () => {
    const selected = BDI_ITEMS.map(() => 0);
    selected[8] = 1;
    expect(hasBdiSuicidalThoughts(selected)).toBe(true);
  });

  it('does not flag item 9 when unanswered', () => {
    const selected = BDI_ITEMS.map(() => 0);
    expect(hasBdiSuicidalThoughts(selected)).toBe(false);
  });
});
