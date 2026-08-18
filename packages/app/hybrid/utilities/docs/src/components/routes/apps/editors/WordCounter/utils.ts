export interface Stats {
  chars: number;
  charsNoSpace: number;
  words: number;
  lines: number;
  sentences: number;
  paragraphs: number;
  readingTime: string;
}

export const computeStats = (text: string): Stats => {
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, '').length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lines = text ? text.split('\n').length : 0;
  const sentences = text ? text.split(/[.!?]+/).filter(Boolean).length : 0;
  const paragraphs = text ? text.split(/\n\s*\n/).filter(Boolean).length : 0;
  const wpm = 200;
  const min = Math.ceil(words / wpm);
  const readingTime = min < 1 ? '<1 min' : `${min} min`;
  return {
    chars,
    charsNoSpace,
    words,
    lines,
    sentences,
    paragraphs,
    readingTime,
  };
};
