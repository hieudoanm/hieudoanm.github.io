import Link from 'next/link';
import { FC } from 'react';
import { PiCoins } from 'react-icons/pi';
import { ECONOMICS_CATEGORIES } from './data';

export const EconomicsHub: FC = () => (
  <div className="mx-auto w-full max-w-5xl">
    <div className="mb-6 text-center">
      <h1 className="text-primary text-3xl font-bold tracking-tight">
        Economics games
      </h1>
      <p className="text-base-content/60 mt-2 text-sm">
        Explore game theory, markets, behavioral economics, and macro concepts.
      </p>
    </div>
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {ECONOMICS_CATEGORIES.map(({ category, label, description, href }) => (
        <Link
          key={href}
          href={href}
          data-testid={`economics-${category}`}
          className="card bg-base-100 border-base-300 hover:border-primary flex h-full flex-col items-center gap-2 border px-4 py-5 text-center transition-colors">
          <span className="bg-base-200 flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
            <PiCoins className="text-primary text-2xl" />
          </span>
          <span className="font-bold">{label}</span>
          <span className="text-base-content/60 text-xs">{description}</span>
        </Link>
      ))}
    </div>
  </div>
);
EconomicsHub.displayName = 'EconomicsHub';
