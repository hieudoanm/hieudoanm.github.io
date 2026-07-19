import type {
  HistoricalEvent,
  GameMode,
  GamePhase,
  PlacementResult,
  HintLevel,
} from './types';

export type {
  HistoricalEvent,
  GameMode,
  GamePhase,
  PlacementResult,
  HintLevel,
};

export const sortByYear = (events: HistoricalEvent[]): HistoricalEvent[] =>
  [...events].sort((a, b) => a.year - b.year);

export const findInsertionIndex = (
  timeline: HistoricalEvent[],
  event: HistoricalEvent
): number => {
  for (let i = 0; i < timeline.length; i++) {
    if (event.year < timeline[i].year) {
      return i;
    }
  }
  return timeline.length;
};

export const checkPlacement = (
  timeline: HistoricalEvent[],
  event: HistoricalEvent,
  playerIndex: number
): PlacementResult => {
  const correctIndex = findInsertionIndex(timeline, event);
  return {
    correct: playerIndex === correctIndex,
    correctIndex,
    event,
  };
};

export const calculateScore = (details: {
  correct: boolean;
  streak: number;
  hintUsed: boolean;
  timeMs: number;
}): number => {
  if (!details.correct) return 0;

  let points = 100;

  const combo = getComboMultiplier(details.streak);
  points *= combo;

  if (details.hintUsed) {
    points -= 25;
  }

  const speedBonus = Math.max(
    0,
    Math.min(50, 50 - Math.floor(details.timeMs / 1000))
  );
  points += speedBonus;

  return Math.max(0, points);
};

export const getComboMultiplier = (streak: number): number => {
  if (streak >= 10) return 5;
  if (streak >= 5) return 3;
  if (streak >= 3) return 2;
  return 1;
};

export const getHintLevel = (current: number): HintLevel => {
  if (current >= 3) return 3;
  if (current >= 2) return 2;
  if (current >= 1) return 1;
  return 0;
};

export const getHintText = (
  event: HistoricalEvent,
  hintLevel: HintLevel
): string => {
  const year = Math.abs(event.year);
  switch (hintLevel) {
    case 1: {
      const century = Math.floor(year / 100) * 100;
      const suffix = year >= 100 ? 's' : '';
      return `${century}${suffix}`;
    }
    case 2: {
      const decade = Math.floor(year / 10) * 10;
      const suffix = year >= 10 ? 's' : '';
      return `${decade}${suffix}`;
    }
    case 3:
      return 'Neighbouring event revealed';
    default:
      return '';
  }
};

export const formatYear = (year: number): string => {
  if (year < 0) return `${Math.abs(year)} BC`;
  if (year === 0) return '0';
  return String(year);
};

export const shuffleArray = <T>(array: T[], seed?: number): T[] => {
  const shuffled = [...array];
  let s = seed ?? Date.now();
  for (let i = shuffled.length - 1; i > 0; i--) {
    s = (s * 16807) % 2147483647;
    const j = s % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const INITIAL_EVENT_IDS = ['columbus-1492', 'ww2-ends-1945'];
