import { PiGlobe } from 'react-icons/pi';
import type { AppData } from '@/lib/downloads';
import type { FC } from 'react';

interface WebVersionProps {
  app: AppData;
}

export const WebVersion: FC<WebVersionProps> = ({ app }) => {
  if (app.section !== 'hybrid') return null;

  return (
    <div className="border-base-300 mb-8 border-t pt-6">
      <h2 className="text-base-content/70 mb-3 font-mono text-xs tracking-widest uppercase">
        Web Version
      </h2>
      <a
        href={app.href}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-outline w-full">
        <PiGlobe className="text-lg" />
        Open in Browser
      </a>
    </div>
  );
};

WebVersion.displayName = 'WebVersion';
