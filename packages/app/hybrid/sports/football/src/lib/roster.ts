import { Player, PlayerRole } from '@/types/football';

const ROLE_ORDER: PlayerRole[] = ['GK', 'DEF', 'MID', 'FWD'];

export type RosterSortKey = 'name' | 'number' | 'role';

const byName = (a: Player, b: Player): number => a.name.localeCompare(b.name);

const byNumber = (a: Player, b: Player): number => a.number - b.number;

const byRoleThenName = (a: Player, b: Player): number => {
  const roleDiff = ROLE_ORDER.indexOf(a.role) - ROLE_ORDER.indexOf(b.role);
  return roleDiff !== 0 ? roleDiff : byName(a, b);
};

export const sortPlayers = (
  players: Player[],
  key: RosterSortKey
): Player[] => {
  const comparator =
    key === 'number' ? byNumber : key === 'role' ? byRoleThenName : byName;
  return [...players].sort(comparator);
};

export const filterPlayers = (players: Player[], query: string): Player[] => {
  const term = query.trim().toLowerCase();
  if (term === '') return players;
  return players.filter(
    (player) =>
      player.name.toLowerCase().includes(term) || String(player.number) === term
  );
};

export const dummyPlayers = (count: number): Player[] =>
  Array.from({ length: count }, (_, index) => ({
    id: `dummy-${index + 1}`,
    name: `Player ${index + 1}`,
    number: index + 1,
    role: ROLE_ORDER[index % ROLE_ORDER.length],
  }));
