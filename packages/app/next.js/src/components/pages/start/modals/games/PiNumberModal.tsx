import { PI } from '@hieudoanm/data/pi';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { ModalWrapper } from '@hieudoanm/components/atoms/ModalWrapper';

const DIGIT_WIDTH = 24;
const VIEWPORT_OFFSET = 4 * DIGIT_WIDTH;
const HIGH_SCORE_KEY = 'pi-high-score';

type Mode = 'practice' | 'game';

const getHighScore = () => {
  if (typeof window === 'undefined') return 0;
  const saved = Number(localStorage.getItem(HIGH_SCORE_KEY));
  return Number.isNaN(saved) ? 0 : saved;
};

export const PiModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const digits = useMemo(() => PI.split(''), []);
  const containerRef = useRef<HTMLDivElement>(null);

  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<Mode>('practice');
  const [{ locked, lastResult, revealedIndex, highScore }, setGameState] =
    useState<{
      locked: boolean;
      lastResult: 'correct' | 'wrong' | null;
      revealedIndex: number | null;
      highScore: number;
    }>({
      locked: false,
      lastResult: null,
      revealedIndex: null,
      highScore: getHighScore(),
    });

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  const retry = () => {
    setIndex(0);
    setGameState((p) => ({
      ...p,
      locked: false,
      lastResult: null,
      revealedIndex: null,
    }));
    containerRef.current?.focus();
  };

  const handleKey = (key: string) => {
    if (key === 'Escape') {
      onClose();
      return;
    }

    if (mode === 'practice') {
      if (key === 'ArrowRight')
        setIndex((i) => Math.min(i + 1, digits.length - 1));
      if (key === 'ArrowLeft') setIndex((i) => Math.max(i - 1, 0));
      return;
    }

    if (mode === 'game' && !locked && /^[0-9.]$/.test(key)) {
      const correct = digits[index];
      setGameState((p) => ({ ...p, revealedIndex: index }));

      if (key === correct) {
        setGameState((p) => ({ ...p, lastResult: 'correct' }));
        setTimeout(() => {
          setIndex((i) => Math.min(i + 1, digits.length - 1));
          setGameState((p) => ({
            ...p,
            lastResult: null,
            revealedIndex: null,
          }));
        }, 200);
      } else {
        setGameState((p) => {
          const newHighScore = Math.max(p.highScore, index);
          localStorage.setItem(HIGH_SCORE_KEY, String(newHighScore));
          return {
            ...p,
            locked: true,
            lastResult: 'wrong',
            highScore: newHighScore,
          };
        });
      }
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    // prevent modal-box scroll on arrow / space
    if (['ArrowLeft', 'ArrowRight', ' '].includes(e.key)) e.preventDefault();
    handleKey(e.key);
  };

  return (
    <ModalWrapper onClose={onClose} title="π Memory">
      <div
        ref={containerRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="outline-none">
        {/* Mode tabs */}
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
            onClick={() => {
              setMode('game');
              retry();
            }}>
            Game
          </a>
        </div>

        {/* Score */}
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

        {/* Digit viewport */}
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

        {/* Status */}
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

        {/* Retry */}
        {mode === 'game' && locked && (
          <div className="mb-4 flex justify-center">
            <button className="btn btn-error btn-sm" onClick={retry}>
              Retry
            </button>
          </div>
        )}

        {/* Numpad */}
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
