export interface EcrItem {
  id: number;
  text: string;
  subscale: 'anxiety' | 'avoidance';
  reverse: boolean;
}

export interface ScaleItem {
  id: number;
  text: string;
}

export interface EcrScores {
  anxiety: number;
  avoidance: number;
}

export type AttachmentStyle =
  'secure' | 'preoccupied' | 'dismissive' | 'fearful';

export const ECR_ITEMS: EcrItem[] = [
  {
    id: 1,
    text: "I'm afraid that I will lose my partner's love.",
    subscale: 'anxiety',
    reverse: false,
  },
  {
    id: 2,
    text: 'I often worry that my partner will not want to stay with me.',
    subscale: 'anxiety',
    reverse: false,
  },
  {
    id: 3,
    text: "I often worry that my partner doesn't really love me.",
    subscale: 'anxiety',
    reverse: false,
  },
  {
    id: 4,
    text: "I worry that romantic partners won't care about me as much as I care about them.",
    subscale: 'anxiety',
    reverse: false,
  },
  {
    id: 5,
    text: "I often wish that my partner's feelings for me were as strong as my feelings for him or her.",
    subscale: 'anxiety',
    reverse: false,
  },
  {
    id: 6,
    text: 'I worry a lot about my relationships.',
    subscale: 'anxiety',
    reverse: false,
  },
  {
    id: 7,
    text: 'When my partner is out of sight, I worry that he or she might become interested in someone else.',
    subscale: 'anxiety',
    reverse: false,
  },
  {
    id: 8,
    text: "When I show my feelings for romantic partners, I'm afraid they will not feel the same about me.",
    subscale: 'anxiety',
    reverse: false,
  },
  {
    id: 9,
    text: 'I rarely worry about my partner leaving me.',
    subscale: 'anxiety',
    reverse: true,
  },
  {
    id: 10,
    text: 'My romantic partner makes me doubt myself.',
    subscale: 'anxiety',
    reverse: false,
  },
  {
    id: 11,
    text: 'I do not often worry about being abandoned.',
    subscale: 'anxiety',
    reverse: true,
  },
  {
    id: 12,
    text: "I find that my partner(s) don't want to get as close as I would like.",
    subscale: 'anxiety',
    reverse: false,
  },
  {
    id: 13,
    text: 'Sometimes romantic partners change their feelings about me for no apparent reason.',
    subscale: 'anxiety',
    reverse: false,
  },
  {
    id: 14,
    text: 'My desire to be very close sometimes scares people away.',
    subscale: 'anxiety',
    reverse: false,
  },
  {
    id: 15,
    text: "I'm afraid that once a romantic partner gets to know me, he or she won't like who I really am.",
    subscale: 'anxiety',
    reverse: false,
  },
  {
    id: 16,
    text: "It makes me mad that I don't get the affection and support I need from my partner.",
    subscale: 'anxiety',
    reverse: false,
  },
  {
    id: 17,
    text: "I worry that I won't measure up to other people.",
    subscale: 'anxiety',
    reverse: false,
  },
  {
    id: 18,
    text: "My partner only seems to notice me when I'm angry.",
    subscale: 'anxiety',
    reverse: false,
  },
  {
    id: 19,
    text: 'I prefer not to show a partner how I feel deep down.',
    subscale: 'avoidance',
    reverse: false,
  },
  {
    id: 20,
    text: 'I feel comfortable sharing my private thoughts and feelings with my partner.',
    subscale: 'avoidance',
    reverse: true,
  },
  {
    id: 21,
    text: 'I find it difficult to allow myself to depend on romantic partners.',
    subscale: 'avoidance',
    reverse: false,
  },
  {
    id: 22,
    text: 'I am very comfortable being close to romantic partners.',
    subscale: 'avoidance',
    reverse: true,
  },
  {
    id: 23,
    text: "I don't feel comfortable opening up to romantic partners.",
    subscale: 'avoidance',
    reverse: false,
  },
  {
    id: 24,
    text: 'I prefer not to be too close to romantic partners.',
    subscale: 'avoidance',
    reverse: false,
  },
  {
    id: 25,
    text: 'I get uncomfortable when a romantic partner wants to be very close.',
    subscale: 'avoidance',
    reverse: false,
  },
  {
    id: 26,
    text: 'I find it relatively easy to get close to my partner.',
    subscale: 'avoidance',
    reverse: true,
  },
  {
    id: 27,
    text: "It's not difficult for me to get close to my partner.",
    subscale: 'avoidance',
    reverse: true,
  },
  {
    id: 28,
    text: 'I usually discuss my problems and concerns with my partner.',
    subscale: 'avoidance',
    reverse: true,
  },
  {
    id: 29,
    text: 'It helps to turn to my romantic partner in times of need.',
    subscale: 'avoidance',
    reverse: true,
  },
  {
    id: 30,
    text: 'I tell my partner just about everything.',
    subscale: 'avoidance',
    reverse: true,
  },
  {
    id: 31,
    text: 'I talk things over with my partner.',
    subscale: 'avoidance',
    reverse: true,
  },
  {
    id: 32,
    text: 'I am nervous when partners get too close to me.',
    subscale: 'avoidance',
    reverse: false,
  },
  {
    id: 33,
    text: 'I feel comfortable depending on romantic partners.',
    subscale: 'avoidance',
    reverse: true,
  },
  {
    id: 34,
    text: 'I find it easy to depend on romantic partners.',
    subscale: 'avoidance',
    reverse: true,
  },
  {
    id: 35,
    text: "It's easy for me to be affectionate with my partner.",
    subscale: 'avoidance',
    reverse: true,
  },
  {
    id: 36,
    text: 'My partner really understands me and my needs.',
    subscale: 'avoidance',
    reverse: true,
  },
];

export const computeEcrScores = (responses: number[]): EcrScores => {
  const mean = (subscale: 'anxiety' | 'avoidance') => {
    const items = ECR_ITEMS.map((item, i) => ({
      item,
      value: responses[i] ?? 0,
    })).filter(({ item }) => item.subscale === subscale);
    const sum = items.reduce(
      (total, { item, value }) => total + (item.reverse ? 8 - value : value),
      0
    );
    return sum / items.length;
  };
  return { anxiety: mean('anxiety'), avoidance: mean('avoidance') };
};

export const attachmentStyle = (
  anxiety: number,
  avoidance: number
): AttachmentStyle => {
  const highAnxiety = anxiety >= 4;
  const highAvoidance = avoidance >= 4;
  if (highAnxiety && highAvoidance) return 'fearful';
  if (highAnxiety) return 'preoccupied';
  if (highAvoidance) return 'dismissive';
  return 'secure';
};

export const ATTACHMENT_STYLE_INFO: Record<AttachmentStyle, string> = {
  secure:
    'Low anxiety and low avoidance: comfortable with closeness and confident in the relationship.',
  preoccupied:
    'High anxiety, low avoidance: desire closeness but fear rejection and worry about abandonment.',
  dismissive:
    'Low anxiety, high avoidance: value independence, are self-reliant, and keep distance from intimacy.',
  fearful:
    'High anxiety and high avoidance: want closeness yet distrust and avoid it, fearing intimacy.',
};
