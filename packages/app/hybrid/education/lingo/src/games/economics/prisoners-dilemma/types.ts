export type Move = 'cooperate' | 'defect';
export type Phase = 'choose' | 'reveal' | 'done';

export interface Round {
  round: number;
  player: Move;
  opponent: Move;
  pScore: number;
  oScore: number;
}

export type Behavior =
  | 'always-cooperate'
  | 'always-defect'
  | 'tit-for-tat'
  | 'hard-tit-for-tat'
  | 'tit-for-two-tats'
  | 'joss'
  | 'reverse-tit-for-tat'
  | 'delayed'
  | 'grim-trigger'
  | 'tolerant-grim'
  | 'three-strikes'
  | 'keepsake'
  | 'pavlov'
  | 'bandit'
  | 'scoreboard'
  | 'remorseful'
  | 'opportunist'
  | 'prober'
  | 'alternator'
  | 'super-alternator'
  | 'periodic'
  | 'early-cooperate'
  | 'early-defect'
  | 'staircase'
  | 'random'
  | 'noisy'
  | 'generous-tit-for-tat'
  | 'cautious'
  | 'forgiving'
  | 'tester'
  | 'defector'
  | 'hedger';

export type Stance = 'cooperate' | 'defect' | 'other';

export type Strategy = string;
