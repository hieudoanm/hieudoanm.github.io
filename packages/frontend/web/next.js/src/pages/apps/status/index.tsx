import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { FC } from 'react';

const Status: FC<{ service: string; url: string }> = ({
  service = '',
  url = '',
}) => {
  const {
    isPending = false,
    error = null,
    data,
  } = useQuery<{
    status: { indicator: string };
  }>({
    queryKey: [service],
    queryFn: () => fetch(url).then((res) => res.json()),
  });

  return (
    <div className="w-full rounded-full border border-gray-800 px-4 py-2">
      <div className="flex items-center justify-between">
        <p className="capitalize">
          <Link
            href={url}
            target="_blank"
            className="truncate font-medium whitespace-nowrap underline decoration-dotted underline-offset-4">
            {service.replaceAll('-', ' ')}
          </Link>
        </p>
        {isPending ? (
          <div className="aspect-square w-4 rounded-full bg-gray-500" />
        ) : (
          <>
            {(error || data?.status.indicator !== 'none') && (
              <div className="aspect-square w-4 rounded-full bg-red-500" />
            )}
            {data?.status.indicator === 'none' && (
              <div className="aspect-square w-4 rounded-full bg-green-500" />
            )}
          </>
        )}
      </div>
    </div>
  );
};

const StatusPage = () => {
  const services: Record<string, Record<string, string>> = {
    atlassian: {
      analytics: 'https://analytics.status.atlassian.com/api/v2/status.json',
      atlas: 'https://atlas.status.atlassian.com/api/v2/status.json',
      bitbucket: 'https://bitbucket.status.atlassian.com/api/v2/status.json',
      compass: 'https://compass.status.atlassian.com/api/v2/status.json',
      confluence: 'https://confluence.status.atlassian.com/api/v2/status.json',
      developer: 'https://developer.status.atlassian.com/api/v2/status.json',
      'jira-service-management':
        'https://jira-service-management.status.atlassian.com/api/v2/status.json',
      'jira-software':
        'https://jira-software.status.atlassian.com/api/v2/status.json',
      guard: 'https://guard.status.atlassian.com/api/v2/status.json',
      opsgenie: 'https://opsgenie.status.atlassian.com/api/v2/status.json',
      partners: 'https://partners.status.atlassian.com/api/v2/status.json',
      support: 'https://support.status.atlassian.com/api/v2/status.json',
      trello: 'https://trello.status.atlassian.com/api/v2/status.json',
    },
    'back-end': {
      supabase: 'https://status.supabase.com/api/v2/status.json',
    },
    crypto: {
      hedera: 'https://status.hedera.com/api/v2/status.json',
      solana: 'https://status.solana.com/api/v2/status.json',
    },
    'version-control': {
      github: 'https://www.githubstatus.com/api/v2/status.json',
    },
    server: {
      render: 'https://status.render.com/api/v2/status.json',
    },
    serverless: {
      netlify: 'https://www.netlifystatus.com/api/v2/status.json',
      vercel: 'https://www.vercel-status.com/api/v2/status.json',
    },
  };

  return (
    <div className="flex w-screen flex-col gap-y-4 p-4 md:p-6 lg:p-8">
      {Object.entries(services).map(([category, services]) => {
        return (
          <div key={category} className="flex flex-col gap-y-4 font-black">
            <h1 className="indent-4 capitalize">
              {category.replaceAll('-', ' ')}
            </h1>
            <div className="grid h-full grid-cols-1 gap-2 md:grid-cols-2 md:gap-3 lg:grid-cols-4 lg:gap-4">
              {Object.entries(services).map(([service, url]) => {
                return (
                  <div key={service} className="col-span-1">
                    <Status service={service} url={url} />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatusPage;
