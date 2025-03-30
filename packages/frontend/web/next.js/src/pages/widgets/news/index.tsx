import { WidgetNews } from '@web/widgets/news/WidgetNews';
import { NextPage } from 'next';

const NewsPage: NextPage = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100">
      <div className="grid h-full grid-cols-1">
        <div className="col-span-1">
          <div className="flex h-full items-center justify-center">
            <WidgetNews />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
