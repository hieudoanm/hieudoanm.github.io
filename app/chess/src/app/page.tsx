import { APP_NAME } from '@chess/common/constants/app.constants';
import { CHESS_USERNAME } from '@chess/common/constants/chess.constants';
import { getInsights } from '@chess/common/services/insights.service';
import { Insights } from '@chess/common/types/chess';
import { PlayerInsightsTemplate } from '@chess/templates/PlayerInsightsTemplate';
import { NextPage } from 'next';
import Head from 'next/head';

const HomePage: NextPage = async () => {
  const insights: Insights = await getInsights(CHESS_USERNAME);

  return (
    <>
      <Head>
        <title>{APP_NAME} - Home</title>
      </Head>
      <PlayerInsightsTemplate insights={insights} />
    </>
  );
};

export default HomePage;
