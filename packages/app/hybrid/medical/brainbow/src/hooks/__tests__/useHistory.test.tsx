import { act, renderHook } from '@testing-library/react';
import { useHistory } from '@/hooks/useHistory';
import { MAX_SNAPSHOTS } from '@/lib/history/history';
import type { Project } from '@/types/project';

const project: Project = {
  format: 'brainbow-project',
  version: 1,
  name: 'Neuron',
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
  images: [],
  channels: [],
  layers: [],
};

describe('useHistory', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('commits snapshots newest-first and restores by id', () => {
    const { result } = renderHook(() => useHistory());
    act(() => result.current.commit(project, 'v1'));
    act(() => result.current.commit(project, 'v2'));
    expect(result.current.snapshots.map((entry) => entry.message)).toEqual([
      'v2',
      'v1',
    ]);
    const id = result.current.snapshots[1].id;
    let restored: ReturnType<typeof result.current.restore>;
    act(() => {
      restored = result.current.restore(id);
    });
    expect(restored?.message).toBe('v1');
  });

  it('removes a snapshot by id', () => {
    const { result } = renderHook(() => useHistory());
    act(() => result.current.commit(project, 'v1'));
    act(() => result.current.commit(project, 'v2'));
    const id = result.current.snapshots[0].id;
    act(() => result.current.remove(id));
    expect(result.current.snapshots.map((entry) => entry.message)).toEqual([
      'v1',
    ]);
  });

  it('caps retained snapshots', () => {
    const { result } = renderHook(() => useHistory());
    for (let i = 0; i < MAX_SNAPSHOTS + 3; i += 1) {
      act(() => result.current.commit(project, `m${i}`));
    }
    expect(result.current.snapshots).toHaveLength(MAX_SNAPSHOTS);
  });

  it('clears all snapshots', () => {
    const { result } = renderHook(() => useHistory());
    act(() => result.current.commit(project, 'v1'));
    act(() => result.current.clear());
    expect(result.current.snapshots).toEqual([]);
  });
});
