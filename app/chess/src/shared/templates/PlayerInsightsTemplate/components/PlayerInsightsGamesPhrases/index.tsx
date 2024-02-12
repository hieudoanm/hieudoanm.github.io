import {
  RED_COLOR,
  GRAY_COLOR,
  TEAL_COLOR,
} from '@chess/common/constants/chess.constants';
import { Insights } from '@chess/common/types/chess';
import { CardHeading } from '@chess/shared/components/CardHeading';
import { FaXmarksLines } from 'react-icons/fa6';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export const PlayerInsightsGamesResultsByEndPhrase: React.FC<{
  insights: Insights;
}> = ({ insights = {} as Insights }) => {
  const data = (insights?.results?.endPhrases ?? []).map(
    ({ phrase, win = 0, draw = 0, loss = 0 }) => {
      const total: number = win + draw + loss;
      const winPercentage: number = Number.parseFloat(
        ((win / total) * 100).toFixed(2)
      );
      const lossPercentage: number = Number.parseFloat(
        ((loss / total) * 100).toFixed(2)
      );
      const drawPercentage: number = Number.parseFloat(
        (100 - winPercentage - lossPercentage).toFixed(2)
      );
      return { phrase, winPercentage, drawPercentage, lossPercentage };
    }
  );

  return (
    <div className="flex flex-col gap-y-4">
      <p className="text-base md:text-lg">
        Results for games that ended in the...
      </p>
      {data.length > 0 ? (
        <div className="aspect-video">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart width={1600} height={900} barCategoryGap={1} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="rating" />
              <YAxis />
              <Tooltip />
              <Bar
                isAnimationActive={false}
                fillOpacity={0.75}
                dataKey="lossPercentage"
                stackId="a"
                fill={RED_COLOR}
              />
              <Bar
                isAnimationActive={false}
                fillOpacity={0.75}
                dataKey="drawPercentage"
                stackId="a"
                fill={GRAY_COLOR}
              />
              <Bar
                isAnimationActive={false}
                fillOpacity={0.75}
                dataKey="winPercentage"
                stackId="a"
                fill={TEAL_COLOR}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export const PlayerInsightsGamesPhrases: React.FC<{ insights: Insights }> = ({
  insights = {} as Insights,
}: { insights: Insights }) => {
  return (
    <div className="card border border-gray-200 shadow">
      <div className="py-4 px-8 border-b">
        <CardHeading>
          <div className="flex items-center gap-x-2">
            <FaXmarksLines />
            Game Phases
          </div>
        </CardHeading>
      </div>
      <div className="card-body border-b">
        <p className="text-base md:text-lg">Games that ended in the...</p>
        <div className="aspect-video">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart />
          </ResponsiveContainer>
        </div>
      </div>
      <div className="card-body">
        <PlayerInsightsGamesResultsByEndPhrase insights={insights} />
      </div>
    </div>
  );
};

PlayerInsightsGamesPhrases.displayName = 'PlayerInsightsGamesPhrases';
