import React from 'react';

export type ContainerProperties = {
  className?: string;
  children: React.ReactNode;
};

export const Container: React.FC<ContainerProperties> = ({
  className = '',
  children,
}) => {
  return (
    <div className={`container mx-auto px-8 ${className}`}>{children}</div>
  );
};

Container.displayName = 'Container';
Container.defaultProps = { className: '' };

export default Container;
