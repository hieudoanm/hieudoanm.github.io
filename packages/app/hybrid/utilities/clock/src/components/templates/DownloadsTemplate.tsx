import { FC } from 'react';

interface DownloadItem {
  platform: string;
  requirements: string;
  label: string;
  href: string;
}

export const DownloadsTemplate: FC<{
  version: string;
  items: DownloadItem[];
}> = ({ version, items }) => (
  <div className="flex flex-1 flex-col items-center justify-center p-8">
    <div className="max-w-md text-center">
      <h1 className="text-base-content mb-4 font-mono text-2xl font-normal tracking-widest uppercase">
        Downloads
      </h1>
      <div className="border-base-300 rounded-box bg-base-200 border p-4 text-left">
        {items.map((item, i) => (
          <div key={item.platform}>
            {i > 0 && <div className="border-base-300 my-2 border-t" />}
            <div className="flex items-center justify-between text-sm">
              <div>
                <p className="font-mono">{item.platform}</p>
                <p className="text-base-content/40 text-xs">
                  {item.requirements}
                </p>
              </div>
              <a
                href={item.href}
                className="btn btn-primary btn-xs"
                target="_blank"
                rel="noopener noreferrer">
                {item.label}
              </a>
            </div>
          </div>
        ))}
      </div>
      <span className="badge badge-ghost badge-sm mt-4">v{version}</span>
    </div>
  </div>
);
DownloadsTemplate.displayName = 'DownloadsTemplate';
