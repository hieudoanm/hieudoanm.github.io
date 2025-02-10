import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

export const WidgetNewsTrends = () => {
  const url: string =
    'https://trends.google.com/trends/hottrends/visualize/internal/data';
  const reverseProxyUrl = `https://hieudoanm-reverse-proxy.vercel.app/api?url=${url}`;

  const { isPending, error, data } = useQuery<Record<string, string[]>>({
    queryKey: ['google-trends'],
    queryFn: () => fetch(reverseProxyUrl).then((res) => res.json()),
  });

  const queries: string[] = Object.values(data ?? {}).flat();

  const ranksMap = new Map();

  for (const query of queries) {
    if (ranksMap.has(query)) {
      const newRank = ranksMap.get(query) + 1;
      ranksMap.set(query, newRank);
    } else {
      ranksMap.set(query, 1);
    }
  }
  const ranks = [...ranksMap.entries()].sort((a, b) => b[1] - a[1]);

  return (
    <div className="no-scrollbar aspect-square w-full max-w-60 overflow-auto rounded-3xl bg-black p-4 text-white">
      {isPending && (
        <div className="flex h-full items-center justify-center">
          <p className="text-red-500">Loading</p>
        </div>
      )}
      {error && (
        <div className="flex h-full items-center justify-center">
          <p className="text-red-500">{error.message}</p>
        </div>
      )}
      {ranks.length > 0 && (
        <div className="flex flex-col gap-y-2">
          <div className="h-[1px] bg-white" />
          {ranks
            .filter(([, count]) => count > 5)
            .map(([query, count]) => {
              const url = `https://www.google.com/search?q=${encodeURI(query)}`;
              return (
                <>
                  <div
                    key={query}
                    className="flex items-center justify-between gap-x-2">
                    <div className="truncate text-red-500">
                      <Link href={url} target="_blank">
                        {query}
                      </Link>
                    </div>
                    <div>{count}</div>
                  </div>
                  <div className="h-[1px] bg-white" />
                </>
              );
            })}
        </div>
      )}
    </div>
  );
};
