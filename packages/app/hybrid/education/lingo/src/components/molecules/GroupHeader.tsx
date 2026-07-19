import { FC } from 'react';

export interface GroupHeaderProps {
  title: string;
  count: number;
}

export const GroupHeader: FC<GroupHeaderProps> = ({ title, count }) => (
  <div className="divider">
    <span className="text-base-content/70 text-xs font-semibold tracking-wide uppercase">
      {title}
    </span>
    <span className="badge badge-outline badge-sm text-[10px]">{count}</span>
  </div>
);

GroupHeader.displayName = 'GroupHeader';
