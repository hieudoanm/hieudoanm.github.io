import type { FC } from 'react';
import type { DownloadOption } from '@/lib/downloads';
import { DownloadRow } from '../DownloadRow';

interface ExtensionGroupProps {
  format: string;
  downloads: DownloadOption[];
  recommended: DownloadOption | undefined;
}

export const ExtensionGroup: FC<ExtensionGroupProps> = ({
  format,
  downloads,
  recommended,
}) => (
  <div className="space-y-2">
    <h3 className="text-base-content/70 font-mono text-xs tracking-widest uppercase">
      {format}
    </h3>
    <div className="space-y-2">
      {downloads.map((dl) => (
        <DownloadRow
          key={dl.url}
          download={dl}
          isRecommended={dl === recommended}
        />
      ))}
    </div>
  </div>
);

ExtensionGroup.displayName = 'ExtensionGroup';
