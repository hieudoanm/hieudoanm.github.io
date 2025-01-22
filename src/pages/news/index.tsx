import { WidgetNews } from '@nothing/widgets/news/WidgetNews';
import { NextPage } from 'next';

const NewsPage: NextPage = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100">
      <div className="flex h-full items-center justify-center">
        <WidgetNews />
      </div>
    </div>
  );
};

export default NewsPage;
