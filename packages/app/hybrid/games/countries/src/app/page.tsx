'use client';
import Link from 'next/link';

const games = [
  {
    name: 'Country Wordle',
    slug: 'wordle',
    description:
      'Guess the hidden country name in six tries — every answer is a country.',
  },
  {
    name: 'Country Connections',
    slug: 'connections',
    description:
      'Group sixteen countries into four hidden categories of four. Four mistakes allowed.',
  },
  {
    name: 'Border Guesser',
    slug: 'border',
    description:
      'Which country does this one border? Pick the right neighbour from four options.',
  },
  {
    name: 'Continents Sort',
    slug: 'continents-sort',
    description:
      'Drag fifteen countries into their continents — Africa, Europe, Asia, Oceania, Americas.',
  },
  {
    name: 'Emoji Guesser',
    slug: 'emoji-guesser',
    description: 'Given a country name, pick its flag emoji from four options.',
  },
  {
    name: 'Flag Guesser',
    slug: 'flag-guesser',
    description:
      'Name the country from its flag emoji. Four options, one correct.',
  },
  {
    name: 'Higher or Lower',
    slug: 'higher-or-lower',
    description: 'Which country has the larger population? Build your streak.',
  },
] as const;

const HomePage = () => (
  <div className="mx-auto max-w-3xl p-6">
    <h1 className="mb-6 text-center text-3xl font-bold">Countries Games</h1>
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
