import { ModalWrapper } from '@hieudoanm/components/atoms/ModalWrapper';
import words from '@hieudoanm/json/words.json';
import { createSignal, createEffect, onCleanup } from 'solid-js';

export type FlashCard = {
  language: string;
  front: string;
  back: string;
};

export const FlashcardsModal = ({ onClose }: { onClose: () => void }) => {
  const [language, setLanguage] = createSignal('korean');
  const [currentIndex, setCurrentIndex] = createSignal(0);
  const [flipped, setFlipped] = createSignal(false);
  const [shuffledCards, setShuffledCards] = createSignal<FlashCard[]>([]);

  const allLanguages = [
    ...new Set((words as FlashCard[]).map((w) => w.language)),
  ];

  createEffect(() => {
    const timeout = setTimeout(() => {
      setShuffledCards(
        [
          ...(words as FlashCard[]).filter((w) => w.language === language()),
        ].sort(() => Math.random() - 0.5)
      );
      setCurrentIndex(0);
      setFlipped(false);
    }, 0);
    onCleanup(() => clearTimeout(timeout));
  });

  const nextCard = () => {
    setFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % shuffledCards().length);
  };

  const prevCard = () => {
    setFlipped(false);
    setCurrentIndex(
      (prev) => (prev - 1 + shuffledCards().length) % shuffledCards().length
    );
  };

  const flipCard = () => setFlipped((prev: boolean) => !prev);

  createEffect(() => {
    shuffledCards();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'ArrowRight') nextCard();
      else if (e.code === 'ArrowLeft') prevCard();
      else if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        flipCard();
      } else if (e.code === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    onCleanup(() => window.removeEventListener('keydown', handleKeyDown));
  });

  const currentCard = () => shuffledCards()[currentIndex()];

  return (
    <ModalWrapper onClose={onClose} title="Flash Cards" size="max-w-md">
      <select
        value={language()}
        onChange={(e) => setLanguage((e.target as HTMLSelectElement).value)}
        class="select select-bordered select-sm mb-4 w-full capitalize">
        {allLanguages.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>

      {currentCard() ? (
        <>
          <div
            class="bg-base-200 relative mb-4 flex h-44 w-full cursor-pointer items-center justify-center rounded-xl shadow-inner transition-all duration-300"
            onClick={flipCard}>
            <div
              class={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${flipped() ? 'opacity-0' : 'opacity-100'}`}>
              <p class="text-center text-2xl font-semibold">
                {currentCard().front}
              </p>
            </div>
            <div
              class={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${flipped() ? 'opacity-100' : 'opacity-0'}`}>
              <p class="text-center text-2xl font-semibold">
                {currentCard().back}
              </p>
            </div>
            <span class="absolute right-3 bottom-2 text-xs opacity-40">
              {flipped() ? 'english' : language()}
            </span>
          </div>

          <div class="mb-3 flex items-center justify-between">
            <button class="btn btn-outline btn-sm" onClick={prevCard}>
              Previous
            </button>
            <span class="text-xs opacity-50">
              {currentIndex() + 1} / {shuffledCards().length}
            </span>
            <button class="btn btn-primary btn-sm" onClick={nextCard}>
              Next
            </button>
          </div>

          <p class="text-center text-xs opacity-40">
            ← / → navigate · Space / Enter flip · Esc close
          </p>
        </>
      ) : (
        <p class="py-8 text-center text-sm opacity-50">
          No flashcards available for {language()}.
        </p>
      )}
    </ModalWrapper>
  );
};
