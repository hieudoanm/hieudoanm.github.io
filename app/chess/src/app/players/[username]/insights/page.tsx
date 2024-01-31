import { APP_NAME } from '@chess/common/constants/app.constants';
import { CHESS_USERNAME } from '@chess/common/constants/chess.constants';
import { logger } from '@chess/common/libs/logger';
import { getInsights } from '@chess/common/services/insights.service';
import { Insights } from '@chess/common/types/chess';
import { PlayerInsightsTemplate } from '@chess/templates/PlayerInsightsTemplate';
import { NextPage } from 'next';
import Head from 'next/head';

const InsightsPage: NextPage<{ params: { username: string } }> = async ({
  params,
}: {
  params: { username: string };
}) => {
  const username: string = params.username ?? CHESS_USERNAME;
  logger.info(`InsightsPage username=${username}`);

  const insights: Insights = await getInsights(username);

  return (
    <>
      <Head>
        <title>
          {APP_NAME} - {username} - Insights
        </title>
      </Head>
      <PlayerInsightsTemplate insights={insights} />
    </>
  );
};

// eslint-disable-next-line unicorn/prevent-abbreviations
export const generateStaticParams = () => {
  return [{ username: 'hikaru' }];
};

export default InsightsPage;
