import React from 'react';

const Container: React.FC = ({ children }) => {
  return <div className="container mx-auto px-8">{children}</div>;
};

Container.displayName = 'Container';
Container.defaultProps = {};

export default Container;
