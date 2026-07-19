import type { FC } from 'react';

import type { TournamentSlug } from '@/data/touraments/tournament';
import { TOURNAMENT_CONFIG } from '@/data/touraments/tournament';
import { PageHeader } from '@/components/atoms/PageHeader';

export const Header: FC<{ year: number; tournament: TournamentSlug }> = ({
  year,
  tournament,
}) => {
  const label = TOURNAMENT_CONFIG[tournament].label;
  return (
    <PageHeader
      subtitle={`${year} ${label} Knockouts`}
      title="Knockout Bracket"
      description="Click a team to advance them to the next round. Build your bracket match by match."
    />
  );
};
