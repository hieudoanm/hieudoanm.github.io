import type { FC } from 'react';

import { TOURNAMENT_CONFIG } from '../data/tournament';
import type { TournamentSlug } from '../data/tournament';

export const KnockoutLink: FC<{
  year: number;
  tournament?: TournamentSlug;
}> = ({ year, tournament = 'world-cup' }) => {
  const config = TOURNAMENT_CONFIG[tournament];
  return (
    <div className="mb-6 flex justify-center">
      <a
        href={`${config.hrefPrefix}/${year}/knock-out`}
        className="rounded-full border border-neutral-700 bg-neutral-800/60 px-4 py-1.5 text-xs font-medium text-amber-400 transition-colors hover:border-amber-400/60">
        View Knockout Bracket →
      </a>
    </div>
  );
};
