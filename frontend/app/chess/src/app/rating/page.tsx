import { Container } from '@chess/components/atoms/Container';
import { Layout } from '@chess/layout';
import { NextPage } from 'next';

const RatingPage: NextPage = () => {
  return (
    <Layout>
      <Container>
        <div className="py-4 md:py-8" />
      </Container>
    </Layout>
  );
};

export default RatingPage;
