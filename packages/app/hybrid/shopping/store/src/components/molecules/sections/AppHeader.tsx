import type { FC } from 'react';
import { getIcon } from '@/lib/icons';
import type { AppData } from '@/lib/downloads';
import { PLATFORM_LABELS } from '@/lib/os';

interface AppHeaderProps {
  app: AppData;
}

export const AppHeader: FC<AppHeaderProps> = ({ app }) => {
  const Icon = getIcon(app.icon);
  return (
    <div className="mb-8 text-center">
      <div className="bg-primary/20 border-primary/30 mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full shadow-inner">
        <Icon className="text-primary text-4xl" />
      </div>
      <h1 className="mb-2 text-3xl font-thin tracking-tight">{app.label}</h1>
      <p className="text-base-content/50 text-sm">{app.description}</p>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
        <span className="bg-primary/20 text-primary border-primary/30 badge badge-sm font-mono tracking-normal">
          {app.section}
        </span>
        {app.platforms.map((p) => (
          <span
            key={p}
            className="bg-base-300 text-base-content/60 badge badge-sm font-mono tracking-normal">
            {PLATFORM_LABELS[p]}
          </span>
        ))}
      </div>
    </div>
  );
};
AppHeader.displayName = 'AppHeader';
