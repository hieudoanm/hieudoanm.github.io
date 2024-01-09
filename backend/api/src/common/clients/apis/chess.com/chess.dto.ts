export type ChessPlayer = {
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

export type ChessStatsLast = { rating: number; date: number; rd: number };
export type ChessStatsBest = { rating: number; date: number; game: string };
export type ChessStatsRecord = { win: number; loss: number; draw: number };
export type ChessTactic = { rating: number; date: number };
export type ChessPuzzleRush = { total_attempts: number; score: number };

export type ChessStats = {
  chess_daily: {
    last: ChessStatsLast;
    best: ChessStatsBest;
    record: ChessStatsRecord & {
      time_per_move: number;
      timeout_percent: number;
    };
  };
  chess960_daily: {
    last: ChessStatsLast;
    best: ChessStatsBest;
    record: ChessStatsRecord & {
      time_per_move: number;
      timeout_percent: number;
    };
  };
  chess_rapid: {
    last: ChessStatsLast;
    best: ChessStatsBest;
    record: ChessStatsRecord;
  };
  chess_bullet: {
    last: ChessStatsLast;
    best: ChessStatsBest;
    record: ChessStatsRecord;
  };
  chess_blitz: {
    last: ChessStatsLast;
    best: ChessStatsBest;
    record: ChessStatsRecord;
  };
  fide: number;
  tactics: {
    highest: ChessTactic;
    lowest: ChessTactic;
  };
  puzzle_rush: {
    best: ChessPuzzleRush;
    daily: ChessPuzzleRush;
  };
};

export type ChessFullPlayer = ChessPlayer & { stats: ChessStats } & {
  archives: string[];
};

export type ChessGame = {
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

export type ChessTitle =
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
