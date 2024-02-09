import { ReactNode } from 'react';

export type ContainerProperties = { children?: ReactNode };

export const Container: React.FC<ContainerProperties> = ({
  children = <></>,
}) => {
  return <div className="container mx-auto">{children}</div>;
};
