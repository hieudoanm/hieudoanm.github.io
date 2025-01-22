import { WidgetBrowser } from '@nothing/widgets/browser/WidgetBrowser';
import { NextPage } from 'next';

const BrowserPage: NextPage = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100">
      <div className="flex h-full items-center justify-center">
        <WidgetBrowser />
      </div>
    </div>
  );
};

export default BrowserPage;
