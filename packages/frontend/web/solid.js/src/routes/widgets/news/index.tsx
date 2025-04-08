import { WidgetNews } from '~/widgets/news/WidgetNews';

const NewsPage = () => {
  return (
    <div class="h-screen w-screen overflow-hidden bg-gray-100">
      <div class="grid h-full grid-cols-1">
        <div class="col-span-1">
          <div class="flex h-full items-center justify-center">
            <WidgetNews />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
