export const WORDS = [
  'lorem',
  'ipsum',
  'dolor',
  'sit',
  'amet',
  'consectetur',
  'adipiscing',
  'elit',
  'sed',
  'do',
  'eiusmod',
  'tempor',
  'incididunt',
  'ut',
  'labore',
  'et',
  'dolore',
  'magna',
  'aliqua',
  'ut',
  'enim',
  'ad',
  'minim',
  'veniam',
  'quis',
  'nostrud',
  'exercitation',
  'ullamco',
  'laboris',
  'nisi',
  'ut',
  'aliquip',
  'ex',
  'ea',
  'commodo',
  'consequat',
  'duis',
  'aute',
  'irure',
  'dolor',
  'in',
  'reprehenderit',
  'in',
  'voluptate',
  'velit',
  'esse',
  'cillum',
  'dolore',
  'eu',
  'fugiat',
  'nulla',
  'pariatur',
  'excepteur',
  'sint',
  'occaecat',
  'cupidatat',
  'non',
  'proident',
  'sunt',
  'in',
  'culpa',
  'qui',
  'officia',
  'deserunt',
  'mollit',
  'anim',
  'id',
  'est',
  'laborum',
];

export const sentence = (wordCount: number): string => {
  const start = Math.floor(Math.random() * (WORDS.length - wordCount));
  const words = WORDS.slice(start, start + wordCount);
  const line = words.join(' ');
  return line.charAt(0).toUpperCase() + line.slice(1) + '.';
};

export const paragraph = (sentences: number): string =>
  Array.from({ length: sentences }, () =>
    sentence(8 + Math.floor(Math.random() * 6))
  ).join(' ');

export const generate = (paragraphs: number): string =>
  Array.from({ length: paragraphs }, () =>
    paragraph(3 + Math.floor(Math.random() * 4))
  ).join('\n\n');
