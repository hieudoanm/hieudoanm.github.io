import type { HistoricalEvent } from '../types';

export const makeEvent = (
  id: string,
  year: number,
  title = `Event ${id}`
): HistoricalEvent => ({
  id,
  title,
  year,
  description: `${title} description`,
  category: 'war',
  region: 'world',
  difficulty: 3,
  source: 'test',
});

export const EVENT_A = makeEvent('a', 1900, 'Event A');
export const EVENT_B = makeEvent('b', 1950, 'Event B');
export const EVENT_C = makeEvent('c', 2000, 'Event C');
export const EVENT_BC = makeEvent('bc', -500, 'Ancient Event');
