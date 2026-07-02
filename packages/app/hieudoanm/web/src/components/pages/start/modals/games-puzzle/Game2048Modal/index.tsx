import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

import { TILE_COLORS, TILE_FONT } from './constants';
import { Grid, Dir } from './types';
import { canMove, init, move, spawn } from './utils/game';

export const Game2048Modal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [grid, setGrid] = useState<Grid>(init);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const reset = useCallback(() => {
    setGrid(init());
    setScore(0);
    setGameOver(false);
    setWon(false);
    containerRef.current?.focus();
  }, []);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'r') {
        reset();
        return;
      }
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
    [onClose, handleMove, reset]
  );

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  return (
    <ModalWrapper onClose={onClose} title="2048" size="max-w-sm" fullHeight>
      <div
        ref={containerRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 outline-none">
        <div className="flex items-center justify-between text-sm">
          <div className="flex gap-4">
            <span>
              Score: <strong>{score}</strong>
            </span>
            <span className="opacity-60">
              Best: <strong>{best}</strong>
            </span>
          </div>
          <button onClick={reset} className="btn btn-primary btn-xs">
            New
          </button>
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
            disabled={gameOver || won}>
            ▲
          </button>
          <div />
          <button
            onClick={() => handleMove('LEFT')}
            className="btn btn-outline btn-sm"
            disabled={gameOver || won}>
            ◀
          </button>
          <button
            onClick={() => handleMove('DOWN')}
            className="btn btn-outline btn-sm"
            disabled={gameOver || won}>
            ▼
          </button>
          <button
            onClick={() => handleMove('RIGHT')}
            className="btn btn-outline btn-sm"
            disabled={gameOver || won}>
            ▶
          </button>
        </div>
        <p className="text-center text-xs opacity-40">
          Arrow keys move · R reset · Esc close
        </p>
      </div>
    </ModalWrapper>
  );
};
Game2048Modal.displayName = 'Game2048Modal';
