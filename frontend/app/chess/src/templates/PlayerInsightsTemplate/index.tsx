'use client';

import { Insights } from '@chess/common/types/chess';
import { ChessDaysOfWeek } from '@chess/templates/PlayerInsightsTemplate/components/PlayerInsightsDaysOfWeek';
import { ChessGames } from '@chess/templates/PlayerInsightsTemplate/components/PlayerInsightsGames';
import { ChessOpponents } from '@chess/templates/PlayerInsightsTemplate/components/PlayerInsightsOpponents';
import { ChessResults } from '@chess/templates/PlayerInsightsTemplate/components/PlayerInsightsResults';
import { ChessTimeOfDays } from '@chess/templates/PlayerInsightsTemplate/components/PlayerInsightsTimeOfDays';

export const PlayerInsightsTemplate: React.FC<{ insights: Insights }> = ({
  insights = {} as Insights,
}) => {
  return (
    <div className="flex flex-col gap-y-4 py-4 md:gap-y-8 md:py-8">
      <ChessGames insights={insights} />
      <ChessResults insights={insights} />
      <ChessTimeOfDays insights={insights} />
      <ChessDaysOfWeek insights={insights} />
      <ChessOpponents insights={insights} />
    </div>
  );
};

PlayerInsightsTemplate.displayName = 'PlayerInsightsTemplate';
