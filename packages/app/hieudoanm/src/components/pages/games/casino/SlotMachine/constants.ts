export interface SymbolDef {
  label: string;
  emoji: string;
  multiplier: number;
}

export const SYMBOLS: SymbolDef[] = [
  { label: 'cherry', emoji: '🍒', multiplier: 2 },
  { label: 'lemon', emoji: '🍋', multiplier: 3 },
  { label: 'bell', emoji: '🔔', multiplier: 5 },
  { label: 'seven', emoji: '7️⃣', multiplier: 10 },
  { label: 'diamond', emoji: '💎', multiplier: 15 },
  { label: 'jackpot', emoji: '👑', multiplier: 50 },
];

export const REEL_COUNT = 3;
export const SPIN_DURATION = 800;
export const TICK_INTERVAL = 60;
export const INITIAL_CREDITS = 100;
export const BET_AMOUNT = 10;
