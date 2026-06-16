import { PI } from '@hieudoanm.github.io/data/pi';
import { createMemo, createSignal, onMount } from 'solid-js';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

const DIGIT_WIDTH = 24;
const VIEWPORT_OFFSET = 4 * DIGIT_WIDTH;
const HIGH_SCORE_KEY = 'pi-high-score';

type Mode = 'practice' | 'game';

const getHighScore = () => {
  if (typeof window === 'undefined') return 0;
  const saved = Number(localStorage.getItem(HIGH_SCORE_KEY));
  return Number.isNaN(saved) ? 0 : saved;
};

export const PiModal = ({ onClose }: { onClose: () => void }) => {
  const digits = createMemo(() => PI.split(''));
  let containerRef: HTMLDivElement | undefined;

  const [index, setIndex] = createSignal(0);
  const [mode, setMode] = createSignal<Mode>('practice');
  const [gameState, setGameState] = createSignal<{
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
  const locked = () => gameState().locked;
  const lastResult = () => gameState().lastResult;
  const revealedIndex = () => gameState().revealedIndex;
  const highScore = () => gameState().highScore;

  onMount(() => {
    containerRef?.focus();
  });

  const retry = () => {
    setIndex(0);
    setGameState((p) => ({
      ...p,
      locked: false,
      lastResult: null,
      revealedIndex: null,
    }));
    containerRef?.focus();
  };

  const handleKey = (key: string) => {
    if (key === 'Escape') {
      onClose();
      return;
    }

    if (mode() === 'practice') {
      if (key === 'ArrowRight')
        setIndex((i) => Math.min(i + 1, digits().length - 1));
      if (key === 'ArrowLeft') setIndex((i) => Math.max(i - 1, 0));
      return;
    }

    if (mode() === 'game' && !locked() && /^[0-9.]$/.test(key)) {
      const correct = digits()[index()];
      setGameState((p) => ({ ...p, revealedIndex: index() }));

      if (key === correct) {
        setGameState((p) => ({ ...p, lastResult: 'correct' }));
        setTimeout(() => {
          setIndex((i) => Math.min(i + 1, digits().length - 1));
          setGameState((p) => ({
            ...p,
            lastResult: null,
            revealedIndex: null,
          }));
        }, 200);
      } else {
        setGameState((p) => {
          const newHighScore = Math.max(p.highScore, index());
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

  const onKeyDown = (e: KeyboardEvent) => {
    if (['ArrowLeft', 'ArrowRight', ' '].includes(e.key)) e.preventDefault();
    handleKey(e.key);
  };

  return (
    <ModalWrapper onClose={onClose} title="π Memory">
      <div
        ref={(el) => (containerRef = el)}
        tabIndex={0}
        onKeyDown={onKeyDown}
        class="outline-none">
        <div class="tabs tabs-boxed mb-4 w-full">
          <a
            role="tab"
            class={`tab flex-1 ${mode() === 'practice' ? 'tab-active' : ''}`}
            onClick={() => setMode('practice')}>
            Practice
          </a>
          <a
            role="tab"
            class={`tab flex-1 ${mode() === 'game' ? 'tab-active' : ''}`}
            onClick={() => {
              setMode('game');
              retry();
            }}>
            Game
          </a>
        </div>

        {mode() === 'game' && (
          <div class="mb-3 flex justify-center gap-3 text-xs opacity-70">
            <span>
              Score: <strong>{index()}</strong>
            </span>
            <span>•</span>
            <span>
              Best: <strong>{highScore()}</strong>
            </span>
          </div>
        )}

        <div class="mb-4 flex justify-center">
          <div class="border-accent rounded-md border border-dashed px-4 py-2">
            <div class="relative h-12 w-54 overflow-hidden">
              <div
                class="absolute top-0 flex h-12 transition-[left] duration-300 ease-out"
                style={{
                  left: `${VIEWPORT_OFFSET - index() * DIGIT_WIDTH}px`,
                }}>
                {digits().map((d, i) => {
                  const isCurrent = i === index();
                  const isPast = i < index();
                  const isRevealed = revealedIndex() === i;
                  const showDigit =
                    mode() === 'practice' || isPast || isRevealed;

                  return (
                    <div
                      key={i}
                      class={[
                        'flex h-12 w-6 items-center justify-center text-4xl transition-colors select-none',
                        isCurrent ? 'text-accent' : 'opacity-40',
                        lastResult() === 'wrong' && isCurrent
                          ? 'text-error'
                          : '',
                        lastResult() === 'correct' && isCurrent
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

        <div class="mb-4 text-center text-xs opacity-60">
          {mode() === 'practice' ? (
            <>
              <div>Use ← → arrow keys</div>
              <div>Index: {index()}</div>
            </>
          ) : locked() ? (
            <>
              <div class="text-error font-semibold">Mistake!</div>
              <div>You reached digit {index()}</div>
            </>
          ) : (
            <>
              <div>Type the next digit of π</div>
              <div>Index: {index()}</div>
            </>
          )}
        </div>

        {mode() === 'game' && locked() && (
          <div class="mb-4 flex justify-center">
            <button class="btn btn-error btn-sm" onClick={retry}>
              Retry
            </button>
          </div>
        )}

        {mode() === 'game' && !locked() && (
          <div class="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0].map((n) => (
              <button
                key={n}
                class="btn btn-secondary btn-sm"
                onClick={() => handleKey(String(n))}>
                {n}
              </button>
            ))}
          </div>
        )}

        <p class="mt-4 text-center text-xs opacity-40">
          {mode() === 'practice'
            ? '← → navigate · Esc close'
            : 'Type digits · Esc close'}
        </p>
      </div>
    </ModalWrapper>
  );
};
