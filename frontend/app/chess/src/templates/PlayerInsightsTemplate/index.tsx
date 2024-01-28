'use client';

import { Insights } from '@chess/common/types/chess';
import { ChessDaysOfWeek } from '@chess/components/organisms/ChessDaysOfWeek';
import { ChessGames } from '@chess/components/organisms/ChessGames';
import { ChessOpponents } from '@chess/components/organisms/ChessOpponents';
import { ChessResults } from '@chess/components/organisms/ChessResults';
import { ChessTimeOfDays } from '@chess/components/organisms/ChessTimeOfDays';

export const PlayerInsightsTemplate: React.FC<{ insights: Insights }> = ({
  insights = {} as Insights,
}) => {
  return (
    <div className="flex flex-col gap-y-4 md:gap-y-8">
      <ChessGames insights={insights} />
      <ChessResults insights={insights} />
      <ChessTimeOfDays insights={insights} />
      <ChessDaysOfWeek insights={insights} />
      <ChessOpponents insights={insights} />
    </div>
  );
};

PlayerInsightsTemplate.displayName = 'PlayerInsightsTemplate';
