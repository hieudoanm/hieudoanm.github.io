import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const Notification: FC<TemplateProps> = ({ data }) => {
  const app = (data.app as string) ?? '';
  const title = (data.title as string) ?? '';
  const body = (data.body as string) ?? '';
  const time = (data.time as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full items-center justify-center p-10">
      <div className="bg-base-200 rounded-box w-full max-w-sm p-5 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="bg-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
            <span className="text-primary-content text-sm font-bold">
              {(app || 'M')[0]}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-base-content text-xs font-bold">
                {app || 'Messages'}
              </span>
              <span className="text-neutral text-[10px]">{time || 'now'}</span>
            </div>
            <p className="text-base-content mt-0.5 text-sm font-semibold">
              {title || 'Alex Chen'}
            </p>
            <p className="text-neutral mt-0.5 truncate text-xs">
              {body || 'Are we still on for tomorrow?'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

Notification.displayName = 'Notification';
