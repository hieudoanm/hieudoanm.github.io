export type Player = {
  avatar: string;
  player_id: number;
  '@id': string;
  url: string;
  name: string;
  username: string;
  title: string;
  followers: number;
  country: string;
  location: string;
  last_online: number;
  joined: number;
  status: string;
  is_streamer: boolean;
  twitch_url: string;
  verified: boolean;
  league: string;
};

export type StatsLast = { rating: number; date: number; rd: number };
export type StatsBest = { rating: number; date: number; game: string };
export type StatsRecord = { win: number; loss: number; draw: number };
export type Tactic = { rating: number; date: number };
export type PuzzleRush = { total_attempts: number; score: number };

export type Stats = {
  chess_daily: {
    last: StatsLast;
    best: StatsBest;
    record: StatsRecord & {
      time_per_move: number;
      timeout_percent: number;
    };
  };
  chess960_daily: {
    last: StatsLast;
    best: StatsBest;
    record: StatsRecord & {
      time_per_move: number;
      timeout_percent: number;
    };
  };
  chess_rapid: {
    last: StatsLast;
    best: StatsBest;
    record: StatsRecord;
  };
  chess_bullet: {
    last: StatsLast;
    best: StatsBest;
    record: StatsRecord;
  };
  chess_blitz: {
    last: StatsLast;
    best: StatsBest;
    record: StatsRecord;
  };
  fide: number;
  tactics: {
    highest: Tactic;
    lowest: Tactic;
  };
  puzzle_rush: {
    best: PuzzleRush;
    daily: PuzzleRush;
  };
};

export type FullPlayer = Player & { stats: Stats } & {
  archives: string[];
};

export type Game = {
  url: string;
  pgn: string;
  time_control: string;
  end_time: number;
  rated: boolean;
  accuracies: {
    white: number;
    black: number;
  };
  tcn: string;
  uuid: string;
  initial_setup: string;
  fen: string;
  time_class: string;
  rules: string;
  white: {
    rating: number;
    result: string;
    '@id': string;
    username: string;
    uuid: string;
  };
  black: {
    rating: number;
    result: string;
    '@id': string;
    username: string;
    uuid: string;
  };
};

export type Title =
  | 'GM'
  | 'WGM'
  | 'IM'
  | 'WIM'
  | 'FM'
  | 'WFM'
  | 'CM'
  | 'WCM'
  | 'NM'
  | 'WNM';

export type ArchivesResponse = { archives: string[] };

export type GamesResponse = { games: Game[] };
