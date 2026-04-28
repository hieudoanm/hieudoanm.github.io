import { FC } from 'react';
import { ServiceRow } from './ServiceRow';
import { STATUS_SERVICES } from './services';

const totalCount = Object.values(STATUS_SERVICES).reduce(
  (acc, s) => acc + Object.keys(s).length,
  0
);

export const StatusSidebar: FC = () => (
  <aside className="bg-base-200 border-base-300 flex min-h-0 flex-col overflow-hidden border-r">
    <div className="border-base-300 sticky top-0 z-10 flex items-center justify-between border-b px-4 py-4">
      <h2 className="text-base font-black tracking-tight">
        Service<span className="text-primary"> Status</span>
      </h2>
      <div className="badge badge-xs badge-primary badge-outline font-mono tracking-widest uppercase">
        Live
      </div>
    </div>

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

    <footer className="border-base-300 bg-base-200 mt-auto border-t px-4 py-4 text-center font-mono">
      <p className="text-xs tracking-widest uppercase opacity-20">
        {totalCount} services · 2 min refresh
      </p>
    </footer>
  </aside>
);
