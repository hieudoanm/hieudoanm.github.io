import { logger } from '@chess/common/libs/logger';
import { getInsights } from '@chess/common/services/insights.service';
import { Container } from '@chess/components/atoms/Container';
import { Layout } from '@chess/layout';
import { InsightsTemplate } from '@chess/templates/InsightsTemplate';
import { Insights } from '@chess/types/chess';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';

const InsightsPage: NextPage<{ insights: Insights }> = ({ insights }) => {
  return (
    <Layout>
      <Container>
        <div className="py-8">
          <InsightsTemplate insights={insights} />
        </div>
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const username: string = context.query.username?.toString() ?? '';
    const insights: Insights = await getInsights(username);
    return { props: { insights } };
  } catch (error) {
    logger.error(`getServerSideProps error=${error}`);
    return { props: { insights: {} } };
  }
};

export default InsightsPage;
