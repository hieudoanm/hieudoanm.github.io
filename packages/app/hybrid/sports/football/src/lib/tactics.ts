import { Formation, FormationSize, PlayerRole, Squad } from '@/types/football';
import { formationsFor, groupSlotsByLine } from '@/lib/formations';
import { slotRole } from '@/lib/pitch';

export type ShiftDirection = 'left' | 'right';

export const shiftLine = (
  squad: Squad,
  formation: Formation,
  lineIndex: number,
  direction: ShiftDirection
): Squad => {
  const lines = groupSlotsByLine(formation.slots);
  const line = lines[lineIndex];
  if (!line || line.length < 2) return squad;
  const slots = line.map((slot) => slot.id);
  const grab = slots.map((slotId) => squad.assignments[slotId] ?? []);
  const assignments = { ...squad.assignments };
  for (const slotId of slots) {
    delete assignments[slotId];
  }
  for (let index = 0; index < slots.length; index += 1) {
    const offset = direction === 'left' ? index + 1 : index - 1;
    const from = ((offset % slots.length) + slots.length) % slots.length;
    const ids = grab[from];
    if (ids.length > 0) assignments[slots[index]] = ids;
  }
  return { ...squad, assignments };
};

export interface FormationFit {
  formation: Formation;
  filled: number;
  total: number;
}

const startersByRole = (squad: Squad): Record<PlayerRole, number> => {
  const counts: Record<PlayerRole, number> = { GK: 0, DEF: 0, MID: 0, FWD: 0 };
  for (const player of squad.players) {
    if (player.bench !== true) counts[player.role] += 1;
  }
  return counts;
};

export const formationFit = (
  squad: Squad,
  formation: Formation
): FormationFit => {
  const counts = startersByRole(squad);
  let filled = 0;
  for (const slot of formation.slots) {
    if (counts[slotRole(slot.label)] > 0) {
      counts[slotRole(slot.label)] -= 1;
      filled += 1;
    }
  }
  return { formation, filled, total: formation.slots.length };
};

export const suggestFormations = (
  squad: Squad,
  size: FormationSize
): FormationFit[] =>
  formationsFor(size)
    .map((formation) => formationFit(squad, formation))
    .sort(
      (a, b) =>
        b.filled - a.filled ||
        a.formation.slots.length - b.formation.slots.length
    )
    .slice(0, 3);
