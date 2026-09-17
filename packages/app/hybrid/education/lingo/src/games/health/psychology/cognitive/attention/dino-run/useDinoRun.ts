'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { BASE_SPEED, SPEED_LEVEL_NAMES } from './constants';
import { draw } from './draw';
import {
  accelerate,
  checkCollision,
  createWorld,
  jump,
  scoreFor,
  speedTier,
  tick,
} from './game';
import { Phase, World } from './types';

export const attentionLoad = (tier: number): string =>
  SPEED_LEVEL_NAMES[tier] ?? 'Calm';

export const useDinoRun = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const worldRef = useRef<World>(createWorld());
  const speedRef = useRef(BASE_SPEED);
  const framesRef = useRef(0);
  const rafRef = useRef(0);
  const [phase, setPhase] = useState<Phase>('idle');
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [tier, setTier] = useState(1);

  const step = useCallback(() => {
    const ctx = canvasRef.current?.getContext('2d');

    if (!ctx) return;

    const world = tick(worldRef.current, speedRef.current);

    worldRef.current = world;
    speedRef.current = accelerate(speedRef.current);
    framesRef.current += 1;

    const points = scoreFor(framesRef.current);

    setScore(points);
    setTier(speedTier(speedRef.current));

    if (checkCollision(world.dino, world.obstacles)) {
      setPhase('over');
      setBest((prev) => Math.max(prev, points));

      return;
    }

    draw(ctx, world, framesRef.current);
    rafRef.current = window.requestAnimationFrame(step);
  }, []);

  const start = useCallback(() => {
    worldRef.current = createWorld();
    speedRef.current = BASE_SPEED;
    framesRef.current = 0;
    setScore(0);
    setTier(1);
    setPhase('running');
    rafRef.current = window.requestAnimationFrame(step);
  }, [step]);

  const hop = useCallback(() => {
    if (phase === 'idle') {
      start();

      return;
    }

    if (phase === 'running') {
      worldRef.current = {
        ...worldRef.current,
        dino: jump(worldRef.current.dino),
      };
    }
  }, [phase, start]);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === ' ' || event.key === 'ArrowUp') {
        event.preventDefault();
        hop();
      }

      if (event.key === 'r' || event.key === 'R') {
        start();
      }
    },
    [hop, start]
  );

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');

    if (ctx && phase === 'idle') {
      draw(ctx, worldRef.current, 0);
    }
  }, [phase]);

  useEffect(() => () => window.cancelAnimationFrame(rafRef.current), []);

  return {
    canvasRef,
    phase,
    score,
    best,
    tier,
    load: attentionLoad(tier),
    hop,
    start,
    onKeyDown,
  };
};
