export const countWords = (text: string): number =>
  (text.match(/\b[\p{L}\p{N}']+\b/gu) ?? []).length;

export const scrambleWord = (word: string): string => {
  if (word.length <= 3) return word;
  const first = word[0];
  const last = word[word.length - 1];
  const middle = word.slice(1, -1).split('');
  const shuffleTimes = Math.min(
    middle.length,
    2 + Math.floor(Math.random() * 3)
  );
  for (let n = 0; n < shuffleTimes; n++) {
    let i = Math.floor(Math.random() * middle.length);
    let j = Math.floor(Math.random() * middle.length);
    if (i === j) j = (j + 1) % middle.length;
    [middle[i], middle[j]] = [middle[j], middle[i]];
  }
  if (middle.join('') === word.slice(1, -1) && middle.length > 1)
    [middle[0], middle[middle.length - 1]] = [
      middle[middle.length - 1],
      middle[0],
    ];
  return first + middle.join('') + last;
};

export const scrambleText = (text: string): string =>
  text.replace(/\b[a-zA-Z]+\b/g, scrambleWord);
