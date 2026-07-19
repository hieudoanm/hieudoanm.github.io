import type { FC, ReactNode } from 'react';
import Link from 'next/link';
import { PiArrowLineUpLeft } from 'react-icons/pi';
import type { GameItem } from '@/components/templates/GamesTemplate';

export const GameContainer: FC<{
  title: string;
  description: string;
  relatedGames: GameItem[];
  backHref: string;
  children: ReactNode;
}> = ({ title, description, relatedGames, backHref, children }) => (
  <div className="mx-auto w-full max-w-lg p-6 sm:p-8">
    <Link
      href={backHref}
      className="text-base-content/50 hover:text-primary mb-6 inline-flex items-center gap-1 text-xs transition-colors"
      data-testid="game-back">
      <PiArrowLineUpLeft className="text-sm" />
      Back
    </Link>

    <header className="mb-8">
      <p className="text-base-content/50 mb-2 text-xs tracking-[0.2em] uppercase">
        Game
      </p>
      <h1 className="mb-2 text-2xl font-bold">{title}</h1>
      <p className="text-base-content/50 text-sm">{description}</p>
    </header>

    {children}

    <section className="mt-12" aria-label="Related games">
      <p className="text-base-content/50 mb-3 text-xs tracking-[0.2em] uppercase">
        Related games
      </p>
      <div className="grid grid-cols-2 gap-3">
        {relatedGames.map((game) => (
          <Link
            key={game.href}
            href={game.href}
            className="border-base-300 bg-base-200 hover:bg-base-300 block rounded-2xl border p-4 transition-colors">
            <game.icon className="text-primary mb-2 text-2xl" />
            <h2 className="mb-1 text-sm font-bold">{game.name}</h2>
            <p className="text-base-content/50 text-xs">{game.description}</p>
          </Link>
        ))}
      </div>
    </section>
  </div>
);

GameContainer.displayName = 'GameContainer';
