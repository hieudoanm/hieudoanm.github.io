import {
  addSnapshot,
  createSnapshot,
  findSnapshot,
  MAX_SNAPSHOTS,
  removeSnapshot,
  type ProjectSnapshot,
} from '@/lib/history/history';
import type { Project } from '@/types/project';

const project: Project = {
  format: 'brainbow-project',
  version: 1,
  name: 'Neuron 7',
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
  images: [],
  channels: [],
  layers: [],
};

describe('history', () => {
  it('creates a snapshot with a message and timestamp', () => {
    const snapshot = createSnapshot(project, 'Initial trace');
    expect(snapshot.project).toBe(project);
    expect(snapshot.message).toBe('Initial trace');
    expect(snapshot.createdAt).toBeTruthy();
    expect(snapshot.id.startsWith('snap-')).toBe(true);
  });

  it('prepends new snapshots newest-first', () => {
    const first = createSnapshot(project, 'a');
    const second = createSnapshot(project, 'b');
    const next = addSnapshot(addSnapshot([], first), second);
    expect(next.map((entry) => entry.message)).toEqual(['b', 'a']);
  });

  it('caps the number of retained snapshots', () => {
    let snapshots: ProjectSnapshot[] = [];
    for (let i = 0; i < MAX_SNAPSHOTS + 3; i += 1) {
      snapshots = addSnapshot(snapshots, createSnapshot(project, `m${i}`));
    }
    expect(snapshots).toHaveLength(MAX_SNAPSHOTS);
    expect(snapshots[0].message).toBe(`m${MAX_SNAPSHOTS + 2}`);
    expect(snapshots.at(-1)?.message).toBe('m3');
  });

  it('finds a snapshot by id', () => {
    const first = createSnapshot(project, 'a');
    const second = createSnapshot(project, 'b');
    const snapshots = addSnapshot(addSnapshot([], first), second);
    expect(findSnapshot(snapshots, second.id)?.message).toBe('b');
    expect(findSnapshot(snapshots, 'missing')).toBeUndefined();
  });

  it('removes a snapshot by id', () => {
    const first = createSnapshot(project, 'a');
    const second = createSnapshot(project, 'b');
    const snapshots = addSnapshot(addSnapshot([], first), second);
    const next = removeSnapshot(snapshots, second.id);
    expect(next).toHaveLength(1);
    expect(next[0].id).toBe(first.id);
  });
});
