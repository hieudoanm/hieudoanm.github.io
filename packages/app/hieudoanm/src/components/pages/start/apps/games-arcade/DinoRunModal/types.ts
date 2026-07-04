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
}

export type Phase = 'idle' | 'running' | 'over';
