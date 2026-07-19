import type { Bot } from './types';

export const PLAYER_ID = 'player';

export const ENDOWMENT = 100;

export const TOTAL_ROUNDS = 5;

export const BOTS: Bot[] = [
  { id: 'selfish-sam', name: 'Selfish Sam', emoji: '🪙', give: 0 },
  { id: 'fair-fanta', name: 'Fair Fanta', emoji: '🧑‍🎨', give: 50 },
  { id: 'generous-gita', name: 'Generous Gita', emoji: '🎁', give: 80 },
];
