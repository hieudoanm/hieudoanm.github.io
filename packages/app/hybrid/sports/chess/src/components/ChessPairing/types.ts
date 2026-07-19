export interface Player {
  id: string;
  name: string;
  rating: number;
}

export type MatchResult = '1-0' | '0-1' | '½-½' | null;

export interface Match {
  id: string;
  round: number;
  white: string;
  black: string;
  result: MatchResult;
}

export interface Round {
  number: number;
  matches: Match[];
  byes: string[];
}

export type PairingMode = 'rr' | 'swiss';

export interface StandingsRow {
  player: Player;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  points: number;
  buchholz: number;
  sb: number;
}
