'use client';

import { Insights } from '@chess/common/types/chess';
import { ChessTitleAbbreviation } from '@prisma/client';
import { PlayerInsightsCalendar } from './components/PlayerInsightsCalendar';
import { PlayerInsightsGames } from './components/PlayerInsightsGames';
import { PlayerInsightsHeader } from './components/PlayerInsightsHeader';
import { PlayerInsightsOpenings } from './components/PlayerInsightsOpenings';
import { PlayerInsightsOpponents } from './components/PlayerInsightsOpponents';

export type PlayerInsightsTemplateProperties = {
  mobile?: boolean;
  name?: string;
  avatar?: string;
  username?: string;
  title?: ChessTitleAbbreviation;
  insights?: Insights;
};

export const PlayerInsightsTemplate: React.FC<
  PlayerInsightsTemplateProperties
> = ({
  mobile = false,
  name = '',
  username = '',
  avatar = '',
  title = '' as ChessTitleAbbreviation,
  insights = {} as Insights,
}) => {
  return (
    <div className="flex flex-col gap-y-6 py-6 md:gap-y-8 md:py-8 lg:gap-y-10 lg:py-10">
      {mobile ? (
        <></>
      ) : (
        <PlayerInsightsHeader
          name={name}
          title={title}
          avatar={avatar}
          username={username}
        />
      )}
      <PlayerInsightsGames insights={insights} />
      <PlayerInsightsOpenings insights={insights} />
      <PlayerInsightsCalendar insights={insights} />
      <PlayerInsightsOpponents insights={insights} />
    </div>
  );
};

PlayerInsightsTemplate.displayName = 'PlayerInsightsTemplate';
