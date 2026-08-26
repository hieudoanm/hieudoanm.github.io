import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GameInstructions } from '../_shared/GameInstructions';
import { GAME_DATA } from '../_shared/gameData';
import {
  BASE_SPEED,
  MAX_SPEED,
  SPEED_INCREMENT,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
} from './constants';
import { Cloud, Dino, Obstacle, Phase, Star } from './types';
import {
  checkCollision,
  createCloud,
  createDino,
  createStar,
  draw,
  jump,
  tick,
} from './game';

export const DinoRun: FC = () => {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dinoRef = useRef<Dino>(createDino());
  const obstaclesRef = useRef<Obstacle[]>([]);
  const cloudsRef = useRef<Cloud[]>([createCloud(), createCloud()]);
  const starsRef = useRef<Star[]>(
    Array.from({ length: 8 }, () => createStar())
  );
  const speedRef = useRef(BASE_SPEED);
  const gapRef = useRef(0);
  const scoreRef = useRef(0);
  const frameRef = useRef(0);
  const [phase, setPhase] = useState<Phase>('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [helpOpen, setHelpOpen] = useState(false);
  const rafRef = useRef<number>(0);
  const data = GAME_DATA['dino-run'];

  const loop = useCallback(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    const result = tick(
      dinoRef.current,
      obstaclesRef.current,
      cloudsRef.current,
      starsRef.current,
      speedRef.current,
      gapRef.current
    );
    dinoRef.current = result.dino;
    obstaclesRef.current = result.obstacles;
    cloudsRef.current = result.clouds;
    starsRef.current = result.stars;
    gapRef.current = result.gapCounter;

    if (speedRef.current < MAX_SPEED) speedRef.current += SPEED_INCREMENT;
    scoreRef.current += 1;
    frameRef.current += 1;
    setScore(Math.floor(scoreRef.current / 10));

    if (checkCollision(dinoRef.current, obstaclesRef.current)) {
      setPhase('over');
      setHighScore((prev) => Math.max(prev, Math.floor(scoreRef.current / 10)));
      return;
    }

    draw(
      ctx,
      dinoRef.current,
      obstaclesRef.current,
      cloudsRef.current,
      starsRef.current,
      frameRef.current
    );
    rafRef.current = requestAnimationFrame(loop);
  }, []);

  const startGame = useCallback(() => {
    dinoRef.current = createDino();
    obstaclesRef.current = [];
    cloudsRef.current = [createCloud(), createCloud()];
    starsRef.current = Array.from({ length: 8 }, () => createStar());
    speedRef.current = BASE_SPEED;
    gapRef.current = 0;
    scoreRef.current = 0;
    frameRef.current = 0;
    setScore(0);
    setPhase('running');
    rafRef.current = requestAnimationFrame(loop);
  }, [loop]);

  const handleJump = useCallback(() => {
    if (phase === 'idle') {
      startGame();
      return;
    }
    if (phase === 'running') {
      dinoRef.current = jump(dinoRef.current);
    }
  }, [phase, startGame]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        router.push('/');
        return;
      }
      if (e.key === ' ' || e.key === 'ArrowUp') {
        e.preventDefault();
        handleJump();
      }
      if (e.key === 'r' && phase === 'over') startGame();
    },
    [router, handleJump, phase, startGame]
  );

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx && phase === 'idle') {
      draw(
        ctx,
        dinoRef.current,
        obstaclesRef.current,
        cloudsRef.current,
        starsRef.current,
        0
      );
    }
  }, [phase]);

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <>
      <div
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="flex flex-1 flex-col items-center gap-3 overflow-y-auto p-4 outline-none">
        <div className="flex w-80 items-center justify-between text-sm">
          <span>
            Score: <strong>{score}</strong>
          </span>
          <span className="opacity-40">Best: {highScore}</span>
        </div>

        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="border-base-300 h-80 w-80 cursor-pointer rounded-lg border"
          onClick={handleJump}
        />

        {phase === 'idle' && (
          <p className="text-center text-xs opacity-50">
            Press Space or click to jump
          </p>
        )}
        {phase === 'over' && (
          <div className="flex flex-col items-center gap-2">
            <div className="alert alert-error justify-center py-2 text-sm">
              Game Over — Score: {score}
            </div>
            <button onClick={startGame} className="btn btn-primary btn-sm">
              Play Again
            </button>
          </div>
        )}

        <div className="flex justify-center gap-2">
          <button
            className="btn btn-sm btn-ghost"
            onClick={() => setHelpOpen(true)}>
            How to Play
          </button>
        </div>

        <p className="text-center text-xs opacity-40">
          Space/↑ jump · R restart · Esc close
        </p>
      </div>

      <GameInstructions
        isOpen={helpOpen}
        onClose={() => setHelpOpen(false)}
        title={data.title}
        subtitle={data.subtitle}
        instructions={data.instructions}
        visualization={data.visualization}
      />
    </>
  );
};
DinoRun.displayName = 'DinoRun';
