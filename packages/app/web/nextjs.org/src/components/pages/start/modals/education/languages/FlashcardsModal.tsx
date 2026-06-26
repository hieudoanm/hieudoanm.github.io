import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import words from '@hieudoanm.github.io/json/words.json';
import { FC, useEffect, useState } from 'react';

export interface FlashCard {
  language: string;
  front: string;
  back: string;
}

export const FlashcardsModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [language, setLanguage] = useState('korean');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [shuffledCards, setShuffledCards] = useState<FlashCard[]>([]);

  const allLanguages = [
    ...new Set((words as FlashCard[]).map((w) => w.language)),
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShuffledCards(
        [...(words as FlashCard[]).filter((w) => w.language === language)].sort(
          () => Math.random() - 0.5
        )
      );
      setCurrentIndex(0);
      setFlipped(false);
    }, 0);
    return () => clearTimeout(timeout);
  }, [language]);

  const nextCard = () => {
    setFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % shuffledCards.length);
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
      } else if (e.code === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shuffledCards]);

  const currentCard = shuffledCards[currentIndex];

  return (
    <ModalWrapper onClose={onClose} title="Flash Cards" size="max-w-md">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="select select-bordered select-sm mb-4 w-full capitalize">
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
            onClick={flipCard}>
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${flipped ? 'opacity-0' : 'opacity-100'}`}>
              <p className="text-center text-2xl font-semibold">
                {currentCard.front}
              </p>
            </div>
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${flipped ? 'opacity-100' : 'opacity-0'}`}>
              <p className="text-center text-2xl font-semibold">
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
            ← / → navigate · Space / Enter flip · Esc close
          </p>
        </>
      ) : (
        <p className="py-8 text-center text-sm opacity-50">
          No flashcards available for {language}.
        </p>
      )}
    </ModalWrapper>
  );
};
FlashcardsModal.displayName = 'FlashcardsModal';
