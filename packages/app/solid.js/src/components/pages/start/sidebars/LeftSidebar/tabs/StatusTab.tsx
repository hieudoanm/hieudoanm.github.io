import { useQuery } from '@tanstack/solid-query';
import { createMemo, createSignal } from 'solid-js';

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

export const ServiceRow = (props: { service: string; url: string }) => {
  const { isPending, error, data } = useQuery<{
    page: { id: string; name: string; url: string; time_zone: string };
    status: { indicator: string; description: string };
  }>({
    queryKey: ['status', props.service],
    queryFn: () => fetch(props.url).then((res) => res.json()),
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });

  const isOk = () => !error() && data()?.status?.indicator === 'none';
  const isErr = () =>
    !!error() || (!!data() && data()?.status?.indicator !== 'none');
  const pageUrl = () => data()?.page.url || props.url;
  const pageName = () => data()?.page?.name || props.service;

  return (
    <div class="hover:bg-base-300 group flex items-center justify-between rounded-lg px-2 py-1.5 transition-colors duration-150">
      <a
        href={pageUrl()}
        target="_blank"
        rel="noopener noreferrer"
        class="text-base-content/70 group-hover:text-base-content text-xs tracking-wide capitalize underline decoration-dotted transition-colors">
        {pageName().replaceAll('-', ' ')}
      </a>
      <div class="ml-2 shrink-0">
        {isPending() ? (
          <div class="bg-base-content/20 h-2 w-2 animate-pulse rounded-full" />
        ) : isOk() ? (
          <div class="bg-success h-2 w-2 rounded-full" />
        ) : isErr() ? (
          <div class="bg-error h-2 w-2 rounded-full" />
        ) : (
          <div class="bg-warning h-2 w-2 rounded-full" />
        )}
      </div>
    </div>
  );
};

export const StatusTab = () => {
  const [searchQuery, setSearchQuery] = createSignal('');

  const filteredServices = createMemo(() => {
    const query = searchQuery().toLowerCase().trim();
    if (!query) return STATUS_SERVICES;

    const filtered: Record<string, Record<string, string>> = {};

    Object.entries(STATUS_SERVICES).forEach(([category, services]) => {
      const matchingServices: Record<string, string> = {};
      Object.entries(services).forEach(([service, url]) => {
        if (
          service.toLowerCase().includes(query) ||
          category.toLowerCase().includes(query)
        ) {
          matchingServices[service] = url;
        }
      });

      if (Object.keys(matchingServices).length > 0) {
        filtered[category] = matchingServices;
      }
    });

    return filtered;
  });

  const filteredCount = createMemo(() =>
    Object.values(filteredServices()).reduce(
      (acc, s) => acc + Object.keys(s).length,
      0
    )
  );

  const sq = searchQuery();

  return (
    <div class="flex h-full flex-col">
      <div class="border-base-300 border-b p-3">
        <div class="relative">
          <input
            type="text"
            placeholder="Search services…"
            class="input input-bordered input-xs w-full pr-6"
            value={sq}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
          />
          {sq && (
            <button
              onClick={() => setSearchQuery('')}
              class="text-base-content/50 hover:text-base-content absolute top-1/2 right-2 -translate-y-1/2 text-[10px]"
              title="Clear search">
              ✕
            </button>
          )}
        </div>
      </div>

      <div class="flex-1 overflow-y-auto">
        <div class="flex flex-col gap-4 p-3">
          {Object.entries(filteredServices()).map(([category, services]) => (
            <div>
              <p class="text-base-content/30 mb-1.5 px-2 font-mono text-[10px] tracking-widest uppercase">
                {category}
              </p>
              <div class="flex flex-col gap-0.5">
                {Object.entries(services).map(([service, url]) => (
                  <ServiceRow service={service} url={url} />
                ))}
              </div>
            </div>
          ))}
          {filteredCount() === 0 && (
            <p class="text-base-content/25 py-8 text-center text-xs">
              No matching services found.
            </p>
          )}
        </div>
      </div>
      <footer class="border-base-300 border-t px-4 py-4 text-center font-mono">
        <p class="text-xs tracking-widest uppercase opacity-20">
          {sq.trim()
            ? `${filteredCount()} found · ${totalCount} services`
            : `${totalCount} services · 2 min refresh`}
        </p>
      </footer>
    </div>
  );
};
