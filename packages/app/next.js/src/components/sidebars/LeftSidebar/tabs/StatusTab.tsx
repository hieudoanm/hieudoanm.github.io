import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';

const STATUS_SERVICES: Record<string, Record<string, string>> = {
  atlassian: {
    analytics: 'https://analytics.status.atlassian.com/api/v2/status.json',
    atlas: 'https://atlas.status.atlassian.com/api/v2/status.json',
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
  'server(less)': {
    supabase: 'https://status.supabase.com/api/v2/status.json',
    render: 'https://status.render.com/api/v2/status.json',
    flyio: 'https://status.flyio.net/api/v2/status.json',
    cloudflare: 'https://www.cloudflarestatus.com/api/v2/status.json',
    netlify: 'https://www.netlifystatus.com/api/v2/status.json',
    vercel: 'https://www.vercel-status.com/api/v2/status.json',
  },
  crypto: {
    hedera: 'https://status.hedera.com/api/v2/status.json',
    solana: 'https://status.solana.com/api/v2/status.json',
    polygon: 'https://status.polygon.technology/api/v2/status.json',
  },
  'version control': {
    bitbucket: 'https://bitbucket.status.atlassian.com/api/v2/status.json',
    github: 'https://www.githubstatus.com/api/v2/status.json',
    npm: 'https://status.npmjs.org/api/v2/status.json',
  },
};

const totalCount = Object.values(STATUS_SERVICES).reduce(
  (acc, s) => acc + Object.keys(s).length,
  0
);

export const ServiceRow: FC<{ service: string; url: string }> = ({
  service,
  url,
}) => {
  const { isPending, error, data } = useQuery<{
    status: { indicator: string };
  }>({
    queryKey: ['status', service],
    queryFn: () => fetch(url).then((res) => res.json()),
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });

  const isOk = !error && data?.status?.indicator === 'none';
  const isErr = !!error || (!!data && data?.status?.indicator !== 'none');

  return (
    <div className="hover:bg-base-300 group flex items-center justify-between rounded-lg px-2 py-1.5 transition-colors duration-150">
      <span className="text-base-content/70 group-hover:text-base-content text-xs tracking-wide capitalize transition-colors">
        {service.replaceAll('-', ' ')}
      </span>
      <div className="ml-2 shrink-0">
        {isPending ? (
          <div className="bg-base-content/20 h-2 w-2 animate-pulse rounded-full" />
        ) : isOk ? (
          <div className="bg-success h-2 w-2 rounded-full" />
        ) : isErr ? (
          <div className="bg-error h-2 w-2 rounded-full" />
        ) : (
          <div className="bg-warning h-2 w-2 rounded-full" />
        )}
      </div>
    </div>
  );
};

export const StatusTab: FC = () => (
  <div className="flex h-full flex-col">
    <div className="flex-1 overflow-y-auto">
      <div className="flex flex-col gap-4 p-3">
        {Object.entries(STATUS_SERVICES).map(([category, services]) => (
          <div key={category}>
            <p className="text-base-content/30 mb-1.5 px-2 font-mono text-[10px] tracking-widest uppercase">
              {category}
            </p>
            <div className="flex flex-col gap-0.5">
              {Object.entries(services).map(([service, url]) => (
                <ServiceRow key={service} service={service} url={url} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    <footer className="border-base-300 border-t px-4 py-4 text-center font-mono">
      <p className="text-xs tracking-widest uppercase opacity-20">
        {totalCount} services · 2 min refresh
      </p>
    </footer>
  </div>
);
