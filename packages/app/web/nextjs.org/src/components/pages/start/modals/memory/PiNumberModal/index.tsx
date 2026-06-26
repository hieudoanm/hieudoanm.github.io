import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { FC } from 'react';

import { DIGIT_WIDTH, VIEWPORT_OFFSET } from './constants';
import { usePiGame } from './usePiGame';

export const PiModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const {
    digits,
    containerRef,
    index,
    mode,
    locked,
    lastResult,
    revealedIndex,
    highScore,
    retry,
    handleKey,
    onKeyDown,
    setMode,
    switchToGame,
  } = usePiGame(onClose);

  return (
    <ModalWrapper onClose={onClose} title="π Memory">
      <div
        ref={containerRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="outline-none">
        <div className="tabs tabs-boxed mb-4 w-full">
          <a
            role="tab"
            className={`tab flex-1 ${mode === 'practice' ? 'tab-active' : ''}`}
            onClick={() => setMode('practice')}>
            Practice
          </a>
          <a
            role="tab"
            className={`tab flex-1 ${mode === 'game' ? 'tab-active' : ''}`}
            onClick={switchToGame}>
            Game
          </a>
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

        <div className="mb-4 flex justify-center">
          <div className="border-accent rounded-md border border-dashed px-4 py-2">
            <div className="relative h-12 w-54 overflow-hidden">
              <div
                className="absolute top-0 flex h-12 transition-[left] duration-300 ease-out"
                style={{ left: `${VIEWPORT_OFFSET - index * DIGIT_WIDTH}px` }}>
                {digits.map((d, i) => {
                  const isCurrent = i === index;
                  const isPast = i < index;
                  const isRevealed = revealedIndex === i;
                  const showDigit = mode === 'practice' || isPast || isRevealed;

                  return (
                    <div
                      key={i}
                      className={[
                        'flex h-12 w-6 items-center justify-center text-4xl transition-colors select-none',
                        isCurrent ? 'text-accent' : 'opacity-40',
                        lastResult === 'wrong' && isCurrent ? 'text-error' : '',
                        lastResult === 'correct' && isCurrent
                          ? 'text-success'
                          : '',
                      ].join(' ')}>
                      {showDigit ? d : '•'}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 text-center text-xs opacity-60">
          {mode === 'practice' ? (
            <>
              <div>Use ← → arrow keys</div>
              <div>Index: {index}</div>
            </>
          ) : locked ? (
            <>
              <div className="text-error font-semibold">Mistake!</div>
              <div>You reached digit {index}</div>
            </>
          ) : (
            <>
              <div>Type the next digit of π</div>
              <div>Index: {index}</div>
            </>
          )}
        </div>

        {mode === 'game' && locked && (
          <div className="mb-4 flex justify-center">
            <button className="btn btn-error btn-sm" onClick={retry}>
              Retry
            </button>
          </div>
        )}

        {mode === 'game' && !locked && (
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0].map((n) => (
              <button
                key={n}
                className="btn btn-secondary btn-sm"
                onClick={() => handleKey(String(n))}>
                {n}
              </button>
            ))}
          </div>
        )}

        <p className="mt-4 text-center text-xs opacity-40">
          {mode === 'practice'
            ? '← → navigate · Esc close'
            : 'Type digits · Esc close'}
        </p>
      </div>
    </ModalWrapper>
  );
};
PiModal.displayName = 'PiModal';
