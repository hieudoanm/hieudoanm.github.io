export type FormationSize = 5 | 7 | 11;

export interface FormationSlot {
  id: string;
  label: string;
  number: number;
  line: number;
}

export interface Formation {
  id: string;
  name: string;
  size: FormationSize;
  group: string;
  slots: FormationSlot[];
}

export type PlayerRole = 'GK' | 'DEF' | 'MID' | 'FWD';

export type CaptainRole = 'captain' | 'vice';

export interface Player {
  id: string;
  name: string;
  number: number;
  role: PlayerRole;
  position?: string;
  bench?: boolean;
  notes?: string;
  captain?: boolean;
  viceCaptain?: boolean;
}

export interface Squad {
  id: string;
  name: string;
  formationId: string;
  players: Player[];
  assignments: Record<string, string[]>;
}

export interface SquadLibrary {
  activeId: string;
  squads: Squad[];
}

export type ExampleStatus = 'idle' | 'loading' | 'ready' | 'error';
