'use client';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { IconType } from 'react-icons';
import {
  FiCrosshair,
  FiGlobe,
  FiGrid,
  FiList,
  FiTrendingUp,
  FiType,
} from 'react-icons/fi';

export type Game = {
  name: string;
  slug: string;
  description: string;
  icon: IconType;
};

const games: Game[] = [
  {
    name: 'Guess the Country',
    slug: 'guess',
    description:
      'Three ways to play — identify the flag, its emoji, or which country it borders.',
    icon: FiCrosshair,
  },
  {
    name: 'Higher or Lower',
    slug: 'higher-or-lower',
    description:
      'Which country wins? Compare populations or passport strength and build your streak.',
    icon: FiTrendingUp,
  },
  {
    name: 'Country Connections',
    slug: 'nyt/connections',
    description:
      'Group sixteen countries into four hidden categories of four. Four mistakes allowed.',
    icon: FiGrid,
  },
  {
    name: 'Country Wordle',
    slug: 'nyt/wordle',
    description:
      'Guess the hidden country name in six tries — every answer is a country.',
    icon: FiType,
  },
  {
    name: 'Continents Sort',
    slug: 'sort/continents',
    description:
      'Drag fifteen countries into their continents — Africa, Europe, Asia, Oceania, North America, South America.',
    icon: FiList,
  },
];

const HomePage: NextPage = () => {
  const router = useRouter();
  return (
    <div className="flex w-full flex-col gap-y-4 px-4 py-6 sm:px-6 md:gap-y-8 lg:px-10">
      <div className="text-center">
        <h1 className="text-primary font-serif text-4xl font-bold tracking-tight">
          Countries Games
        </h1>
        <p className="text-base-content/60 mt-2 text-sm">
          Play games to learn about countries around the world
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <div
            key={game.slug}
            className="card border-base-300 bg-base-100 border transition-colors"
            data-testid={`card-${game.slug}`}>
            <div className="card-body">
              <div className="flex items-center gap-3">
                <span className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                  <game.icon aria-hidden="true" />
                </span>
                <h2 className="card-title text-lg">{game.name}</h2>
              </div>
              <p className="text-base-content/70 text-sm">{game.description}</p>
              <div className="card-actions">
                <button
                  type="button"
                  onClick={() => router.push(`/${game.slug}`)}
                  className="btn btn-primary btn-sm w-full"
                  data-testid={`open-${game.slug}`}>
                  Play
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
