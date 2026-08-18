'use client';
import Link from 'next/link';

const games = [
  {
    name: 'Baccarat',
    slug: 'baccarat',
    description:
      'Bet player, banker or tie — full third-card rules on a six-deck shoe.',
  },
  {
    name: 'Card Counter',
    slug: 'card-counter',
    description:
      'Practice Hi-Lo card counting through a full 52-card deck, then reveal your count.',
  },
  {
    name: 'Poker Odds',
    slug: 'poker-odds',
    description:
      'Monte Carlo equity calculator for Texas Hold’em — up to nine players.',
  },
  {
    name: 'Over Under Seven',
    slug: 'over-under-seven',
    description: 'Two dice. Bet under 7, exactly 7 (5:1) or over 7.',
  },
  {
    name: 'Slot Machine',
    slug: 'slot-machine',
    description:
      'Three reels, six symbols — three of a kind pays up to 50× your bet.',
  },
  {
    name: 'Roulette',
    slug: 'roulette',
    description:
      'Single-zero wheel — red, black, even, odd, high, low or straight-up zero.',
  },
  {
    name: 'Craps',
    slug: 'craps',
    description:
      'Pass line: come-out 7/11 wins, set a point and roll it before a seven.',
  },
  {
    name: 'War',
    slug: 'war',
    description:
      'Higher card takes the stake — ties trigger wars that double the pot.',
  },
  {
    name: 'Keno',
    slug: 'keno',
    description:
      'Pick up to five spots from eighty, then watch twenty numbers draw.',
  },
  {
    name: 'Hi-Lo',
    slug: 'hi-lo',
    description:
      'Will the next card be higher or lower? Build streaks for 2:1 payouts.',
  },
] as const;

const HomePage = () => (
  <div className="mx-auto max-w-3xl p-6">
    <h1 className="mb-6 text-center text-3xl font-bold">Casino Games</h1>
    <div className="grid gap-4 sm:grid-cols-2">
      {games.map((game) => (
        <Link
          key={game.slug}
          href={`/${game.slug}`}
          className="card bg-base-200 shadow-sm transition-shadow hover:shadow-md"
          data-testid={`open-${game.slug}`}>
          <div className="card-body">
            <h2 className="card-title text-lg">{game.name}</h2>
            <p className="text-base-content/70 text-sm">{game.description}</p>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default HomePage;
