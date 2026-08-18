import { countries } from '../_shared/countries-data';
import { randomFrom } from '../_shared/quiz';
import type { Buckets, Region, SortCard } from './types';

export const REGIONS: readonly Region[] = [
  'Africa',
  'Europe',
  'Asia',
  'Oceania',
  'Americas',
];

export const SORT_COUNT = 15;

export const emptyBuckets = (): Buckets => ({
  Africa: [],
  Europe: [],
  Asia: [],
  Oceania: [],
  Americas: [],
});

const SORT_POOL = countries.filter(
  (entry) =>
    entry.rank > 0 && (REGIONS as readonly string[]).includes(entry.region)
);

export const regionOf = (name: string): Region | null => {
  const entry = SORT_POOL.find((candidate) => candidate.name === name);
  return entry ? (entry.region as Region) : null;
};

export const pickSortCards = (count = SORT_COUNT): SortCard[] => {
  const shuffled = [...SORT_POOL].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((entry) => ({
    name: entry.name,
    flag: entry.flag,
    correctRegion: entry.region as Region,
    placedIn: null,
  }));
};

export interface PlaceOutcome {
  cards: SortCard[];
  buckets: Buckets;
  correct: boolean;
}

/** Pure drop transition: places `name` into `region` and reports correctness. */
export const placeCard = (
  cards: SortCard[],
  buckets: Buckets,
  name: string,
  region: Region
): PlaceOutcome | null => {
  const card = cards.find((candidate) => candidate.name === name);
  if (!card || card.placedIn) return null;
  return {
    cards: cards.map((candidate) =>
      candidate.name === name ? { ...candidate, placedIn: region } : candidate
    ),
    buckets: { ...buckets, [region]: [...buckets[region], name] },
    correct: card.correctRegion === region,
  };
};

export const randomRegion = (): Region => randomFrom(REGIONS);
