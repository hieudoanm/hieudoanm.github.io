import type { FC } from 'react';
import type { DownloadOption } from '@/lib/downloads';
interface DownloadRowProps {
  download: DownloadOption;
  isRecommended: boolean;
}

export const DownloadRow: FC<DownloadRowProps> = ({
  download,
  isRecommended,
}) => (
  <div
    className={`card bg-base-200 border-base-300 flex flex-row items-center gap-3 border p-3 ${
      isRecommended ? 'border-primary ring-primary/20 ring-1' : ''
    }`}>
    <div className="flex-1">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{download.label}</span>
        {isRecommended && (
          <span className="bg-primary/20 text-primary badge badge-xs">
            Recommended
          </span>
        )}
      </div>
    </div>
    <button
      type="button"
      onClick={() => window.open(download.url, '_blank', 'noopener,noreferrer')}
      className={`btn btn-xs ${isRecommended ? 'btn-primary' : 'btn-neutral'}`}>
      Download
    </button>
  </div>
);

DownloadRow.displayName = 'DownloadRow';
