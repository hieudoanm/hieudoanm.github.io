import { createSignal, createEffect, onCleanup } from 'solid-js';
import palindromes from '@hieudoanm/json/palindrome/palindrome.json';
import emordnilaps from '@hieudoanm/json/palindrome/emordnilap.json';
import { ModalWrapper } from '@hieudoanm/components/atoms/ModalWrapper';

type PuzzleType = 'palindrome' | 'emordnilap';

type Puzzle = {
  letters: string[];
  answer: string;
  type: PuzzleType;
};

const wordToPuzzle = (answer: string, type: PuzzleType): Puzzle => ({
  letters: answer.split(''),
  answer,
  type,
});

const PUZZLES: Puzzle[] = [
  ...(palindromes as string[])
    .filter((i) => i.length > 5)
    .map((w) => wordToPuzzle(w, 'palindrome')),
  ...(emordnilaps as string[])
    .filter((i) => i.length > 5)
    .map((w) => wordToPuzzle(w, 'emordnilap')),
];

const TIMER_START = 30;

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const isPalindrome = (word: string): boolean =>
  word === word.split('').reverse().join('');

const isEmordnilap = (word: string): boolean => {
  const rev = word.split('').reverse().join('');
  const list = emordnilaps as string[];
  return rev !== word && (list.includes(word) || list.includes(rev));
};

type Definition = { partOfSpeech: string; definition: string };
type WordData = { word: string; definitions: Definition[] };

const fetchDefinition = async (word: string): Promise<WordData | null> => {
  try {
    const wordQuery = word.toLowerCase();
    const url = `https://raw.githubusercontent.com/hieudoanm/hieudoanm/refs/heads/master/packages/data/english/words/${wordQuery}.json`;
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
};

export const PalindromeModal = ({ onClose }: { onClose: () => void }) => {
  const [puzzleIndex, setPuzzleIndex] = createSignal(
    Math.floor(Math.random() * PUZZLES.length)
  );
  const [bank, setBank] = createSignal<{ l: string; id: number }[]>([]);
  const [placed, setPlaced] = createSignal<{ l: string; id: number }[]>([]);
  const [score, setScore] = createSignal(0);
  const [timer, setTimer] = createSignal(TIMER_START);
  const [feedback, setFeedback] = createSignal<{
    msg: string;
    ok: boolean;
  } | null>(null);
  const [definition, setDefinition] = createSignal<WordData | null>(null);
  const [defLoading, setDefLoading] = createSignal(false);
  const [solved, setSolved] = createSignal(false);
  const [solvedCount, setSolvedCount] = createSignal(0);
  let containerRef: HTMLDivElement | undefined;
  let timerRef: ReturnType<typeof setInterval> | null = null;

  const puzzle = () => PUZZLES[puzzleIndex()];

  const loadPuzzle = (idx: number) => {
    if (timerRef) clearInterval(timerRef);
    const p = PUZZLES[idx];
    setBank(shuffle(p.letters).map((l, i) => ({ l, id: i })));
    setPlaced([]);
    setTimer(TIMER_START);
    setFeedback({ msg: `Reverse it to check!`, ok: true });
    setDefinition(null);
    setSolved(false);
    timerRef = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(timerRef!);
          setFeedback({
            msg: `Time up! Answer: ${PUZZLES[idx].answer}`,
            ok: false,
          });
          setSolved(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  createEffect(() => {
    loadPuzzle(puzzleIndex());
    containerRef?.focus();
  });

  onCleanup(() => {
    if (timerRef) clearInterval(timerRef);
  });

  const nextPuzzle = () => {
    const next = (puzzleIndex() + 1) % PUZZLES.length;
    setPuzzleIndex(next);
  };

  const moveToDrop = (id: number) => {
    if (solved()) return;
    const idx = bank().findIndex((i) => i.id === id);
    if (idx === -1) return;
    setPlaced((p) => [...p, bank()[idx]]);
    setBank((b) => b.filter((i) => i.id !== id));
  };

  const moveToBank = (idx: number) => {
    if (solved()) return;
    setBank((b) => [...b, placed()[idx]]);
    setPlaced((p) => p.filter((_, i) => i !== idx));
  };

  const clearPlaced = () => {
    if (solved()) return;
    setBank((b) => [...b, ...placed()]);
    setPlaced([]);
  };

  const checkAnswer = () => {
    if (solved()) return;
    const word = placed()
      .map((i) => i.l)
      .join('')
      .toLowerCase();
    if (placed().length < puzzle().letters.length) {
      setFeedback({
        msg: `Use all ${puzzle().letters.length} letters!`,
        ok: false,
      });
      return;
    }
    if (word === puzzle().answer) {
      const pts = Math.max(10, timer() * 3);
      setScore((s) => s + pts);
      setSolvedCount((c) => c + 1);
      setFeedback({ msg: `Correct! +${pts} pts`, ok: true });
      setSolved(true);
      if (timerRef) clearInterval(timerRef);
      setDefLoading(true);
      fetchDefinition(word).then((data) => {
        setDefinition(data);
        setDefLoading(false);
      });
    } else if (puzzle().type === 'palindrome' && isPalindrome(word)) {
      setScore((s) => s + 5);
      setFeedback({
        msg: `Valid palindrome, but not the target word! +5 pts`,
        ok: true,
      });
      setSolved(true);
      if (timerRef) clearInterval(timerRef);
      setDefLoading(true);
      fetchDefinition(word).then((data) => {
        setDefinition(data);
        setDefLoading(false);
      });
    } else if (puzzle().type === 'emordnilap' && isEmordnilap(word)) {
      setScore((s) => s + 5);
      setFeedback({ msg: `Valid emordnilap! +5 pts`, ok: true });
      setSolved(true);
      if (timerRef) clearInterval(timerRef);
      setDefLoading(true);
      fetchDefinition(word).then((data) => {
        setDefinition(data);
        setDefLoading(false);
      });
    } else {
      setFeedback({
        msg: `"${word.toUpperCase()}" doesn't work — try again`,
        ok: false,
      });
    }
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      solved() ? nextPuzzle() : checkAnswer();
    }
    if (e.key === ' ') {
      e.preventDefault();
      if (!solved()) clearPlaced();
    }
    if (e.key.toLowerCase() === 'n' && solved()) nextPuzzle();
  };

  const typeBadgeClass = () =>
    puzzle().type === 'palindrome' ? 'badge-info' : 'badge-warning';
  const typeBadgeLabel = () =>
    puzzle().type === 'palindrome' ? 'Palindrome' : 'Emordnilap';
  const timerClass = () => (timer() <= 10 ? 'text-error' : 'text-base-content');

  return (
    <ModalWrapper onClose={onClose} title="🔤 Palindrome">
      <div
        ref={(el) => {
          containerRef = el;
        }}
        tabIndex={0}
        onKeyDown={onKeyDown}
        class="outline-none">
        {/* Header */}
        <div class="mb-4 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-xs opacity-50">Score</span>
            <span class="badge badge-neutral font-bold">{score()}</span>
          </div>
        </div>

        {/* Type + Timer */}
        <div class="mb-3 flex items-center justify-between">
          <span class={`badge ${typeBadgeClass()} text-xs`}>
            {typeBadgeLabel()}
          </span>
          <span class={`font-mono text-sm font-bold ${timerClass()}`}>
            {timer()}s
          </span>
        </div>

        {/* Letter bank */}
        <div class="bg-base-200 mb-2 flex min-h-14 flex-wrap items-center gap-2 rounded-xl p-3">
          {bank().map((item) => (
            <button
              key={item.id}
              onClick={() => moveToDrop(item.id)}
              class="btn btn-sm btn-outline h-10 w-10 p-0 text-base font-bold">
              {item.l.toUpperCase()}
            </button>
          ))}
          {bank().length === 0 && (
            <span class="text-base-content/30 text-xs">bank empty</span>
          )}
        </div>

        {/* Drop zone */}
        <div class="border-base-content/20 mb-3 flex min-h-14 flex-wrap items-center gap-2 rounded-xl border-2 border-dashed p-3">
          {placed().map((item, idx) => (
            <button
              key={item.id}
              onClick={() => moveToBank(idx)}
              class="btn btn-sm btn-info h-10 w-10 p-0 text-base font-bold">
              {item.l.toUpperCase()}
            </button>
          ))}
          {placed().length === 0 && (
            <span class="text-base-content/30 text-xs">
              click letters to place them here
            </span>
          )}
        </div>

        {/* Feedback */}
        <p
          class={`mb-3 min-h-5 text-center text-sm ${feedback()?.ok ? 'text-success' : 'text-error'}`}>
          {feedback()?.msg ?? ''}
        </p>

        {/* Actions */}
        {solved() ? (
          <button class="btn btn-primary btn-sm w-full" onClick={nextPuzzle}>
            Next puzzle →
          </button>
        ) : (
          <div class="grid grid-cols-3 gap-2">
            <button class="btn btn-primary btn-sm" onClick={checkAnswer}>
              Check
            </button>
            <button class="btn btn-secondary btn-sm" onClick={clearPlaced}>
              Clear
            </button>
            <button
              class="btn btn-ghost btn-sm opacity-50"
              onClick={() => {
                setFeedback({ msg: `Answer: ${puzzle().answer}`, ok: false });
                setSolved(true);
                if (timerRef) clearInterval(timerRef);
              }}>
              Skip
            </button>
          </div>
        )}

        {/* Definition */}
        {(defLoading() || definition()) && (
          <div class="bg-base-200 mt-3 rounded-xl p-3 text-sm">
            {defLoading() ? (
              <div class="flex items-center gap-2 opacity-60">
                <span class="loading loading-spinner loading-xs" /> Fetching
                definition...
              </div>
            ) : definition() ? (
              <div>
                <p class="mb-1 font-bold uppercase opacity-70">
                  {definition.word}
                </p>
                <ul class="space-y-1">
                  {definition.definitions.slice(0, 3).map((d, i) => (
                    <li key={i}>
                      <span class="italic opacity-60">{d.partOfSpeech}</span>
                      {': '}
                      {d.definition}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p class="opacity-50">No definition found</p>
            )}
          </div>
        )}

        {/* Progress */}
        <div class="mt-3 flex items-center justify-between">
          <p class="text-xs opacity-30">
            <kbd class="kbd kbd-xs">Enter</kbd> Check ·{' '}
            <kbd class="kbd kbd-xs">Space</kbd> Clear ·{' '}
            <kbd class="kbd kbd-xs">N</kbd> Next
          </p>
          <span class="text-xs opacity-30">{solvedCount()} solved</span>
        </div>
      </div>
    </ModalWrapper>
  );
};
