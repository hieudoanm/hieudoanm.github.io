import { logger } from '@chess/common/libs/logger';
import { CHESS_USERNAME } from '@chess/common/constants/chess.constants';
import { getInsights } from '@chess/common/services/insights.service';
import { Insights } from '@chess/common/types/chess';
import { Container } from '@chess/components/atoms/Container';
import { Layout } from '@chess/layout';
import { InsightsTemplate } from '@chess/templates/InsightsTemplate';
import { NextPage } from 'next';
import { useSearchParams } from 'next/navigation';

const InsightsPage: NextPage<{ params: { username: string } }> = async ({
  params,
}: {
  params: { username: string };
}) => {
  const username: string = params.username ?? CHESS_USERNAME;
  logger.info(`InsightsPage username=${username}`);

  const insights: Insights = await getInsights(username);

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

export default InsightsPage;
