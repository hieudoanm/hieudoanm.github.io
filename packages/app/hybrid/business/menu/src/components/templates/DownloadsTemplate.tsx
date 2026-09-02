import { FC } from 'react';

export interface DownloadItem {
  platform: string;
  requirements: string;
  label: string;
  href: string;
}

interface DownloadsTemplateProps {
  version: string;
  items: DownloadItem[];
}

const DownloadsTemplate: FC<DownloadsTemplateProps> = ({ version, items }) => (
  <main className="mx-auto flex w-full max-w-3xl flex-col gap-4 p-4">
    <section className="card bg-base-100 shadow">
      <div className="card-body">
        <h1 className="text-3xl font-bold">Downloads</h1>
        <p className="text-base-content/60">
          Latest release <span className="font-mono">{version}</span>
        </p>
      </div>
    </section>
    <section className="card bg-base-100 shadow">
      <div className="card-body">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Platform</th>
                <th>Requirements</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.label}>
                  <td className="font-semibold">{item.platform}</td>
                  <td className="text-sm text-base-content/60">
                    {item.requirements}
                  </td>
                  <td className="text-right">
                    <a className="btn btn-primary btn-sm" href={item.href}>
                      {item.label}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </main>
);

export { DownloadsTemplate };