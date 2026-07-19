import {
  dueCards,
  loadSchedule,
  newSchedule,
  reviewCard,
  saveSchedule,
  selectSampleOpenings,
} from '../opening';

const now = 1_700_000_000_000;

describe('opening utils', () => {
  it('selects a bounded, de-duplicated sample', () => {
    const sample = selectSampleOpenings(32);
    expect(sample.length).toBeGreaterThan(0);
    expect(sample.length).toBeLessThanOrEqual(32);
    const ecos = new Set(sample.map((s) => s.eco));
    expect(ecos.size).toBe(sample.length);
  });

  it('builds a fresh schedule', () => {
    const cards = selectSampleOpenings(5);
    const schedule = newSchedule(cards);
    expect(schedule).toHaveLength(5);
    expect(schedule[0]).toMatchObject({
      reps: 0,
      ease: 2.5,
      interval: 0,
      due: 0,
    });
  });

  it('applies SM-2 intervals for quality >= 3', () => {
    const card = newSchedule(selectSampleOpenings(1))[0]!;
    const first = reviewCard(card, 5, now);
    expect(first.reps).toBe(1);
    expect(first.interval).toBe(1);
    expect(first.due).toBe(now + 24 * 60 * 60 * 1000);

    const second = reviewCard(first, 5, now);
    expect(second.reps).toBe(2);
    expect(second.interval).toBe(6);
  });

  it('resets progress for low-quality reviews', () => {
    const card = newSchedule(selectSampleOpenings(1))[0]!;
    const reviewed = reviewCard(reviewCard(card, 5, now), 2, now);
    expect(reviewed.reps).toBe(0);
    expect(reviewed.interval).toBe(1);
  });

  it('filters due cards', () => {
    const cards = newSchedule(selectSampleOpenings(3));
    const schedule = [
      { ...cards[0]!, due: now - 1000 },
      { ...cards[1]!, due: now + 1000 },
    ];
    expect(dueCards(schedule, now)).toHaveLength(1);
  });

  it('persists the schedule to storage', () => {
    const cards = newSchedule(selectSampleOpenings(2));
    saveSchedule(cards);
    expect(loadSchedule()).toEqual(cards);
  });
});
