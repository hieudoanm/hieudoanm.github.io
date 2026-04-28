import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';

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
