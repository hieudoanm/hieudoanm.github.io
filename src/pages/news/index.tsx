import { shortMonths } from '@nothing/constants';
import { NextPage } from 'next';

const NewsPage: NextPage = () => {
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
    <div className="h-screen w-screen overflow-hidden bg-gray-100">
      <div className="flex h-full items-center justify-center">
        <div className="shadow-3xl relative aspect-square w-72 overflow-hidden rounded-3xl bg-black text-white">
          <div className="h-full w-full p-8">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between pb-2">
                <p className="text-xl font-black">News</p>
                <p>
                  {shortMonths[new Date().getMonth() + 1]}{' '}
                  {new Date().getDate()}
                </p>
              </div>
              {articles.map(({ title, content, source }) => {
                return (
                  <div key={title} className="grow border-t border-gray-700">
                    <div className="flex h-full w-full items-center">
                      <div className="w-full">
                        <div className="flex w-full items-center justify-between">
                          <p className="font-bold">{title}</p>
                          <p className="text-sm">{source}</p>
                        </div>
                        <p className="w-full truncate text-gray-500">
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
      </div>
    </div>
  );
};

export default NewsPage;
