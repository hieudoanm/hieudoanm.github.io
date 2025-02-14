import { shortMonths } from '@nothing/constants';

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
    <div className="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-3xl bg-gray-900 text-gray-100">
      <div className="h-full w-full p-6">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between pb-2">
            <p className="text-xl font-black text-red-500">News</p>
            <p>
              {shortMonths[new Date().getMonth() + 1]} {new Date().getDate()}
            </p>
          </div>
          {articles.map(({ title, content, source }) => {
            return (
              <div key={title} className="grow border-t border-gray-700">
                <div className="flex h-full w-full items-center">
                  <div className="w-full">
                    <div className="flex w-full items-center justify-between">
                      <p className="text-sm font-bold">{title}</p>
                      <p className="text-xs">{source}</p>
                    </div>
                    <p className="w-44 truncate text-sm text-gray-500">
                      {content}
                    </p>
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
