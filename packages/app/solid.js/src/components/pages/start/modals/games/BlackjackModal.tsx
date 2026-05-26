import { createSignal, onMount } from 'solid-js';
import { ModalWrapper } from '@hieudoanm/components/atoms/ModalWrapper';

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

export const BlackjackModal = ({ onClose }: { onClose: () => void }) => {
  const [deck, setDeck] = createSignal<Card[]>(newDeck());
  const [currentCard, setCurrentCard] = createSignal<Card | null>(null);
  const [count, setCount] = createSignal(0);
  const [reveal, setReveal] = createSignal(false);
  const [done, setDone] = createSignal(false);
  let containerRef: HTMLDivElement | undefined;

  onMount(() => {
    containerRef?.focus();
  });

  const dealCard = (currentDeck = deck()) => {
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
    containerRef?.focus();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (done()) return;
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

  const cardsLeft = () => deck().length;

  return (
    <ModalWrapper onClose={onClose} title="🃏 Card Counting">
      <div
        ref={(el) => (containerRef = el)}
        tabIndex={0}
        onKeyDown={onKeyDown}
        class="outline-none">
        {/* Card display */}
        <div class="bg-base-200 mb-4 flex flex-col items-center justify-center rounded-xl py-6">
          {currentCard() ? (
            <span
              class={`text-6xl leading-none font-black ${isRed(currentCard()!.suit) ? 'text-error' : 'text-base-content'}`}>
              {currentCard()!.rank}
              {currentCard()!.suit}
            </span>
          ) : (
            <span class="text-base-content/40 text-sm">
              {done() ? 'Deck finished' : 'Deal a card to start'}
            </span>
          )}
        </div>

        {/* Count reveal */}
        <div class="mb-4 flex items-center justify-between text-sm">
          <span class="opacity-50">Cards left: {cardsLeft()}</span>
          {reveal() ? (
            <span class="badge badge-info">
              Count: <strong class="ml-1">{count}</strong>
            </span>
          ) : (
            <span class="text-xs opacity-30">Press Space to reveal count</span>
          )}
        </div>

        {/* Buttons */}
        <div class="grid grid-cols-3 gap-2">
          <button
            class="btn btn-primary btn-sm"
            onClick={() => dealCard()}
            disabled={done()}>
            Deal
          </button>
          <button
            class="btn btn-secondary btn-sm"
            onClick={() => setReveal(true)}
            disabled={reveal}>
            Reveal
          </button>
          <button class="btn btn-accent btn-sm" onClick={resetDeck}>
            Reset
          </button>
        </div>

        <p class="mt-3 text-center text-xs opacity-40">
          <kbd class="kbd kbd-xs">Tab</kbd> Deal ·{' '}
          <kbd class="kbd kbd-xs">Space</kbd> reveal ·{' '}
          <kbd class="kbd kbd-xs">R</kbd> Reset
        </p>
      </div>
    </ModalWrapper>
  );
};
