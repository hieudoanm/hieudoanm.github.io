'use client';

import React, { ReactNode } from 'react';

export type ContainerProperties = {
  className?: string;
  children?: ReactNode;
};

export const Container: React.FC<ContainerProperties> = ({
  className = '',
  children = <></>,
}) => {
  return (
    <div className={`container mx-auto px-8 ${className}`}>{children}</div>
  );
};

Container.displayName = 'Container';

export default Container;
