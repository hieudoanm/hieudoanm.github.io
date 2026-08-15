import { Formation, PlayerRole, Squad } from '@/types/football';
import { slotRole } from '@/lib/pitch';
import { unassignedPlayers } from '@/lib/squad';

export const ROLE_ORDER: PlayerRole[] = ['GK', 'DEF', 'MID', 'FWD'];

export interface RoleCoverage {
  role: PlayerRole;
  filled: number;
  total: number;
}

export const roleCoverage = (
  squad: Squad,
  formation: Formation
): RoleCoverage[] =>
  ROLE_ORDER.map((role) => {
    const slots = formation.slots.filter(
      (slot) => slotRole(slot.label) === role
    );
    const filled = slots.filter(
      (slot) => (squad.assignments[slot.id] ?? []).length > 0
    ).length;
    return { role, filled, total: slots.length };
  });

export const filledSlots = (squad: Squad, formation: Formation): number =>
  formation.slots.filter(
    (slot) => (squad.assignments[slot.id] ?? []).length > 0
  ).length;

export const formationStrength = (
  squad: Squad,
  formation: Formation
): number => {
  if (formation.slots.length === 0) return 0;
  return Math.round(
    (filledSlots(squad, formation) / formation.slots.length) * 100
  );
};

export interface TeamStats {
  coverage: RoleCoverage[];
  filled: number;
  total: number;
  strength: number;
  unassigned: number;
}

export const teamStats = (squad: Squad, formation: Formation): TeamStats => ({
  coverage: roleCoverage(squad, formation),
  filled: filledSlots(squad, formation),
  total: formation.slots.length,
  strength: formationStrength(squad, formation),
  unassigned: unassignedPlayers(squad).length,
});
