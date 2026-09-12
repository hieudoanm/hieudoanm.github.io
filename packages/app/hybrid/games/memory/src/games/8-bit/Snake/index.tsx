import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GameInstructions } from '../_shared/GameInstructions';
import { GAME_DATA } from '../_shared/gameData';
import { GRID, MIN_TICK, TICK_BASE, TICK_DECAY } from './constants';
import { Cell, Dir, Pos } from './types';
import { NEXT, OPPOSITE, initSnake, randomFood } from './snake';

export const Snake: FC = () => {
  const router = useRouter();
  const [snake, setSnake] = useState<Pos[]>(initSnake);
  const [food, setFood] = useState<Pos>(() => randomFood(initSnake()));
  const [direction, setDirection] = useState<Dir>('RIGHT');
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [helpOpen, setHelpOpen] = useState(false);
  const dirRef = useRef<Dir>('RIGHT');
  const containerRef = useRef<HTMLDivElement>(null);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const data = GAME_DATA.snake;

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
        router.push('/');
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
    [gameOver, paused, router, togglePause, changeDir]
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
    <>
      <div
        ref={containerRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="flex flex-1 flex-col gap-3 overflow-y-auto p-4 outline-none">
        <div className="flex items-center justify-between text-[8px]">
          <span>
            SCORE: <strong>{score}</strong>
          </span>
          <span className="text-base-content/40">
            {GRID}x{GRID}
          </span>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div
            className="border-base-content/20 grid overflow-hidden border-2 select-none"
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
                  className={`aspect-square ${
                    cell === 'food'
                      ? 'bg-primary'
                      : cell === 'head'
                        ? 'bg-base-content'
                        : cell === 'snake'
                          ? 'bg-base-content/60'
                          : 'bg-base-200'
                  }`}
                />
              );
            })}
          </div>
        </div>
        {gameOver && (
          <div className="bg-primary/20 text-primary border-primary/30 border p-2 text-center text-[8px]">
            GAME OVER - SCORE: {score}
          </div>
        )}
        {paused && !gameOver && (
          <div className="bg-base-content/10 text-base-content border-base-content/20 border p-2 text-center text-[8px]">
            PAUSED
          </div>
        )}
        <div className="flex items-center justify-center gap-2 text-[8px]">
          <span className="text-base-content/40">SPEED</span>
          <input
            type="range"
            min={1}
            max={5}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="range range-primary range-xs w-28"
          />
          <span>{speed}</span>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={togglePause}
            className="bg-primary text-primary-content hover:bg-primary/80 px-3 py-1 text-[8px] font-bold transition-colors disabled:opacity-40"
            disabled={gameOver}>
            {paused ? 'RESUME' : 'PAUSE'}
          </button>
          <button
            onClick={reset}
            className="border-base-content/30 text-base-content hover:bg-base-content/10 border px-3 py-1 text-[8px] font-bold transition-colors">
            NEW GAME
          </button>
          <button
            className="text-base-content/40 hover:text-primary px-3 py-1 text-[8px] transition-colors"
            onClick={() => setHelpOpen(true)}>
            HELP
          </button>
        </div>
        <p className="text-base-content/30 text-center text-[8px]">
          ARROWS MOVE / SPACE PAUSE / ESC BACK
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
Snake.displayName = 'Snake';
