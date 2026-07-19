import { RunSummary } from '@/lib/runner';

const uid = (): string => Math.random().toString(36).slice(2, 10);

export interface Monitor {
  id: string;
  collectionId: string;
  name: string;
  intervalMs: number;
  running: boolean;
  lastRunAt: number | null;
  lastResult: RunSummary | null;
}

export const newMonitor = (
  name: string,
  collectionId: string,
  intervalMs: number
): Monitor => ({
  id: uid(),
  collectionId,
  name,
  intervalMs,
  running: false,
  lastRunAt: null,
  lastResult: null,
});

export const toggleMonitor = (monitors: Monitor[], id: string): Monitor[] =>
  monitors.map((monitor) =>
    monitor.id === id ? { ...monitor, running: !monitor.running } : monitor
  );

export const updateMonitor = (
  monitors: Monitor[],
  id: string,
  patch: Partial<Monitor>
): Monitor[] =>
  monitors.map((monitor) =>
    monitor.id === id ? { ...monitor, ...patch } : monitor
  );

export const removeMonitor = (monitors: Monitor[], id: string): Monitor[] =>
  monitors.filter((monitor) => monitor.id !== id);

export const intervalMsForMinutes = (minutes: number): number =>
  Math.max(1, minutes) * 60 * 1000;
