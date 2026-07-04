'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';
import { GAME_CATEGORY_LABELS } from './_maps';

const GAME_CATEGORIES = Object.entries(GAME_CATEGORY_LABELS).map(
  ([slug, label]) => ({
    slug,
    label,
    description: `${label} games`,
  })
);

const GamesPage: FC = () => {
  const router = useRouter();

  return (
    <FullScreen onClose={() => router.push('/')} title="Games">
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-4">
          {GAME_CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => router.push(`/games/${cat.slug}`)}
              className="group rounded-xl border border-neutral-700 bg-neutral-900/60 p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:border-amber-400/30 hover:bg-amber-900/10">
              <h2 className="font-serif text-xl font-bold tracking-tight text-stone-200 transition-colors duration-200 group-hover:text-amber-400">
                {cat.label}
              </h2>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-neutral-500">
                {cat.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </FullScreen>
  );
};

export default GamesPage;
