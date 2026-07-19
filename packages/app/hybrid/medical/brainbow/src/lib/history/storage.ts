import type { ProjectSnapshot } from '@/lib/history/history';

const STORAGE_KEY = 'brainbow.history.v1';

export const loadSnapshots = (): ProjectSnapshot[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as ProjectSnapshot[]) : [];
  } catch {
    return [];
  }
};

export const persistSnapshots = (
  snapshots: readonly ProjectSnapshot[]
): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshots));
  } catch {
    if (snapshots.length <= 1) return;
    persistSnapshots(snapshots.slice(0, -1));
  }
};
