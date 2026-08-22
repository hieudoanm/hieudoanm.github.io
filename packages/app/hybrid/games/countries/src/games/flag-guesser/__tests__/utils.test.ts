import { isCorrectName } from '../utils';
import { buildFlagQuestion } from '../utils';

describe('flag-guesser utils', () => {
  it('isCorrectName matches exact names only', () => {
    expect(isCorrectName('Chile', { name: 'Chile' } as never)).toBe(true);
    expect(isCorrectName('chile', { name: 'Chile' } as never)).toBe(false);
  });

  it('buildFlagQuestion returns four options including the current country', () => {
    const question = buildFlagQuestion();
    expect(question.options).toHaveLength(4);
    expect(
      question.options.some((option) => option.name === question.current.name)
    ).toBe(true);
  });
});
