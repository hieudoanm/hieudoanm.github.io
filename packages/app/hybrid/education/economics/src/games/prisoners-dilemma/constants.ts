import { Behavior, Move, Stance } from './types';

export const PAYOFF: Record<Move, Record<Move, [number, number]>> = {
  cooperate: { cooperate: [1, 1], defect: [0, 3] },
  defect: { cooperate: [3, 0], defect: [2, 2] },
};

export type StrategyDef = {
  id: string;
  label: string;
  emoji: string;
  behavior: Behavior;
  description: string;
  stance: Stance;
};

type BotSeed = [string, string, string, Behavior, string];

const BOT_SEEDS: BotSeed[] = [
  [
    'always-cooperate',
    'Always Cooperate',
    '🕊️',
    'always-cooperate',
    'Cooperates on every single round.',
  ],
  [
    'always-defect',
    'Always Defect',
    '🗡️',
    'always-defect',
    'Defects on every single round.',
  ],
  [
    'tit-for-tat',
    'Tit for Tat',
    '🪞',
    'tit-for-tat',
    'Opens with cooperation, then mirrors your previous move.',
  ],
  [
    'hard-tit-for-tat',
    'Hard Tit for Tat',
    '🛡️',
    'hard-tit-for-tat',
    'Defects on the first move, then mirrors your moves.',
  ],
  [
    'tit-for-two-tats',
    'Tit for Two Tats',
    '🐢',
    'tit-for-two-tats',
    'Retaliates only after two consecutive defections.',
  ],
  [
    'joss',
    'Joss',
    '🎯',
    'joss',
    'Mirrors you, with a 10% chance to provoke a defection.',
  ],
  [
    'reverse-tit-for-tat',
    'Reverse Tit for Tat',
    '⏪',
    'reverse-tit-for-tat',
    'Does the opposite of your last move.',
  ],
  [
    'delayed',
    'Delayed Echo',
    '🧭',
    'delayed',
    'Mirrors the move you made two rounds ago.',
  ],
  [
    'grim-trigger',
    'Grim Trigger',
    '💣',
    'grim-trigger',
    'Cooperates until you defect once, then punishes forever.',
  ],
  [
    'tolerant-grim',
    'Tolerant Grim',
    '🥊',
    'tolerant-grim',
    'Cooperates until two defections, then punishes forever.',
  ],
  [
    'three-strikes',
    'Three Strikes',
    '🥁',
    'three-strikes',
    'Cooperates until three defections, then punishes forever.',
  ],
  [
    'keepsake',
    'Keepsake',
    '📸',
    'keepsake',
    'Cooperates if you ever showed a single kind moment.',
  ],
  [
    'pavlov',
    'Pavlov',
    '🧠',
    'pavlov',
    'Win-stay, lose-shift — repeats after mutual rounds, defects otherwise.',
  ],
  ['bandit', 'Bandit', '🎰', 'bandit', 'Pavlov with a 10% exploration rate.'],
  [
    'scoreboard',
    'Scoreboard',
    '📊',
    'scoreboard',
    'Cooperates while ahead or level, defects when losing.',
  ],
  [
    'remorseful',
    'Remorseful',
    '💙',
    'remorseful',
    'Mirrors you, but repents if you cooperate while it defects.',
  ],
  [
    'opportunist',
    'Opportunist',
    '🦝',
    'opportunist',
    'Cooperates unless it can safely exploit a cooperator.',
  ],
  [
    'prober',
    'Prober',
    '🕵️',
    'prober',
    'Reconnoiters for three rounds, then retaliates or probes.',
  ],
  [
    'alternator',
    'Alternator',
    '🔁',
    'alternator',
    'Cooperates, then alternates every round.',
  ],
  [
    'super-alternator',
    'Super Alternator',
    '🌀',
    'super-alternator',
    'Defects, then alternates every round.',
  ],
  [
    'periodic',
    'Periodic',
    '🎡',
    'periodic',
    'Cycles cooperate-cooperate-defect-defect.',
  ],
  [
    'early-cooperate',
    'Early Cooperate',
    '🌱',
    'early-cooperate',
    'Cooperates for three rounds, then mirrors you.',
  ],
  [
    'early-defect',
    'Early Defect',
    '❄️',
    'early-defect',
    'Defects for three rounds, then mirrors you.',
  ],
  [
    'staircase',
    'Staircase',
    '🪜',
    'staircase',
    'Cooperates, then drops a defection every fifth round.',
  ],
  ['random', 'Random', '🎲', 'random', 'Chooses randomly on every round.'],
  [
    'noisy',
    'Noisy',
    '📢',
    'noisy',
    'Mirrors you, with a 10% chance to fumble the move.',
  ],
  [
    'generous-tit-for-tat',
    'Generous Tit for Tat',
    '🎁',
    'generous-tit-for-tat',
    'Mirrors you but occasionally forgives a defection.',
  ],
  [
    'cautious',
    'Cautious',
    '🦔',
    'cautious',
    'Cooperates first; defects forever if you open with defection.',
  ],
  [
    'forgiving',
    'Forgiving',
    '🌤️',
    'forgiving',
    'Mirrors you, but returns to cooperate after two kind rounds.',
  ],
  [
    'tester',
    'Tester',
    '🧪',
    'tester',
    'Cooperates, probes on round two, then reads your reaction.',
  ],
  [
    'defector',
    'Defector',
    '🪤',
    'defector',
    'Bairs you with one cooperation, then defects forever.',
  ],
  [
    'hedger',
    'Hedger',
    '⚖️',
    'hedger',
    'Defects whenever it is losing on total score.',
  ],
];

const STANCES: Record<string, Stance> = {
  'always-cooperate': 'cooperate',
  'always-defect': 'defect',
  'tit-for-tat': 'cooperate',
  'hard-tit-for-tat': 'cooperate',
  'tit-for-two-tats': 'cooperate',
  joss: 'other',
  'reverse-tit-for-tat': 'other',
  delayed: 'cooperate',
  'grim-trigger': 'cooperate',
  'tolerant-grim': 'cooperate',
  'three-strikes': 'cooperate',
  keepsake: 'cooperate',
  pavlov: 'other',
  bandit: 'other',
  scoreboard: 'other',
  remorseful: 'cooperate',
  opportunist: 'defect',
  prober: 'other',
  alternator: 'other',
  'super-alternator': 'defect',
  periodic: 'other',
  'early-cooperate': 'cooperate',
  'early-defect': 'defect',
  staircase: 'other',
  random: 'other',
  noisy: 'other',
  'generous-tit-for-tat': 'cooperate',
  cautious: 'cooperate',
  forgiving: 'cooperate',
  tester: 'other',
  defector: 'defect',
  hedger: 'other',
};

export const STRATEGIES: StrategyDef[] = BOT_SEEDS.map(
  ([id, label, emoji, behavior, description]) => ({
    id,
    label,
    emoji,
    behavior,
    description,
    stance: STANCES[id],
  })
);

export const TOTAL_ROUNDS = 10;
