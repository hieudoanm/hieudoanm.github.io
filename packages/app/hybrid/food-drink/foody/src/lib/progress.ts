import { DBSchema, IDBPDatabase, openDB } from 'idb';

const DB_NAME = 'foody';
const STORE = 'progress';

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

interface ProgressDB extends DBSchema {
  progress: {
    key: string;
    value: Progress;
  };
}

export const toDayKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const applyActivity = (
  progress: Progress,
  amount: number,
  today: string
): Progress => {
  const yesterday = toDayKey(
    new Date(new Date(`${today}T00:00:00`).getTime() - 86_400_000)
  );
  if (!progress.lastActive || progress.lastActive < yesterday) {
    return { xp: progress.xp + amount, streak: 1, lastActive: today };
  }
  const streak =
    progress.lastActive === today ? progress.streak : progress.streak + 1;
  return { xp: progress.xp + amount, streak, lastActive: today };
};

const openProgressDB = async (): Promise<IDBPDatabase<ProgressDB>> =>
  openDB<ProgressDB>(DB_NAME, 1, {
    upgrade(database) {
      if (!database.objectStoreNames.contains(STORE)) {
        database.createObjectStore(STORE);
      }
    },
  });

export const getProgress = async (): Promise<Progress> => {
  try {
    const db = await openProgressDB();
    try {
      const stored = await db.get(STORE, 'current');
      return stored ?? DEFAULT_PROGRESS;
    } finally {
      db.close();
    }
  } catch {
    return DEFAULT_PROGRESS;
  }
};

export const awardXp = async (amount: number): Promise<Progress> => {
  const current = await getProgress();
  const today = toDayKey(new Date());
  const next = applyActivity(current, amount, today);
  const db = await openProgressDB();
  try {
    await db.put(STORE, next, 'current');
  } finally {
    db.close();
  }
  return next;
};
