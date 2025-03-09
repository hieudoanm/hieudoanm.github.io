import { WidgetBrowser } from '@web/widgets/browser/WidgetBrowser';
import { WidgetBrowsers } from '@web/widgets/browser/WidgetBrowserS';

import { NextPage } from 'next';

const BrowserPage: NextPage = () => {
  return (
    <div className="h-[100vh] w-screen overflow-hidden bg-gray-100 md:h-screen">
      <div className="grid h-full grid-cols-2 md:grid-cols-2">
        <div className="col-span-1">
          <div className="flex h-full items-center justify-center">
            <WidgetBrowser />
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex h-full items-center justify-center">
            <WidgetBrowsers />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowserPage;
