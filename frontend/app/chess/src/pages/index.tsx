import { logger } from '@chess/common/libs/logger';
import { getInsights } from '@chess/common/services/insights.service';
import { Container } from '@chess/components/atoms/Container';
import { Hero } from '@chess/components/atoms/Hero';
import { Layout } from '@chess/layout';
import { InsightsTemplate } from '@chess/templates/InsightsTemplate';
import { Insights } from '@chess/types/chess';
import { GetServerSideProps, NextPage } from 'next';

const HomePage: NextPage<{ insights: Insights }> = ({ insights }) => {
  return (
    <Layout>
      <Hero />
      <div id="demo">
        <Container>
          <div className="py-8">
            <InsightsTemplate insights={insights} />
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const insights: Insights = await getInsights('hikaru');
    return { props: { insights } };
  } catch (error) {
    logger.error(`getServerSideProps error=${error}`);
    return { props: { insights: {} } };
  }
};

export default HomePage;
