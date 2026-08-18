import type { FC } from 'react';
import Link from 'next/link';
import { FiChevronLeft, FiDownload } from 'react-icons/fi';
import { Badge } from '@/components/atoms/Badge';

export interface DownloadItem {
  platform: string;
  requirements: string;
  label: string;
  href: string;
}

export interface DownloadsTemplateProps {
  version: string;
  items: DownloadItem[];
}

export const DownloadsTemplate: FC<DownloadsTemplateProps> = ({
  version,
  items,
}) => (
  <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-6 p-8 text-center">
    <div className="flex w-full items-center gap-4">
      <Link href="/" className="btn btn-ghost btn-sm">
        <FiChevronLeft /> Home
      </Link>
    </div>

    <p className="text-base-content/50 text-xs tracking-[0.2em] uppercase">
      Downloads
    </p>

    <h1 className="text-3xl font-bold">Installers</h1>

    <p className="text-base-content/70 max-w-md text-sm">
      Pick the package for your platform. The mobile web app is available from
      any browser.
    </p>

    <div className="border-base-content/10 bg-base-200 w-full max-w-lg rounded-2xl border p-6">
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
              className="btn btn-primary btn-sm"
              aria-label={`Download ${label}`}>
              <FiDownload />
              {label}
            </Link>
          </div>
        ))}
      </div>
    </div>

    <div className="flex flex-wrap items-center justify-center gap-3">
      <span className="border-base-content/20 text-base-content/50 rounded-full border px-3 py-1 text-xs">
        {version}
      </span>
      <Badge variant="neutral">Stable</Badge>
    </div>
  </main>
);
