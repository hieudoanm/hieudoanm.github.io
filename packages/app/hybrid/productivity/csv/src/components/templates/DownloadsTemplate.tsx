import type { FC } from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiDownload } from 'react-icons/fi';

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
  <div className="flex min-h-dvh flex-col">
    <header className="border-base-300 bg-base-100 sticky top-0 z-10 border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="btn btn-ghost btn-sm">
            <FiArrowLeft className="text-lg" />
          </Link>
          <h1 className="text-sm font-bold">CSV</h1>
        </div>
      </div>
    </header>
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center gap-6 p-6 text-center">
      <p className="text-base-content/50 text-xs tracking-[0.2em] uppercase">
        Downloads
      </p>

      <h1>Installers</h1>

      <p className="text-base-content/50 max-w-sm text-center text-sm">
        Pick the package for your platform. The mobile web app is available from
        any browser.
      </p>

      <div className="border-base-content/10 bg-base-200 mb-8 w-full max-w-lg rounded-2xl border p-6">
        <div className="flex flex-col gap-4">
          {items.map(({ platform, requirements, label, href }) => (
            <div
              key={`${platform}-${label}`}
              className="flex items-center justify-between gap-4">
              <div className="flex flex-col items-start text-left">
                <span className="text-base-content text-sm font-bold">
                  {platform}
                </span>
                <span className="text-base-content/50 text-xs">
                  {requirements}
                </span>
              </div>
              <Link
                href={href}
                className="btn btn-primary btn-sm gap-1.5"
                aria-label={`Download ${label}`}>
                <FiDownload className="h-3.5 w-3.5" />
                {label}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <span className="border-base-content/20 text-base-content/50 rounded-full border px-3 py-1 text-xs">
          {version}
        </span>
        <span className="badge badge-neutral rounded-full">Stable</span>
      </div>
    </main>
  </div>
);

DownloadsTemplate.displayName = 'DownloadsTemplate';
