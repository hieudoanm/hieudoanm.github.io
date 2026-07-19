import type { DeckId, HistoricalEvent } from '../types';
import rawWorldEvents from './json/world/world-events.json';
import rawUnitedKingdomEvents from './json/europe/united-kingdom-events.json';
import rawUnitedStatesEvents from './json/americas/united-states-events.json';
import rawVietnamEvents from './json/asia/vietnam-events.json';
import rawChinaEvents from './json/asia/china-events.json';
import rawEgyptEvents from './json/africa/egypt-events.json';
import rawGreeceEvents from './json/europe/greece-events.json';
import rawIndiaEvents from './json/asia/india-events.json';
import rawIraqEvents from './json/asia/iraq-events.json';
import rawItalyEvents from './json/europe/italy-events.json';
import rawSouthAfricaEvents from './json/africa/south-africa-events.json';
import rawMexicoEvents from './json/americas/mexico-events.json';
import rawJapanEvents from './json/asia/japan-events.json';
import rawFranceEvents from './json/europe/france-events.json';
import rawGermanyEvents from './json/europe/germany-events.json';

export const EVENTS: HistoricalEvent[] = rawWorldEvents as HistoricalEvent[];
export const UNITED_KINGDOM_EVENTS: HistoricalEvent[] =
  rawUnitedKingdomEvents as HistoricalEvent[];
export const UNITED_STATES_EVENTS: HistoricalEvent[] =
  rawUnitedStatesEvents as HistoricalEvent[];
export const VIETNAM_EVENTS: HistoricalEvent[] =
  rawVietnamEvents as HistoricalEvent[];
export const CHINA_EVENTS: HistoricalEvent[] =
  rawChinaEvents as HistoricalEvent[];
export const EGYPT_EVENTS: HistoricalEvent[] =
  rawEgyptEvents as HistoricalEvent[];
export const GREECE_EVENTS: HistoricalEvent[] =
  rawGreeceEvents as HistoricalEvent[];
export const INDIA_EVENTS: HistoricalEvent[] =
  rawIndiaEvents as HistoricalEvent[];
export const IRAQ_EVENTS: HistoricalEvent[] =
  rawIraqEvents as HistoricalEvent[];
export const ITALY_EVENTS: HistoricalEvent[] =
  rawItalyEvents as HistoricalEvent[];
export const SOUTH_AFRICA_EVENTS: HistoricalEvent[] =
  rawSouthAfricaEvents as HistoricalEvent[];
export const MEXICO_EVENTS: HistoricalEvent[] =
  rawMexicoEvents as HistoricalEvent[];
export const JAPAN_EVENTS: HistoricalEvent[] =
  rawJapanEvents as HistoricalEvent[];
export const FRANCE_EVENTS: HistoricalEvent[] =
  rawFranceEvents as HistoricalEvent[];
export const GERMANY_EVENTS: HistoricalEvent[] =
  rawGermanyEvents as HistoricalEvent[];

export const EVENT_SETS: Record<DeckId, HistoricalEvent[]> = {
  world: EVENTS,
  'united-kingdom': UNITED_KINGDOM_EVENTS,
  'united-states': UNITED_STATES_EVENTS,
  vietnam: VIETNAM_EVENTS,
  china: CHINA_EVENTS,
  egypt: EGYPT_EVENTS,
  greece: GREECE_EVENTS,
  india: INDIA_EVENTS,
  iraq: IRAQ_EVENTS,
  italy: ITALY_EVENTS,
  'south-africa': SOUTH_AFRICA_EVENTS,
  mexico: MEXICO_EVENTS,
  japan: JAPAN_EVENTS,
  france: FRANCE_EVENTS,
  germany: GERMANY_EVENTS,
};
