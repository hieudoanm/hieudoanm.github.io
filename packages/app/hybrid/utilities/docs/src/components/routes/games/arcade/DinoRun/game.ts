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

  // Sky gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
  gradient.addColorStop(0, '#1a1a2e');
  gradient.addColorStop(0.5, '#16213e');
  gradient.addColorStop(1, '#0f3460');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, CANVAS_WIDTH, GROUND_Y);

  // Stars
  ctx.font = '12px serif';
  for (const star of stars) {
    const alpha = 0.3 + Math.sin(star.twinkle) * 0.3;
    ctx.globalAlpha = alpha;
    ctx.fillText('✨', star.x, star.y);
  }
  ctx.globalAlpha = 1;

  // Clouds
  ctx.font = '20px serif';
  for (const cloud of clouds) {
    ctx.fillText('☁️', cloud.x, cloud.y);
  }

  // Moon
  ctx.font = '28px serif';
  ctx.fillText('🌙', CANVAS_WIDTH - 50, 40);

  // Ground
  ctx.fillStyle = '#2d5016';
  ctx.fillRect(0, GROUND_Y, CANVAS_WIDTH, 4);

  // Ground details
  ctx.font = '10px serif';
  for (let i = 0; i < CANVAS_WIDTH; i += 20) {
    const offset = (frameCount * 2 + i) % 40;
    ctx.globalAlpha = 0.4;
    ctx.fillText('🌿', i - offset, GROUND_Y + 16);
  }
  ctx.globalAlpha = 1;

  // Dino (flipped horizontally)
  ctx.font = '36px serif';
  ctx.save();
  ctx.scale(-1, 1);
  ctx.fillText('🦕', -(dino.x + dino.width), dino.y + dino.height);
  ctx.restore();

  // Obstacles
  ctx.font = '28px serif';
  for (const o of obstacles) {
    if (o.type === 'bird') {
      ctx.fillText('🦅', o.x, o.y + o.height);
    } else if (o.type === 'rock') {
      ctx.fillText('🪨', o.x, o.y + o.height);
    } else {
      ctx.fillText('🌵', o.x, o.y + o.height);
    }
  }
};
