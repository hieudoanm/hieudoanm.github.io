import type { DeckId, Region } from '../types';
import { CONTINENT_LABELS, CONTINENT_ORDER } from './continents';

export interface DeckInfo {
  id: DeckId;
  label: string;
  description: string;
  continent: Region;
}

export const DECKS: DeckInfo[] = [
  {
    id: 'world',
    label: 'World',
    description: 'Events from around the globe',
    continent: 'world',
  },
  {
    id: 'egypt',
    label: 'Egypt',
    description: 'Egyptian history through the ages',
    continent: 'africa',
  },
  {
    id: 'united-states',
    label: 'United States',
    description: 'American history through the ages',
    continent: 'americas',
  },
  {
    id: 'china',
    label: 'China',
    description: 'Chinese history through the ages',
    continent: 'asia',
  },
  {
    id: 'india',
    label: 'India',
    description: 'Indian history through the ages',
    continent: 'asia',
  },
  {
    id: 'iraq',
    label: 'Iraq',
    description: 'Iraqi history through the ages',
    continent: 'asia',
  },
  {
    id: 'vietnam',
    label: 'Vietnam',
    description: 'Vietnamese history through the ages',
    continent: 'asia',
  },
  {
    id: 'greece',
    label: 'Greece',
    description: 'Greek history through the ages',
    continent: 'europe',
  },
  {
    id: 'italy',
    label: 'Italy',
    description: 'Italian history through the ages',
    continent: 'europe',
  },
  {
    id: 'united-kingdom',
    label: 'United Kingdom',
    description: 'British history through the ages',
    continent: 'europe',
  },
  {
    id: 'south-africa',
    label: 'South Africa',
    description: 'South African history through the ages',
    continent: 'africa',
  },
  {
    id: 'mexico',
    label: 'Mexico',
    description: 'Mexican history through the ages',
    continent: 'americas',
  },
  {
    id: 'japan',
    label: 'Japan',
    description: 'Japanese history through the ages',
    continent: 'asia',
  },
  {
    id: 'france',
    label: 'France',
    description: 'French history through the ages',
    continent: 'europe',
  },
  {
    id: 'germany',
    label: 'Germany',
    description: 'German history through the ages',
    continent: 'europe',
  },
];

export interface DeckOptionGroup {
  continent: Region;
  label: string;
  decks: DeckInfo[];
}

export const getDeckOptionGroups = (excludeId: DeckId): DeckOptionGroup[] =>
  CONTINENT_ORDER.map((continent) => ({
    continent,
    label: CONTINENT_LABELS[continent],
    decks: DECKS.filter(
      (deck) => deck.id !== excludeId && deck.continent === continent
    ).sort((a, b) => a.label.localeCompare(b.label)),
  })).filter((group) => group.decks.length > 0);
