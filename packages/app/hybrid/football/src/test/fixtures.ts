import { Player, Squad } from '@/types/football';

export const makePlayer = (overrides: Partial<Player> = {}): Player => ({
  id: 'p1',
  name: 'Ada',
  number: 10,
  role: 'MID',
  ...overrides,
});

export const makeSquad = (overrides: Partial<Squad> = {}): Squad => ({
  id: 's1',
  name: 'Test',
  formationId: '442',
  players: [],
  assignments: {},
  presets: [],
  lineups: [],
  mirrored: false,
  primaryColor: '#dc2626',
  ...overrides,
});
