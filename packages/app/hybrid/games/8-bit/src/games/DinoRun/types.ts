export const GAME_NAME = {
  en: 'DinoRun',
  ja: '\u30C7\u30A3\u30CE\u30ED\u30C3\u30BF\u30FC',
} as const;

export interface Dino {
  x: number;
  y: number;
  vy: number;
  width: number;
  height: number;
}

export interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'cactus' | 'rock' | 'bird';
}

export interface Cloud {
  x: number;
  y: number;
  speed: number;
}

export interface Star {
  x: number;
  y: number;
  twinkle: number;
}

export type Phase = 'idle' | 'running' | 'over';
