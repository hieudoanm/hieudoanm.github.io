import { A } from '@solidjs/router';
import { useQuery } from '@tanstack/solid-query';

export const WidgetGoogleTrends = () => {
  const url: string =
    'https://trends.google.com/trends/hottrends/visualize/internal/data';
  const reverseProxyUrl = `https://hieudoanm-reverse-proxy.vercel.app/api?url=${url}`;

  const { isPending, error, data } = useQuery<Record<string, string[]>>(() => ({
    queryKey: ['google-trends'],
    queryFn: () => fetch(reverseProxyUrl).then((res) => res.json()),
  }));

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
    <div class="no-scrollbar aspect-square w-full max-w-60 overflow-auto rounded-3xl bg-gray-900 p-4 text-gray-100">
      {isPending && (
        <div class="flex h-full items-center justify-center">
          <p class="text-red-500">Loading</p>
        </div>
      )}
      {error && (
        <div class="flex h-full items-center justify-center">
          <p class="text-red-500">{error.message}</p>
        </div>
      )}
      {ranks.length > 0 && (
        <div class="flex flex-col gap-y-2">
          <div class="h-[1px] bg-white" />
          {ranks
            .filter(([, count]) => count > 5)
            .map(([query, count]) => {
              const url = `https://www.google.com/search?q=${encodeURI(query)}`;
              return (
                <>
                  <div
                    title={query}
                    class="flex items-center justify-between gap-x-2">
                    <div class="truncate text-red-500">
                      <A href={url} target="_blank">
                        {query}
                      </A>
                    </div>
                    <div>{count}</div>
                  </div>
                  <div class="h-[1px] bg-white" />
                </>
              );
            })}
        </div>
      )}
    </div>
  );
};
