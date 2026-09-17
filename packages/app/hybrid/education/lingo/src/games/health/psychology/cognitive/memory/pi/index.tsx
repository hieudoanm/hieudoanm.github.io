'use client';

import type { FC } from 'react';

import { DIGIT_WIDTH, KEYPAD, VIEWPORT_OFFSET } from './constants';
import { usePiGame } from './usePiGame';

type Tone = 'text-accent' | 'text-success' | 'text-error' | 'opacity-40';

const digitTone = (
  position: number,
  index: number,
  lastResult: 'correct' | 'wrong' | null
): Tone => {
  if (position !== index) return 'opacity-40';
  if (lastResult === 'wrong') return 'text-error';
  if (lastResult === 'correct') return 'text-success';

  return 'text-accent';
};

const DigitStrip: FC<{
  digits: string[];
  index: number;
  mode: 'practice' | 'game';
  revealedIndex: number | null;
  lastResult: 'correct' | 'wrong' | null;
}> = ({ digits, index, mode, revealedIndex, lastResult }) => (
  <div className="mb-4 flex justify-center">
    <div className="border-accent rounded-md border border-dashed px-4 py-2">
      <div
        className="relative h-12 w-54 overflow-hidden"
        data-testid="digit-strip">
        <div
          className="absolute top-0 flex h-12 transition-[left] duration-300 ease-out"
          style={{ left: `${VIEWPORT_OFFSET - index * DIGIT_WIDTH}px` }}>
          {digits.map((digit, position) => (
            <div
              key={position}
              className={[
                'flex h-12 w-6 items-center justify-center text-4xl select-none',
                'transition-colors',
                digitTone(position, index, lastResult),
              ].join(' ')}>
              {mode === 'practice' ||
              position < index ||
              revealedIndex === position
                ? digit
                : '•'}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Hint: FC<{
  mode: 'practice' | 'game';
  index: number;
  locked: boolean;
}> = ({ mode, index, locked }) => (
  <div className="mb-4 text-center text-xs opacity-60">
    {mode === 'practice' ? (
      <>
        <div>Use ← → arrow keys</div>
        <div>Index: {index}</div>
      </>
    ) : locked ? (
      <>
        <div className="text-error font-normal">Mistake!</div>
        <div>You reached digit {index}</div>
      </>
    ) : (
      <>
        <div>Type the next digit of π</div>
        <div>Index: {index}</div>
      </>
    )}
  </div>
);

export const Pi: FC = () => {
  const {
    digits,
    containerRef,
    index,
    mode,
    setMode,
    locked,
    lastResult,
    revealedIndex,
    highScore,
    retry,
    handleKey,
    onKeyDown,
    switchToGame,
  } = usePiGame();

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="outline-none">
      <div role="tablist" className="tabs tabs-boxed mb-4 w-full">
        <button
          role="tab"
          aria-selected={mode === 'practice'}
          className={`tab flex-1 ${mode === 'practice' ? 'tab-active' : ''}`}
          onClick={() => setMode('practice')}>
          Practice
        </button>
        <button
          role="tab"
          aria-selected={mode === 'game'}
          className={`tab flex-1 ${mode === 'game' ? 'tab-active' : ''}`}
          onClick={switchToGame}>
          Game
        </button>
      </div>

      {mode === 'game' && (
        <div className="mb-3 flex justify-center gap-3 text-xs opacity-70">
          <span>
            Score: <strong>{index}</strong>
          </span>
          <span>•</span>
          <span>
            Best: <strong>{highScore}</strong>
          </span>
        </div>
      )}

      <DigitStrip
        digits={digits}
        index={index}
        mode={mode}
        revealedIndex={revealedIndex}
        lastResult={lastResult}
      />

      <Hint mode={mode} index={index} locked={locked} />

      {mode === 'game' && locked && (
        <div className="mb-4 flex justify-center">
          <button className="btn btn-error btn-sm" onClick={retry}>
            Retry
          </button>
        </div>
      )}

      {mode === 'game' && !locked && (
        <div className="grid grid-cols-3 gap-2">
          {KEYPAD.map((key) => (
            <button
              key={key}
              className="btn btn-secondary btn-sm"
              onClick={() => handleKey(key)}>
              {key}
            </button>
          ))}
        </div>
      )}

      <p className="mt-4 text-center text-xs opacity-40">
        {mode === 'practice' ? '← → navigate' : 'Type digits'}
      </p>
    </div>
  );
};

Pi.displayName = 'Pi';
