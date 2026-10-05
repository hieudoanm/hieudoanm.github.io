import {
  BASE_SPEED,
  CANVAS_WIDTH,
  DINO_HEIGHT,
  GROUND_Y,
  JUMP_FORCE,
  MAX_OBSTACLE_GAP,
  MAX_SPEED,
  MIN_OBSTACLE_GAP,
  OBSTACLE_HEIGHT,
} from '../constants';
import { draw } from '../draw';
import {
  accelerate,
  checkCollision,
  createDino,
  createObstacle,
  createStars,
  createWorld,
  jump,
  randomGap,
  scoreFor,
  speedTier,
  tick,
} from '../game';
import { Obstacle, World } from '../types';

const withRandom = <T>(value: number, run: () => T): T => {
  const spy = jest.spyOn(Math, 'random').mockReturnValue(value);

  try {
    return run();
  } finally {
    spy.mockRestore();
  }
};

const obstacle = (overrides: Partial<Obstacle> = {}): Obstacle => ({
  x: 100,
  y: GROUND_Y - OBSTACLE_HEIGHT,
  width: 24,
  height: OBSTACLE_HEIGHT,
  type: 'cactus',
  ...overrides,
});

const world = (overrides: Partial<World> = {}): World => ({
  ...createWorld(),
  ...overrides,
});

const stubContext = () =>
  ({
    clearRect: jest.fn(),
    fillRect: jest.fn(),
    save: jest.fn(),
    restore: jest.fn(),
    scale: jest.fn(),
    fillStyle: '',
    globalAlpha: 1,
  }) as unknown as CanvasRenderingContext2D;

describe('createDino', () => {
  it('places the dino standing on the ground', () => {
    const dino = createDino();

    expect(dino.y).toBe(GROUND_Y - DINO_HEIGHT);
    expect(dino.vy).toBe(0);
    expect(dino.x).toBeGreaterThan(0);
  });
});

describe('createObstacle', () => {
  it('spawns at the right edge on the ground for solid obstacles', () => {
    const rock = withRandom(0.5, () => createObstacle());

    expect(rock.type).toBe('rock');
    expect(rock.x).toBe(CANVAS_WIDTH);
    expect(rock.y).toBe(GROUND_Y - OBSTACLE_HEIGHT);
  });

  it('floats birds above the ground', () => {
    const bird = createObstacle('bird');

    expect(bird.height).toBe(24);
    expect(bird.y).toBeLessThan(GROUND_Y - OBSTACLE_HEIGHT);
  });

  it('picks the middle obstacle type at a 0.5 draw', () => {
    expect(withRandom(0.5, () => createObstacle().type)).toBe('rock');
    expect(withRandom(0.9, () => createObstacle().type)).toBe('bird');
    expect(withRandom(0.1, () => createObstacle().type)).toBe('cactus');
  });
});

describe('createStars', () => {
  it('creates the requested number of stars', () => {
    expect(createStars(8)).toHaveLength(8);
    expect(createStars(0)).toHaveLength(0);
  });
});

describe('randomGap', () => {
  it('stays inside the configured gap band', () => {
    expect(randomGap()).toBeGreaterThanOrEqual(MIN_OBSTACLE_GAP);
    expect(randomGap()).toBeLessThanOrEqual(MAX_OBSTACLE_GAP);
    expect(withRandom(0.5, randomGap)).toBe(
      MIN_OBSTACLE_GAP + (MAX_OBSTACLE_GAP - MIN_OBSTACLE_GAP) / 2
    );
  });
});

describe('jump', () => {
  it('launches the dino when it is on the ground', () => {
    expect(jump(createDino()).vy).toBe(JUMP_FORCE);
  });

  it('ignores input while already airborne', () => {
    const airborne = { ...createDino(), y: 100, vy: -3 };

    expect(jump(airborne)).toBe(airborne);
  });
});

describe('tick', () => {
  it('falls the dino and clamps it to the ground', () => {
    const dino = createDino();
    const next = tick(world({ dino }), BASE_SPEED).dino;

    expect(next.y).toBe(GROUND_Y - DINO_HEIGHT);
    expect(next.vy).toBe(0);
  });

  it('moves obstacles left and drops the ones off screen', () => {
    const next = withRandom(0.5, () =>
      tick(
        world({
          obstacles: [obstacle({ x: 100 }), obstacle({ x: 1, width: 1 })],
          gapCounter: MIN_OBSTACLE_GAP,
        }),
        3
      )
    );

    expect(next.obstacles).toHaveLength(1);
    expect(next.obstacles[0].x).toBe(97);
  });

  it('spawns a new obstacle once the gap counter runs out', () => {
    const next = withRandom(0.5, () => tick(world({ gapCounter: 1 }), 3));

    expect(next.obstacles).toHaveLength(1);
    expect(next.gapCounter).toBeGreaterThan(MIN_OBSTACLE_GAP);
  });

  it('keeps the gap counter while it still has room', () => {
    const next = withRandom(0.5, () => tick(world({ gapCounter: 100 }), 3));

    expect(next.obstacles).toHaveLength(0);
    expect(next.gapCounter).toBe(97);
  });

  it('drifts clouds and twinkles stars', () => {
    const base = world({
      clouds: [{ x: 200, y: 40, speed: 1 }],
      stars: [{ x: 10, y: 20, twinkle: 0 }],
      gapCounter: MIN_OBSTACLE_GAP,
    });
    const next = withRandom(0.5, () => tick(base, 1));

    expect(next.clouds[0].x).toBe(199);
    expect(next.stars[0].twinkle).toBeGreaterThan(0);
  });

  it('respawns a cloud on a rare draw', () => {
    const next = withRandom(0.001, () =>
      tick(world({ gapCounter: MIN_OBSTACLE_GAP }), 1)
    );

    expect(next.clouds.length).toBeGreaterThan(2);
  });
});

describe('checkCollision', () => {
  const dino = createDino();

  it('detects an obstacle overlapping the dino', () => {
    expect(checkCollision(dino, [obstacle({ x: 60 })])).toBe(true);
  });

  it('ignores an obstacle far away', () => {
    expect(checkCollision(dino, [obstacle({ x: 250 })])).toBe(false);
  });

  it('ignores an obstacle the dino jumps over', () => {
    expect(checkCollision({ ...dino, y: 60 }, [obstacle({ x: 60 })])).toBe(
      false
    );
  });
});

describe('scoreFor', () => {
  it('converts frames into whole seconds', () => {
    expect(scoreFor(0)).toBe(0);
    expect(scoreFor(9)).toBe(0);
    expect(scoreFor(10)).toBe(1);
    expect(scoreFor(25)).toBe(2);
  });
});

describe('accelerate', () => {
  it('ramps the speed up while below the ceiling', () => {
    expect(accelerate(BASE_SPEED)).toBeGreaterThan(BASE_SPEED);
  });

  it('never exceeds the maximum speed', () => {
    expect(accelerate(MAX_SPEED)).toBe(MAX_SPEED);
  });
});

describe('speedTier', () => {
  it('reads the starting speed as the lowest attention load', () => {
    expect(speedTier(BASE_SPEED)).toBe(1);
  });

  it('reads the ceiling as the highest attention load', () => {
    expect(speedTier(MAX_SPEED)).toBe(5);
  });

  it('never leaves the 1-5 band', () => {
    expect(speedTier(BASE_SPEED - 1)).toBe(1);
    expect(speedTier(MAX_SPEED + 5)).toBe(5);
  });
});

describe('draw', () => {
  it('renders stars, ground, dino, and every obstacle type', () => {
    const ctx = stubContext();

    draw(
      ctx,
      world({
        obstacles: [
          obstacle({ type: 'cactus' }),
          obstacle({ type: 'rock' }),
          obstacle({ type: 'bird' }),
        ],
      }),
      12
    );

    expect(ctx.clearRect).toHaveBeenCalled();
    expect(ctx.fillRect).toHaveBeenCalled();
    expect(ctx.save).toHaveBeenCalled();
    expect(ctx.restore).toHaveBeenCalled();
    expect(ctx.scale).toHaveBeenCalled();
  });
});
