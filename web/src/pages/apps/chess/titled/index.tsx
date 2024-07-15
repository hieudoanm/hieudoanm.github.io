import { Layout } from '@web/layout';
import { QueryTemplate } from '@web/templates/QueryTemplate/QueryTemplate';
import { trpc } from '@web/utils/trpc';
import { NextPage } from 'next';
import Link from 'next/link';
import { FC } from 'react';
import { FaBoltLightning, FaClock, FaRocket } from 'react-icons/fa6';

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
              <h1 className='text-4xl'>Players ({data?.count.total ?? 0})</h1>
              <div className='join w-full'>
                <select
                  id='title'
                  name='title'
                  className='join-item select select-bordered w-full'>
                  <option disabled selected>
                    Title
                  </option>
                  <option value='GM'>Grandmaster</option>
                  <option value='IM'>International Master</option>
                  <option value='FM'>FIDE Master</option>
                  <option value='CM'>Candidate Master</option>
                  <option value='NM'>National Master</option>
                  <option value='WGM'>Woman Grandmaster</option>
                  <option value='WIM'>Woman International Master</option>
                  <option value='WFM'>Woman FIDE Master</option>
                  <option value='WCM'>Woman Candidate Master</option>
                  <option value='WNM'>Woman National Master</option>
                </select>
                <select
                  id='country'
                  name='country'
                  className='join-item select select-bordered w-full'>
                  <option disabled selected>
                    Country
                  </option>
                </select>
                <select
                  id='days'
                  name='days'
                  className='join-item select select-bordered w-full'>
                  <option disabled selected>
                    Timeframe
                  </option>
                  <option value={7}>Week</option>
                  <option value={30}>Month</option>
                  <option value={90}>Quarter</option>
                  <option value={366}>Year</option>
                </select>
              </div>
              <h1 className='text-4xl'>Overall</h1>
              <div className='stats w-full rounded-2xl'>
                <div className='stat'>
                  <div className='stat-figure text-primary'>
                    <FaClock className='text-4xl' />
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
                    <FaBoltLightning className='text-4xl' />
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
                    <FaRocket className='text-4xl' />
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
              <h1 className='text-4xl'>Title</h1>
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
                          <td>{title}</td>
                          <td align='right'>{count}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <h1 className='text-4xl'>Countries</h1>
              <div className='overflow-auto'>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Country</th>
                      <th align='right'>Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.countries.map(({ countryCode, country, count }) => {
                      return (
                        <tr key={countryCode}>
                          <td>{country}</td>
                          <td align='right'>{count}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <h1 className='text-4xl'>Leaderboard</h1>
              <div className='overflow-auto'>
                <table className='table'>
                  <thead>
                    <tr>
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
                      ({
                        title,
                        countryCode,
                        country,
                        username,
                        name,
                        rapid_rating_last,
                        blitz_rating_last,
                        bullet_rating_last,
                      }) => {
                        const url = `https://www.chess.com/member/${username}`;
                        return (
                          <tr key={username}>
                            <td>{title}</td>
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
