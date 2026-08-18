'use client';

import { useCallback, useEffect, useState } from 'react';
import type { Project } from '@/types/project';
import {
  addSnapshot,
  createSnapshot,
  findSnapshot,
  removeSnapshot,
  type ProjectSnapshot,
} from '@/lib/history/history';
import { loadSnapshots, persistSnapshots } from '@/lib/history/storage';

export interface UseHistoryResult {
  snapshots: ProjectSnapshot[];
  commit: (project: Project, message: string) => ProjectSnapshot;
  restore: (id: string) => ProjectSnapshot | undefined;
  remove: (id: string) => void;
  clear: () => void;
}

export const useHistory = (): UseHistoryResult => {
  const [snapshots, setSnapshots] = useState<ProjectSnapshot[]>(() =>
    loadSnapshots()
  );

  useEffect(() => {
    persistSnapshots(snapshots);
  }, [snapshots]);

  const commit = useCallback(
    (project: Project, message: string): ProjectSnapshot => {
      const snapshot = createSnapshot(project, message);
      setSnapshots((current) => addSnapshot(current, snapshot));
      return snapshot;
    },
    []
  );

  const restore = useCallback(
    (id: string): ProjectSnapshot | undefined => findSnapshot(snapshots, id),
    [snapshots]
  );

  const remove = useCallback((id: string): void => {
    setSnapshots((current) => removeSnapshot(current, id));
  }, []);

  const clear = useCallback((): void => setSnapshots([]), []);

  return { snapshots, commit, restore, remove, clear };
};
