import { countries } from '@hieudoanm.github.io/data/countries';
import type { Puzzle } from './types';

const POPULAR = countries.filter((c) => c.rank > 0 && c.name.length > 0);

const byRegion = (region: string) => POPULAR.filter((c) => c.region === region);
const bySubregion = (subregion: string) =>
  POPULAR.filter((c) => c.subregion === subregion);
const endsWith = (suffix: string) =>
  POPULAR.filter((c) => c.name.endsWith(suffix));
const includes = (s: string) => POPULAR.filter((c) => c.name.includes(s));
const startsWith = (prefix: string) =>
  POPULAR.filter((c) => c.name.startsWith(prefix));

const pick4 = (arr: { name: string }[]): string[] => {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 4).map((c) => c.name);
};

const pick4Except = (arr: { name: string }[], exclude: string[]): string[] => {
  const filtered = arr.filter((c) => !exclude.includes(c.name));
  return pick4(filtered);
};

export const generatePuzzle = (): Puzzle => {
  const islandNations = pick4(
    includes('Island').length >= 4 ? includes('Island') : byRegion('Oceania')
  );

  const landlocked = pick4Except(bySubregion('Eastern Africa'), islandNations);

  const endsInA = pick4Except(endsWith('a'), [...islandNations, ...landlocked]);

  const remaining = POPULAR.filter(
    (c) =>
      !islandNations.includes(c.name) &&
      !landlocked.includes(c.name) &&
      !endsInA.includes(c.name)
  );
  const misc = pick4(remaining);

  const groups = [
    { category: 'Island Nations', countries: islandNations },
    { category: 'Ends in "a"', countries: endsInA },
    { category: 'Eastern Africa', countries: landlocked },
    { category: 'Mixed Bag', countries: misc },
  ] as [
    Puzzle['groups'][0],
    Puzzle['groups'][1],
    Puzzle['groups'][2],
    Puzzle['groups'][3],
  ];

  groups.sort(() => Math.random() - 0.5);

  return { groups };
};

const HAND_CRAFTED: Puzzle[] = [
  {
    groups: [
      {
        category: 'Island Nations',
        countries: ['Japan', 'Iceland', 'Sri Lanka', 'Philippines'],
      },
      {
        category: 'Ends in "land"',
        countries: ['Switzerland', 'Poland', 'Finland', 'Ireland'],
      },
      {
        category: 'Ends in "stan"',
        countries: ['Pakistan', 'Kazakhstan', 'Afghanistan', 'Uzbekistan'],
      },
      {
        category: 'Double Letters',
        countries: ['Netherlands', 'Togo', 'Libya', 'Benin'],
      },
    ],
  },
  {
    groups: [
      {
        category: 'South America',
        countries: ['Brazil', 'Argentina', 'Chile', 'Colombia'],
      },
      {
        category: 'Starts with "A"',
        countries: ['Albania', 'Algeria', 'Armenia', 'Austria'],
      },
      {
        category: 'Contains "i" 3+ times',
        countries: ['Italy', 'Belize', 'Nicaragua', 'Dominican Republic'],
      },
      {
        category: 'One Word, One Syllable',
        countries: ['France', 'Greece', 'Spain', 'Chad'],
      },
    ],
  },
  {
    groups: [
      {
        category: 'Nordic / Scandinavian',
        countries: ['Norway', 'Sweden', 'Denmark', 'Finland'],
      },
      {
        category: 'Begins with "B"',
        countries: ['Belgium', 'Bulgaria', 'Bolivia', 'Bangladesh'],
      },
      {
        category: 'Caribbean',
        countries: ['Cuba', 'Jamaica', 'Haiti', 'Trinidad and Tobago'],
      },
      {
        category: 'Ends in "y"',
        countries: ['Italy', 'Turkey', 'Germany', 'Hungary'],
      },
    ],
  },
  {
    groups: [
      {
        category: 'Oceania',
        countries: ['Australia', 'New Zealand', 'Fiji', 'Papua New Guinea'],
      },
      {
        category: 'Ends in "stan"',
        countries: ['Bhutan', 'Kazakhstan', 'Uzbekistan', 'Turkmenistan'],
      },
      {
        category: 'Named After a Person',
        countries: ['Colombia', 'Bolivia', 'Philippines', 'Saudi Arabia'],
      },
      {
        category: 'Landlocked in Europe',
        countries: ['Switzerland', 'Austria', 'Czech Republic', 'Slovakia'],
      },
    ],
  },
  {
    groups: [
      {
        category: 'Begins & Ends Same Letter',
        countries: ['Australia', 'Austria', 'Indonesia', 'Uganda'],
      },
      {
        category: 'Starts with "S"',
        countries: ['Spain', 'Sweden', 'Switzerland', 'Singapore'],
      },
      {
        category: 'West Africa',
        countries: ['Nigeria', 'Ghana', 'Senegal', 'Mali'],
      },
      {
        category: 'Bordered by 5+ Countries',
        countries: ['Germany', 'Turkey', 'Thailand', 'Kenya'],
      },
    ],
  },
];

export const getRandomPuzzle = (): Puzzle => {
  if (Math.random() < 0.4 && HAND_CRAFTED.length > 0) {
    return HAND_CRAFTED[Math.floor(Math.random() * HAND_CRAFTED.length)];
  }
  return generatePuzzle();
};
