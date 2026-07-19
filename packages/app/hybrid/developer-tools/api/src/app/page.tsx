import { ApiClient } from '@/components/organisms/ApiClient';
import { PageTransition } from '@/components/templates/PageTransition';
import { NextPage } from 'next';

const HomePage: NextPage = () => (
  <div className="flex h-full flex-col">
    <PageTransition>
      <ApiClient />
    </PageTransition>
  </div>
);

export default HomePage;
