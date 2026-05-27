import { words } from '@hieudoanm.github.io/data/wordle';
import { createSignal, onMount } from 'solid-js';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

const WORD_SET = new Set(words);
const MAX_ATTEMPTS: number = 6;

type LetterState = 'correct' | 'present' | 'absent';
type Guess = { word: string; result: LetterState[] };

const newTarget = () => words[Math.floor(Math.random() * words.length)];

export const WordleModal = ({ onClose }: { onClose: () => void }) => {
  const [targetWord, setTargetWord] = createSignal(newTarget());
  const [guesses, setGuesses] = createSignal<Guess[]>([]);
  const [currentGuess, setCurrentGuess] = createSignal('');
  const [message, setMessage] = createSignal('');
  let inputRef: HTMLInputElement | undefined;

  onMount(() => {
    inputRef?.focus();
  });

  const checkGuess = (guess: string): LetterState[] =>
    guess.split('').map((char, i) => {
      if (char === targetWord()[i]) return 'correct';
      if (targetWord().includes(char)) return 'present';
      return 'absent';
    });

  const submitGuess = () => {
    if (currentGuess().length !== targetWord().length) {
      setMessage('Word length mismatch!');
      return;
    }
    if (!WORD_SET.has(currentGuess())) {
      setMessage('Not in word list');
      return;
    }

    const result = checkGuess(currentGuess());
    const newGuesses = [...guesses(), { word: currentGuess(), result }];
    setGuesses(newGuesses);
    setCurrentGuess('');
    setMessage('');

    if (currentGuess() === targetWord()) setMessage('🎉 You won!');
    else if (newGuesses.length >= MAX_ATTEMPTS)
      setMessage(`Game over! Word: ${targetWord().toUpperCase()}`);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') submitGuess();
  };

  const startNewGame = () => {
    setGuesses([]);
    setCurrentGuess('');
    setMessage('');
    setTargetWord(newTarget());
    setTimeout(() => inputRef?.focus(), 0);
  };

  const isGameOver =
    guesses().at(-1)?.word === targetWord() || guesses().length >= MAX_ATTEMPTS;

  const renderGrid = () =>
    Array.from({ length: MAX_ATTEMPTS }, (_, i) => {
      const guess = guesses()[i]?.word || '';
      const result = guesses()[i]?.result || [];

      return (
        <div key={i} class="flex gap-1">
          {Array.from({ length: targetWord().length }, (_, j) => {
            let bg = 'bg-base-200';
            let text = '';

            if (guess[j]) {
              text = guess[j];
              if (result[j] === 'correct')
                bg = 'bg-success text-success-content';
              else if (result[j] === 'present')
                bg = 'bg-warning text-warning-content';
              else if (result[j] === 'absent')
                bg = 'bg-neutral text-neutral-content';
            } else if (i === guesses().length) {
              text = currentGuess()[j] || '';
              if (text) bg = 'bg-base-300';
            }

            return (
              <div
                key={j}
                class={`flex h-11 w-11 items-center justify-center rounded font-bold uppercase transition-colors duration-300 ${bg}`}>
                {text}
              </div>
            );
          })}
        </div>
      );
    });

  return (
    <ModalWrapper onClose={onClose} title="Wordle" size="max-w-xs">
      <div class="mb-4 flex flex-col items-center gap-1">{renderGrid()}</div>

      {!isGameOver ? (
        <input
          ref={(el) => (inputRef = el)}
          type="text"
          class="input input-bordered input-sm mb-3 w-full text-center tracking-widest uppercase"
          maxLength={targetWord().length}
          value={currentGuess()}
          onChange={(e) => setCurrentGuess(e.target.value.toLowerCase())}
          onKeyDown={handleKeyDown}
          placeholder={`${targetWord().length}-letter word`}
        />
      ) : (
        <div class="mb-3" />
      )}

      {message() && (
        <p class="mb-3 text-center text-sm font-semibold">{message()}</p>
      )}

      <div class="flex justify-center gap-2">
        {!isGameOver && (
          <button class="btn btn-accent btn-sm" onClick={submitGuess}>
            Enter
          </button>
        )}
        <button class="btn btn-primary btn-sm" onClick={startNewGame}>
          New Game
        </button>
      </div>
    </ModalWrapper>
  );
};
