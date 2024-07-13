import { useBrowser } from '@web/hooks/use-browser';
import { useScreenSize } from '@web/hooks/use-screen-size';
import { Layout } from '@web/layout';
import { NextPage } from 'next';

const ScreenPage: NextPage = () => {
  const { width, height } = useScreenSize();
  const browser = useBrowser();

  return (
    <Layout nav full>
      <div className='container mx-auto h-full'>
        <div className='h-full p-4 md:p-8'>
          <div className='flex h-full items-center justify-center'>
            <div className='relative aspect-video w-full rounded-xl border border-base-content md:w-[50%]'>
              <div className='absolute left-0 right-0 top-4 text-center'>
                {width}
              </div>
              <div className='absolute bottom-0 left-4 top-0 flex items-center'>
                {height}
              </div>
              <div className='flex h-full w-full items-center justify-center'>
                {browser}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ScreenPage;
