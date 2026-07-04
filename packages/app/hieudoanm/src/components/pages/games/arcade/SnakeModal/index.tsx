import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';

import { GRID, MIN_TICK, TICK_BASE, TICK_DECAY } from './constants';
import { Cell, Dir, Pos } from './types';
import { NEXT, OPPOSITE, initSnake, randomFood } from './utils/snake';

export const SnakeModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [snake, setSnake] = useState<Pos[]>(initSnake);
  const [food, setFood] = useState<Pos>(() => randomFood(initSnake()));
  const [direction, setDirection] = useState<Dir>('RIGHT');
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState(1);
  const dirRef = useRef<Dir>('RIGHT');
  const containerRef = useRef<HTMLDivElement>(null);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopLoop = useCallback(() => {
    if (tickRef.current) clearInterval(tickRef.current);
    tickRef.current = null;
  }, []);

  const startLoop = useCallback(() => {
    stopLoop();
    const ms = Math.max(MIN_TICK, TICK_BASE - (speed - 1) * TICK_DECAY);
    tickRef.current = setInterval(() => {
      setSnake((prev) => {
        const dir = dirRef.current;
        const head = NEXT[dir](prev[0]);
        if (head.r < 0 || head.r >= GRID || head.c < 0 || head.c >= GRID) {
          setGameOver(true);
          stopLoop();
          return prev;
        }
        if (prev.some((p) => p.r === head.r && p.c === head.c)) {
          setGameOver(true);
          stopLoop();
          return prev;
        }
        const ate = head.r === food.r && head.c === food.c;
        const next = [head, ...prev];
        if (!ate) next.pop();
        if (ate) {
          setScore((s) => s + 1);
          setFood((f) => {
            const nf = randomFood(next);
            if (!nf) setGameOver(true);
            return nf;
          });
        }
        return next;
      });
    }, ms);
  }, [speed, food, stopLoop]);

  useEffect(() => {
    startLoop();
    containerRef.current?.focus();
    return stopLoop;
  }, [speed, startLoop, stopLoop]);

  const changeDir = useCallback((d: Dir) => {
    if (d !== OPPOSITE[dirRef.current]) {
      dirRef.current = d;
      setDirection(d);
    }
  }, []);

  const reset = useCallback(() => {
    stopLoop();
    const s = initSnake();
    dirRef.current = 'RIGHT';
    setSnake(s);
    setFood(randomFood(s));
    setDirection('RIGHT');
    setScore(0);
    setGameOver(false);
    setPaused(false);
    containerRef.current?.focus();
  }, [stopLoop]);

  const togglePause = useCallback(() => {
    setPaused((p) => {
      if (p) startLoop();
      else stopLoop();
      return !p;
    });
  }, [startLoop, stopLoop]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === ' ' || e.key === 'p') {
        e.preventDefault();
        togglePause();
        return;
      }
      if (gameOver || paused) return;
      const map: Record<string, Dir> = {
        ArrowUp: 'UP',
        ArrowDown: 'DOWN',
        ArrowLeft: 'LEFT',
        ArrowRight: 'RIGHT',
      };
      if (map[e.key]) {
        e.preventDefault();
        changeDir(map[e.key]);
      }
    },
    [gameOver, paused, onClose, togglePause, changeDir]
  );

  const buildGrid = (): Cell[][] => {
    const g: Cell[][] = Array.from({ length: GRID }, () =>
      Array(GRID).fill('empty')
    );
    g[food.r][food.c] = 'food';
    for (let i = 0; i < snake.length; i++)
      g[snake[i].r][snake[i].c] = i === 0 ? 'head' : 'snake';
    return g;
  };

  const grid = buildGrid();

  return (
    <FullScreen onClose={onClose} title="Snake">
      <div
        ref={containerRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="flex flex-1 flex-col gap-3 overflow-y-auto p-4 outline-none">
        <div className="flex items-center justify-between text-sm">
          <span>
            Score: <strong>{score}</strong>
          </span>
          <span className="opacity-40">
            {GRID}×{GRID}
          </span>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div
            className="border-base-content/20 grid overflow-hidden rounded-lg border-2 select-none"
            style={{
              gridTemplateColumns: `repeat(${GRID}, minmax(0, 1fr))`,
              aspectRatio: '1',
              width: '100%',
              maxWidth: '320px',
            }}>
            {grid.flat().map((cell, i) => {
              const r = Math.floor(i / GRID);
              const c = i % GRID;
              return (
                <div
                  key={`${r}-${c}`}
                  className={`border-base-200 aspect-square border ${cell === 'food' ? 'bg-error/70' : cell === 'head' ? 'bg-success' : cell === 'snake' ? 'bg-success/60' : 'bg-base-200/30'}`}
                />
              );
            })}
          </div>
        </div>
        {gameOver && (
          <div className="alert alert-error justify-center py-2 text-sm">
            Game Over — Score: {score}
          </div>
        )}
        {paused && !gameOver && (
          <div className="alert alert-info justify-center py-2 text-sm">
            Paused
          </div>
        )}
        <div className="flex items-center justify-center gap-2 text-sm">
          <span className="opacity-60">Speed</span>
          <input
            type="range"
            min={1}
            max={5}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="range range-primary range-xs w-28"
          />
          <span className="font-normal">{speed}</span>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={togglePause}
            className="btn btn-primary btn-sm"
            disabled={gameOver}>
            {paused ? 'Resume' : 'Pause'}
          </button>
          <button onClick={reset} className="btn btn-secondary btn-sm">
            New Game
          </button>
        </div>
        <p className="text-center text-xs opacity-40">
          Arrow keys move · Space pause · Esc close
        </p>
      </div>
    </FullScreen>
  );
};
SnakeModal.displayName = 'SnakeModal';
