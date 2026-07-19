import {
  applyActivity,
  awardXp,
  DEFAULT_PROGRESS,
  getProgress,
  toDayKey,
} from '../progress';

describe('toDayKey', () => {
  it('formats a date as YYYY-MM-DD', () => {
    expect(toDayKey(new Date(2026, 7, 9))).toBe('2026-08-09');
    expect(toDayKey(new Date(2026, 0, 1))).toBe('2026-01-01');
  });
});

describe('applyActivity', () => {
  const today = '2026-08-09';

  it('keeps streak when already active today', () => {
    const progress = { xp: 50, streak: 3, lastActive: today };
    const next = applyActivity(progress, 10, today);
    expect(next.xp).toBe(60);
    expect(next.streak).toBe(3);
    expect(next.lastActive).toBe(today);
  });

  it('increments streak when last active was yesterday', () => {
    const progress = { xp: 50, streak: 3, lastActive: '2026-08-08' };
    const next = applyActivity(progress, 10, today);
    expect(next.streak).toBe(4);
    expect(next.xp).toBe(60);
  });

  it('resets streak after a gap', () => {
    const progress = { xp: 100, streak: 5, lastActive: '2026-08-01' };
    const next = applyActivity(progress, 10, today);
    expect(next.streak).toBe(1);
    expect(next.xp).toBe(110);
  });

  it('starts streak at 1 from empty progress', () => {
    const next = applyActivity(DEFAULT_PROGRESS, 10, today);
    expect(next.streak).toBe(1);
    expect(next.xp).toBe(10);
  });
});

describe('getProgress and awardXp', () => {
  it('returns defaults when nothing stored', async () => {
    await expect(getProgress()).resolves.toEqual(DEFAULT_PROGRESS);
  });

  it('persists awarded xp', async () => {
    const first = await awardXp(10);
    expect(first.xp).toBeGreaterThanOrEqual(10);
    const stored = await getProgress();
    expect(stored.xp).toBe(first.xp);
    expect(stored.lastActive).not.toBe('');
  });
});
