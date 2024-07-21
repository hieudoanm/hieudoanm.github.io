import { ReactNode } from 'react';

export type PageHeadingProperties = { children?: ReactNode };

export const PageHeading: React.FC<PageHeadingProperties> = ({
  children = <></>,
}) => {
  return <div className="text-xl md:text-2xl lg:text-3xl">{children}</div>;
};

PageHeading.displayName = 'PageHeading';
