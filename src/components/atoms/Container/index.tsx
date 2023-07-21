import React from 'react';

export type ContainerProperties = { children: React.ReactNode };

export const Container: React.FC<ContainerProperties> = ({ children }) => {
  return <div className="container mx-auto px-8">{children}</div>;
};

Container.displayName = 'Container';
Container.defaultProps = {};

export default Container;
