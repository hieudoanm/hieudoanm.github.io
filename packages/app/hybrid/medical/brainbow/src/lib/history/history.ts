import type { Project } from '@/types/project';

export interface ProjectSnapshot {
  id: string;
  message: string;
  createdAt: string;
  project: Project;
}

export const MAX_SNAPSHOTS = 8;

let snapshotCounter = 0;

export const createSnapshot = (
  project: Project,
  message: string
): ProjectSnapshot => {
  snapshotCounter += 1;
  return {
    id: `snap-${Date.now().toString(36)}-${snapshotCounter}`,
    message,
    createdAt: new Date().toISOString(),
    project,
  };
};

export const addSnapshot = (
  snapshots: readonly ProjectSnapshot[],
  snapshot: ProjectSnapshot
): ProjectSnapshot[] => [snapshot, ...snapshots].slice(0, MAX_SNAPSHOTS);

export const findSnapshot = (
  snapshots: readonly ProjectSnapshot[],
  id: string
): ProjectSnapshot | undefined => snapshots.find((entry) => entry.id === id);

export const removeSnapshot = (
  snapshots: readonly ProjectSnapshot[],
  id: string
): ProjectSnapshot[] => snapshots.filter((entry) => entry.id !== id);
