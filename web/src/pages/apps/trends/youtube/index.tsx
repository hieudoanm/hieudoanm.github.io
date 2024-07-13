import { useIsOnline } from '@web/hooks/use-is-online';
import { Layout } from '@web/layout';
import { NextPage } from 'next';

export const YouTubePage: NextPage = () => {
  const isOnline: boolean = useIsOnline();

  if (!isOnline) {
    return (
      <Layout full nav>
        <div className='flex h-full items-center justify-center'>
          <div className='text-center text-xl uppercase'>
            Service is Offline
          </div>
        </div>
      </Layout>
    );
  }

  return <Layout nav></Layout>;
};

export default YouTubePage;
