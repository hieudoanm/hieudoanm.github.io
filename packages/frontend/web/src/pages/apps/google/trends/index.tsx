import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import Link from 'next/link';

const GoogleTrendsQuery = () => {
  const url: string =
    'https://trends.google.com/trends/hottrends/visualize/internal/data';
  const reverseProxyUrl = `https://hieudoanm-reverse-proxy.vercel.app/api?url=${url}`;

  const {
    isPending = false,
    error,
    data,
  } = useQuery<Record<string, string[]>>({
    queryKey: ['google-trends'],
    queryFn: () => fetch(reverseProxyUrl).then((res) => res.json()),
  });

  if (isPending) {
    return <p className="text-center">Loading</p>;
  }

  if (error) {
    return <p className="text-center">{error.message}</p>;
  }

  if (!data) {
    return <p className="text-center">No Data</p>;
  }

  return (
    <>
      {Object.keys(data).map((key: string) => {
        const queries: string[] = data[key] ?? [];
        return (
          <div key={key}>
            <h1>{key.replaceAll('_', ' ')}</h1>
            <div className="flex flex-wrap gap-2">
              {queries.map((query: string) => {
                const url = `https://www.google.com/search?q=${encodeURI(query)}`;
                return (
                  <Link
                    key={query}
                    href={url}
                    target="_blank"
                    className="underline decoration-dotted">
                    {query}
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

const GoogleTrendsPage: NextPage = () => {
  return (
    <div className="container mx-auto p-8">
      <GoogleTrendsQuery />
    </div>
  );
};

export default GoogleTrendsPage;
