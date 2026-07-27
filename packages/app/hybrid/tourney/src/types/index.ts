export type TournamentFormat =
  | 'single-elimination'
  | 'double-elimination'
  | 'round-robin'
  | 'swiss'
  | 'group-stage'
  | 'league';

export type TournamentStatus =
  'draft' | 'upcoming' | 'in-progress' | 'completed' | 'cancelled';
export type MatchStatus =
  'scheduled' | 'in-progress' | 'completed' | 'postponed' | 'walkover';

export interface Tournament {
  id: string;
  name: string;
  description: string;
  format: TournamentFormat;
  status: TournamentStatus;
  maxParticipants: number;
  createdAt: number;
  updatedAt: number;
  startDate?: number;
  endDate?: number;
  isSample?: boolean;
}

export interface Participant {
  id: string;
  tournamentId: string;
  name: string;
  seed?: number;
  rating?: number;
  groupId?: string;
}

export interface Match {
  id: string;
  tournamentId: string;
  round: number;
  bracket?: 'winners' | 'losers' | 'final';
  participant1Id: string | null;
  participant2Id: string | null;
  participant1Score: number | null;
  participant2Score: number | null;
  winnerId: string | null;
  status: MatchStatus;
  scheduledAt?: number;
  venue?: string;
}

export interface Group {
  id: string;
  tournamentId: string;
  name: string;
  participantIds: string[];
}

export interface Standing {
  participantId: string;
  tournamentId: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  points: number;
  position: number;
}
