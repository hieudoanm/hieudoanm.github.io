import { WidgetBrowser } from '~/widgets/browser/WidgetBrowser';
import { WidgetBrowsers } from '~/widgets/browser/WidgetBrowserS';

const BrowserPage = () => {
  return (
    <div class="h-[100vh] w-screen overflow-hidden bg-gray-100 md:h-screen">
      <div class="grid h-full grid-cols-1 md:grid-cols-2">
        <div class="col-span-1">
          <div class="flex h-full items-center justify-center">
            <WidgetBrowser />
          </div>
        </div>
        <div class="col-span-1">
          <div class="flex h-full items-center justify-center">
            <WidgetBrowsers />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowserPage;
