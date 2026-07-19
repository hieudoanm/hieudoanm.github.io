import { Formation, Squad } from '@/types/football';

export type ReminderLevel = 'info' | 'warning';

export interface FormationReminder {
  level: ReminderLevel;
  text: string;
}

export const formationReminders = (
  squad: Squad,
  formation: Formation
): FormationReminder[] => {
  const reminders: FormationReminder[] = [];

  const assigned = new Set(
    squad.players
      .filter((player) =>
        Object.values(squad.assignments).some((ids) => ids.includes(player.id))
      )
      .map((player) => player.id)
  );

  const emptySlots = formation.slots.filter(
    (slot) => (squad.assignments[slot.id] ?? []).length === 0
  );
  if (emptySlots.length > 0) {
    reminders.push({
      level: 'warning',
      text: `${emptySlots.length} position${
        emptySlots.length === 1 ? '' : 's'
      } empty — assign a starter to every slot`,
    });
  }

  const available = squad.players.filter(
    (player) => !assigned.has(player.id) && player.bench !== true
  );
  if (available.length > 0) {
    reminders.push({
      level: 'info',
      text: `${available.length} player${
        available.length === 1 ? '' : 's'
      } on the pitch with no slot`,
    });
  }

  const bench = squad.players.filter((player) => player.bench === true);
  if (bench.length > 0) {
    reminders.push({
      level: 'info',
      text: `${bench.length} player${
        bench.length === 1 ? '' : 's'
      } on the bench ready to come on`,
    });
  }

  return reminders;
};
