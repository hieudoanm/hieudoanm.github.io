export interface ScaleItem {
  id: number;
  text: string;
}

export interface SwlsInterpretation {
  label: string;
  range: string;
}

export const SWLS_ITEMS: string[] = [
  'In most ways my life is close to my ideal.',
  'The conditions of my life are excellent.',
  'I am satisfied with my life.',
  'So far I have gotten the important things I want in life.',
  'If I could live my life over, I would change almost nothing.',
];

export const computeSwlsScore = (responses: number[]): number =>
  responses.reduce((total, value) => total + value, 0);

export const interpretSwlsScore = (score: number): SwlsInterpretation => {
  if (score >= 31) return { label: 'Extremely satisfied', range: '31–35' };
  if (score >= 26) return { label: 'Satisfied', range: '26–30' };
  if (score >= 21) return { label: 'Slightly satisfied', range: '21–25' };
  if (score === 20) return { label: 'Neutral', range: '20' };
  if (score >= 15) return { label: 'Slightly dissatisfied', range: '15–19' };
  if (score >= 10) return { label: 'Dissatisfied', range: '10–14' };
  return { label: 'Extremely dissatisfied', range: '5–9' };
};
