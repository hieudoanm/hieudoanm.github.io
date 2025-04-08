import { A } from '@solidjs/router';
import { useQuery } from '@tanstack/solid-query';

const GoogleTrendsQuery = () => {
  const url: string =
    'https://trends.google.com/trends/hottrends/visualize/internal/data';
  const reverseProxyUrl = `https://hieudoanm-reverse-proxy.vercel.app/api?url=${url}`;

  const {
    isPending = false,
    error,
    data,
  } = useQuery<Record<string, string[]>>(() => ({
    queryKey: ['google-trends'],
    queryFn: () => fetch(reverseProxyUrl).then((res) => res.json()),
  }));

  if (isPending) {
    return <p class="text-center">Loading</p>;
  }

  if (error) {
    return <p class="text-center">{error.message}</p>;
  }

  if (!data) {
    return <p class="text-center">No Data</p>;
  }

  return (
    <>
      {Object.keys(data).map((key: string) => {
        const queries: string[] = data[key] ?? [];
        return (
          <div title={key}>
            <h1>{key.replaceAll('_', ' ')}</h1>
            <div class="flex flex-wrap gap-2">
              {queries.map((query: string) => {
                const url = `https://www.google.com/search?q=${encodeURI(query)}`;
                return (
                  <A
                    title={query}
                    href={url}
                    target="_blank"
                    class="underline decoration-dotted">
                    {query}
                  </A>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

const GoogleTrendsPage = () => {
  return (
    <div class="container mx-auto p-8">
      <GoogleTrendsQuery />
    </div>
  );
};

export default GoogleTrendsPage;
