import { CANVAS_HEIGHT, CANVAS_WIDTH, GROUND_Y } from './constants';
import { Dino, Obstacle, World } from './types';

export const draw = (
  ctx: CanvasRenderingContext2D,
  world: World,
  frameCount: number
): void => {
  const { dino, obstacles, clouds, stars } = world;

  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, CANVAS_WIDTH, GROUND_Y);

  for (const star of stars) {
    ctx.globalAlpha = 0.3 + Math.sin(star.twinkle) * 0.3;
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(star.x, star.y, 2, 2);
  }
  ctx.globalAlpha = 1;

  ctx.fillStyle = '#f5f5f5';
  for (const cloud of clouds) {
    ctx.globalAlpha = 0.2;
    ctx.fillRect(cloud.x, cloud.y, 20, 4);
    ctx.fillRect(cloud.x + 5, cloud.y - 4, 12, 4);
    ctx.globalAlpha = 1;
  }

  ctx.fillRect(CANVAS_WIDTH - 40, 20, 16, 16);
  ctx.fillRect(CANVAS_WIDTH - 36, 24, 8, 8);
  ctx.fillRect(0, GROUND_Y, CANVAS_WIDTH, 2);

  ctx.fillStyle = '#0a0a0a';
  for (let i = 0; i < CANVAS_WIDTH; i += 20) {
    const offset = (frameCount * 2 + i) % 40;
    ctx.globalAlpha = 0.3;
    ctx.fillRect(i - offset, GROUND_Y + 4, 4, 4);
    ctx.globalAlpha = 1;
  }

  drawDino(ctx, dino);

  ctx.fillStyle = '#ff0030';
  for (const obstacle of obstacles) {
    drawObstacle(ctx, obstacle);
  }
};

export const drawDino = (ctx: CanvasRenderingContext2D, dino: Dino): void => {
  ctx.fillStyle = '#f5f5f5';
  ctx.save();
  ctx.scale(-1, 1);
  const x = -(dino.x + dino.width);
  const y = dino.y;
  ctx.fillRect(x + 4, y, 8, 8);
  ctx.fillRect(x, y + 8, 20, 16);
  ctx.fillRect(x + 4, y + 24, 6, 12);
  ctx.fillRect(x + 12, y + 24, 6, 12);
  ctx.fillRect(x + 16, y + 4, 8, 4);
  ctx.fillRect(x + 20, y + 8, 4, 4);
  ctx.restore();
};

export const drawObstacle = (
  ctx: CanvasRenderingContext2D,
  obstacle: Obstacle
): void => {
  if (obstacle.type === 'bird') {
    ctx.fillRect(obstacle.x + 4, obstacle.y, 24, 4);
    ctx.fillRect(obstacle.x, obstacle.y + 4, 32, 8);
    ctx.fillRect(obstacle.x + 8, obstacle.y + 12, 16, 4);
    ctx.fillRect(obstacle.x + 4, obstacle.y + 16, 8, 4);

    return;
  }

  if (obstacle.type === 'rock') {
    ctx.fillRect(obstacle.x + 4, obstacle.y, 16, 4);
    ctx.fillRect(obstacle.x, obstacle.y + 4, 24, 12);
    ctx.fillRect(obstacle.x + 4, obstacle.y + 16, 16, 8);
    ctx.fillRect(obstacle.x + 8, obstacle.y + 24, 8, 12);

    return;
  }

  ctx.fillRect(obstacle.x + 8, obstacle.y, 8, 8);
  ctx.fillRect(obstacle.x + 4, obstacle.y + 8, 16, 4);
  ctx.fillRect(obstacle.x, obstacle.y + 12, 24, 8);
  ctx.fillRect(obstacle.x + 4, obstacle.y + 20, 8, 8);
  ctx.fillRect(obstacle.x + 12, obstacle.y + 20, 8, 8);
  ctx.fillRect(obstacle.x + 4, obstacle.y + 28, 4, 8);
  ctx.fillRect(obstacle.x + 16, obstacle.y + 28, 4, 8);
};
