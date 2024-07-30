import { NextPage } from 'next';
import { FC } from 'react';
import { trpc } from '@web/utils/trpc';
import { DING_CHESS_USERNAME } from '@web/constants/chess.constants';
import { QueryTemplate } from '@web/templates/QueryTemplate';
import { Layout } from '@web/layout';
import { ChessInsights } from '@web/router/apps/chess/insights';

const InsightsQuery: FC = () => {
  const { isPending, error, data } = trpc.chess.insights.useQuery({
    username: DING_CHESS_USERNAME,
    timeClass: 'blitz',
    variant: 'chess',
  });

  return (
    <QueryTemplate isPending={isPending} error={error} noData={!data}>
      <Layout full nav>
        <div className='container mx-auto'>
          <div className='p-4 md:p-8'>
            <ChessInsights
              username={data?.username}
              avatar={data?.avatar}
              name={data?.name}
              insights={data}
            />
          </div>
        </div>
      </Layout>
    </QueryTemplate>
  );
};

const InsightsPage: NextPage = () => {
  return <InsightsQuery></InsightsQuery>;
};

export default InsightsPage;
