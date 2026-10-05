import {
  BASE_SPEED,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  DINO_HEIGHT,
  DINO_WIDTH,
  GRAVITY,
  GROUND_Y,
  JUMP_FORCE,
  MAX_OBSTACLE_GAP,
  MAX_SPEED,
  MIN_OBSTACLE_GAP,
  OBSTACLE_HEIGHT,
  OBSTACLE_WIDTH,
  SCORE_PER_SECOND,
} from './constants';
import { Cloud, Dino, Obstacle, Star, World } from './types';

const OBSTACLE_TYPES: Obstacle['type'][] = ['cactus', 'rock', 'bird'];

const COLLISION_SHRINK = 6;

const CLOUD_SPAWN_CHANCE = 0.005;

const STAR_TWINKLE_STEP = 0.05;

export const createDino = (): Dino => ({
  x: 50,
  y: GROUND_Y - DINO_HEIGHT,
  vy: 0,
  width: DINO_WIDTH,
  height: DINO_HEIGHT,
});

export const createObstacle = (type?: Obstacle['type']): Obstacle => {
  const kind =
    type ?? OBSTACLE_TYPES[Math.floor(Math.random() * OBSTACLE_TYPES.length)];
  const height = kind === 'bird' ? 24 : OBSTACLE_HEIGHT;
  const width = kind === 'bird' ? 32 : OBSTACLE_WIDTH;

  return {
    x: CANVAS_WIDTH,
    y: kind === 'bird' ? GROUND_Y - 60 : GROUND_Y - height,
    width,
    height,
    type: kind,
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

export const createStars = (count: number): Star[] =>
  Array.from({ length: count }, createStar);

export const createWorld = (): World => ({
  dino: createDino(),
  obstacles: [],
  clouds: [createCloud(), createCloud()],
  stars: createStars(8),
  gapCounter: MIN_OBSTACLE_GAP,
});

export const randomGap = (): number =>
  MIN_OBSTACLE_GAP + Math.random() * (MAX_OBSTACLE_GAP - MIN_OBSTACLE_GAP);

export const jump = (dino: Dino): Dino =>
  dino.y >= GROUND_Y - dino.height ? { ...dino, vy: JUMP_FORCE } : dino;

const fall = (dino: Dino): Dino => {
  const moved = { ...dino, vy: dino.vy + GRAVITY, y: dino.y + dino.vy };

  if (moved.y >= GROUND_Y - moved.height) {
    return { ...moved, y: GROUND_Y - moved.height, vy: 0 };
  }

  return moved;
};

export const tick = (world: World, speed: number): World => {
  const obstacles = world.obstacles
    .map((obstacle) => ({ ...obstacle, x: obstacle.x - speed }))
    .filter((obstacle) => obstacle.x + obstacle.width > 0);
  const clouds = world.clouds
    .map((cloud) => ({ ...cloud, x: cloud.x - cloud.speed }))
    .filter((cloud) => cloud.x > -50);
  const stars = world.stars.map((star) => ({
    ...star,
    twinkle: star.twinkle + STAR_TWINKLE_STEP,
  }));

  const spawned =
    Math.random() < CLOUD_SPAWN_CHANCE ? [...clouds, createCloud()] : clouds;

  const gapCounter = world.gapCounter - speed;

  if (gapCounter > 0) {
    return {
      ...world,
      dino: fall(world.dino),
      obstacles,
      clouds: spawned,
      stars,
      gapCounter,
    };
  }

  return {
    ...world,
    dino: fall(world.dino),
    obstacles: [...obstacles, createObstacle()],
    clouds: spawned,
    stars,
    gapCounter: randomGap(),
  };
};

export const checkCollision = (dino: Dino, obstacles: Obstacle[]): boolean =>
  obstacles.some(
    (obstacle) =>
      dino.x + COLLISION_SHRINK < obstacle.x + obstacle.width &&
      dino.x + dino.width - COLLISION_SHRINK > obstacle.x &&
      dino.y + COLLISION_SHRINK < obstacle.y + obstacle.height &&
      dino.y + dino.height - COLLISION_SHRINK > obstacle.y
  );

export const scoreFor = (frames: number): number =>
  Math.floor(frames / SCORE_PER_SECOND);

export const accelerate = (speed: number): number =>
  speed < MAX_SPEED ? speed + 0.001 : speed;

export const speedTier = (speed: number): number => {
  const ratio = (speed - BASE_SPEED) / (MAX_SPEED - BASE_SPEED);

  return Math.min(5, Math.max(1, Math.ceil((ratio + 0.001) * 5)));
};
