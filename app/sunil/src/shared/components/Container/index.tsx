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
  const containerClassName = `container mx-auto ${className}`.trim();
  return <div className={containerClassName}>{children}</div>;
};

Container.displayName = 'Container';
