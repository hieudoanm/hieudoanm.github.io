import { onePageAdvice } from '../fit';

describe('onePageAdvice', () => {
  it('reports a fit with the word count when content fits', () => {
    expect(onePageAdvice(false, 350)).toEqual({
      tone: 'ok',
      text: 'Fits on one page · 350 words',
    });
  });

  it('warns with guidance when content overflows', () => {
    expect(onePageAdvice(true, 720)).toEqual({
      tone: 'warn',
      text: '720 words — overflows the page. Trim content or pick a denser layout.',
    });
  });
});
