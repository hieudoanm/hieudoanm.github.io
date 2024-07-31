import { Phrase, Title } from '@prisma/client';

export type Insights = {
  username: string;
  avatar: string;
  title: Title;
  name: string;
  accuracy: Accuracy;
  games: Games;
  opponents: Opponent[];
  results: Results;
  openings: Openings;
  moves: Moves;
  geography: Geography[];
};

export type Geography = {
  flag: string;
  code: string;
  name: string;
  total: number;
  win: number;
  draw: number;
  loss: number;
};

export type Moves = {
  pieces: Pieces;
  castling: Castling;
};

export type Castling = {
  short: {
    short: CastlingResults;
    long: CastlingResults;
    none: CastlingResults;
  };
  long: {
    short: CastlingResults;
    long: CastlingResults;
    none: CastlingResults;
  };
  none: {
    short: CastlingResults;
    long: CastlingResults;
    none: CastlingResults;
  };
};

export type CastlingResults = {
  win: number;
  draw: number;
  loss: number;
};

export type Pieces = {
  king: number;
  queen: number;
  rook: number;
  bishop: number;
  knight: number;
  pawn: number;
};

export type Openings = { white: OpeningCount[]; black: OpeningCount[] };

export type OpeningCount = {
  opening: string;
  pgn: string;
  total: number;
  win: number;
  draw: number;
  loss: number;
};

export type CountByColumn = {
  count: number;
  column: number;
};

export type GamesByYear = {
  games: number;
  period: number;
};

export type GamesByTimeOfDay = {
  games: number;
  timeOfDay: string;
};

export type GamesByDayOfWeek = {
  games: number;
  dayOfWeek: string;
};

export type Games = {
  total: number;
  win: number;
  draw: number;
  loss: number;
  periods: GamesByYear[];
  timeOfDays: GamesByTimeOfDay[];
  daysOfWeek: GamesByDayOfWeek[];
};

export type Opponent = {
  opponent: string;
  games: number;
  win: number;
  draw: number;
  loss: number;
};

export type Result = {
  result: string;
  count: number;
};

export type ResultsByTimeOfDay = {
  win: number;
  draw: number;
  loss: number;
  timeOfDay: string;
};

export type ResultsByDayOfWeek = {
  win: number;
  draw: number;
  loss: number;
  dayOfWeek: string;
};

export type ResultsByOpponentRating = {
  win: number;
  draw: number;
  loss: number;
  rating: number;
};

export type ResultsByEndPhrase = {
  win: number;
  draw: number;
  loss: number;
  phrase: Phrase;
};

export type Results = {
  win: Result[];
  draw: Result[];
  loss: Result[];
  timeOfDays: ResultsByTimeOfDay[];
  daysOfWeek: ResultsByDayOfWeek[];
  opponents: ResultsByOpponentRating[];
  endPhrases: ResultsByEndPhrase[];
};

export type AverageByColumn = {
  average: number;
  column: number;
};

export type AccuracyByPeriod = {
  average: number;
  period: number;
};

export type AccuracyByTimeOfDay = {
  average: number;
  timeOfDay: string;
};

export type AccuracyByDayOfWeek = {
  average: number;
  dayOfWeek: string;
};

export type Accuracy = {
  average: number;
  win: number;
  draw: number;
  loss: number;
  periods: AccuracyByPeriod[];
  timeOfDays: AccuracyByTimeOfDay[];
  daysOfWeek: AccuracyByDayOfWeek[];
};
