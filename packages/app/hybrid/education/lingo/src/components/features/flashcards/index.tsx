'use client';

import { useQuery } from '@tanstack/react-query';
import { FC, useEffect, useMemo, useState } from 'react';
import { useProgress } from '@/hooks/useProgress';
import {
  filterByLanguage,
  FlashCard,
  getLanguages,
  shuffle,
  WORDS_URL,
} from './utils';

const XP_PER_TEN_CARDS = 10;

export const Flashcards: FC = () => {
  const [language, setLanguage] = useState('korean');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [shuffledCards, setShuffledCards] = useState<FlashCard[]>([]);
  const [reviewedCount, setReviewedCount] = useState(0);
  const { awardXp } = useProgress();

  const { isPending, data } = useQuery<FlashCard[]>({
    queryKey: ['words'],
    queryFn: async () => {
      const response = await fetch(WORDS_URL);
      if (!response.ok) throw new Error('Failed to load words');
      return (await response.json()) as FlashCard[];
    },
  });

  const words = useMemo(() => data ?? [], [data]);
  const allLanguages = useMemo(() => getLanguages(words), [words]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShuffledCards(shuffle(filterByLanguage(words, language)));
      setCurrentIndex(0);
      setFlipped(false);
    }, 0);
    return () => clearTimeout(timeout);
  }, [language, words]);

  const nextCard = () => {
    setFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % shuffledCards.length);
    setReviewedCount((prev) => {
      const count = prev + 1;
      if (count % 10 === 0) awardXp(XP_PER_TEN_CARDS);
      return count;
    });
  };

  const prevCard = () => {
    setFlipped(false);
    setCurrentIndex(
      (prev) => (prev - 1 + shuffledCards.length) % shuffledCards.length
    );
  };

  const flipCard = () => setFlipped((prev) => !prev);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'ArrowRight') nextCard();
      else if (e.code === 'ArrowLeft') prevCard();
      else if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        flipCard();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shuffledCards]);

  const currentCard = shuffledCards[currentIndex];

  if (isPending) {
    return (
      <p className="text-base-content/50 py-8 text-center text-sm">
        Loading flashcards...
      </p>
    );
  }

  return (
    <>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="select select-bordered select-sm mb-4 w-full capitalize"
        aria-label="Language"
        data-testid="language-select">
        {allLanguages.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>

      {currentCard ? (
        <>
          <div
            className="bg-base-200 relative mb-4 flex h-44 w-full cursor-pointer items-center justify-center rounded-xl shadow-inner transition-all duration-300"
            onClick={flipCard}
            data-testid="flashcard">
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${flipped ? 'opacity-0' : 'opacity-100'}`}>
              <p className="text-center text-2xl font-normal">
                {currentCard.front}
              </p>
            </div>
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${flipped ? 'opacity-100' : 'opacity-0'}`}>
              <p className="text-center text-2xl font-normal">
                {currentCard.back}
              </p>
            </div>
            <span className="absolute right-3 bottom-2 text-xs opacity-40">
              {flipped ? 'english' : language}
            </span>
          </div>

          <div className="mb-3 flex items-center justify-between">
            <button className="btn btn-outline btn-sm" onClick={prevCard}>
              Previous
            </button>
            <span className="text-xs opacity-50">
              {currentIndex + 1} / {shuffledCards.length}
            </span>
            <button className="btn btn-primary btn-sm" onClick={nextCard}>
              Next
            </button>
          </div>

          <p className="text-center text-xs opacity-40">
            ← / → navigate · Space / Enter flip
          </p>
        </>
      ) : (
        <p className="py-8 text-center text-sm opacity-50">
          No flashcards available for {language}.
        </p>
      )}
    </>
  );
};
Flashcards.displayName = 'Flashcards';
