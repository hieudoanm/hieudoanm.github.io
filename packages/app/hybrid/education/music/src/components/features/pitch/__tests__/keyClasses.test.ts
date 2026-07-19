import { blackKeyClass, whiteKeyClass } from '../keyClasses';

const feedback = {
  correct: { correctId: 'c' },
  wrong: { wrongId: 'cs' },
};

describe('whiteKeyClass', () => {
  it('highlights the correct key green', () => {
    expect(whiteKeyClass(feedback.correct, null, 'c')).toContain('bg-success');
  });

  it('marks the wrong key red', () => {
    expect(whiteKeyClass(feedback.wrong, null, 'cs')).toBe(
      'bg-error border-error text-error-content'
    );
  });

  it('highlights the practice key blue', () => {
    expect(whiteKeyClass(null, 'd', 'd')).toBe(
      'bg-info border-info text-info-content'
    );
  });

  it('falls back to the default style', () => {
    expect(whiteKeyClass(null, null, 'e')).toBe(
      'bg-base-content border-base-content text-base-100'
    );
  });
});

describe('blackKeyClass', () => {
  it('highlights the correct key green with a shadow', () => {
    expect(blackKeyClass(feedback.correct, null, 'c')).toContain('bg-success');
  });

  it('marks the wrong key red with a shadow', () => {
    expect(blackKeyClass(feedback.wrong, null, 'cs')).toContain('bg-error');
  });

  it('highlights the practice key blue with a shadow', () => {
    expect(blackKeyClass(null, 'gs', 'gs')).toContain('bg-info');
  });

  it('falls back to the default style', () => {
    expect(blackKeyClass(null, null, 'as')).toBe(
      'bg-base-100 border-base-300 text-base-content shadow-[0_4px_0_oklch(0_0_0/0.3)]'
    );
  });
});
