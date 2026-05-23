import {
  GRAVITY,
  JUMP_FORCE,
  GROUND_Y,
  DINO_WIDTH,
  DINO_HEIGHT,
  OBSTACLE_WIDTH,
  OBSTACLE_HEIGHT,
  MIN_OBSTACLE_GAP,
  MAX_OBSTACLE_GAP,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
} from './constants';
import { Dino, Obstacle } from './types';

export const createDino = (): Dino => ({
  x: 40,
  y: GROUND_Y - DINO_HEIGHT,
  vy: 0,
  width: DINO_WIDTH,
  height: DINO_HEIGHT,
});

export const createObstacle = (): Obstacle => ({
  x: CANVAS_WIDTH,
  y: GROUND_Y - OBSTACLE_HEIGHT,
  width: OBSTACLE_WIDTH,
  height: OBSTACLE_HEIGHT,
});

export const randomGap = () =>
  MIN_OBSTACLE_GAP + Math.random() * (MAX_OBSTACLE_GAP - MIN_OBSTACLE_GAP);

export const jump = (dino: Dino): Dino =>
  dino.y >= GROUND_Y - dino.height ? { ...dino, vy: JUMP_FORCE } : dino;

export const tick = (
  dino: Dino,
  obstacles: Obstacle[],
  speed: number,
  gapCounter: number
): { dino: Dino; obstacles: Obstacle[]; gapCounter: number } => {
  let newDino = { ...dino, vy: dino.vy + GRAVITY, y: dino.y + dino.vy };
  if (newDino.y >= GROUND_Y - newDino.height) {
    newDino.y = GROUND_Y - newDino.height;
    newDino.vy = 0;
  }

  let newObstacles = obstacles
    .map((o) => ({ ...o, x: o.x - speed }))
    .filter((o) => o.x + o.width > 0);

  let newGap = gapCounter - speed;
  if (newGap <= 0) {
    newObstacles = [...newObstacles, createObstacle()];
    newGap = randomGap();
  }

  return { dino: newDino, obstacles: newObstacles, gapCounter: newGap };
};

export const checkCollision = (dino: Dino, obstacles: Obstacle[]): boolean =>
  obstacles.some(
    (o) =>
      dino.x < o.x + o.width &&
      dino.x + dino.width > o.x &&
      dino.y < o.y + o.height &&
      dino.y + dino.height > o.y
  );

export const draw = (
  ctx: CanvasRenderingContext2D,
  dino: Dino,
  obstacles: Obstacle[]
) => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  ctx.fillStyle = '#3b3b3b';
  ctx.fillRect(0, GROUND_Y, CANVAS_WIDTH, 2);

  ctx.fillStyle = '#22c55e';
  ctx.fillRect(dino.x, dino.y, dino.width, dino.height);

  ctx.fillStyle = '#ef4444';
  for (const o of obstacles) {
    ctx.fillRect(o.x, o.y, o.width, o.height);
  }
};
