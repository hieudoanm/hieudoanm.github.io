import { createSignal } from 'solid-js';
import { ModalWrapper } from '@hieudoanm/components/atoms/ModalWrapper';

const RANKS = [
  'A',
  'K',
  'Q',
  'J',
  'T',
  '9',
  '8',
  '7',
  '6',
  '5',
  '4',
  '3',
  '2',
] as const;
const SUITS = ['s', 'h', 'd', 'c'] as const;
const SUIT_DISPLAY: Record<string, string> = { s: '♠', h: '♥', d: '♦', c: '♣' };
const RANK_VAL: Record<string, number> = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
};
const HAND_NAMES = [
  'High card',
  'One pair',
  'Two pair',
  'Three of a kind',
  'Straight',
  'Flush',
  'Full house',
  'Four of a kind',
  'Straight flush',
];

type Rank = (typeof RANKS)[number];
type Suit = (typeof SUITS)[number];
type Card = { rank: Rank; suit: Suit };
type SlotKey = 'hero' | 'villain' | 'community';

interface Results {
  heroWin: number;
  villainWin: number;
  tie: number;
  heroHand: string;
  villainHand: string;
}

const cardKey = (c: Card) => c.rank + c.suit;

function newDeck(exclude: string[]): Card[] {
  const deck: Card[] = [];
  for (const rank of RANKS)
    for (const suit of SUITS)
      if (!exclude.includes(rank + suit)) deck.push({ rank, suit });
  return deck;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function handRank(cards: Card[]): number[] {
  const sorted = [...cards].sort((a, b) => RANK_VAL[b.rank] - RANK_VAL[a.rank]);
  const vals = sorted.map((c) => RANK_VAL[c.rank]);
  const suits = sorted.map((c) => c.suit);
  const rankCount: Record<number, number> = {};
  vals.forEach((v) => (rankCount[v] = (rankCount[v] || 0) + 1));
  const counts = Object.values(rankCount).sort((a, b) => b - a);
  const flush = suits.every((s) => s === suits[0]);
  const uniqueVals = [...new Set(vals)].sort((a, b) => b - a);

  let straight = false,
    straightHigh = 0;
  if (uniqueVals.length >= 5) {
    for (let i = 0; i <= uniqueVals.length - 5; i++) {
      if (uniqueVals[i] - uniqueVals[i + 4] === 4) {
        straight = true;
        straightHigh = uniqueVals[i];
        break;
      }
    }
    if (
      !straight &&
      uniqueVals.includes(14) &&
      [5, 4, 3, 2].every((v) => uniqueVals.includes(v))
    ) {
      straight = true;
      straightHigh = 5;
    }
  }

  const groupedVals = Object.entries(rankCount)
    .sort((a, b) => b[1] - a[1] || +b[0] - +a[0])
    .map((e) => +e[0]);

  if (flush && straight) {
    const fVals = sorted
      .filter((c) => c.suit === suits[0])
      .map((c) => RANK_VAL[c.rank])
      .sort((a, b) => b - a);
    let sfHigh = 0;
    for (let i = 0; i <= fVals.length - 5; i++)
      if (fVals[i] - fVals[i + 4] === 4) {
        sfHigh = fVals[i];
        break;
      }
    if (
      !sfHigh &&
      fVals.includes(14) &&
      [5, 4, 3, 2].every((v) => fVals.includes(v))
    )
      sfHigh = 5;
    if (sfHigh) return [8, sfHigh];
  }
  if (counts[0] === 4) return [7, groupedVals[0], groupedVals[1]];
  if (counts[0] === 3 && counts[1] === 2)
    return [6, groupedVals[0], groupedVals[1]];
  if (flush) {
    const fVals = sorted
      .filter((c) => c.suit === suits[0])
      .map((c) => RANK_VAL[c.rank])
      .sort((a, b) => b - a);
    return [5, ...fVals.slice(0, 5)];
  }
  if (straight) return [4, straightHigh];
  if (counts[0] === 3) return [3, groupedVals[0], ...groupedVals.slice(1, 3)];
  if (counts[0] === 2 && counts[1] === 2)
    return [2, groupedVals[0], groupedVals[1], groupedVals[2]];
  if (counts[0] === 2) return [1, groupedVals[0], ...groupedVals.slice(1, 4)];
  return [0, ...uniqueVals.slice(0, 5)];
}

function compareHands(a: number[], b: number[]): number {
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    if ((a[i] || 0) > (b[i] || 0)) return 1;
    if ((a[i] || 0) < (b[i] || 0)) return -1;
  }
  return 0;
}

function bestHand7(cards: Card[]): number[] {
  let best: number[] | null = null;
  for (let i = 0; i < 7; i++)
    for (let j = i + 1; j < 7; j++) {
      const five = cards.filter((_, idx) => idx !== i && idx !== j);
      const r = handRank(five);
      if (!best || compareHands(r, best) > 0) best = r;
    }
  return best!;
}

function runSimulation(
  hero: Card[],
  villain: Card[],
  community: Card[],
  N = 10000
): Results {
  const fixed = [...hero, ...villain, ...community].map(cardKey);
  let heroWin = 0,
    villainWin = 0,
    tie = 0;

  for (let sim = 0; sim < N; sim++) {
    const deck = shuffle(newDeck(fixed));
    const comm = [...community];
    let di = 0;
    while (comm.length < 5) comm.push(deck[di++]);
    const hr = bestHand7([...hero, ...comm]);
    const vr = bestHand7([...villain, ...comm]);
    const cmp = compareHands(hr, vr);
    if (cmp > 0) heroWin++;
    else if (cmp < 0) villainWin++;
    else tie++;
  }

  let heroHand = '',
    villainHand = '';
  if (community.length >= 3) {
    heroHand = HAND_NAMES[bestHand7([...hero, ...community])[0]] ?? '';
    villainHand = HAND_NAMES[bestHand7([...villain, ...community])[0]] ?? '';
  }

  return {
    heroWin: (heroWin / N) * 100,
    villainWin: (villainWin / N) * 100,
    tie: (tie / N) * 100,
    heroHand,
    villainHand,
  };
}

const isRed = (suit: string) => suit === 'h' || suit === 'd';

const CardChip = (props: {
  card: Card | null;
  onClick: () => void;
  onRemove: () => void;
}) => (
  <div
    onClick={props.onClick}
    class="border-base-300 bg-base-200 hover:border-base-content/30 relative flex h-14 w-10 cursor-pointer items-center justify-center rounded border-2 border-dashed text-center text-xs font-bold transition-colors">
    {props.card ? (
      <>
        <span
          class={isRed(props.card.suit) ? 'text-error' : 'text-base-content'}>
          {props.card.rank}
          {SUIT_DISPLAY[props.card.suit]}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            props.onRemove();
          }}
          class="bg-base-content text-base-100 absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] leading-none">
          ×
        </button>
      </>
    ) : (
      <span class="text-base-content/30 text-lg">+</span>
    )}
  </div>
);

const MeterBar = (props: { label: string; pct: number; color: string }) => (
  <div class="flex items-center gap-2 text-xs">
    <span class="w-8 opacity-50">{props.label}</span>
    <div class="bg-base-200 h-2 flex-1 overflow-hidden rounded-full">
      <div
        class={`h-2 rounded-full transition-all duration-500 ${props.color}`}
        style={{ width: `${props.pct}%` }}
      />
    </div>
    <span class="w-10 text-right font-mono font-bold">
      {props.pct.toFixed(1)}%
    </span>
  </div>
);

const CardPicker = (props: {
  used: string[];
  current: Card | null;
  onSelect: (c: Card) => void;
  onClose: () => void;
}) => {
  const [suit, setSuit] = createSignal<Suit | null>(null);

  return (
    <dialog class="modal modal-open" style={{ 'z-index': 1001 }}>
      <div class="modal-box w-72 p-4" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={props.onClose}
          class="btn btn-sm btn-circle btn-ghost absolute top-2 right-2">
          ✕
        </button>
        <p class="mb-3 text-sm font-bold">Pick a card</p>
        <p class="mb-1 text-xs opacity-50">Suit</p>
        <div class="mb-3 flex gap-2">
          {SUITS.map((s) => (
            <button
              key={s}
              onClick={() => setSuit(s)}
              class={`btn btn-sm flex-1 ${suit() === s ? 'btn-neutral' : 'btn-ghost'} ${isRed(s) ? 'text-error' : ''}`}>
              {SUIT_DISPLAY[s]}
            </button>
          ))}
        </div>
        <p class="mb-1 text-xs opacity-50">Rank</p>
        <div class="grid grid-cols-7 gap-1">
          {RANKS.map((r) => {
            const key = suit() ? r + suit() : null;
            const isUsed = key
              ? props.used.includes(key) &&
                (props.current ? cardKey(props.current) !== key : true)
              : false;
            return (
              <button
                key={r}
                disabled={!suit() || isUsed}
                onClick={() =>
                  suit() && props.onSelect({ rank: r, suit: suit()! })
                }
                class="btn btn-xs btn-ghost disabled:opacity-20">
                {r}
              </button>
            );
          })}
        </div>
        {!suit() && (
          <p class="mt-2 text-center text-xs opacity-40">Select a suit first</p>
        )}
      </div>
      <div class="modal-backdrop" onClick={props.onClose} />
    </dialog>
  );
};

export const PokerModal = (props: { onClose: () => void }) => {
  const [hero, setHero] = createSignal<(Card | null)[]>([null, null]);
  const [villain, setVillain] = createSignal<(Card | null)[]>([null, null]);
  const [community, setCommunity] = createSignal<(Card | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [picker, setPicker] = createSignal<{
    slot: SlotKey;
    idx: number;
  } | null>(null);
  const [results, setResults] = createSignal<Results | null>(null);
  const [simulating, setSimulating] = createSignal(false);

  const usedCards = () =>
    [...hero(), ...villain(), ...community()]
      .filter((c): c is Card => c !== null)
      .map(cardKey);

  const openPicker = (slot: SlotKey, idx: number) => {
    setResults(null);
    setPicker({ slot, idx });
  };

  const getCard = (slot: SlotKey, idx: number): Card | null =>
    slot === 'hero'
      ? hero()[idx]
      : slot === 'villain'
        ? villain()[idx]
        : community()[idx];

  const setCard = (slot: SlotKey, idx: number, card: Card | null) => {
    if (slot === 'hero')
      setHero((prev) => prev.map((c, i) => (i === idx ? card : c)));
    if (slot === 'villain')
      setVillain((prev) => prev.map((c, i) => (i === idx ? card : c)));
    if (slot === 'community')
      setCommunity((prev) => prev.map((c, i) => (i === idx ? card : c)));
  };

  const handleSelect = (card: Card) => {
    const p = picker();
    if (!p) return;
    setCard(p.slot, p.idx, card);
    setPicker(null);
  };

  const canSimulate = () => hero().every(Boolean) && villain().every(Boolean);

  const simulate = () => {
    if (!canSimulate()) return;
    setSimulating(true);
    setTimeout(() => {
      const result = runSimulation(
        hero() as Card[],
        villain() as Card[],
        community().filter(Boolean) as Card[]
      );
      setResults(result);
      setSimulating(false);
    }, 20);
  };

  const reset = () => {
    setHero([null, null]);
    setVillain([null, null]);
    setCommunity([null, null, null, null, null]);
    setResults(null);
  };

  const commCount = () => community().filter(Boolean).length;
  const streetLabel = () =>
    commCount() === 0
      ? ''
      : commCount() <= 3
        ? 'Flop'
        : commCount() === 4
          ? 'Flop · Turn'
          : 'Flop · Turn · River';

  return (
    <>
      <ModalWrapper onClose={props.onClose} title="Poker Odds">
        <div class="mb-3">
          <p class="mb-1 text-xs opacity-50">Your hand</p>
          <div class="flex gap-2">
            {[0, 1].map((i) => (
              <CardChip
                card={hero()[i]}
                onClick={() => openPicker('hero', i)}
                onRemove={() => {
                  setCard('hero', i, null);
                  setResults(null);
                }}
              />
            ))}
          </div>
        </div>

        <div class="mb-3">
          <p class="mb-1 text-xs opacity-50">Opponent's hand</p>
          <div class="flex gap-2">
            {[0, 1].map((i) => (
              <CardChip
                card={villain()[i]}
                onClick={() => openPicker('villain', i)}
                onRemove={() => {
                  setCard('villain', i, null);
                  setResults(null);
                }}
              />
            ))}
          </div>
        </div>

        <div class="mb-4">
          <p class="mb-1 flex items-center gap-2 text-xs opacity-50">
            Community
            {streetLabel() && (
              <span class="badge badge-xs badge-neutral">{streetLabel()}</span>
            )}
          </p>
          <div class="flex gap-1.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <CardChip
                card={community()[i]}
                onClick={() => openPicker('community', i)}
                onRemove={() => {
                  setCard('community', i, null);
                  setResults(null);
                }}
              />
            ))}
          </div>
        </div>

        <div class="mb-4 flex gap-2">
          <button
            class="btn btn-primary btn-sm flex-1"
            disabled={!canSimulate() || simulating()}
            onClick={simulate}>
            {simulating() ? 'Simulating…' : 'Calculate'}
          </button>
          <button class="btn btn-ghost btn-sm" onClick={reset}>
            Reset
          </button>
        </div>

        {results() && (
          <div class="bg-base-200 rounded-xl p-3">
            <div class="mb-3 grid grid-cols-2 gap-2 text-center">
              <div>
                <p class="text-xs opacity-50">You win</p>
                <p class="text-2xl font-black">
                  {results()!.heroWin.toFixed(1)}%
                </p>
                {results()!.heroHand && (
                  <p class="text-xs opacity-40">{results()!.heroHand}</p>
                )}
              </div>
              <div>
                <p class="text-xs opacity-50">Opponent wins</p>
                <p class="text-2xl font-black">
                  {results()!.villainWin.toFixed(1)}%
                </p>
                {results()!.villainHand && (
                  <p class="text-xs opacity-40">{results()!.villainHand}</p>
                )}
              </div>
            </div>
            <div class="flex flex-col gap-1.5">
              <MeterBar
                label="Win"
                pct={results()!.heroWin}
                color="bg-success"
              />
              <MeterBar label="Tie" pct={results()!.tie} color="bg-warning" />
              <MeterBar
                label="Lose"
                pct={results()!.villainWin}
                color="bg-error"
              />
            </div>
            <p class="mt-2 text-center text-xs opacity-30">
              10,000 Monte Carlo simulations
            </p>
          </div>
        )}

        {!canSimulate() && (
          <p class="text-center text-xs opacity-30">
            Add both hole cards for each player
          </p>
        )}
      </ModalWrapper>

      {picker() && (
        <CardPicker
          used={usedCards()}
          current={getCard(picker()!.slot, picker()!.idx)}
          onSelect={handleSelect}
          onClose={() => setPicker(null)}
        />
      )}
    </>
  );
};
