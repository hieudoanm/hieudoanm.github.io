import { FC, useEffect, useRef, useState } from 'react';

type Card = { rank: string; suit: string; value: number };

const ranks = [
  'A',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
];
const suits = ['♥', '♦', '♣', '♠'];

const hiLoValue = (rank: string): number => {
  if (['2', '3', '4', '5', '6'].includes(rank)) return 1;
  if (['7', '8', '9'].includes(rank)) return 0;
  return -1;
};

const newDeck = (): Card[] => {
  const deck: Card[] = [];
  for (const suit of suits)
    for (const rank of ranks) deck.push({ rank, suit, value: hiLoValue(rank) });
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

const isRed = (suit: string) => suit === '♥' || suit === '♦';

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
    <dialog
      className="modal modal-open"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
      <div
        ref={containerRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="modal-box w-full max-w-sm outline-none">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2">
          ✕
        </button>

        <h3 className="mb-4 text-center text-lg font-bold">🃏 Card Counting</h3>

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

      <div className="modal-backdrop" onClick={onClose} />
    </dialog>
  );
};
