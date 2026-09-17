import type { Bot, BotId } from './types';

export const ENDOWMENT = 100;
export const MULTIPLIER = 2;
export const GROUP_SIZE = 4;
export const TOTAL_ROUNDS = 5;
export const PLAYER_ID = 'you';
export const MAX_CONTRIBUTION = 100;

export const BOTS: Bot[] = [
  { id: 'hana', name: 'Hana', emoji: '👩‍🌾' },
  { id: 'marco', name: 'Marco', emoji: '👨‍💼' },
  { id: 'bea', name: 'Bea', emoji: '🦊' },
];

export const BOT_BY_ID: Record<BotId, Bot> = {
  hana: BOTS[0],
  marco: BOTS[1],
  bea: BOTS[2],
};

export const LESSON =
  'Free riding maximizes individual payoffs, but if everyone contributed everything the group would be richest — the public goods dilemma.';

export const COOPERATOR_COOPERATES = 100;
export const COOPERATOR_PUNISHES = 50;
export const PLAYER_AVG_THRESHOLD = 30;
export const CONDITIONAL_ROUND_ONE = 50;
