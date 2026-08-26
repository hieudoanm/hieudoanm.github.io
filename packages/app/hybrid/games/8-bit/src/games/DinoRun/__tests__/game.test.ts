import {
  createDino,
  createObstacle,
  createCloud,
  createStar,
  randomGap,
  jump,
  tick,
  checkCollision,
} from '../game';
import {
  GROUND_Y,
  DINO_WIDTH,
  DINO_HEIGHT,
  OBSTACLE_WIDTH,
  OBSTACLE_HEIGHT,
  CANVAS_WIDTH,
  MIN_OBSTACLE_GAP,
  MAX_OBSTACLE_GAP,
  GRAVITY,
  JUMP_FORCE,
} from '../constants';

describe('createDino', () => {
  it('creates a dino at the correct position', () => {
    const dino = createDino();
    expect(dino.x).toBe(50);
    expect(dino.y).toBe(GROUND_Y - DINO_HEIGHT);
    expect(dino.vy).toBe(0);
    expect(dino.width).toBe(DINO_WIDTH);
    expect(dino.height).toBe(DINO_HEIGHT);
  });
});

describe('createObstacle', () => {
  it('creates an obstacle off-screen to the right', () => {
    const obs = createObstacle();
    expect(obs.x).toBe(CANVAS_WIDTH);
    expect(['cactus', 'rock', 'bird']).toContain(obs.type);
  });

  it('bird is smaller and higher than ground obstacles', () => {
    const birds = Array.from({ length: 50 }, () => createObstacle()).filter(
      (o) => o.type === 'bird'
    );
    expect(birds.length).toBeGreaterThan(0);
    for (const bird of birds) {
      expect(bird.height).toBe(24);
      expect(bird.width).toBe(32);
      expect(bird.y).toBeLessThan(GROUND_Y);
    }
  });

  it('ground obstacles sit on the ground', () => {
    const grounds = Array.from({ length: 50 }, () => createObstacle()).filter(
      (o) => o.type !== 'bird'
    );
    expect(grounds.length).toBeGreaterThan(0);
    for (const g of grounds) {
      expect(g.y).toBe(GROUND_Y - g.height);
      expect(g.width).toBe(OBSTACLE_WIDTH);
      expect(g.height).toBe(OBSTACLE_HEIGHT);
    }
  });
});

describe('createCloud', () => {
  it('creates a cloud off-screen to the right', () => {
    const cloud = createCloud();
    expect(cloud.x).toBeGreaterThan(CANVAS_WIDTH);
    expect(cloud.y).toBeGreaterThanOrEqual(30);
    expect(cloud.y).toBeLessThanOrEqual(110);
  });
});

describe('createStar', () => {
  it('creates a star within canvas bounds', () => {
    const star = createStar();
    expect(star.x).toBeGreaterThanOrEqual(0);
    expect(star.x).toBeLessThanOrEqual(CANVAS_WIDTH);
    expect(star.y).toBeGreaterThanOrEqual(20);
    expect(star.y).toBeLessThanOrEqual(120);
    expect(star.twinkle).toBeGreaterThanOrEqual(0);
    expect(star.twinkle).toBeLessThanOrEqual(Math.PI * 2);
  });
});

describe('randomGap', () => {
  it('returns a gap within bounds', () => {
    for (let i = 0; i < 100; i++) {
      const gap = randomGap();
      expect(gap).toBeGreaterThanOrEqual(MIN_OBSTACLE_GAP);
      expect(gap).toBeLessThanOrEqual(MAX_OBSTACLE_GAP);
    }
  });
});

describe('jump', () => {
  it('applies jump velocity when dino is on ground', () => {
    const dino = createDino();
    const jumped = jump(dino);
    expect(jumped.vy).toBe(JUMP_FORCE);
  });

  it('does not jump when dino is in the air', () => {
    const dino = { ...createDino(), y: 100, vy: -5 };
    const result = jump(dino);
    expect(result.vy).toBe(-5);
    expect(result.y).toBe(100);
  });

  it('does not double-jump', () => {
    const dino = { ...createDino(), y: 50, vy: JUMP_FORCE };
    const result = jump(dino);
    expect(result.vy).toBe(JUMP_FORCE);
    expect(result.y).toBe(50);
  });
});

describe('tick', () => {
  it('applies gravity and clamps dino to ground', () => {
    const dino = createDino();
    const result = tick(dino, [], [], [], 3, 150);
    expect(result.dino.vy).toBe(0);
    expect(result.dino.y).toBe(GROUND_Y - DINO_HEIGHT);
  });

  it('applies gravity to airborne dino', () => {
    const dino = { ...createDino(), y: 100, vy: 0 };
    const result = tick(dino, [], [], [], 3, 150);
    expect(result.dino.vy).toBe(GRAVITY);
    expect(result.dino.y).toBe(100);
  });

  it('moves obstacles to the left', () => {
    const obs = createObstacle();
    const result = tick(createDino(), [obs], [], [], 3, 150);
    expect(result.obstacles[0].x).toBe(obs.x - 3);
  });

  it('removes obstacles that have gone off-screen', () => {
    const obs = { ...createObstacle(), x: -50 };
    const result = tick(createDino(), [obs], [], [], 3, 150);
    expect(result.obstacles).toHaveLength(0);
  });

  it('spawns new obstacle when gap counter reaches zero', () => {
    const dino = createDino();
    const result = tick(dino, [], [], [], 3, 0);
    expect(result.obstacles.length).toBeGreaterThanOrEqual(1);
  });

  it('moves clouds to the left', () => {
    const cloud = { x: 200, y: 50, speed: 0.5 };
    const result = tick(createDino(), [], [cloud], [], 3, 150);
    expect(result.clouds[0].x).toBe(200 - 0.5);
  });

  it('removes clouds that have gone off-screen', () => {
    const cloud = { x: -60, y: 50, speed: 0.5 };
    const result = tick(createDino(), [], [cloud], [], 3, 150);
    expect(result.clouds).toHaveLength(0);
  });

  it('advances star twinkle', () => {
    const star = { x: 100, y: 50, twinkle: 0 };
    const result = tick(createDino(), [], [], [star], 3, 150);
    expect(result.stars[0].twinkle).toBe(0.05);
  });

  it('returns fresh objects (immutability)', () => {
    const dino = createDino();
    const result = tick(dino, [], [], [], 3, 150);
    expect(result.dino).not.toBe(dino);
  });
});

describe('checkCollision', () => {
  it('returns true when dino overlaps an obstacle', () => {
    const dino = createDino();
    const obs = {
      x: 50,
      y: GROUND_Y - DINO_HEIGHT + 5,
      width: 24,
      height: 36,
      type: 'cactus' as const,
    };
    expect(checkCollision(dino, [obs])).toBe(true);
  });

  it('returns false when dino is far from obstacles', () => {
    const dino = createDino();
    const obs = {
      x: 300,
      y: 100,
      width: 24,
      height: 36,
      type: 'cactus' as const,
    };
    expect(checkCollision(dino, [obs])).toBe(false);
  });

  it('returns false with empty obstacles', () => {
    expect(checkCollision(createDino(), [])).toBe(false);
  });

  it('uses forgiving hitbox (6px shrink)', () => {
    const dino = createDino();
    const obs = {
      x: 50 + DINO_WIDTH - 6,
      y: GROUND_Y - DINO_HEIGHT + 6,
      width: 24,
      height: 36,
      type: 'cactus' as const,
    };
    expect(checkCollision(dino, [obs])).toBe(false);
  });
});
