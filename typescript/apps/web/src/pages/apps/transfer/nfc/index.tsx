import { Layout } from '@web/layout';
import { NextPage } from 'next';

export const NFCPage: NextPage = () => {
  if (typeof NDEFReader === 'undefined') {
    return (
      <Layout full nav>
        <div className='flex h-full items-center justify-center'>
          <div className='text-center text-xl uppercase'>
            Service is Unavailable
          </div>
        </div>
      </Layout>
    );
  }

  return <Layout nav></Layout>;
};

export default NFCPage;
