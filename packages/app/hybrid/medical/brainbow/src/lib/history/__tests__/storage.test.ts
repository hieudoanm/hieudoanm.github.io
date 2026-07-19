import { loadSnapshots, persistSnapshots } from '@/lib/history/storage';
import type { ProjectSnapshot } from '@/lib/history/history';

const snapshot = (message: string): ProjectSnapshot => ({
  id: `snap-${message}`,
  message,
  createdAt: new Date().toISOString(),
  project: {
    format: 'brainbow-project',
    version: 1,
    name: `Project ${message}`,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
    images: [],
    channels: [],
    layers: [],
  },
});

describe('history storage', () => {
  beforeEach(() => {
    window.localStorage.clear();
    jest.restoreAllMocks();
  });

  it('returns an empty list when nothing is stored', () => {
    expect(loadSnapshots()).toEqual([]);
  });

  it('round-trips snapshots through localStorage', () => {
    persistSnapshots([snapshot('v1'), snapshot('v2')]);
    const loaded = loadSnapshots();
    expect(loaded.map((entry) => entry.message)).toEqual(['v1', 'v2']);
  });

  it('returns an empty list when the stored value is not an array', () => {
    window.localStorage.setItem('brainbow.history.v1', '{"a":1}');
    expect(loadSnapshots()).toEqual([]);
  });

  it('returns an empty list when the stored JSON is invalid', () => {
    window.localStorage.setItem('brainbow.history.v1', 'not-json');
    expect(loadSnapshots()).toEqual([]);
  });

  it('recursively drops the oldest snapshot on quota errors', () => {
    const setItem = jest
      .spyOn(Storage.prototype, 'setItem')
      .mockImplementation(() => {
        throw new DOMException('quota', 'QuotaExceededError');
      });
    persistSnapshots([snapshot('v1'), snapshot('v2'), snapshot('v3')]);
    expect(setItem).toHaveBeenCalledTimes(3);
    expect(setItem).toHaveBeenLastCalledWith(
      'brainbow.history.v1',
      expect.stringContaining('Project v1')
    );
  });

  it('gives up when a single snapshot still cannot be persisted', () => {
    const setItem = jest
      .spyOn(Storage.prototype, 'setItem')
      .mockImplementation(() => {
        throw new DOMException('quota', 'QuotaExceededError');
      });
    expect(() => persistSnapshots([snapshot('v1')])).not.toThrow();
    expect(setItem).toHaveBeenCalledTimes(1);
  });
});
