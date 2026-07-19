import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';

import { TILE_COLORS, TILE_FONT, SIZE } from './constants';
import { Grid, Dir } from './types';
import { canMove, init, move, spawn } from './utils/game';

const DIRS: Dir[] = ['UP', 'DOWN', 'LEFT', 'RIGHT'];

const evaluate = (g: Grid): number => {
  let score = 0;
  let empty = 0;
  let maxTile = 0;

  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const val = g[r][c];
      if (val === 0) {
        empty++;
      } else {
        score += val * Math.log2(val);
        maxTile = Math.max(maxTile, val);
        if (c === 0) score += val * 0.5;
        if (c === SIZE - 1) score += val * 0.3;
        if (r === 0) score += val * 0.5;
        if (r === SIZE - 1) score += val * 0.3;
      }
    }
  }

  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE - 1; c++) {
      if (g[r][c] === g[r][c + 1] && g[r][c] !== 0) {
        score += g[r][c] * 2;
      }
    }
  }
  for (let c = 0; c < SIZE; c++) {
    for (let r = 0; r < SIZE - 1; r++) {
      if (g[r][c] === g[r + 1][c] && g[r][c] !== 0) {
        score += g[r][c] * 2;
      }
    }
  }

  score += empty * 100;
  score += maxTile * 10;

  return score;
};

const bestMove = (g: Grid): Dir | null => {
  let bestScore = -Infinity;
  let bestDir: Dir | null = null;

  for (const dir of DIRS) {
    const { grid: next, moved } = move(g, dir);
    if (!moved) continue;
    const score = evaluate(next);
    if (score > bestScore) {
      bestScore = score;
      bestDir = dir;
    }
  }

  return bestDir;
};

export const Game2048: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [grid, setGrid] = useState<Grid>(init);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [autoPlaying, setAutoPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoRef = useRef<NodeJS.Timeout | null>(null);

  const handleMove = useCallback(
    (dir: Dir) => {
      if (gameOver || won) return;
      setGrid((prev) => {
        const { grid: next, score: add, moved } = move(prev, dir);
        if (!moved) return prev;
        const withTile = spawn(next);
        setScore((s) => {
          const ns = s + add;
          setBest((b) => Math.max(b, ns));
          return ns;
        });
        if (withTile.flat().includes(2048)) setWon(true);
        if (!canMove(withTile)) setGameOver(true);
        return withTile;
      });
    },
    [gameOver, won]
  );

  const autoPlay = useCallback(() => {
    setAutoPlaying(true);
    const tick = () => {
      setGrid((prev) => {
        const dir = bestMove(prev);
        if (!dir) {
          setAutoPlaying(false);
          return prev;
        }
        const { grid: next, score: add, moved } = move(prev, dir);
        if (!moved) {
          setAutoPlaying(false);
          return prev;
        }
        const withTile = spawn(next);
        setScore((s) => {
          const ns = s + add;
          setBest((b) => Math.max(b, ns));
          return ns;
        });
        if (withTile.flat().includes(2048)) setWon(true);
        if (!canMove(withTile)) setGameOver(true);
        return withTile;
      });
      autoRef.current = setTimeout(tick, 50);
    };
    autoRef.current = setTimeout(tick, 50);
  }, []);

  const stopAutoPlay = useCallback(() => {
    if (autoRef.current) {
      clearTimeout(autoRef.current);
      autoRef.current = null;
    }
    setAutoPlaying(false);
  }, []);

  const reset = useCallback(() => {
    stopAutoPlay();
    setGrid(init());
    setScore(0);
    setGameOver(false);
    setWon(false);
    containerRef.current?.focus();
  }, [stopAutoPlay]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        stopAutoPlay();
        onClose();
        return;
      }
      if (e.key === 'r') {
        reset();
        return;
      }
      if (e.key === 'a') {
        if (autoPlaying) {
          stopAutoPlay();
        } else {
          autoPlay();
        }
        return;
      }
      if (autoPlaying) return;
      const map: Record<string, Dir> = {
        ArrowUp: 'UP',
        ArrowDown: 'DOWN',
        ArrowLeft: 'LEFT',
        ArrowRight: 'RIGHT',
      };
      if (map[e.key]) {
        e.preventDefault();
        handleMove(map[e.key]);
      }
    },
    [onClose, handleMove, reset, autoPlay, stopAutoPlay, autoPlaying]
  );

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  useEffect(() => {
    return () => {
      if (autoRef.current) clearTimeout(autoRef.current);
    };
  }, []);

  return (
    <FullScreen onClose={onClose} title="2048">
      <div
        ref={containerRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="mx-auto flex w-80 flex-1 flex-col gap-4 overflow-y-auto p-4 outline-none">
        <div className="flex items-center justify-between text-sm">
          <div className="flex flex-col">
            <span>
              Score: <strong>{score}</strong>
            </span>
            <span className="opacity-60">
              Best: <strong>{best}</strong>
            </span>
          </div>
          <div className="flex gap-1">
            <button
              onClick={autoPlaying ? stopAutoPlay : autoPlay}
              className={`btn btn-xs ${autoPlaying ? 'btn-warning' : 'btn-accent'}`}>
              {autoPlaying ? 'Stop' : 'Auto'}
            </button>
            <button onClick={reset} className="btn btn-primary btn-xs">
              New
            </button>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div
            className="bg-base-300 grid gap-1.5 rounded-lg p-1.5 select-none"
            style={{
              gridTemplateColumns: `repeat(4, minmax(0, 1fr))`,
              width: '100%',
              maxWidth: '300px',
              aspectRatio: '1',
            }}>
            {grid.flat().map((val, i) => (
              <div
                key={i}
                className={`flex items-center justify-center rounded-md font-normal transition-all ${TILE_COLORS[val] || 'bg-amber-800 text-white'} ${TILE_FONT[val] || 'text-xs'}`}
                style={{ aspectRatio: '1' }}>
                {val !== 0 ? val : ''}
              </div>
            ))}
          </div>
        </div>
        {won && (
          <div className="alert alert-success justify-center py-2 text-sm">
            You reached 2048! Keep going or start a new game.
          </div>
        )}
        {gameOver && (
          <div className="alert alert-error justify-center py-2 text-sm">
            Game Over — Score: {score}
          </div>
        )}
        <div className="grid grid-cols-3 gap-1 self-center">
          <div />
          <button
            onClick={() => handleMove('UP')}
            className="btn btn-outline btn-sm"
            disabled={gameOver || won || autoPlaying}>
            ▲
          </button>
          <div />
          <button
            onClick={() => handleMove('LEFT')}
            className="btn btn-outline btn-sm"
            disabled={gameOver || won || autoPlaying}>
            ◀
          </button>
          <button
            onClick={() => handleMove('DOWN')}
            className="btn btn-outline btn-sm"
            disabled={gameOver || won || autoPlaying}>
            ▼
          </button>
          <button
            onClick={() => handleMove('RIGHT')}
            className="btn btn-outline btn-sm"
            disabled={gameOver || won || autoPlaying}>
            ▶
          </button>
        </div>
        <p className="text-center text-xs opacity-40">
          Arrow keys move · A auto · R reset · Esc close
        </p>
      </div>
    </FullScreen>
  );
};
Game2048.displayName = 'Game2048';
