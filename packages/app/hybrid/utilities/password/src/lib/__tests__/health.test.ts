import {
  analyzeHealth,
  getBreached,
  getOld,
  getReusedGroups,
  getSuggestions,
  MOCK_BREACHED_PASSWORDS,
  readHealthTrend,
  recordHealthScore,
} from '@/lib/health';
import type { VaultItem } from '@/types';

const makeItem = (
  id: string,
  title: string,
  password: string,
  updatedAt: number
): VaultItem => ({
  id,
  type: 'login',
  title,
  username: 'u@e.com',
  password,
  favorite: false,
  tags: [],
  createdAt: 1,
  updatedAt,
});

const day = 86400000;
const now = Date.now();

describe('getReusedGroups', () => {
  it('groups items sharing the same password', () => {
    const items = [
      makeItem('v-1', 'A', 'same', now),
      makeItem('v-2', 'B', 'same', now),
      makeItem('v-3', 'C', 'unique', now),
    ];
    const groups = getReusedGroups(items);
    expect(groups).toHaveLength(1);
    expect(groups[0].count).toBe(2);
    expect(groups[0].items.map((i) => i.title)).toEqual(['A', 'B']);
  });

  it('ignores items without a password', () => {
    const groups = getReusedGroups([
      { ...makeItem('v-1', 'A', '', now), password: '' },
    ]);
    expect(groups).toHaveLength(0);
  });

  it('returns empty when all passwords are unique', () => {
    expect(getReusedGroups([])).toEqual([]);
  });
});

describe('getBreached', () => {
  it('flags passwords in the mock breach list', () => {
    const items = [
      makeItem('v-1', 'Bad', 'password', now),
      makeItem('v-2', 'Good', 'S3cure!Pass', now),
    ];
    const breached = getBreached(items);
    expect(breached.map((i) => i.id)).toEqual(['v-1']);
  });

  it('returns empty when nothing is breached', () => {
    expect(getBreached([])).toEqual([]);
  });
});

describe('getOld', () => {
  it('flags passwords unchanged for over 90 days', () => {
    const items = [
      makeItem('v-1', 'Old', 'secret', now - 100 * day),
      makeItem('v-2', 'Fresh', 'secret', now - 10 * day),
    ];
    const old = getOld(items);
    expect(old.map((i) => i.id)).toEqual(['v-1']);
  });
});

describe('analyzeHealth', () => {
  it('computes counts and score from strong passwords', () => {
    const report = analyzeHealth([
      makeItem('v-1', 'Strong', 'Abcdefghijk1!', now),
      makeItem('v-2', 'Weak', 'pass', now),
      { ...makeItem('v-3', 'Card', '', now), type: 'card' },
    ]);
    expect(report.total).toBe(2);
    expect(report.strong).toBe(1);
    expect(report.weak).toBe(1);
    expect(report.score).toBe(50);
  });

  it('returns 100 when there are no passwords', () => {
    const report = analyzeHealth([
      { ...makeItem('v-1', 'Note', '', now), type: 'note' },
    ]);
    expect(report.score).toBe(100);
    expect(report.total).toBe(0);
  });

  it('surfaces reused, breached, and old items', () => {
    const report = analyzeHealth([
      makeItem('v-1', 'A', 'shared1', now),
      makeItem('v-2', 'B', 'shared1', now),
      makeItem('v-3', 'C', 'password', now),
      makeItem('v-4', 'D', 'Unique!99', now - 200 * day),
    ]);
    expect(report.reused).toHaveLength(1);
    expect(report.breached.map((i) => i.id)).toEqual(['v-3']);
    expect(report.old.map((i) => i.id)).toEqual(['v-4']);
  });
});

describe('getSuggestions', () => {
  const report = analyzeHealth([
    makeItem('v-1', 'A', 'shared1', now),
    makeItem('v-2', 'B', 'shared1', now),
    makeItem('v-3', 'C', 'password', now),
    makeItem('v-4', 'D', 'Unique!99', now - 200 * day),
    makeItem('v-5', 'Weak', 'pass', now),
  ]);

  it('lists a high-severity reused suggestion', () => {
    const reused = getSuggestions(report).find((s) =>
      s.title.startsWith('Reused')
    );
    expect(reused?.severity).toBe('high');
    expect(reused?.reason).toContain('A, B');
  });

  it('lists a high-severity breached suggestion', () => {
    const breached = getSuggestions(report).find((s) =>
      s.title.startsWith('Breached')
    );
    expect(breached?.severity).toBe('high');
  });

  it('lists a medium-severity old password suggestion', () => {
    const old = getSuggestions(report).find((s) =>
      s.title.startsWith('Password older')
    );
    expect(old?.severity).toBe('medium');
  });

  it('lists a low-severity weak password suggestion', () => {
    const weak = getSuggestions(report).find((s) =>
      s.title.startsWith('Weak password')
    );
    expect(weak?.severity).toBe('low');
  });

  it('returns nothing when the vault is healthy', () => {
    expect(
      getSuggestions(
        analyzeHealth([makeItem('v-1', 'Good', 'Abcdefghijk1!', now)])
      )
    ).toEqual([]);
  });
});

describe('trend tracking', () => {
  const originalGetItem = Storage.prototype.getItem;
  const originalSetItem = Storage.prototype.setItem;

  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  afterAll(() => {
    Storage.prototype.getItem = originalGetItem;
    Storage.prototype.setItem = originalSetItem;
  });

  it('records a score for today and reads it back', () => {
    const scores = recordHealthScore(80);
    expect(scores[scores.length - 1]).toBe(80);
    expect(readHealthTrend()).toEqual(scores);
  });

  it('updates the same day instead of appending', () => {
    recordHealthScore(50);
    const scores = recordHealthScore(90);
    expect(scores).toHaveLength(1);
    expect(scores[0]).toBe(90);
  });

  it('survives malformed storage', () => {
    localStorage.setItem('vault-health-trend', '{not json');
    expect(readHealthTrend()).toEqual([]);
    const scores = recordHealthScore(70);
    expect(scores[scores.length - 1]).toBe(70);
  });

  it('returns empty when stored data is not an array', () => {
    localStorage.setItem('vault-health-trend', JSON.stringify({ score: 80 }));
    expect(readHealthTrend()).toEqual([]);
  });

  it('discards non-array stored data before recording', () => {
    localStorage.setItem('vault-health-trend', '{"score":80}');
    const scores = recordHealthScore(70);
    expect(scores).toEqual([70]);
  });

  it('caps the trend at the newest 14 points', () => {
    const seeded = Array.from({ length: 15 }, (_, i) => ({
      date: `2020-01-${String(i + 1).padStart(2, '0')}`,
      score: 100 - i,
    }));
    localStorage.setItem('vault-health-trend', JSON.stringify(seeded));
    const scores = recordHealthScore(50);
    expect(scores).toHaveLength(14);
    expect(scores[scores.length - 1]).toBe(50);
  });

  it('falls back gracefully when storage is unavailable', () => {
    Storage.prototype.getItem = jest.fn(() => {
      throw new Error('denied');
    });
    Storage.prototype.setItem = jest.fn(() => {
      throw new Error('denied');
    });
    expect(readHealthTrend()).toEqual([]);
    expect(recordHealthScore(60)).toEqual([60]);
  });
});
