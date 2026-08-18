import { buildEmojiQuestion, isCorrectFlag } from '../utils';

describe('emoji-guesser utils', () => {
  it('isCorrectFlag matches exact flags only', () => {
    expect(isCorrectFlag('🇨🇱', { flag: '🇨🇱' } as never)).toBe(true);
    expect(isCorrectFlag('🇨🇦', { flag: '🇨🇱' } as never)).toBe(false);
  });

  it('buildEmojiQuestion returns four options including the current country', () => {
    const question = buildEmojiQuestion();
    expect(question.options).toHaveLength(4);
    expect(
      question.options.some((option) => option.flag === question.current.flag)
    ).toBe(true);
  });

  it('buildEmojiQuestion options all have distinct flags', () => {
    for (let index = 0; index < 20; index += 1) {
      const { options } = buildEmojiQuestion();
      expect(new Set(options.map((option) => option.flag)).size).toBe(4);
    }
  });
});
