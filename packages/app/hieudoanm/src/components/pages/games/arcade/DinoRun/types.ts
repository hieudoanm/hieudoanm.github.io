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
