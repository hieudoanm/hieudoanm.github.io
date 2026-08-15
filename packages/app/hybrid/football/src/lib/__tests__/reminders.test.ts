import { formationReminders } from '@/lib/reminders';
import { makePlayer, makeSquad } from '@/test/fixtures';
import { findFormation } from '@/lib/formations';

describe('formationReminders', () => {
  const formation = findFormation('442')!;

  it('warns about every empty slot', () => {
    const squad = makeSquad();
    const reminders = formationReminders(squad, formation);
    expect(reminders).toContainEqual({
      level: 'warning',
      text: '11 positions empty — assign a starter to every slot',
    });
  });

  it('warns about a single empty slot in the singular', () => {
    const squad = makeSquad({
      assignments: { '442-0-0': ['p1'] },
      players: [makePlayer({ id: 'p1' })],
    });
    const reminders = formationReminders(squad, formation);
    expect(reminders).toContainEqual({
      level: 'warning',
      text: '10 positions empty — assign a starter to every slot',
    });
  });

  it('mentions available players without a slot', () => {
    const squad = makeSquad({ players: [makePlayer({ id: 'p1' })] });
    const reminders = formationReminders(squad, formation);
    expect(reminders).toContainEqual({
      level: 'info',
      text: '1 player on the pitch with no slot',
    });
  });

  it('mentions bench players ready to come on', () => {
    const squad = makeSquad({
      players: [
        makePlayer({ id: 'p1', bench: true }),
        makePlayer({ id: 'p2', bench: true }),
      ],
    });
    const reminders = formationReminders(squad, formation);
    expect(reminders).toContainEqual({
      level: 'info',
      text: '2 players on the bench ready to come on',
    });
  });

  it('counts assigned players regardless of the bench flag', () => {
    const squad = makeSquad({
      players: [
        makePlayer({ id: 'p1', bench: false }),
        makePlayer({ id: 'p2', bench: true }),
      ],
      assignments: { '442-0-0': ['p1'] },
    });
    const reminders = formationReminders(squad, formation);
    expect(reminders.some((r) => r.text.includes('pitch with no slot'))).toBe(
      false
    );
  });

  it('returns no reminders when the lineup is complete', () => {
    const players = formation.slots.map((slot, index) =>
      makePlayer({ id: `p${index}`, number: index + 1 })
    );
    const assignments = Object.fromEntries(
      formation.slots.map((slot, index) => [slot.id, [`p${index}`]])
    );
    const squad = makeSquad({ players, assignments });
    expect(formationReminders(squad, formation)).toEqual([]);
  });
});
