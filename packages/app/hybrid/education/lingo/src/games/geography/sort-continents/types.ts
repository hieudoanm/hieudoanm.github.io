export const REGIONS = [
  'Africa',
  'Europe',
  'Asia',
  'Oceania',
  'North America',
  'South America',
] as const;

export type Region = (typeof REGIONS)[number];

export interface SortCard {
  name: string;
  flag: string;
  correctRegion: Region;
  placedIn: Region | null;
}

export type Buckets = Record<Region, string[]>;

export type SortMessage = {
  text: string;
  correct: boolean;
} | null;
