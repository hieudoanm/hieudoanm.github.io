import { ReactNode } from 'react';

export type HeadingProperties = { children?: ReactNode };

export const Heading: React.FC<HeadingProperties> = ({ children = <></> }) => {
  return <p className="text-xl md:text-2xl lg:text-3xl">{children}</p>;
};

Heading.displayName = 'Heading';
