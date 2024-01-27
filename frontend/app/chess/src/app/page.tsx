import { logger } from '@chess/common/libs/logger';
import { getInsights } from '@chess/common/services/insights.service';
import { Insights } from '@chess/common/types/chess';
import { Container } from '@chess/components/atoms/Container';
import { Hero } from '@chess/components/atoms/Hero';
import { InsightsTemplate } from '@chess/templates/InsightsTemplate';
import { NextPage } from 'next';

const HomePage: NextPage = async () => {
  const insights: Insights = await getInsights('hikaru');

  return (
    <>
      <Hero />
      <div id="demo">
        <Container>
          <div className="py-8">
            <InsightsTemplate insights={insights} />
          </div>
        </Container>
      </div>
    </>
  );
};

export default HomePage;
