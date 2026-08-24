import type { Region } from '../types';

export const CONTINENT_ORDER: Region[] = [
  'world',
  'africa',
  'americas',
  'asia',
  'europe',
  'oceania',
];

export const CONTINENT_LABELS: Record<Region, string> = {
  world: 'World',
  africa: 'Africa',
  americas: 'Americas',
  asia: 'Asia',
  europe: 'Europe',
  oceania: 'Oceania',
};
