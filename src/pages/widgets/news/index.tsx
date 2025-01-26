import { WidgetNews } from '@nothing/widgets/news/WidgetNews';
import { WidgetNewsTrends } from '@nothing/widgets/news/WidgetNewsTrends';
import { NextPage } from 'next';

const NewsPage: NextPage = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100">
      <div className="grid h-full grid-cols-1 md:grid-cols-2">
        <div className="col-span-1">
          <div className="flex h-full items-center justify-center">
            <WidgetNews />
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex h-full items-center justify-center">
            <WidgetNewsTrends />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
