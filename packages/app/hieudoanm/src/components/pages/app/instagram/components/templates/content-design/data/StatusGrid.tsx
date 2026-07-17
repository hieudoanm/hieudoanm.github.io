import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const StatusGrid: FC<TemplateProps> = ({ data }) => {
  const headline = (data.headline as string) ?? 'System Status';
  const services = (data.services as { name: string; status: string }[]) ?? [
    { name: 'API', status: 'Operational' },
    { name: 'Database', status: 'Operational' },
    { name: 'CDN', status: 'Degraded' },
    { name: 'Auth', status: 'Operational' },
  ];

  const dotColor = (status: string) => {
    if (status === 'Operational') return 'bg-success';
    if (status === 'Degraded') return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-8">
      <h1 className="text-base-content mb-3 text-4xl font-bold">{headline}</h1>
      <div className="grid flex-1 grid-cols-2 gap-2">
        {services.map((s, i) => (
          <div
            key={i}
            className="bg-base-200 flex items-center gap-2 rounded-xl px-2 py-2">
            <span
              className={`h-2.5 w-2.5 rounded-full ${dotColor(s.status)}`}
            />
            <div>
              <p className="text-base-content text-sm font-bold">{s.name}</p>
              <p className="text-neutral text-xs">{s.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

StatusGrid.displayName = 'StatusGrid';
