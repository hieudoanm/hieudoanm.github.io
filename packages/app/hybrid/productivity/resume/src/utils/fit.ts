export type FitTone = 'ok' | 'warn';

export interface FitAdvice {
  tone: FitTone;
  text: string;
}

export const onePageAdvice = (overflows: boolean, words: number): FitAdvice =>
  overflows
    ? {
        tone: 'warn',
        text: `${words} words — overflows the page. Trim content or pick a denser layout.`,
      }
    : {
        tone: 'ok',
        text: `Fits on one page · ${words} words`,
      };
