import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';

import {
  BASE_SPEED,
  MAX_SPEED,
  SPEED_INCREMENT,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
} from './constants';
import { Dino, Obstacle, Phase } from './types';
import { checkCollision, createDino, draw, jump, tick } from './game';

export const DinoRunModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dinoRef = useRef<Dino>(createDino());
  const obstaclesRef = useRef<Obstacle[]>([]);
  const speedRef = useRef(BASE_SPEED);
  const gapRef = useRef(0);
  const scoreRef = useRef(0);
  const [phase, setPhase] = useState<Phase>('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const rafRef = useRef<number>(0);

  const loop = useCallback(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    const result = tick(
      dinoRef.current,
      obstaclesRef.current,
      speedRef.current,
      gapRef.current
    );
    dinoRef.current = result.dino;
    obstaclesRef.current = result.obstacles;
    gapRef.current = result.gapCounter;

    if (speedRef.current < MAX_SPEED) speedRef.current += SPEED_INCREMENT;
    scoreRef.current += 1;
    setScore(Math.floor(scoreRef.current / 10));

    if (checkCollision(dinoRef.current, obstaclesRef.current)) {
      setPhase('over');
      setHighScore((prev) => Math.max(prev, Math.floor(scoreRef.current / 10)));
      return;
    }

    draw(ctx, dinoRef.current, obstaclesRef.current);
    rafRef.current = requestAnimationFrame(loop);
  }, []);

  const startGame = useCallback(() => {
    dinoRef.current = createDino();
    obstaclesRef.current = [];
    speedRef.current = BASE_SPEED;
    gapRef.current = 0;
    scoreRef.current = 0;
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
        onClose();
        return;
      }
      if (e.key === ' ' || e.key === 'ArrowUp') {
        e.preventDefault();
        handleJump();
      }
      if (e.key === 'r' && phase === 'over') startGame();
    },
    [onClose, handleJump, phase, startGame]
  );

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx && phase === 'idle') {
      draw(ctx, dinoRef.current, obstaclesRef.current);
    }
  }, [phase]);

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <FullScreen onClose={onClose} title="Dino Run">
      <div
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="flex flex-col gap-3 outline-none">
        <div className="flex items-center justify-between text-sm">
          <span>
            Score: <strong>{score}</strong>
          </span>
          <span className="opacity-40">Best: {highScore}</span>
        </div>

        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="bg-base-200 w-full cursor-pointer rounded-lg"
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

        <p className="text-center text-xs opacity-40">
          Space/↑ jump · R restart · Esc close
        </p>
      </div>
    </FullScreen>
  );
};
DinoRunModal.displayName = 'DinoRunModal';
