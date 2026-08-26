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
import { Cloud, Dino, Obstacle, Star } from './types';

export const createDino = (): Dino => ({
  x: 50,
  y: GROUND_Y - DINO_HEIGHT,
  vy: 0,
  width: DINO_WIDTH,
  height: DINO_HEIGHT,
});

const OBSTACLE_TYPES: Obstacle['type'][] = ['cactus', 'rock', 'bird'];

export const createObstacle = (): Obstacle => {
  const type =
    OBSTACLE_TYPES[Math.floor(Math.random() * OBSTACLE_TYPES.length)];
  const height = type === 'bird' ? 24 : OBSTACLE_HEIGHT;
  const width = type === 'bird' ? 32 : OBSTACLE_WIDTH;
  return {
    x: CANVAS_WIDTH,
    y: type === 'bird' ? GROUND_Y - 60 : GROUND_Y - height,
    width,
    height,
    type,
  };
};

export const createCloud = (): Cloud => ({
  x: CANVAS_WIDTH + 50,
  y: 30 + Math.random() * 80,
  speed: 0.5 + Math.random() * 0.5,
});

export const createStar = (): Star => ({
  x: Math.random() * CANVAS_WIDTH,
  y: 20 + Math.random() * 100,
  twinkle: Math.random() * Math.PI * 2,
});

export const randomGap = () =>
  MIN_OBSTACLE_GAP + Math.random() * (MAX_OBSTACLE_GAP - MIN_OBSTACLE_GAP);

export const jump = (dino: Dino): Dino =>
  dino.y >= GROUND_Y - dino.height ? { ...dino, vy: JUMP_FORCE } : dino;

export const tick = (
  dino: Dino,
  obstacles: Obstacle[],
  clouds: Cloud[],
  stars: Star[],
  speed: number,
  gapCounter: number
): {
  dino: Dino;
  obstacles: Obstacle[];
  clouds: Cloud[];
  stars: Star[];
  gapCounter: number;
} => {
  let newDino = { ...dino, vy: dino.vy + GRAVITY, y: dino.y + dino.vy };
  if (newDino.y >= GROUND_Y - newDino.height) {
    newDino.y = GROUND_Y - newDino.height;
    newDino.vy = 0;
  }

  let newObstacles = obstacles
    .map((o) => ({ ...o, x: o.x - speed }))
    .filter((o) => o.x + o.width > 0);

  let newClouds = clouds
    .map((c) => ({ ...c, x: c.x - c.speed }))
    .filter((c) => c.x > -50);

  if (Math.random() < 0.005) {
    newClouds = [...newClouds, createCloud()];
  }

  let newStars = stars.map((s) => ({
    ...s,
    twinkle: s.twinkle + 0.05,
  }));

  let newGap = gapCounter - speed;
  if (newGap <= 0) {
    newObstacles = [...newObstacles, createObstacle()];
    newGap = randomGap();
  }

  return {
    dino: newDino,
    obstacles: newObstacles,
    clouds: newClouds,
    stars: newStars,
    gapCounter: newGap,
  };
};

export const checkCollision = (dino: Dino, obstacles: Obstacle[]): boolean =>
  obstacles.some((o) => {
    const shrink = 6;
    return (
      dino.x + shrink < o.x + o.width &&
      dino.x + dino.width - shrink > o.x &&
      dino.y + shrink < o.y + o.height &&
      dino.y + dino.height - shrink > o.y
    );
  });

export const draw = (
  ctx: CanvasRenderingContext2D,
  dino: Dino,
  obstacles: Obstacle[],
  clouds: Cloud[],
  stars: Star[],
  frameCount: number
) => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, CANVAS_WIDTH, GROUND_Y);

  ctx.font = '12px serif';
  for (const star of stars) {
    const alpha = 0.3 + Math.sin(star.twinkle) * 0.3;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(star.x, star.y, 2, 2);
  }
  ctx.globalAlpha = 1;

  ctx.font = '20px serif';
  for (const cloud of clouds) {
    ctx.fillStyle = '#f5f5f5';
    ctx.globalAlpha = 0.2;
    ctx.fillRect(cloud.x, cloud.y, 20, 4);
    ctx.fillRect(cloud.x + 5, cloud.y - 4, 12, 4);
    ctx.globalAlpha = 1;
  }

  ctx.fillStyle = '#f5f5f5';
  ctx.fillRect(CANVAS_WIDTH - 40, 20, 16, 16);
  ctx.fillRect(CANVAS_WIDTH - 36, 24, 8, 8);

  ctx.fillStyle = '#f5f5f5';
  ctx.fillRect(0, GROUND_Y, CANVAS_WIDTH, 2);

  ctx.fillStyle = '#0a0a0a';
  for (let i = 0; i < CANVAS_WIDTH; i += 20) {
    const offset = (frameCount * 2 + i) % 40;
    ctx.globalAlpha = 0.3;
    ctx.fillRect(i - offset, GROUND_Y + 4, 4, 4);
    ctx.globalAlpha = 1;
  }

  ctx.fillStyle = '#f5f5f5';
  ctx.save();
  ctx.scale(-1, 1);
  const dx = -(dino.x + dino.width);
  const dy = dino.y;
  ctx.fillRect(dx + 4, dy, 8, 8);
  ctx.fillRect(dx, dy + 8, 20, 16);
  ctx.fillRect(dx + 4, dy + 24, 6, 12);
  ctx.fillRect(dx + 12, dy + 24, 6, 12);
  ctx.fillRect(dx + 16, dy + 4, 8, 4);
  ctx.fillRect(dx + 20, dy + 8, 4, 4);
  ctx.restore();

  for (const o of obstacles) {
    ctx.fillStyle = '#ff0030';
    if (o.type === 'bird') {
      ctx.fillRect(o.x + 4, o.y, 24, 4);
      ctx.fillRect(o.x, o.y + 4, 32, 8);
      ctx.fillRect(o.x + 8, o.y + 12, 16, 4);
      ctx.fillRect(o.x + 4, o.y + 16, 8, 4);
    } else if (o.type === 'rock') {
      ctx.fillRect(o.x + 4, o.y, 16, 4);
      ctx.fillRect(o.x, o.y + 4, 24, 12);
      ctx.fillRect(o.x + 4, o.y + 16, 16, 8);
      ctx.fillRect(o.x + 8, o.y + 24, 8, 12);
    } else {
      ctx.fillRect(o.x + 8, o.y, 8, 8);
      ctx.fillRect(o.x + 4, o.y + 8, 16, 4);
      ctx.fillRect(o.x, o.y + 12, 24, 8);
      ctx.fillRect(o.x + 4, o.y + 20, 8, 8);
      ctx.fillRect(o.x + 12, o.y + 20, 8, 8);
      ctx.fillRect(o.x + 4, o.y + 28, 4, 8);
      ctx.fillRect(o.x + 16, o.y + 28, 4, 8);
    }
  }
};
