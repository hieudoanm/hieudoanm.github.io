import { shortMonths } from '~/constants';

export const WidgetNews = () => {
  const articles = [
    {
      title: 'Lorem ipsum',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut. ',
      source: 'CNN',
    },
    {
      title: 'Lorem ipsum',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut. ',
      source: 'CNBC',
    },
    {
      title: 'Lorem ipsum',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut. ',
      source: 'BBC',
    },
  ];

  return (
    <div class="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-gray-900 text-gray-100">
      <div class="h-full w-full p-6">
        <div class="flex h-full flex-col">
          <div class="flex items-center justify-between pb-2">
            <p class="text-xl font-black text-red-500">News</p>
            <p>
              {shortMonths[new Date().getMonth() + 1]} {new Date().getDate()}
            </p>
          </div>
          {articles.map(({ title, content, source }) => {
            return (
              <div title={title} class="grow border-t border-gray-700">
                <div class="flex h-full w-full items-center">
                  <div class="w-full">
                    <div class="flex w-full items-center justify-between">
                      <p class="text-sm font-bold">{title}</p>
                      <p class="text-xs">{source}</p>
                    </div>
                    <p class="w-44 truncate text-sm text-gray-500">{content}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
