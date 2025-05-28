import { FC, ReactNode } from 'react';

export const Badge: FC<{ type: 'neutral'; children: ReactNode }> = ({
  type,
  children = <></>,
}) => {
  if (type === 'neutral') {
    return <NeutralBadge>{children}</NeutralBadge>;
  }

  return (
    <span className="rounded-full bg-red-100 px-2 py-0.5 text-sm text-red-700">
      {children}
    </span>
  );
};

const NeutralBadge: FC<{ children: ReactNode }> = ({ children = <></> }) => {
  return (
    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-sm text-neutral-900">
      {children}
    </span>
  );
};
