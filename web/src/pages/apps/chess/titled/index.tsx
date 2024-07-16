import { Title } from '@prisma/client';
import { Layout } from '@web/layout';
import { QueryTemplate } from '@web/templates/QueryTemplate/QueryTemplate';
import { trpc } from '@web/utils/trpc';
import countries from '@web/json/countries.json';
import { NextPage } from 'next';
import Link from 'next/link';
import { FC } from 'react';
import { FaBoltLightning, FaClock, FaRocket } from 'react-icons/fa6';

const titles: Record<Title, string> = {
  GM: 'Grandmaster',
  IM: 'International Master',
  FM: 'FIDE Master',
  CM: 'Candidate Master',
  NM: 'National Master',
  WGM: 'Woman Grandmaster',
  WIM: 'Woman International Master',
  WFM: 'Woman FIDE Master',
  WCM: 'Woman Candidate Master',
  WNM: 'Woman National Master',
};

const TitledQuery: FC = () => {
  const { isPending, error, data } = trpc.chess.titled.useQuery({
    days: 7,
  });

  return (
    <QueryTemplate isPending={isPending} error={error} noData={!data}>
      <Layout full nav>
        <div className='container mx-auto'>
          <div className='p-4 md:p-8'>
            <div className='flex flex-col gap-y-4 md:gap-y-8'>
              <h1 className='text-xl md:text-4xl'>
                Titled ({data?.count.total ?? 0})
              </h1>
              <div className='join join-vertical w-full md:join-horizontal'>
                <select
                  id='title'
                  name='title'
                  className='join-item select select-bordered w-full'>
                  <option selected>Title</option>
                  {Object.entries(titles).map(([key, value]) => {
                    return (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    );
                  })}
                </select>
                <select
                  id='country'
                  name='country'
                  className='join-item select select-bordered w-full'>
                  <option selected>Country</option>
                  {countries.map(({ name: { common }, cca2 }) => {
                    return (
                      <option key={cca2} value={cca2}>
                        {common}
                      </option>
                    );
                  })}
                </select>
                <select
                  id='days'
                  name='days'
                  className='join-item select select-bordered w-full'>
                  <option selected>Timeframe</option>
                  <option value={7}>Week</option>
                  <option value={30}>Month</option>
                  <option value={90}>Quarter</option>
                  <option value={366}>Year</option>
                </select>
              </div>
              <h1 className='text-xl md:text-4xl'>Overall</h1>
              <div className='stats stats-vertical w-full rounded-2xl md:stats-horizontal'>
                <div className='stat'>
                  <div className='stat-figure text-primary'>
                    <FaClock className='text-xl md:text-4xl' />
                  </div>
                  <div className='stat-title'>Rapid</div>
                  <div className='stat-value'>
                    {data?.overall?.rapid.average ?? 0}
                  </div>
                  <div className='stat-desc'>
                    Best: {data?.overall?.rapid.max ?? 0}
                  </div>
                </div>
                <div className='stat'>
                  <div className='stat-figure text-primary'>
                    <FaBoltLightning className='text-xl md:text-4xl' />
                  </div>
                  <div className='stat-title'>Blitz</div>
                  <div className='stat-value'>
                    {data?.overall?.blitz.average ?? 0}
                  </div>
                  <div className='stat-desc'>
                    Best: {data?.overall?.blitz.max ?? 0}
                  </div>
                </div>
                <div className='stat'>
                  <div className='stat-figure text-primary'>
                    <FaRocket className='text-xl md:text-4xl' />
                  </div>
                  <div className='stat-title'>Bullet</div>
                  <div className='stat-value'>
                    {data?.overall?.bullet.average ?? 0}
                  </div>
                  <div className='stat-desc'>
                    Best: {data?.overall?.bullet.max ?? 0}
                  </div>
                </div>
              </div>
              <h1 className='text-xl md:text-4xl'>Title</h1>
              <div className='overflow-auto'>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th align='right'>Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { title: 'GM', count: data?.count.gm ?? 0 },
                      { title: 'IM', count: data?.count.im ?? 0 },
                      { title: 'FM', count: data?.count.fm ?? 0 },
                      { title: 'CM', count: data?.count.cm ?? 0 },
                      { title: 'NM', count: data?.count.nm ?? 0 },
                      { title: 'WGM', count: data?.count.wgm ?? 0 },
                      { title: 'WIM', count: data?.count.wim ?? 0 },
                      { title: 'WFM', count: data?.count.wfm ?? 0 },
                      { title: 'WCM', count: data?.count.wcm ?? 0 },
                      { title: 'WNM', count: data?.count.wnm ?? 0 },
                    ].map(({ title, count }) => {
                      return (
                        <tr key={title}>
                          <td>
                            <span className='badge badge-primary badge-outline'>
                              {title}
                            </span>
                          </td>
                          <td align='right'>{count}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <h1 className='text-xl md:text-4xl'>Countries</h1>
              <div className='overflow-auto'>
                <table className='table'>
                  <thead>
                    <tr>
                      <th align='center' className='w-4'>
                        #
                      </th>
                      <th>Country</th>
                      <th align='right'>Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.countries.map(
                      ({ countryCode, country, count }, index: number) => {
                        return (
                          <tr key={countryCode}>
                            <td align='center'>{index + 1}</td>
                            <td>{country}</td>
                            <td align='right'>{count}</td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
              <h1 className='text-xl md:text-4xl'>Leaderboard</h1>
              <div className='overflow-auto'>
                <table className='table'>
                  <thead>
                    <tr>
                      <th align='center' className='w-4'>
                        #
                      </th>
                      <th>Title</th>
                      <th>Country</th>
                      <th>Name</th>
                      <th align='right'>Rapid</th>
                      <th align='right'>Blitz</th>
                      <th align='right'>Bullet</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.leaderboard.map(
                      (
                        {
                          title,
                          countryCode,
                          country,
                          username,
                          name,
                          rapid_rating_last,
                          blitz_rating_last,
                          bullet_rating_last,
                        },
                        index: number
                      ) => {
                        const url = `https://www.chess.com/member/${username}`;
                        return (
                          <tr key={username}>
                            <td align='center'>{index + 1}</td>
                            <td>
                              <span className='badge badge-primary badge-outline'>
                                {title}
                              </span>
                            </td>
                            <td title={countryCode}>{country}</td>
                            <td>
                              <Link href={url} target='_blank'>
                                {name || username}
                              </Link>
                            </td>
                            <td align='right'>{rapid_rating_last}</td>
                            <td align='right'>{blitz_rating_last}</td>
                            <td align='right'>{bullet_rating_last}</td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </QueryTemplate>
  );
};

const TitledPage: NextPage = () => {
  return <TitledQuery />;
};

export default TitledPage;
