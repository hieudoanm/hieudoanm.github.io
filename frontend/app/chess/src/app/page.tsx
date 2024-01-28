import { APP_NAME } from '@chess/common/constants/app.constants';
import { getInsights } from '@chess/common/services/insights.service';
import { Insights } from '@chess/common/types/chess';
import { Container } from '@chess/components/atoms/Container';
import { Hero } from '@chess/components/atoms/Hero';
import { InsightsTemplate } from '@chess/templates/PlayerInsightsTemplate';
import { NextPage } from 'next';
import Head from 'next/head';

const HomePage: NextPage = async () => {
  const insights: Insights = await getInsights('hikaru');

  return (
    <>
      <Head>
        <title>{APP_NAME} - Home</title>
      </Head>
      <Hero />
      <div id="demo">
        <Container>
          <div className="py-4 md:py-8">
            <InsightsTemplate insights={insights} />
          </div>
        </Container>
      </div>
    </>
  );
};

export default HomePage;
