import { getTrends } from '@web/clients/google/google.client';
import { Badge, Trends } from '@web/components/Trends/Trends';
import {
  AFRICA,
  CENTRAL_EUROPE,
  EASTERN_EUROPE,
  EAST_ASIA,
  MIDDLE_EAST,
  NORTHERN_EUROPE,
  NORTH_AMERICA,
  OCEANIA,
  SOUTHERN_EUROPE,
  SOUTH_AMERICA,
  SOUTH_EAST_ASIA,
  WESTERN_EUROPE,
} from '@web/constants/news.constants';
import { useIsOnline } from '@web/hooks/use-is-online';
import { Layout } from '@web/layout';
import { QueryTemplate } from '@web/templates/QueryTemplate';
import { trpc } from '@web/utils/trpc';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { FC } from 'react';

const getRankings = (
  trends: Record<string, string[]>
): Record<string, number> => {
  const queries: string[] = Object.values(trends)
    .flat(1)
    .map((query) => query.toLowerCase());
  const queriesByCountMap: Map<string, number> = new Map<string, number>();
  for (const query of queries) {
    const oldCount: number = queriesByCountMap.get(query) ?? 0;
    queriesByCountMap.set(query, oldCount + 1);
  }
  const queriesByCount: Record<string, number> = Object.fromEntries(
    queriesByCountMap.entries()
  );

  return Object.entries(queriesByCount)
    .filter(([, value]) => value > 2)
    .sort(([, aValue], [, bValue]) => bValue - aValue)
    .reduce((r, [key, value]) => ({ ...r, [key.toString()]: value }), {});
};

const Rankings: FC<{ rankings: Record<string, number> }> = ({
  rankings = {},
}) => {
  return (
    <div className='pt-4'>
      <div className='flex flex-wrap items-center gap-4'>
        {Object.keys(rankings).map((query: string) => {
          const count: number = rankings[query];
          const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
          return (
            <Link key={query} href={url} target='_blank' className='block'>
              <Badge>
                <div className='flex items-center justify-between gap-x-2'>
                  <div>{query}</div>
                  <div className='inline-block h-4 w-4 rounded-full bg-base-content text-center text-[8px] leading-4 text-black'>
                    {count}
                  </div>
                </div>
              </Badge>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const TrendsTemplate: FC<{
  countries: string[];
  rankings: Record<string, number>;
  trends: Record<string, string[]>;
}> = ({ countries = [], rankings = {}, trends = {} }) => {
  return (
    <Layout nav>
      <div className='container mx-auto'>
        <div className='p-4 md:p-8'>
          <div className='flex flex-col gap-8'>
            <div className='join join-vertical w-full'>
              <div className='collapse join-item collapse-arrow border border-base-content'>
                <input type='radio' name='accordion-trends' defaultChecked />
                <div className='collapse-title border-b border-base-content capitalize'>
                  All ({Object.keys(rankings).length})
                </div>
                <div className='collapse-content'>
                  <Rankings rankings={rankings} />
                </div>
              </div>
              {countries
                .filter(
                  (country: string) =>
                    !AFRICA.includes(country) &&
                    !NORTH_AMERICA.includes(country) &&
                    !SOUTH_AMERICA.includes(country) &&
                    !EASTERN_EUROPE.includes(country) &&
                    !OCEANIA.includes(country) &&
                    !EAST_ASIA.includes(country) &&
                    !MIDDLE_EAST.includes(country) &&
                    !WESTERN_EUROPE.includes(country) &&
                    !NORTHERN_EUROPE.includes(country) &&
                    !CENTRAL_EUROPE.includes(country) &&
                    !SOUTHERN_EUROPE.includes(country) &&
                    !SOUTH_EAST_ASIA.includes(country)
                )
                .map((country: string, index: number) => {
                  const queries: string[] = trends[country];
                  queries.sort((a, b) => (a > b ? 1 : -1));

                  return (
                    <Trends
                      key={country}
                      country={country}
                      queries={queries}
                      defaultChecked={false}
                    />
                  );
                })}
            </div>
            <h1 className='text-xl'>North America ({NORTH_AMERICA.length})</h1>
            <div className='join join-vertical w-full'>
              {countries
                .filter((country: string) => NORTH_AMERICA.includes(country))
                .map((country: string, index: number) => {
                  const queries: string[] = trends[country];
                  queries.sort((a, b) => (a > b ? 1 : -1));

                  return (
                    <Trends
                      key={country}
                      country={country}
                      queries={queries}
                      defaultChecked={false}
                    />
                  );
                })}
            </div>
            <h1 className='text-xl'>South America ({SOUTH_AMERICA.length})</h1>
            <div className='join join-vertical w-full'>
              {countries
                .filter((country: string) => SOUTH_AMERICA.includes(country))
                .map((country: string, index: number) => {
                  const queries: string[] = trends[country];
                  queries.sort((a, b) => (a > b ? 1 : -1));

                  return (
                    <Trends
                      key={country}
                      country={country}
                      queries={queries}
                      defaultChecked={false}
                    />
                  );
                })}
            </div>
            <h1 className='text-xl'>
              Western Europe ({WESTERN_EUROPE.length})
            </h1>
            <div className='join join-vertical w-full'>
              {countries
                .filter((country: string) => WESTERN_EUROPE.includes(country))
                .map((country: string, index: number) => {
                  const queries: string[] = trends[country];
                  queries.sort((a, b) => (a > b ? 1 : -1));

                  return (
                    <Trends
                      key={country}
                      country={country}
                      queries={queries}
                      defaultChecked={false}
                    />
                  );
                })}
            </div>
            <h1 className='text-xl'>
              Northern Europe ({NORTHERN_EUROPE.length})
            </h1>
            <div className='join join-vertical w-full'>
              {countries
                .filter((country: string) => NORTHERN_EUROPE.includes(country))
                .map((country: string, index: number) => {
                  const queries: string[] = trends[country];
                  queries.sort((a, b) => (a > b ? 1 : -1));

                  return (
                    <Trends
                      key={country}
                      country={country}
                      queries={queries}
                      defaultChecked={false}
                    />
                  );
                })}
            </div>
            <h1 className='text-xl'>
              Central Europe ({CENTRAL_EUROPE.length})
            </h1>
            <div className='join join-vertical w-full'>
              {countries
                .filter((country: string) => CENTRAL_EUROPE.includes(country))
                .map((country: string, index: number) => {
                  const queries: string[] = trends[country];
                  queries.sort((a, b) => (a > b ? 1 : -1));

                  return (
                    <Trends
                      key={country}
                      country={country}
                      queries={queries}
                      defaultChecked={false}
                    />
                  );
                })}
            </div>
            <h1 className='text-xl'>
              Eastern Europe ({EASTERN_EUROPE.length})
            </h1>
            <div className='join join-vertical w-full'>
              {countries
                .filter((country: string) => EASTERN_EUROPE.includes(country))
                .map((country: string, index: number) => {
                  const queries: string[] = trends[country];
                  queries.sort((a, b) => (a > b ? 1 : -1));

                  return (
                    <Trends
                      key={country}
                      country={country}
                      queries={queries}
                      defaultChecked={false}
                    />
                  );
                })}
            </div>
            <h1 className='text-xl'>
              Southern Europe ({SOUTHERN_EUROPE.length})
            </h1>
            <div className='join join-vertical w-full'>
              {countries
                .filter((country: string) => SOUTHERN_EUROPE.includes(country))
                .map((country: string, index: number) => {
                  const queries: string[] = trends[country];
                  queries.sort((a, b) => (a > b ? 1 : -1));

                  return (
                    <Trends
                      key={country}
                      country={country}
                      queries={queries}
                      defaultChecked={false}
                    />
                  );
                })}
            </div>
            <h1 className='text-xl'>Oceania ({OCEANIA.length})</h1>
            <div className='join join-vertical w-full'>
              {countries
                .filter((country: string) => OCEANIA.includes(country))
                .map((country: string, index: number) => {
                  const queries: string[] = trends[country];
                  queries.sort((a, b) => (a > b ? 1 : -1));

                  return (
                    <Trends
                      key={country}
                      country={country}
                      queries={queries}
                      defaultChecked={false}
                    />
                  );
                })}
            </div>
            <h1 className='text-xl'>
              Southest Asia ({SOUTH_EAST_ASIA.length})
            </h1>
            <div className='join join-vertical w-full'>
              {countries
                .filter((country: string) => SOUTH_EAST_ASIA.includes(country))
                .map((country: string, index: number) => {
                  const queries: string[] = trends[country];
                  queries.sort((a, b) => (a > b ? 1 : -1));

                  return (
                    <Trends
                      key={country}
                      country={country}
                      queries={queries}
                      defaultChecked={false}
                    />
                  );
                })}
            </div>
            <h1 className='text-xl'>East Asia ({EAST_ASIA.length})</h1>
            <div className='join join-vertical w-full'>
              {countries
                .filter((country: string) => EAST_ASIA.includes(country))
                .map((country: string, index: number) => {
                  const queries: string[] = trends[country];
                  queries.sort((a, b) => (a > b ? 1 : -1));

                  return (
                    <Trends
                      key={country}
                      country={country}
                      queries={queries}
                      defaultChecked={false}
                    />
                  );
                })}
            </div>
            <h1 className='text-xl'>Middle East ({MIDDLE_EAST.length})</h1>
            <div className='join join-vertical w-full'>
              {countries
                .filter((country: string) => MIDDLE_EAST.includes(country))
                .map((country: string, index: number) => {
                  const queries: string[] = trends[country];
                  queries.sort((a, b) => (a > b ? 1 : -1));

                  return (
                    <Trends
                      key={country}
                      country={country}
                      queries={queries}
                      defaultChecked={false}
                    />
                  );
                })}
            </div>
            <h1 className='text-xl'>Africa ({AFRICA.length})</h1>
            <div className='join join-vertical w-full'>
              {countries
                .filter((country: string) => AFRICA.includes(country))
                .map((country: string, index: number) => {
                  const queries: string[] = trends[country];
                  queries.sort((a, b) => (a > b ? 1 : -1));

                  return (
                    <Trends
                      key={country}
                      country={country}
                      queries={queries}
                      defaultChecked={false}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const TrendsQuery: FC = () => {
  const { isPending, error, data: trends = {} } = trpc.trends.useQuery();

  const countries: string[] = Object.keys(trends);
  countries.sort((a, b) => (a > b ? 1 : -1));
  const rankings: Record<string, number> = getRankings(trends);

  return (
    <QueryTemplate
      isPending={isPending}
      noData={!trends && Object.keys(trends).length === 0}
      error={error}>
      <TrendsTemplate
        countries={countries}
        rankings={rankings}
        trends={trends}
      />
    </QueryTemplate>
  );
};

const TrendsPage: NextPage<{
  countries: string[];
  rankings: Record<string, number>;
  trends: Record<string, string[]>;
}> = ({ countries, rankings, trends }) => {
  const isOnline = useIsOnline();

  if (!isOnline) {
    return (
      <TrendsTemplate
        countries={countries}
        rankings={rankings}
        trends={trends}
      />
    );
  }

  return <TrendsQuery />;
};

export const getStaticProps: GetStaticProps<{
  countries: string[];
  rankings: Record<string, number>;
  trends: Record<string, string[]>;
}> = async () => {
  try {
    const trends = await getTrends();
    const countries: string[] = Object.keys(trends);
    countries.sort((a, b) => (a > b ? 1 : -1));
    const rankings: Record<string, number> = getRankings(trends);
    return { props: { countries, rankings, trends } };
  } catch {
    return { props: { countries: [], rankings: {}, trends: {} } };
  }
};

export default TrendsPage;
