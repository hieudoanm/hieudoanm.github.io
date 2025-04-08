import { useBrowser } from '~/hooks/window/navigator/use-browser';
import { useWindowSize } from '~/hooks/window/use-size';

const ScreenPage = () => {
  const { width = 0, height = 0 } = useWindowSize();
  const { browser } = useBrowser();

  return (
    <div class="h-screen w-screen">
      <div class="h-full p-4 md:p-8">
        <div class="flex h-full items-center justify-center">
          <div class="relative aspect-[3/4] w-full rounded-xl border bg-gray-900 text-gray-100 md:aspect-video md:w-[50%]">
            <div class="absolute top-4 right-0 left-0 text-center">{width}</div>
            <div class="absolute top-0 bottom-0 left-4 flex items-center">
              {height}
            </div>
            <div class="flex h-full w-full items-center justify-center">
              <p class="text-red-500">{browser}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const dynamic = 'force-static';

export default ScreenPage;
