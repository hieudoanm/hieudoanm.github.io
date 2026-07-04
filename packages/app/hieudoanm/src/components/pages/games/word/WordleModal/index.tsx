import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';
import { words } from '@hieudoanm.github.io/components/pages/games/word/data/wordle';
import { FC, useEffect, useRef, useState } from 'react';

const WORD_SET = new Set(words);
const MAX_ATTEMPTS: number = 6;

type LetterState = 'correct' | 'present' | 'absent';
interface Guess {
  word: string;
  result: LetterState[];
}

const newTarget = () => words[Math.floor(Math.random() * words.length)];

export const WordleModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [targetWord, setTargetWord] = useState(newTarget);
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const checkGuess = (guess: string): LetterState[] =>
    guess.split('').map((char, i) => {
      if (char === targetWord[i]) return 'correct';
      if (targetWord.includes(char)) return 'present';
      return 'absent';
    });

  const submitGuess = () => {
    if (currentGuess.length !== targetWord.length) {
      setMessage('Word length mismatch!');
      return;
    }
    if (!WORD_SET.has(currentGuess)) {
      setMessage('Not in word list');
      return;
    }

    const result = checkGuess(currentGuess);
    const newGuesses = [...guesses, { word: currentGuess, result }];
    setGuesses(newGuesses);
    setCurrentGuess('');
    setMessage('');

    if (currentGuess === targetWord) setMessage('🎉 You won!');
    else if (newGuesses.length >= MAX_ATTEMPTS)
      setMessage(`Game over! Word: ${targetWord.toUpperCase()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') submitGuess();
  };

  const startNewGame = () => {
    setGuesses([]);
    setCurrentGuess('');
    setMessage('');
    setTargetWord(newTarget());
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const isGameOver =
    guesses.at(-1)?.word === targetWord || guesses.length >= MAX_ATTEMPTS;

  const renderGrid = () =>
    Array.from({ length: MAX_ATTEMPTS }, (_, i) => {
      const guess = guesses[i]?.word || '';
      const result = guesses[i]?.result || [];

      return (
        <div key={i} className="flex gap-1">
          {Array.from({ length: targetWord.length }, (_, j) => {
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
            } else if (i === guesses.length) {
              text = currentGuess[j] || '';
              if (text) bg = 'bg-base-300';
            }

            return (
              <div
                key={j}
                className={`flex h-11 w-11 items-center justify-center rounded font-normal uppercase transition-colors duration-300 ${bg}`}>
                {text}
              </div>
            );
          })}
        </div>
      );
    });

  return (
    <FullScreen onClose={onClose} title="Wordle">
      <div className="mb-4 flex flex-col items-center gap-1">
        {renderGrid()}
      </div>

      {!isGameOver ? (
        <input
          ref={inputRef}
          type="text"
          className="input input-bordered input-sm mb-3 w-full text-center tracking-widest uppercase"
          maxLength={targetWord.length}
          value={currentGuess}
          onChange={(e) => setCurrentGuess(e.target.value.toLowerCase())}
          onKeyDown={handleKeyDown}
          placeholder={`${targetWord.length}-letter word`}
        />
      ) : (
        <div className="mb-3" />
      )}

      {message && (
        <p className="mb-3 text-center text-sm font-normal">{message}</p>
      )}

      <div className="flex justify-center gap-2">
        {!isGameOver && (
          <button className="btn btn-accent btn-sm" onClick={submitGuess}>
            Enter
          </button>
        )}
        <button className="btn btn-primary btn-sm" onClick={startNewGame}>
          New Game
        </button>
      </div>
    </FullScreen>
  );
};
WordleModal.displayName = 'WordleModal';
