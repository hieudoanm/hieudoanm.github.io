import { useQuery } from '@tanstack/react-query';
import { useIsOnline } from '@web/hooks/use-is-online';
import { Layout } from '@web/layout';
import { NextPage } from 'next';
import Link from 'next/link';
import { FC } from 'react';

const groups: Record<string, Record<string, string>> = {
  atlassian: {
    access: 'https://access.status.atlassian.com/api/v2/status.json',
    analytics: 'https://analytics.status.atlassian.com/api/v2/status.json',
    atlas: 'https://atlas.status.atlassian.com/api/v2/status.json',
    bitbucket: 'https://bitbucket.status.atlassian.com/api/v2/status.json',
    compass: 'https://compass.status.atlassian.com/api/v2/status.json',
    confluence: 'https://confluence.status.atlassian.com/api/v2/status.json',
    developer: 'https://developer.status.atlassian.com/api/v2/status.json',
    jira: 'https://jira-software.status.atlassian.com/api/v2/status.json',
    opsgenie: 'https://opsgenie.status.atlassian.com/api/v2/status.json',
    partners: 'https://partners.status.atlassian.com/api/v2/status.json',
    support: 'https://support.status.atlassian.com/api/v2/status.json',
    trello: 'https://trello.status.atlassian.com/api/v2/status.json',
  },
  serverless: {
    netlify: 'https://www.netlifystatus.com/api/v2/status.json',
    vercel: 'https://www.vercel-status.com/api/v2/status.json',
  },
  saas: { github: 'https://www.githubstatus.com/api/v2/status.json' },
  paas: {
    render: 'https://status.render.com/api/v2/status.json',
    supabase: 'https://status.supabase.com/api/v2/status.json',
  },
  blockchain: {
    hedera: 'https://status.hedera.com/api/v2/status.json',
    solana: 'https://status.solana.com/api/v2/status.json',
  },
};

const Status: FC<{ service: string; url: string }> = ({
  service = '',
  url = '',
}) => {
  const { isPending, error, data } = useQuery<{
    status: { indicator: string };
  }>({
    queryKey: [`status-${service}`],
    queryFn: async () => await fetch(url).then((response) => response.json()),
  });

  if (isPending) {
    return (
      <div className='rounded-lg border border-base-content p-2 md:p-4'>
        <div className='flex items-center justify-between'>
          <span className='capitalize'>{service}</span>
          <span className='loading loading-infinity loading-lg'></span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='rounded-lg border border-base-content p-2 md:p-4'>
        <div className='flex items-center justify-between'>
          <span className='capitalize'>{service}</span>
          <span>{error.message}</span>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className='rounded-lg border border-base-content p-2 md:p-4'>
        <div className='flex items-center justify-between'>
          <span className='capitalize'>{service}</span>
          <span>No Data</span>
        </div>
      </div>
    );
  }

  const status: boolean = data.status.indicator === 'none';

  return (
    <div className='rounded-lg border border-base-content p-2 md:p-4'>
      <div className='flex items-center justify-between'>
        <Link href={url} target='_blank'>
          <span className='capitalize'>{service}</span>
        </Link>
        {status ? (
          <div className='h-4 w-4 rounded-full bg-green-500'></div>
        ) : (
          <div className='h-4 w-4 rounded-full bg-red-500'></div>
        )}
      </div>
    </div>
  );
};

const StatusPage: NextPage = () => {
  const isOnline: boolean = useIsOnline();

  if (!isOnline) {
    return (
      <Layout full nav>
        <div className='flex h-full items-center justify-center'>
          <div className='text-center text-xl uppercase'>
            Service is Offline
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout nav>
      <div className='container mx-auto'>
        <div className='p-4 md:p-8'>
          <div className='flex flex-col gap-y-4 md:gap-y-8'>
            {Object.keys(groups).map((group) => {
              const services: Record<string, string> = groups[group];
              return (
                <div key={group} className='flex flex-col gap-y-4 md:gap-y-8'>
                  <p className='capitalize'>{group}</p>
                  <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 xl:grid-cols-6'>
                    {Object.keys(services).map((service: string) => {
                      const url = services[service];
                      return (
                        <div key={service} className='col-span-1'>
                          <Status service={service} url={url} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StatusPage;
