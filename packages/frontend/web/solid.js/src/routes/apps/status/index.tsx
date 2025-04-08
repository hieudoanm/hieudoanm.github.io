import { A } from '@solidjs/router';
import { useQuery } from '@tanstack/solid-query';

const Status = ({
  service = '',
  url = '',
}: {
  service: string;
  url: string;
}) => {
  const {
    isPending = false,
    error = null,
    data,
  } = useQuery<{
    status: { indicator: string };
  }>(() => ({
    queryKey: [service],
    queryFn: () => fetch(url).then((res) => res.json()),
  }));

  return (
    <div class="w-full rounded-full bg-gray-900 px-4 py-2 text-gray-100">
      <div class="flex items-center justify-between">
        <p class="capitalize">
          <A
            href={url}
            target="_blank"
            class="truncate whitespace-nowrap underline decoration-dotted underline-offset-4">
            {service.replaceAll('-', ' ')}
          </A>
        </p>
        {isPending ? (
          <div class="aspect-square w-4 rounded-full bg-gray-700" />
        ) : (
          <>
            {(error || data?.status.indicator !== 'none') && (
              <div class="aspect-square w-4 rounded-full bg-red-500" />
            )}
            {data?.status.indicator === 'none' && (
              <div class="aspect-square w-4 rounded-full bg-green-500" />
            )}
          </>
        )}
      </div>
    </div>
  );
};

const StatusPage = () => {
  return (
    <div class="h-screen w-screen p-8">
      <div class="grid h-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {Object.entries({
          analytics:
            'https://analytics.status.atlassian.com/api/v2/status.json',
          atlas: 'https://atlas.status.atlassian.com/api/v2/status.json',
          bitbucket:
            'https://bitbucket.status.atlassian.com/api/v2/status.json',
          compass: 'https://compass.status.atlassian.com/api/v2/status.json',
          confluence:
            'https://confluence.status.atlassian.com/api/v2/status.json',
          developer:
            'https://developer.status.atlassian.com/api/v2/status.json',
          'jira-service-management':
            'https://jira-service-management.status.atlassian.com/api/v2/status.json',
          'jira-software':
            'https://jira-software.status.atlassian.com/api/v2/status.json',
          guard: 'https://guard.status.atlassian.com/api/v2/status.json',
          opsgenie: 'https://opsgenie.status.atlassian.com/api/v2/status.json',
          partners: 'https://partners.status.atlassian.com/api/v2/status.json',
          support: 'https://support.status.atlassian.com/api/v2/status.json',
          trello: 'https://trello.status.atlassian.com/api/v2/status.json',
          github: 'https://www.githubstatus.com/api/v2/status.json',
          render: 'https://status.render.com/api/v2/status.json',
          netlify: 'https://www.netlifystatus.com/api/v2/status.json',
          vercel: 'https://www.vercel-status.com/api/v2/status.json',
          supabase: 'https://status.supabase.com/api/v2/status.json',
          solana: 'https://status.solana.com/api/v2/status.json',
          hedera: 'https://status.hedera.com/api/v2/status.json',
        }).map(([service, url]) => {
          return (
            <div title={service} class="col-span-1">
              <Status service={service} url={url} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatusPage;
