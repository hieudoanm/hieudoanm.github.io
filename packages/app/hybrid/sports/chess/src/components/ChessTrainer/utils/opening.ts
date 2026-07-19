import { openings, type Opening } from '../../../lib/chess/openings';
import type { OpeningCard, ScheduleEntry } from '../types';

const DAY_MS = 24 * 60 * 60 * 1000;

export const selectSampleOpenings = (max = 32): OpeningCard[] => {
  const seen = new Set<string>();
  const result: OpeningCard[] = [];
  for (const opening of openings) {
    if (opening.half_moves < 3 || opening.half_moves > 7) continue;
    if (seen.has(opening.eco)) continue;
    seen.add(opening.eco);
    result.push({ eco: opening.eco, name: opening.name, pgn: opening.pgn });
    if (result.length >= max) break;
  }
  return result;
};

export const openingByEco = (eco: string): Opening | undefined =>
  openings.find((o) => o.eco === eco);

export const newSchedule = (cards: OpeningCard[]): ScheduleEntry[] =>
  cards.map((c) => ({
    eco: c.eco,
    name: c.name,
    reps: 0,
    ease: 2.5,
    interval: 0,
    due: 0,
  }));

export const reviewCard = (
  entry: ScheduleEntry,
  quality: number,
  now = Date.now()
): ScheduleEntry => {
  if (quality < 3) {
    return {
      ...entry,
      reps: 0,
      interval: 1,
      due: now + 1 * DAY_MS,
    };
  }
  let ease = Math.max(
    1.3,
    entry.ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );
  let interval: number;
  if (entry.reps === 0) {
    interval = 1;
  } else if (entry.reps === 1) {
    interval = 6;
  } else {
    interval = Math.round(entry.interval * ease);
  }
  ease = Math.round(ease * 100) / 100;
  return {
    ...entry,
    reps: entry.reps + 1,
    ease,
    interval,
    due: now + interval * DAY_MS,
  };
};

export const dueCards = (
  schedule: ScheduleEntry[],
  now = Date.now()
): ScheduleEntry[] => schedule.filter((s) => s.due <= now);

export const loadSchedule = (): ScheduleEntry[] | null => {
  try {
    const raw = localStorage.getItem('chess-openings-schedule');
    return raw ? (JSON.parse(raw) as ScheduleEntry[]) : null;
  } catch {
    return null;
  }
};

export const saveSchedule = (schedule: ScheduleEntry[]): void => {
  try {
    localStorage.setItem('chess-openings-schedule', JSON.stringify(schedule));
  } catch {
    // ignore storage errors
  }
};
