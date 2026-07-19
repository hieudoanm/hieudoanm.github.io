import { openDB, type IDBPDatabase } from 'idb';

export interface Progress {
  xp: number;
  streak: number;
  lastActive: string;
}

export const DEFAULT_PROGRESS: Progress = {
  xp: 0,
  streak: 0,
  lastActive: '',
};

const DB_NAME = 'lingo';
const STORE_NAME = 'progress';
const STATS_KEY = 'stats';
const DAY_MS = 24 * 60 * 60 * 1000;

export const toDayKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/** Pure streak transition given the previous progress and today's day key. */
export const applyActivity = (
  progress: Progress,
  amount: number,
  today: string
): Progress => {
  if (progress.lastActive === today) {
    return { ...progress, xp: progress.xp + amount };
  }
  const yesterday = toDayKey(new Date(new Date(today).getTime() - DAY_MS));
  const continued = progress.lastActive === yesterday;
  const streak = continued ? progress.streak + 1 : 1;
  return { xp: progress.xp + amount, streak, lastActive: today };
};

const withDb = async <T>(
  run: (db: IDBPDatabase) => Promise<T>
): Promise<T | null> => {
  try {
    const db = await openDB(DB_NAME, 1, {
      upgrade(database) {
        if (!database.objectStoreNames.contains(STORE_NAME)) {
          database.createObjectStore(STORE_NAME);
        }
      },
    });
    return await run(db);
  } catch {
    return null;
  }
};

export const getProgress = async (): Promise<Progress> => {
  const stored = await withDb((db) => db.get(STORE_NAME, STATS_KEY));
  return stored ?? DEFAULT_PROGRESS;
};

export const awardXp = async (amount: number): Promise<Progress> => {
  const current = await getProgress();
  const next = applyActivity(current, amount, toDayKey(new Date()));
  await withDb((db) => db.put(STORE_NAME, next, STATS_KEY));
  return next;
};
