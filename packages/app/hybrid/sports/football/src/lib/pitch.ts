import { PlayerRole } from '@/types/football';

const GK_LABELS = new Set(['GK']);
const DEF_LABELS = new Set(['RB', 'LB', 'CB', 'RWB', 'LWB', 'SW']);
const MID_LABELS = new Set(['RM', 'LM', 'CM', 'DM', 'AM', 'RW', 'LW']);

export const slotRole = (label: string): PlayerRole => {
  if (GK_LABELS.has(label)) return 'GK';
  if (DEF_LABELS.has(label)) return 'DEF';
  if (MID_LABELS.has(label)) return 'MID';
  return 'FWD';
};

const ROLE_CLASSES: Record<PlayerRole, string> = {
  GK: 'bg-yellow-500/25 text-yellow-300 border-yellow-500/50',
  DEF: 'bg-sky-500/25 text-sky-300 border-sky-500/50',
  MID: 'bg-emerald-500/25 text-emerald-300 border-emerald-500/50',
  FWD: 'bg-red-500/25 text-red-300 border-red-500/50',
};

export const roleClasses = (role: PlayerRole): string => ROLE_CLASSES[role];
