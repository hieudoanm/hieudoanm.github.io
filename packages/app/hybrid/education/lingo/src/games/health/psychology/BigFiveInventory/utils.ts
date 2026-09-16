export type BigFiveFactor =
  | 'extraversion'
  | 'agreeableness'
  | 'conscientiousness'
  | 'neuroticism'
  | 'openness';

export interface BigFiveItem {
  id: number;
  text: string;
  factor: BigFiveFactor;
  reverse: boolean;
}

export interface BigFiveScores {
  extraversion: number;
  agreeableness: number;
  conscientiousness: number;
  neuroticism: number;
  openness: number;
}

export interface FactorInfo {
  label: string;
  description: string;
}

export const BFI_ITEMS: BigFiveItem[] = [
  { id: 1, text: 'Is talkative', factor: 'extraversion', reverse: false },
  {
    id: 2,
    text: 'Tends to find fault with others',
    factor: 'agreeableness',
    reverse: true,
  },
  {
    id: 3,
    text: 'Does a thorough job',
    factor: 'conscientiousness',
    reverse: false,
  },
  { id: 4, text: 'Is depressed, blue', factor: 'neuroticism', reverse: false },
  {
    id: 5,
    text: 'Is original, comes up with new ideas',
    factor: 'openness',
    reverse: false,
  },
  { id: 6, text: 'Is reserved', factor: 'extraversion', reverse: true },
  {
    id: 7,
    text: 'Is helpful and unselfish with others',
    factor: 'agreeableness',
    reverse: false,
  },
  {
    id: 8,
    text: 'Can be somewhat careless',
    factor: 'conscientiousness',
    reverse: true,
  },
  {
    id: 9,
    text: 'Is relaxed, handles stress well',
    factor: 'neuroticism',
    reverse: true,
  },
  {
    id: 10,
    text: 'Is curious about many different things',
    factor: 'openness',
    reverse: false,
  },
  { id: 11, text: 'Is full of energy', factor: 'extraversion', reverse: false },
  {
    id: 12,
    text: 'Starts quarrels with others',
    factor: 'agreeableness',
    reverse: true,
  },
  {
    id: 13,
    text: 'Is a reliable worker',
    factor: 'conscientiousness',
    reverse: false,
  },
  { id: 14, text: 'Can be tense', factor: 'neuroticism', reverse: false },
  {
    id: 15,
    text: 'Is ingenious, a deep thinker',
    factor: 'openness',
    reverse: false,
  },
  {
    id: 16,
    text: 'Generates a lot of enthusiasm',
    factor: 'extraversion',
    reverse: false,
  },
  {
    id: 17,
    text: 'Has a forgiving nature',
    factor: 'agreeableness',
    reverse: false,
  },
  {
    id: 18,
    text: 'Tends to be disorganized',
    factor: 'conscientiousness',
    reverse: true,
  },
  { id: 19, text: 'Worries a lot', factor: 'neuroticism', reverse: false },
  {
    id: 20,
    text: 'Has an active imagination',
    factor: 'openness',
    reverse: false,
  },
  { id: 21, text: 'Tends to be quiet', factor: 'extraversion', reverse: true },
  {
    id: 22,
    text: 'Is generally trusting',
    factor: 'agreeableness',
    reverse: false,
  },
  {
    id: 23,
    text: 'Tends to be lazy',
    factor: 'conscientiousness',
    reverse: true,
  },
  {
    id: 24,
    text: 'Is emotionally stable, not easily upset',
    factor: 'neuroticism',
    reverse: true,
  },
  { id: 25, text: 'Is inventive', factor: 'openness', reverse: false },
  {
    id: 26,
    text: 'Has an assertive personality',
    factor: 'extraversion',
    reverse: false,
  },
  {
    id: 27,
    text: 'Can be cold and aloof',
    factor: 'agreeableness',
    reverse: true,
  },
  {
    id: 28,
    text: 'Perseveres until the task is finished',
    factor: 'conscientiousness',
    reverse: false,
  },
  { id: 29, text: 'Can be moody', factor: 'neuroticism', reverse: false },
  {
    id: 30,
    text: 'Values artistic, aesthetic experiences',
    factor: 'openness',
    reverse: false,
  },
  {
    id: 31,
    text: 'Is sometimes shy, inhibited',
    factor: 'extraversion',
    reverse: true,
  },
  {
    id: 32,
    text: 'Is considerate and kind to almost everyone',
    factor: 'agreeableness',
    reverse: false,
  },
  {
    id: 33,
    text: 'Does things efficiently',
    factor: 'conscientiousness',
    reverse: false,
  },
  {
    id: 34,
    text: 'Remains calm in tense situations',
    factor: 'neuroticism',
    reverse: true,
  },
  {
    id: 35,
    text: 'Prefers work that is routine',
    factor: 'openness',
    reverse: true,
  },
  {
    id: 36,
    text: 'Is outgoing, sociable',
    factor: 'extraversion',
    reverse: false,
  },
  {
    id: 37,
    text: 'Is sometimes rude to others',
    factor: 'agreeableness',
    reverse: true,
  },
  {
    id: 38,
    text: 'Makes plans and follows through with them',
    factor: 'conscientiousness',
    reverse: false,
  },
  {
    id: 39,
    text: 'Gets nervous easily',
    factor: 'neuroticism',
    reverse: false,
  },
  {
    id: 40,
    text: 'Likes to reflect, play with ideas',
    factor: 'openness',
    reverse: false,
  },
  {
    id: 41,
    text: 'Has few artistic interests',
    factor: 'openness',
    reverse: true,
  },
  {
    id: 42,
    text: 'Likes to cooperate with others',
    factor: 'agreeableness',
    reverse: false,
  },
  {
    id: 43,
    text: 'Is easily distracted',
    factor: 'conscientiousness',
    reverse: true,
  },
  {
    id: 44,
    text: 'Is sophisticated in art, music, or literature',
    factor: 'openness',
    reverse: false,
  },
];

export const FACTOR_INFO: Record<BigFiveFactor, FactorInfo> = {
  extraversion: {
    label: 'Extraversion',
    description: 'Sociability, assertiveness, and positive energy.',
  },
  agreeableness: {
    label: 'Agreeableness',
    description: 'Trust, straightforwardness, altruism, and cooperation.',
  },
  conscientiousness: {
    label: 'Conscientiousness',
    description: 'Organization, order, diligence, and self-discipline.',
  },
  neuroticism: {
    label: 'Neuroticism',
    description:
      'Emotional instability — anxiety, moodiness, and vulnerability to stress.',
  },
  openness: {
    label: 'Openness',
    description: 'Imagination, curiosity, and appreciation for art and ideas.',
  },
};

export const computeBigFiveScores = (responses: number[]): BigFiveScores => {
  const mean = (factor: BigFiveFactor): number => {
    const items = BFI_ITEMS.map((item, i) => ({
      item,
      value: responses[i] ?? 0,
    })).filter(({ item }) => item.factor === factor);
    const sum = items.reduce(
      (total, { item, value }) => total + (item.reverse ? 6 - value : value),
      0
    );
    return sum / items.length;
  };
  return {
    extraversion: mean('extraversion'),
    agreeableness: mean('agreeableness'),
    conscientiousness: mean('conscientiousness'),
    neuroticism: mean('neuroticism'),
    openness: mean('openness'),
  };
};

export type FactorLevel = 'low' | 'moderate' | 'high';

export const factorLevel = (score: number): FactorLevel => {
  if (score <= 2.4) return 'low';
  if (score >= 3.6) return 'high';
  return 'moderate';
};

export const LEVEL_INFO: Record<FactorLevel, string> = {
  low: 'Low relative to the midpoint of 3.',
  moderate: 'Around the midpoint of 3.',
  high: 'High relative to the midpoint of 3.',
};
