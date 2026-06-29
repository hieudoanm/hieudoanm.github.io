import { FC, useEffect, useRef, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { Card, ranks, suits, hiLoValue, newDeck, isRed } from './utils';

export const BlackjackModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [deck, setDeck] = useState<Card[]>(newDeck());
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [count, setCount] = useState(0);
  const [reveal, setReveal] = useState(false);
  const [done, setDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  const dealCard = (currentDeck = deck) => {
    if (currentDeck.length === 0) {
      setDone(true);
      setCurrentCard(null);
      return;
    }
    const card = currentDeck[0];
    setDeck(currentDeck.slice(1));
    setCurrentCard(card);
    setCount((c) => c + card.value);
    setReveal(false);
  };

  const resetDeck = () => {
    setDeck(newDeck());
    setCurrentCard(null);
    setCount(0);
    setReveal(false);
    setDone(false);
    containerRef.current?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (done) return;
    if (e.key === 'Tab') {
      e.preventDefault();
      dealCard();
    }
    if (e.key === ' ') {
      e.preventDefault();
      setReveal(true);
    }
    if (e.key.toLowerCase() === 'r') resetDeck();
  };

  const cardsLeft = deck.length;

  return (
    <ModalWrapper onClose={onClose} title="🃏 Card Counting">
      <div
        ref={containerRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="outline-none">
        {/* Card display */}
        <div className="bg-base-200 mb-4 flex flex-col items-center justify-center rounded-xl py-6">
          {currentCard ? (
            <span
              className={`text-6xl leading-none font-black ${isRed(currentCard.suit) ? 'text-error' : 'text-base-content'}`}>
              {currentCard.rank}
              {currentCard.suit}
            </span>
          ) : (
            <span className="text-base-content/40 text-sm">
              {done ? 'Deck finished' : 'Deal a card to start'}
            </span>
          )}
        </div>

        {/* Count reveal */}
        <div className="mb-4 flex items-center justify-between text-sm">
          <span className="opacity-50">Cards left: {cardsLeft}</span>
          {reveal ? (
            <span className="badge badge-info">
              Count: <strong className="ml-1">{count}</strong>
            </span>
          ) : (
            <span className="text-xs opacity-30">
              Press Space to reveal count
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => dealCard()}
            disabled={done}>
            Deal
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setReveal(true)}
            disabled={reveal}>
            Reveal
          </button>
          <button className="btn btn-accent btn-sm" onClick={resetDeck}>
            Reset
          </button>
        </div>

        <p className="mt-3 text-center text-xs opacity-40">
          <kbd className="kbd kbd-xs">Tab</kbd> Deal ·{' '}
          <kbd className="kbd kbd-xs">Space</kbd> reveal ·{' '}
          <kbd className="kbd kbd-xs">R</kbd> Reset
        </p>
      </div>
    </ModalWrapper>
  );
};
BlackjackModal.displayName = 'BlackjackModal';
