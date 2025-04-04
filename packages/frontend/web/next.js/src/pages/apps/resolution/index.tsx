import { useBrowser } from '@web/hooks/window/navigator/use-browser';
import { useWindowSize } from '@web/hooks/window/use-size';
import { NextPage } from 'next';

const ScreenPage: NextPage = () => {
  const { width = 0, height = 0 } = useWindowSize();
  const { browser } = useBrowser();

  return (
    <div className="h-screen w-screen">
      <div className="h-full p-4 md:p-8">
        <div className="flex h-full items-center justify-center">
          <div className="relative aspect-[3/4] w-full rounded-xl border bg-gray-900 text-gray-100 md:aspect-video md:w-[50%]">
            <div className="absolute top-4 right-0 left-0 text-center">
              {width}
            </div>
            <div className="absolute top-0 bottom-0 left-4 flex items-center">
              {height}
            </div>
            <div className="flex h-full w-full items-center justify-center">
              <p className="text-red-500">{browser}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const dynamic = 'force-static';

export default ScreenPage;
